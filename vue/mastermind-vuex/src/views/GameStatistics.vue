<template>
  <div class="input-group">
    <BootstrapBadge label="Wins:" color="badge bg-primary" :value="statistics.wins"/>&nbsp;of&nbsp;<BootstrapBadge label="" color="bg-success" :value="total"/>
  </div>
  <div class="input-group">
    <BootstrapBadge label="Loses:" color="bg-secondary" :value="statistics.loses"/>&nbsp;of&nbsp;<BootstrapBadge color="bg-success" :value="total"/>
  </div>

</template>

<script>

import BootstrapBadge from "@/components/BootstrapBadge";

export default {
  name: "GameStatistics",
  components: { BootstrapBadge},
  computed: {
    statistics() {
      return this.$store.state.statistics;
    },
    total() {
      return this.$store.state.statistics.wins + this.$store.state.statistics.loses;
    }
  }
}
</script>

<style scoped>

</style>