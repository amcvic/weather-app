import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../weather.service';

import { CurrentWeather, WeatherResponse } from '../weather';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {

  latitude: number;
  longitude: number;

  data: CurrentWeather;
  response: WeatherResponse;

  time: Date;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.weatherService.getData(this.latitude, this.longitude)
        .subscribe((response) => {
          console.log(response);
          this.response = response;
          this.data = response.currently;
          this.time = new Date(this.data.time*1000);
        });
    })
  }

}
