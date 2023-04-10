import {Component, Input, OnInit} from '@angular/core';
import {Move} from "../../model/move";

@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input("array")
  history : Array<Move> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
