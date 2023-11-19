import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private http: HttpClient, private common: CommonService) {}

  apiUrl: string = this.common.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  GetWeatherForecast(
    getWeatherForecastReq: GetWeatherForecastReq
  ): Observable<GetWeatherForecastRes> {
    return this.http.post<GetWeatherForecastRes>(
      this.apiUrl + 'WeatherForecast',
      getWeatherForecastReq
    );
  }
}

export class BaseReq {
  correlationId!: string;
  currentUser!: string;
}

export class BaseRes {
  httpStatusCode!: string;
  httpMessage!: string;
  correlationId!: string;
  currentUser!: string;
}

export class WeatherForecast {
  date!: Date;
  temperatureC!: number;
  temperatureF!: number;
  summary!: string;
}

export class GetWeatherForecastReq {
  baseReq: BaseReq = new BaseReq();
}

export class GetWeatherForecastRes {
  webRes!: BaseRes;
  resp!: WeatherForecast[];
  req!: GetWeatherForecastReq;
}
