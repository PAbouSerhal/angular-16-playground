import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import {
  GetWeatherForecastReq,
  ProxyService,
  WeatherForecast,
} from 'src/app/service/proxy.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  constructor(
    private proxyService: ProxyService,
    public commonService: CommonService
  ) {}

  private getWeatherForecastReq = new GetWeatherForecastReq();
  private getWeatherForecast = new Subscription();
  public weatherForecastArray: WeatherForecast[] = [];

  ngOnInit(): void {
    this.getWeatherForecastReq.baseReq.correlationId = crypto
      .randomUUID()
      .toString();
    this.getWeatherForecastReq.baseReq.currentUser =
      this.commonService.currentUser;

    this.getWeatherForecast = this.proxyService
      .GetWeatherForecast(this.getWeatherForecastReq)
      .subscribe({
        next: (result) => {
          this.weatherForecastArray = result.resp;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
