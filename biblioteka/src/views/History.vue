<template>
  <div id="app">
    <Header :subtitle="subtitle" />
    <HistoryList />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HistoryList from "@/components/HistoryList.vue";
import { mapActions } from 'vuex';

export default {
  name: 'Books',

  components: {
    Header,
    HistoryList
  },

  data() {
        return {
            subtitle: 'History'
        }
    }

}
</script>
<style scoped>

</style>