import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../statistic.service";
import {StatisticModel} from "../../model/statistic";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  public statistics: StatisticModel;

  constructor(private statisticSrv: StatisticService) {
    this.statistics = this.statisticSrv.stat;
  }

  ngOnInit(): void {
  }


}
