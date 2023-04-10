<template>
  <p></p>
  <div class="container">
    <BootstrapModalDialog :dialog-text="`You have already used the guess (${game.guess})!`"
                          :close-dialog="closeDialog"
                          :visible="isDialogVisible"
                          dialog-title="Alert"></BootstrapModalDialog>
    <BootstrapCard>
      <BootstrapCardHeader header="Game Console"/>
      <BootstrapCardBody>
        <GameStatistics/>
        <div class="input-group">
          <BootstrapBadge label="Game Level:" color="bg-success" :value="game.level"/>
        </div>
        <div class="input-group" v-if="game.tries === 0">
          <BootstrapBadge color="bg-info" value="NEW GAME"/>
        </div>
        <div class="input-group" v-if="game.tries > 0">
          <BootstrapBadge label="Tries:" color="bg-danger" :value="game.tries"/>&nbsp;of&nbsp;<BootstrapBadge label=""
                                                                                                              color="bg-warning"
                                                                                                              :value="game.maxTries"/>
        </div>
        <div class="mb-3">
          <BootstrapProgressBar :value="game.counter" label="Time:" :color="progressBarColor"/>
        </div>
        <div class="input-group">
          <BootstrapBadge label="Lives:" color="badge bg-info" :value="game.lives"/>
        </div>
        <div class="input-group">
          <input id="guess" type="text" class="form-control" v-model="game.guess">
          <button class="btn btn-success" @click="play">Play</button>
        </div>
        <p></p>
        <div class="input-group">
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
import BootstrapBadge from "@/components/BootstrapBadge";
import BootstrapProgressBar from "@/components/BootstrapProgressBar";
import BootstrapTable from "@/components/BootstrapTable";
import BootstrapTableHeader from "@/components/BootstrapTableHeader";
import BootstrapCardHeader from "@/components/BootstrapCardHeader";
import MasterMindEvaluation from "@/components/MasterMindEvaluation";
import BootstrapModalDialog from "@/components/BootstrapModalDialog";
import BootstrapCard from "@/components/BootstrapCard";
import BootstrapCardBody from "@/components/BootstrapCardBody";
import GameStatistics from "@/views/GameStatistics";

export default {
  name: 'MasterMind',
  components: {
    GameStatistics,
    BootstrapCardBody,
    BootstrapCard,
    BootstrapModalDialog,
    BootstrapCardHeader,
    MasterMindEvaluation,
    BootstrapTableHeader,
    BootstrapProgressBar,
    BootstrapBadge,
    BootstrapTable
  },
  props: {},
  mounted() {
    this.$store.commit('initializeSecret');
    this.timer = setInterval(() => this.$store.commit('countdown'), 1000);
    let storage = localStorage.getItem("mastermind-vuex");
    if (storage) {
      storage = JSON.parse(storage);
      this.$store.commit('loadGameState', storage.game);
      this.$store.commit('loadStatisticsState', storage.statistics);
    } else {
      localStorage.setItem("mastermind-vue", JSON.stringify({
        game: this.$store.state.game,
        statistics: this.$store.state.statistics
      }));
    }
  },
  unmounted() {
    clearInterval(this.timer);
    localStorage.setItem("mastermind-vue", JSON.stringify({
      game: {...this.$store.state.game},
      statistics: {...this.$store.state.statistics}
    }));
  },
  methods: {
    showDialog() {
      this.isDialogVisible = true;
    },
    closeDialog() {
      this.isDialogVisible = false;
    },
    play() {
      this.$store.commit('play');
    }
  },
  computed: {

    game() {
      return this.$store.state.game;
    },
    progressBarColor() {
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
      timer: null,
      isDialogVisible: false
    }
  }
}
</script>
<style scoped>
</style>
