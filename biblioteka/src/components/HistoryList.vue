<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="history.length"
      :per-page="perPage"
      aria-controls="history-table"
    ></b-pagination>
    <b-table
      id="history-table"
      hover
      fixed
      :items="history"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="history.length"
      :per-page="perPage"
      aria-controls="history-table"
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HistoryList",
  data() {
    return {
      fields: ["title", "author", "genre", "date"],
      currentPage: 1,
      perPage: 10,
    };
  },

  mounted() {
    this.fetchHistory(2);
  },

  computed: {
    ...mapState(["history"]),
  },
  methods: {
    ...mapActions(["fetchHistory"]),

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