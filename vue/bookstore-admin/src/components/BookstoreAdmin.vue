<template>
    <div class="container">
      <p></p>
      <BootstrapCard>
        <BootstrapCardHeader header="Bookstore Admin Console"></BootstrapCardHeader>
        <BootstrapCardBody>
            <BootstrapInputText label="Isbn" :value="book.isbn" @change="book.isbn=$event.target.value" >
              <button class="btn btn-primary" @click="findBookByIsbn">Find Book</button>
            </BootstrapInputText>
            <BootstrapInputText label="Title" @change="book.title=$event.target.value" :value="book.title"></BootstrapInputText>
            <BootstrapInputText label="Author" :value="book.author" @change="book.author=$event.target.value" ></BootstrapInputText>
            <BootstrapInputText label="Price" :value="book.price" @change="book.price=$event.target.value" ></BootstrapInputText>
            <BootstrapInputText label="Year" :value="book.year" @change="book.year=$event.target.value"></BootstrapInputText>
            <BootstrapInputText label="Pages" :value="book.pages" @change="book.pages=$event.target.value"></BootstrapInputText>
            <BootstrapInputText label="Publisher" :value="book.publisher" @change="book.publisher=$event.target.value"></BootstrapInputText>
            <div class="input-group">
              <label for="cover" class="form-label">Cover:</label>
              <img id="cover" class="img-thumbnail" style="width: 128px" v-bind:src="book.cover">
              <label>
                <input type="file" style="display: none" v-on:change="selectFile"  class="form-control">
                <span class="btn btn-info" >File</span>
              </label>
            </div>
            <div class="input-group">
              <button class="btn btn-success" @click="createNewBook">Create Book</button>
              <button class="btn btn-warning"  @click="updateBook">Update Book</button>
              <button class="btn btn-danger" @click="cancelBook">Remove Book</button>
            </div>
        </BootstrapCardBody>
      </BootstrapCard>
      <p></p>
      <BootstrapCard>
        <BootstrapCardHeader header="Books in the Book Store">
          <button class="btn btn-success" @click="getAllBooks">Find All</button>
        </BootstrapCardHeader>
        <BootstrapCardBody v-if="books.length > 0">
          <BootstrapTable>
            <BootstrapTableHeader v-if="ifThereIsAnyPriceChange" :headers="['No','Cover','ISBN','Title','Author','Price','Page','Publisher','Operations']"></BootstrapTableHeader>
            <BootstrapTableHeader v-if="ifThereIsNoPriceChange" :headers="['No','Cover','ISBN','Title','Author','Price','Page','Publisher']"></BootstrapTableHeader>
            <tbody>
            <tr v-for="(kitap,index) in books"
                @click="() => copyTableRow(kitap)"
                :key="kitap.isbn">
              <td>{{index + 1}}</td>
              <td><img class="img-thumbnail" style="width: 32px" v-bind:src="kitap.cover"></td>
              <td>{{kitap.isbn}}</td>
              <td>{{kitap.title}}</td>
              <td>{{kitap.author}}</td>
              <td><BootstrapInputText label=""
                                      :value="kitap.price"
                                      @change="kitap.price=$event.target.value; kitap.isChanged= true;" ></BootstrapInputText></td>
              <td>{{kitap.pages}}</td>
              <td>{{kitap.publisher}}</td>
              <td v-if="ifThereIsAnyPriceChange">
                <button v-if="kitap.isChanged"
                        @click="() => updateBookAtRow(kitap)"
                        class="btn btn-warning">Update Book</button>
              </td>
            </tr>
          </tbody>
          </BootstrapTable>
        </BootstrapCardBody>
      </BootstrapCard>
    </div>
</template>

<script>
import BootstrapCard from "@/components/BootstrapCard";
import BootstrapCardHeader from "@/components/BootstrapCardHeader";
import BootstrapCardBody from "@/components/BootstrapCardBody";
import Book from "@/model/book";
import BootstrapInputText from "@/components/BootstrapInputText";
import BootstrapTable from "@/components/BootstrapTable";
import BootstrapTableHeader from "@/components/BootstrapTableHeader";
export default {
  name: 'BookstoreAdmin',
  components: {
    BootstrapTableHeader,
    BootstrapTable, BootstrapInputText, BootstrapCardBody, BootstrapCardHeader, BootstrapCard},
  props: {
    msg: String
  },
  computed:{
    ifThereIsAnyPriceChange(){
      return this.books.some( a_book => a_book.isChanged );
    },
    ifThereIsNoPriceChange(){
      return !this.ifThereIsAnyPriceChange;
    }
  },
  methods:{
    copyTableRow(selectedBook){
      this.book.load(selectedBook);
    },
    selectFile(event){
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.book.cover = event.target.result;
      }
    },
    createNewBook(){
      fetch("http://localhost:9001/books",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.book)
      }).then( res => res.json())
          .then(newBook => alert("Book is inserted: "+newBook.title));
    },
    updateBookAtRow(updatedBook){
      fetch("http://localhost:9001/books",{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(updatedBook)
      }).then( res => res.json())
          .then( () => updatedBook.isChanged=false );
    },
    updateBook(){
      fetch("http://localhost:9001/books",{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.book)
      }).then( res => res.json())
          .then(newBook => alert("Book is updated: "+newBook.title));
    },
    getAllBooks(){
      fetch("http://localhost:9001/books",{
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      }).then( res => res.json())
          .then( books => this.books=books );
    },
    cancelBook(){
      fetch(`http://localhost:9001/books/${this.book.isbn}`,{
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      }).then( res => res.json())
          .then( removedBook => this.book.load(removedBook));
    },
    findBookByIsbn(){
      fetch(`http://localhost:9001/books/${this.book.isbn}`,{
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      }).then( res => res.json())
          .then( foundBook => this.book.load(foundBook));
    },
  },
  data: function (){
    return {
      book: new Book(),
      books: []
    }
  }
}
</script>

<style scoped>

</style>
