import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { WeatherResponse } from './weather';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  private darkSkyUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/79a43d53042a4f5afd3f409bf6d49d08/';

  getData (locationX: number, locationY: number): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.darkSkyUrl}${locationX},${locationY}`, this.httpOptions)
    .pipe(
      catchError(this.handleError<WeatherResponse>('getData'))
    );
  }

  private handleError<T>(operation='operation') {
    return (error: T): Observable<T> => {
      console.error(error);
      return;
    }
  }
}
