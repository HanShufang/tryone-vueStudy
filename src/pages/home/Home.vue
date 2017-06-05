<template>
  <div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="home">
        <home-search></home-search>
        <div class="home__slider"><mt-swipe :auto="2000">
          <mt-swipe-item v-for="slideritem in sliderdata"><router-link :to="slideritem.url"><img class="home__slider--img" :src=" slideritem.img"/></router-link></mt-swipe-item>
        </mt-swipe></div>
        <home-list></home-list>

      </mt-tab-container-item>
      <mt-tab-container-item id="classify">
       mmmmmmmmmmmmmmmmmm
      </mt-tab-container-item>
    </mt-tab-container>
    <!--- 底部导航  -->
    <mt-tabbar v-model="selected" fixed :click="changeNav($el)">
      <mt-tab-item id="home">
        <img slot="icon" src="../../assets/images/homeBlue.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="classify">
        <img slot="icon" src="../../assets/images/classifyWhite.png">
        分类
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>
<script>
  import Vue from 'vue';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  import { Tabbar, TabItem } from 'mint-ui';
  import HomeSearch from './home_search';
  import { Swipe, SwipeItem } from 'mint-ui';
  import HomeList from './home_list';
  import axios from "axios"
  export default{
    name: '',
    data(){
      return {
        sliderdata:[],
        active:'home',
        selected:'home',
      }
    },
    mounted(){
      this.getSlider();
    },
    components:{
      HomeSearch,
      HomeList
    },
    methods: {
      changeNav:function(){
          this.active=this.selected;
          //此处为啥执行两遍呢？
      },
      getSlider: function () {
        axios.get('../mock/home/sliders.json').then((response) => {
          this.sliderdata=response.data.list;
        })
      }
    }
  }
</script>

<style scoped="">
  @import '../../assets/css/home.css';

</style>
