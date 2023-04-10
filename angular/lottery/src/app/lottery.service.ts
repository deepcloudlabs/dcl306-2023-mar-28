import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor() { }

  drawNumbers(): Array<number> {
    let numbers: Set<number> = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(this.createRandomNumber(1, 60));
    }
    let array: Array<number> = Array.from<number>(numbers);
    array.sort((x, y) => x - y); // numeric asc. order
    return array;
  }

  createRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
