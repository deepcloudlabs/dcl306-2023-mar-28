import {Injectable} from '@angular/core';
import {StatisticModel} from "../model/statistic";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private statisticModel = new StatisticModel(0, 0);

  constructor() {
  }

  get stat(): StatisticModel {
    return this.statisticModel;
  }

  playerWins(){
    this.statisticModel.wins++;
  }

  playerLoses(){
    this.statisticModel.loses++;
  }
}
