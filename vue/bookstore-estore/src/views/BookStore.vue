<template>
  <div class="container">
    <p></p>
    <BootstrapCard>
      <BootstrapCardHeader header="Bookstore"/>
      <BootstrapCardBody>
        <BootstrapTable>
          <BootstrapTableHeader
              :headers="['No','Cover','ISBN','Title','Author','Price','Page','Publisher','Operations']"></BootstrapTableHeader>
          <tbody>
          <tr v-for="(kitap,index) in books" :key="kitap.isbn">
            <td>{{ index + 1 }}</td>
            <td><img class="img-thumbnail" style="width: 32px" v-bind:src="kitap.cover"></td>
            <td>{{ kitap.isbn }}</td>
            <td>{{ kitap.title }}</td>
            <td>{{ kitap.author }}</td>
            <td>{{ kitap.price}}</td>
            <td>{{ kitap.pages }}</td>
            <td>{{ kitap.publisher }}</td>
            <td><button  @click="() => addItem(kitap)"
                         class="btn btn-warning">Add to basket</button></td>
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
  name: "BookStore",
  components: {BootstrapCardBody,BootstrapCard,BootstrapTable,BootstrapTableHeader,BootstrapCardHeader},
  mounted() {
      this.$store.dispatch("getBooks");
  },
  methods: {
      addItem(book){
          this.$store.commit('addItem', book);
      }
  },
  data: function(){
    return { }
  },computed: {
     books() {
       return this.$store.state.books;
     }
  }
}
</script>

<style scoped>

</style>