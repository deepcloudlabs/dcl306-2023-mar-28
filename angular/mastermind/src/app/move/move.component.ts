import {Component, Input, OnInit} from '@angular/core';
import {Move} from "../../model/move";

@Component({
  selector: 'Move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {
  @Input("move")
  row : Move = new Move(123,"",0,0);
  @Input("rowid")
  rowId : number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
