import {Trade} from "./trade";

export class Market {
    trades : Array<Trade> = [];
    tradesChartData : Array<any> = [
      {
        data : [],
        label: "BTCUSDT"
      }
    ];
    tradesChartLabels : Array<string> = [];

    get volume() : number {
      return this.trades.map(trade => trade.volume).reduce((sum,vol) => sum+vol, 0.0);
    }
}
