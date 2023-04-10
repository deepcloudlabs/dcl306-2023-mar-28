<template>
  <p></p>
  <div class="container">
    <BootstrapModalDialog :dialog-text="`You have already used the guess (${this.game.guess})!`"
                          :close-dialog="closeDialog"
                          :visible="isDialogVisible"
                          dialog-title="Alert"></BootstrapModalDialog>
    <BootstrapCard>
      <BootstrapCardHeader header="Game Console"/>
      <BootstrapCardBody>
        <div class="mb-1">
          <BootstrapLabel value="Wins:"/>
          <BootstrapBadge color="badge bg-primary" :value="statistics.wins"/>
          of
          <BootstrapBadge color="bg-success" :value="total"/>
        </div>
        <div class="mb-1">
          <BootstrapLabel value="Loses:"/>
          <BootstrapBadge color="bg-secondary" :value="statistics.loses"/>
          of
          <BootstrapBadge color="bg-success" :value="total"/>
        </div>
        <div class="mb-1">
          <BootstrapLabel value="Game Level:"/>
          <BootstrapBadge color="bg-success" :value="game.level"/>
        </div>
        <div class="mb-1" v-if="game.tries === 0">
          <BootstrapBadge color="bg-info" value="NEW GAME"/>
        </div>
        <div class="mb-1" v-if="game.tries > 0">
          <BootstrapLabel value="Tries:"/>
          <BootstrapBadge color="bg-danger" :value="game.tries"/>
          of
          <BootstrapBadge color="bg-warning" :value="game.maxTries"/>
        </div>
        <div class="mb-1">
          <BootstrapProgressBar :value="game.counter" label="Time:" :color="progressBarColor"/>
        </div>
        <div class="mb-3">
          <BootstrapLabel value="Lives:"/>
          <BootstrapBadge color="badge bg-info" :value="game.lives"/>
        </div>
        <div class="mb-3">
          <label class="form-label card-text mb-2" for="guess">Guess:</label>
          <input type="text" class="form-control mb-2" v-model="game.guess">
          <button class="btn btn-success" @click="play">Play</button>
        </div>
        <p></p>
        <div class="mb-3">
          <BootstrapTable v-if="game.moves.length > 0">
            <BootstrapTableHeader :headers="['Move No', 'Guess', 'Evaluation']"></BootstrapTableHeader>
            <tbody>
            <tr v-for="(move,index) in game.moves" :key="move.guess">
              <td>{{ index + 1 }}</td>
              <td>{{ move.guess }}</td>
              <td>
                <MasterMindEvaluation :move="move"></MasterMindEvaluation>
              </td>
            </tr>
            </tbody>
          </BootstrapTable>
        </div>
      </BootstrapCardBody>
    </BootstrapCard>
  </div>
</template>
<script>
import Move from "@/model/move";
import BootstrapBadge from "@/components/BootstrapBadge";
import BootstrapLabel from "@/components/BootstrapLabel";
import BootstrapProgressBar from "@/components/BootstrapProgressBar";
import BootstrapTable from "@/components/BootstrapTable";
import BootstrapTableHeader from "@/components/BootstrapTableHeader";
import BootstrapCardHeader from "@/components/BootstrapCardHeader";
import MasterMindEvaluation from "@/components/MasterMindEvaluation";
import BootstrapModalDialog from "@/components/BootstrapModalDialog";
import BootstrapCard from "@/components/BootstrapCard";
import BootstrapCardBody from "@/components/BootstrapCardBody";

