import {Component} from '@angular/core';
import {LotteryService} from "./lottery.service";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // View
  styleUrls: ['./app.component.css']
})
export class AppComponent { // View Model <-- 2-way binding --> View
  lotteryNumbers: Array<Array<number>> = [];
  column: number = 3;
  columns = Array.from<number>(Array<number>(6).keys()).map( x => x + 1);

  constructor(private lotterySrv : LotteryService) { // dependency injection
  }
  removeRow(rowId : number) : void {
      this.lotteryNumbers.splice(rowId,1);
  }

  draw() : void {
    for (let i = 0; i < this.column; ++i) {
      this.lotteryNumbers.push(this.lotterySrv.drawNumbers());
    }
  }

  reset() {
    this.lotteryNumbers.splice(0);
  }

  moveToFirstRow(rowId : number ) : void {
    let removed = this.lotteryNumbers.splice(rowId,1);
    let rest = this.lotteryNumbers.splice(0);
    this.lotteryNumbers.push(removed[0]);
    rest.forEach( nums => this.lotteryNumbers.push(nums) );
  }

}
