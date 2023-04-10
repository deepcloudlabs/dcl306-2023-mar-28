<template>
  <div class="container">
    <p></p>
    <BootstrapCard>
      <BootstrapCardHeader header="Basket is empty"  v-if="items.length === 0"/>
      <BootstrapCardHeader header="Basket"  v-if="items.length > 0"/>
      <BootstrapCardBody  v-if="items.length > 0">
        <BootstrapTable>
          <BootstrapTableHeader
              :headers="['No','Cover','ISBN','Title','Author','Price','Quantity','Total','Operations']"></BootstrapTableHeader>
          <tbody>
          <tr v-for="(item,index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td><img class="img-thumbnail" style="width: 32px" v-bind:src="item.book.cover"></td>
            <td>{{ item.book.isbn }}</td>
            <td>{{ item.book.title }}</td>
            <td>{{ item.book.author }}</td>
            <td>{{ item.book.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button class="btn btn-warning" @click="() => removeItem(item)">Remove</button>
            </td>
          </tr>
          <tr>
            <td colspan="6"></td>
            <td>{{ totalQuantity }}</td>
            <td>{{ totalPrice }}</td>
            <td>
              <button @click="purchase"
                      class="btn btn-info">Purchase</button>
            </td>
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
  name: "BookBasket",
  components: {BootstrapCardBody, BootstrapCard, BootstrapTable, BootstrapTableHeader, BootstrapCardHeader},
  methods: {
    removeItem(item){
       this.$store.commit('removeItem', item);
    },
    purchase(){
        this.$store.dispatch('purchase');
    }
  },
  computed: {
    items() {
      return this.$store.state.basket.items;
    },
    totalQuantity() {
      return this.$store.state.basket.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice() {
      return this.$store.state.basket.items.reduce((sum, item) => sum + item.price, 0);
    }
  }
}
</script>

<style scoped>

</style>