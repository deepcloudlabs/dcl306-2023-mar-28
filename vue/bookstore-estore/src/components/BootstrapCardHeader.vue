<template>
  <div class="card-header">
    <h5 class="card-title">{{ header }}</h5>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BootstrapCardHeader",
  props: ["header"]

}
</script>

<style scoped>

</style>