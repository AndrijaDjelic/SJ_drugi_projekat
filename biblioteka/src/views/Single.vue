<template>
  <div>
    <Header :subtitle="subtitle"/>
    <SingleBook :data="data"/>
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
            subtitle:'Book',
            data:null
        }
    },

    methods:{
    ...mapActions(["findBook"]),
    },

    mounted(){
        this.findBook(this.$route.params.id).then(res =>{
          this.data = res;
          debugger;
        });
    }
}
</script>