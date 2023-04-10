<template>
  <BootstrapBadge color="bg-danger" v-if="move.partial > 0" :value="move.partial"/>
  <BootstrapBadge color="bg-success" v-if="move.perfect > 0" :value="move.perfect"/>
  <BootstrapBadge color="bg-warning" v-if="move.perfect === 0 && move.partial === 0" value="NO MATCH"/>
</template>

<script>
import BootstrapBadge from "@/components/BootstrapBadge";

export default {
  components: {
    BootstrapBadge
  },
  name: "MasterMindEvaluation",
  props: ["move"]
}
</script>

<style scoped>

</style>