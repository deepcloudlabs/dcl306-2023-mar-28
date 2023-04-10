import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'Evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  @Input("positive")
  perfect : number = 0;

  @Input("negative")
  partial : number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
