<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="books.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
    <b-table
      id="image-table"
      hover
      fixed
      :items="books"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="books.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "BookList",
  data() {
    return {
      fields: ["title", "author", "genre"],
      currentPage: 1,
      perPage: 10,
    };
  },

  mounted() {
    this.fetchBooks();
    this.fetchRentBooks();
  },

  computed: {
    ...mapState(["books"]),
  },
  methods: {
    ...mapActions(["fetchBooks","fetchRentBooks"]),

    rowClicked(record, index) {
      this.$router.push({ name: "Single", params: { id: record.id } });
    },
  },
};
</script>

<style scoped>
.pagination {
  justify-content: center;
}
</style>