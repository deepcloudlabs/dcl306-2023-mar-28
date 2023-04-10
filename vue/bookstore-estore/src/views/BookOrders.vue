<template>
  <div class="container">
    <p></p>
    <BootstrapCard>
      <BootstrapCardHeader header="Purchases is empty" v-if="purchases.length === 0"/>
      <BootstrapCardHeader header="Purchases" v-if="purchases.length > 0"/>
      <BootstrapCardBody v-if="purchases.length > 0">
        <BootstrapTable>
          <BootstrapTableHeader
              :headers="['No','Quantity','Total Price']"></BootstrapTableHeader>
          <tbody>
          <tr v-for="(purchase,index) in purchases"
              @click="() => purchaseDetails(purchase)"
              :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ purchase.reduce((sum, item) => sum + item.quantity, 0) }}</td>
            <td>{{ purchase.reduce((sum, item) => sum + item.price, 0) }}</td>
          </tr>
          </tbody>
        </BootstrapTable>
        <p></p>
        <BootstrapTable v-if="details.length > 0">
          <BootstrapTableHeader
              :headers="['No','Cover','ISBN','Title','Author','Price','Quantity','Sub total']"></BootstrapTableHeader>
          <tbody>
          <tr v-for="(item,index) in details"
              :key="index">
            <td>{{ index + 1 }}</td>
            <td><img  @click="zoomImage"
                      class="img-thumbnail" style="width: 32px" v-bind:src="item.book.cover"></td>
            <td>{{ item.book.isbn }}</td>
            <td>{{ item.book.title }}</td>
            <td>{{ item.book.author }}</td>
            <td>{{ item.book.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
          </tr>
          </tbody>
        </BootstrapTable>
      </BootstrapCardBody>
    </BootstrapCard>
  </div>
</template>

<script>
import BootstrapCardBody from "@/components/BootstrapCardBody";
import BootstrapCard from "@/components/BootstrapCardBody";
import BootstrapTable from "@/components/BootstrapTable";
import BootstrapTableHeader from "@/components/BootstrapTableHeader";
import BootstrapCardHeader from "@/components/BootstrapCardHeader";

export default {
  name: "BookOrders",
  data: function (){
    return {
      details: []
    }
  },
  components: {BootstrapCardBody, BootstrapCard, BootstrapTable, BootstrapTableHeader, BootstrapCardHeader},
  computed: {
    purchases() {
      return this.$store.state.purchase.purchases;
    }
  }, methods: {
    purchaseDetails(purchase){
      this.details = [...purchase];
    },
    zoomImage(event){
      let element = event.target;
      if (document.fullscreenElement == element){
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    }
  }
}
</script>

<style scoped>

</style>