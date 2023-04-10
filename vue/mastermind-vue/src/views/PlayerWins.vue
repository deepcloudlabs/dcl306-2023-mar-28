<template>
  <BootstrapCard>
    <BootstrapCardHeader header="Game Console"/>
    <BootstrapCardBody>
        <h5>You win the game!</h5>
        <router-link class="btn btn-success" to="/">Play Again?</router-link>
    </BootstrapCardBody>
  </BootstrapCard>
</template>

<script>
import BootstrapCard from "@/components/BootstrapCard";
import BootstrapCardHeader from "@/components/BootstrapCardHeader";
import BootstrapCardBody from "@/components/BootstrapCardBody";
export default {
  name: "PlayerWins",
  components: {BootstrapCardBody, BootstrapCardHeader, BootstrapCard}
}
</script>

<style scoped>

</style>