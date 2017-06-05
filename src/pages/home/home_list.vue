<template>
  <ul class="list">
    <!--<router-link :to="{ name: 'detail', params: { userId: 123 }}">dddd</router-link>-->
    <li v-for="list in listData" :listid="list.id" v-on:click="toDetail(list.id)">
      <div class="list__img"><img :src="list.src"/></div>
      <p class="list__title">{{list.title}}</p>
      <div class="list__price">
        <span class="list__price--now">{{ list.newPrice }}</span>
        <del class="list__price--old">{{ list.oldPrice }}</del>
      </div>
    </li>
  </ul>
</template>
<script>
  import axios from "axios"
  export default{
    name: '',
    data(){
      return {
        listData: []
      }
    },
    mounted(){
      this.getList();
    },
    methods: {
      getList: function () {
        axios.get('/mock/products/products.json').then((response) => {
          this.listData = response.data.list;
          //console.log(this.listData);
        });
      },
      toDetail:function(id){
        this.$router.push({name: 'detail', params: { listid: id }});  //此处需要留意vue-router的编程式导航
        localStorage.setItem('detailId',id);
      }
    }
  }
</script>

<style scoped="">


</style>
