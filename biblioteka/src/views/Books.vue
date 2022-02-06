<template>
  <div id="app">
    <Header :subtitle="subtitle" />
    <BookList />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import BookList from "@/components/BookList.vue";
import { mapActions } from 'vuex';

export default {
  name: 'Books',

  components: {
    Header,
    BookList
  },

  data() {
        return {
            subtitle: 'Books'
        }
    }

}
</script>
<style scoped>

</style>