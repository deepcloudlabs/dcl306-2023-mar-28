<template>
  <BootstrapLabel :value="label" />
  <div class="progress">
    <div :class="'progress-bar progress-bar-animated '.concat(color)"
         role="progressbar"
         aria-valuenow="0"
         aria-valuemin="0"
         aria-valuemax="16"
         :style="{ 'width': value.toString().concat('%') }"></div>
  </div>
</template>

<script>

import BootstrapLabel from "./BootstrapLabel";

export default {
  components: {
    BootstrapLabel
  },
  name: "BootstrapProgressBar",
  props: ["value", "label", "color"]
}
</script>

<style scoped>

</style>