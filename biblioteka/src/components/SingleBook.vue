<template>
  <div>

    <div v-if="data">
      <div class = "book">
        <ul>
        <li>Title: {{ data.book.title }}</li>
        <li>Author: {{ data.book.author }}</li>
        <li>Genre: {{ data.book.genre }}</li>
        <li>Available: {{ data.available }}</li>
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
    }
  }

</script>

<style scoped>
.book{
  left: -10px;
  width: 300px;
  height: 120px;
}
</style>