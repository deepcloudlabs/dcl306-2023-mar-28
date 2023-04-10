<template>
  <span :class="'badge '.concat(color)">{{ value }}</span>
</template>

<script>
export default {
  name: "BootstrapBadge",
  props: ["value", "color"]
}
</script>

<style scoped>

</style>