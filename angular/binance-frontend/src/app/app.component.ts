import {Component, OnInit} from '@angular/core';
import {BinanceService} from "./binance.service";
import {Market} from "../model/market";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chartOptions: any = {"animation": false, "responsive": true};

  constructor(private binanceSrv: BinanceService) {
  }

  ngOnInit(): void {
    this.binanceSrv.connect();
  }

  get market() : Market {
    return this.binanceSrv.market;
  }
}
