import {Injectable} from '@angular/core';
import {MastermindGame} from "../model/mastermind";
import {formatNumber} from "@angular/common";
import {Move} from "../model/move";
import {StatisticService} from "./statistic.service";
import {Router} from "@angular/router";
// setInterval( function, 1000);
// setTimeout(function, 60000)
@Injectable({
  providedIn: 'root'
})
export class MastermindService {
  mastermindGame = new MastermindGame();
  private secret: number = this.createSecret(this.mastermindGame.gameLevel);

  constructor(private statisticSrv: StatisticService, private router: Router) {
    this.countdown = this.countdown.bind(this);
    this.play = this.play.bind(this);
    window.setInterval(this.countdown, 1000);
    let mastermindLocalStorage = localStorage.getItem("mastermind");
    if (mastermindLocalStorage != null && mastermindLocalStorage != undefined) {
      let restoredState = JSON.parse(mastermindLocalStorage);
      if (restoredState.hasOwnProperty("mastermindGame"))
        this.mastermindGame.init(restoredState.mastermindGame);
      if (restoredState.hasOwnProperty("secret"))
        this.secret = restoredState.secret;
      if (restoredState.hasOwnProperty("stat")) {
        this.statisticSrv.stat.wins = restoredState.stat.wins;
        this.statisticSrv.stat.loses = restoredState.stat.loses;
      }
    }

  }

  countdown() {
    this.mastermindGame.counter--;
    if (this.mastermindGame.counter <= 0) {
      this.statisticSrv.playerLoses();
      this.mastermindGame.reset();
      this.router.navigate(["loses"]);
    }
  }

  play(): void {
    this.mastermindGame.tries++;
    if (this.mastermindGame.guess == this.secret) {
      if (this.mastermindGame.gameLevel == 10) {
        this.statisticSrv.playerWins();
        this.mastermindGame.reset();
        this.mastermindGame.gameLevel = 3;
        this.router.navigate(["wins"]);
      } else {
        this.mastermindGame.gameLevel++
        this.mastermindGame.reset();
        this.secret = this.createSecret(this.mastermindGame.gameLevel)
      }
    } else {
      if (this.mastermindGame.tries > 10) {
        this.statisticSrv.playerLoses();
        this.mastermindGame.reset();
        this.router.navigate(["loses"]);
      } else {
        this.mastermindGame.moves.push(this.createMove(this.mastermindGame.guess, this.secret));
      }
    }
    localStorage.setItem("mastermind", JSON.stringify({secret: this.secret, mastermindGame: this.mastermindGame, stat: this.statisticSrv.stat}));
  }

  private createSecret(level: number): number {
    const digits: Array<number> = [];
    digits.push(this.createDigit(1, 9));
    while (digits.length < level) {
      let digit: number = this.createDigit(0, 9);
      if (!digits.includes(digit))
        digits.push(digit);
    }
    let response = digits.reduce((sum, digit) => 10 * sum + digit, 0);
    console.log(response);
    return response;
  }

  private createDigit(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private createMove(guess: number, secret: number): Move {
    let evaluation = "";
    let perfectMatch = 0;
    let partialMatch = 0;
    const guessAsString = guess.toString();
    const secretAsString = secret.toString();
    for (let i = 0; i < guessAsString.length; ++i) {
      const g = guessAsString.charAt(i);
      for (let j = 0; j < secretAsString.length; ++j) {
        const s = secretAsString.charAt(j);
        if (g == s) {
          if (i == j)
            perfectMatch++;
          else
            partialMatch++;
        }
      }
    }
    if (perfectMatch == 0 && partialMatch == 0)
      return new Move(guess, "No Match", perfectMatch, partialMatch);
    if (partialMatch > 0)
      evaluation += "-" + partialMatch;
    if (perfectMatch > 0)
      evaluation += "+" + perfectMatch;
    return new Move(guess, evaluation, perfectMatch, partialMatch);
  }
}
