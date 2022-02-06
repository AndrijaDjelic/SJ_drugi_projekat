<template>
  <div>

    <div class="book">
      <ul>
        <li>Title: {{ image.artistDisplayName }}</li>
        <li>Author: {{ image.isHighlight }}</li>
        <li>Genre: {{ image.accessionYear }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

  export default {
    name: 'SingleBook',
    
    props: {
      image: Object
    }
  }

</script>

<style scoped>

</style>