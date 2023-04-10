<template>
  <div tabindex="-1" v-if="visible" class="modal fade show" role="dialog" style="display:block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ dialogTitle }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{ dialogText }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="closeDialog" class="btn btn-primary">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BootstrapModalDialog",
  props: ["dialogText", "dialogTitle", "closeDialog", "visible"],
  data: function (){
    return {
      showDialog: false
    }
  }
}
</script>

<style scoped>

</style>