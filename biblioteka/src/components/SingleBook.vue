<template>
  <div>

    <div v-if="data">
      <div class = "book">
        <ul>
        <li>Title: {{ data.book.title }}</li>
        <li>Author: {{ data.book.author }}</li>
        <li>Genre: {{ data.book.genre }}</li>
        <li>Available: {{ data.available }}</li>

        <b-button v-if="data.available==true" variant="outline-primary" @click="rentABook()">Reserve/Rent</b-button>
        <b-button v-else disabled size="lg">Reserve/Rent</b-button>
      </ul>
    </div>
      
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

  export default {
    name: 'SingleBook',
    
    props: {
      data: Object
    },

    methods:{
      rentABook(){
        this.$socket.emit('rent', data.book);
      }
    }
  }
  

</script>

<style scoped>
.book{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  justify-content: center;
}
</style>