import { Injectable } from '@angular/core';
import {Market} from "../model/market";
import * as io from 'socket.io-client';
import {Trade} from "../model/trade";

@Injectable({
  providedIn: 'root'
})
export class BinanceService {
  private readonly webSocketUrl = "ws://localhost:5555";
  private marketData : Market = new Market();

  private socket = io(this.webSocketUrl);

  constructor() { }
  connect(){
    this.socket.on("ticker", (trade : Trade) => {
      //console.log(trade);
      if (Number(trade.quantity) >= 1.0 )
        this.marketData.trades.push(new Trade(trade.symbol,trade.price,trade.quantity,trade.timestamp));
      let date = new Date(trade.timestamp).toLocaleString('tr-TR',{hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false});
      this.marketData.tradesChartData[0].data.push(Number(trade.price));
      this.marketData.tradesChartLabels.push(date);
      //  this.marketData.trades = this.marketData.trades.slice(length - 50);
      if (this.marketData.trades.length > 50){
        let length = this.marketData.tradesChartLabels.length;
        this.marketData.tradesChartData[0].data = this.marketData.tradesChartData[0].data.slice(length - 50);
        this.marketData.tradesChartLabels = this.marketData.tradesChartLabels.slice(length - 50);
      }
    });
  }
  get market() : Market {
    return this.marketData;
  }
}
