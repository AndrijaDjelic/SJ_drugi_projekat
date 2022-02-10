<template>
  <div>

    <div v-if="data">
      <div class = "book">
        <ul>
        <li>Title: {{ data.book.title }}</li>
        <li>Author: {{ data.book.author }}</li>
        <li>Genre: {{ data.book.genre }}</li>
        <li>Available: {{ data.available }}</li>

        <b-button @click="rentABook($event)" v-if="data.available==true" variant="outline-primary" >Reserve/Rent</b-button>
        <b-button v-else disabled size="lg">Reserve/Rent</b-button>
        <b-alert v-model="visible" variant="success" dismissible >{{this.notifmsg}}</b-alert>
      </ul>
    </div>
      
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

  export default {
    name: 'SingleBook',
    
    data(){
        return{
          notifmsg:'',
          visible: false
        };
    },

    props: {
      data: Object
    },

     computed: {
      ...mapState([
        'token'
      ])
    },

    methods:{
      rentABook(e){
        e.preventDefault();
        this.$socket.emit('rent', {body: this.data.book, token: this.token});
        // debugger;
      }
    },

    sockets: {
      notification(notif){
        // alert(notif);
        this.visible = true;
        this.notifmsg = notif;
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