<template>
  <h6>{{ label }} <span :class="'badge '.concat(color)">{{ value }}</span></h6>
</template>

<script>
export default {
  name: "BootstrapBadge",
  props: ["value", "color", "label"]
}
</script>

<style scoped>

</style>