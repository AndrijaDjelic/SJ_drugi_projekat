<template>
  <div>
    <Header :subtitle="subtitle"/>
  </div>
</template>

<script>

import Header from '@/components/Header.vue';
import SingleBook from '@/components/SingleBook.vue';
import { mapActions } from 'vuex';

export default {
    name: 'Single',
    
    components: {
        Header,
        SingleBook
    },
    data(){
        return{
            subtitle:'Book'
        }
    },
    methods:{
        ...mapActions([
        'getBook'
      ])
    }
}
</script>