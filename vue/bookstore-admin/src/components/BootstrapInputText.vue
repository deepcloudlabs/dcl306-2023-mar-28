<template>
  <div class="mb-3">
    <label class="form-label card-text mb-2" v-if="label.length > 0" :for="label">{{label}}</label>
    <input type="text" :id="label" :value="value" class="form-control mb-2" >
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: "BootstrapInputText",
  props: ["label", "value"]
}
</script>

<style scoped>

</style>