export default {
  name: 'MasterMind',
  components: {
    BootstrapCardBody,
    BootstrapCard,
    BootstrapModalDialog,
    BootstrapCardHeader, MasterMindEvaluation,
    BootstrapTableHeader, BootstrapProgressBar, BootstrapLabel, BootstrapBadge, BootstrapTable
  },
  props: {},
  mounted() {
    this.game.secret = this.createSecret();
    this.timer = setInterval(this.countdown, 1000);
    let storage = localStorage.getItem("mastermind-vue");
    if (storage) {
      storage = JSON.parse(storage);
      this.game = storage.game;
      this.statistics = storage.statistics;
    } else {
      localStorage.setItem("mastermind-vue", JSON.stringify({game: this.game, statistics: this.statistics}));
    }
  },
  unmounted() {
    clearInterval(this.timer);
    localStorage.setItem("mastermind-vue", JSON.stringify({game: this.game, statistics: this.statistics}));
  },
  methods: {
    showDialog() {
      this.isDialogVisible = true;
    },
    closeDialog() {
      this.isDialogVisible = false;
    },
    evaluateMove() {
      let guessAsString = this.game.guess.toString();
      let secretAsString = this.game.secret.toString();
      let perfectMatch = 0, partialMatch = 0;
      for (let i = 0; i < guessAsString.length; ++i) {
        let g = guessAsString.charAt(i);
        for (let j = 0; j < secretAsString.length; ++j) {
          let s = secretAsString.charAt(j);
          if (g === s) {
            if (i === j) {
              perfectMatch++;
            } else {
              partialMatch++;
            }
          }
        }
      }
      return new Move(this.game.guess, perfectMatch, partialMatch);
    },
    play() {
      /*
      if (this.game.moves.some(move => Number(this.game.guess) === Number(move.guess))) {
        this.showDialog();
        return;
      }
       */
      this.game.tries++;
      if (Number(this.game.secret) === Number(this.game.guess)) {
        if (this.game.level === 10) {
          this.game.level=3;
          this.initGame();
          this.$router.push("/wins");
        } else {
          this.game.level++;
          this.game.maxTries += 2;
          this.game.lives++;
          this.statistics.wins++;
          this.initGame();
        }
      } else {
        if (this.game.tries >= this.game.maxTries) {
          this.game.lives--;
          this.statistics.loses++;
          if (this.game.lives === 0) {
            this.game.level=3;
            this.initGame();
            this.$router.push("/loses");
          } else {
            this.initGame();
          }
        } else {
          this.game.moves.push(this.evaluateMove())
        }
      }
      localStorage.setItem("mastermind-vue", JSON.stringify({game: this.game, statistics: this.statistics}));
    },
    countdown() {
      this.game.counter--;
      if (this.game.counter <= 0) {
        this.statistics.loses++;
        this.game.lives--;
        if (this.game.lives <= 0) {
          this.$router.push("/loses");
        } else {
          this.initGame();
        }
      }
      localStorage.setItem("mastermind-vue", JSON.stringify({game: this.game, statistics: this.statistics}));
    },
    getRandomDigit(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    initGame() {
      this.game.tries = 0;
      this.game.secret = this.createSecret();
      this.game.moves = [];
      this.game.counter = 100;
    },
    createSecret() {
      let digits = []; // [5, 4, 9]
      digits.push(this.getRandomDigit(1, 9));
      while (digits.length < this.game.level) {
        let digit = this.getRandomDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
      }
      let nextSecret = digits.reduce((s, d) => 10 * s + d, 0);
      console.log(nextSecret);
      return nextSecret; // 549
    }
  },
  computed: {
    total() {
      return this.statistics.wins + this.statistics.loses;
    },
    progressBarColor() {
      // console.log(`progressBarColor is called for ${this.game.counter}`);
      if (this.game.counter > 80)
        return "bg-success";
      if (this.game.counter > 60)
        return "bg-primary";
      if (this.game.counter > 40)
        return "bg-warning";
      return "bg-danger";
    }
  },
  data: function () {
    return {
      game: {
        secret: 123,
        guess: 456,
        level: 3,
        tries: 0,
        lives: 3,
        maxTries: 10,
        moves: [],
        counter: 100
      },
      statistics: {
        wins: 0,
        loses: 0
      },
      isDialogVisible: false
    }
  }
}
</script>
<style scoped>
</style>
