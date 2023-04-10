<template>
  <BootstrapCard>
    <BootstrapCardHeader header="Game Console"/>
    <BootstrapCardBody>
      <h5>You lose the game!</h5>
      <router-link class="btn btn-success" to="/">Play Again?</router-link>
    </BootstrapCardBody>
  </BootstrapCard>
</template>

<script>
import BootstrapCardBody from "@/components/BootstrapCardBody";
import BootstrapCardHeader from "@/components/BootstrapCardHeader";
import BootstrapCard from "@/components/BootstrapCard";

export default {
  name: "PlayerLoses",
  components: {BootstrapCardBody, BootstrapCardHeader, BootstrapCard}
}
</script>

<style scoped>

</style>