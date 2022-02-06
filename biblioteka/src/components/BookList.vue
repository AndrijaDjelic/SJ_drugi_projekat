<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows=20
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
    <b-table
      id="image-table"
      hover
      fixed
      :items="items"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows=20
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: 'BookList',
  data() {
      return {
        fields: ['title', 'author', 'genre'],
        items: [],
        currentPage: 1,
        perPage: 10
      }
    },
    computed: {
      ...mapState([
        'books'
      ])
    },

     mounted() {
      this.books.slice(this.currentPage * this.perPage, (this.currentPage + 1) * this.perPage).map( id => {
        this.getItem(id).then( obj => this.items.push(obj) );
      });
    },

    rowClicked(record, index) {
        this.$router.push({ name: 'Single', params: { id: record.objectID } });
      }

    
};
</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
</style>