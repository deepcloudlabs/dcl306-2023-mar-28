import { Component } from '@angular/core';
import {MastermindService} from "./mastermind.service";
import {StatisticService} from "./statistic.service";
import {MastermindGame} from "../model/mastermind";

/**
 *    level = 3
 *    secret -> 549
 *    123 -> "No match"
 *    456 -> "-2"
 *    564 -> "-1+1"
 *    547 -> "+2"
 *    549 -> level = 4 -> secret=3615
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mastermind';
  constructor(private mastermindSrv: MastermindService, private statisticSrv: StatisticService) {
  }
  play(){
    this.mastermindSrv.play();
  }
  get game(): MastermindGame {
    return this.mastermindSrv.mastermindGame;
  }
}
