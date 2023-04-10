import {Move} from "./move";

export class MastermindGame {
  constructor(
    public guess: number = 123,
    public tries: number = 0,
    public gameLevel: number = 3,
    public moves: Array<Move> = [],
    public counter: number = 60
  ) { }

  init(state : MastermindGame){
    this.guess = state.guess;
    this.tries = state.tries;
    this.gameLevel = state.gameLevel;
    this.moves = state.moves;
    this.counter = state.counter;
  }

  reset() {
    this.tries = 0;
    this.moves.splice(0);
    this.counter = 60;
  }
}
