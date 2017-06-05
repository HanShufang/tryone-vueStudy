<template>
  <div>
    <mt-header :title="listTitle">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <div class="detail__slider">
      <mt-swipe :auto="2000">
        <mt-swipe-item>
          <img class="detail__slider--img" :src="imgSrc"/>
        </mt-swipe-item>
        <mt-swipe-item v-for="slider in sliderData">
          <img class="detail__slider--img" :src="slider.img"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 商品信息 -->
    <div class="detail__info">
      <p class="detail__info--title">{{listTitle}}</p>
      <div class="detail__info--price">
        <span class="detail__info--oldprice">{{ oldPrice }}</span><span class="detail__info--newprice">{{ newPrice
        }}</span></div>
      <div>
        <mt-button @click.native="popupVisible3 = true" size="small">规格</mt-button>
        <mt-badge v-show="chooseSize !=-1" type="success" size="small">{{listSize[chooseSize]}}</mt-badge>
        <mt-badge v-show="chooseColor !=-1" type="success" size="small">{{listColor[chooseColor]}}</mt-badge>

        <p class="detail__info-num">已选择数量 <span>{{ detailNumber }}</span>件</p>
      </div>
    </div>

    <!--选择尺寸和颜色-->
    <mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
      <div class="detail__size">
        <h2 class="detail__size--title">尺码</h2>
        <ul>
          <!-- 此处注意：数据驱动视图
          ---获取到当前选中的index,将选中的index与class绑定起来
          -->
          <li v-for="(sizeitem,index) in listSize" :class="{active:index == chooseSize}" v-on:click="saveSize(index)">
            {{ sizeitem }}
          </li>
        </ul>
      </div>
      <div class="detail__size">
        <h2 class="detail__size--title">颜色</h2>
        <ul>
          <li v-for="(coloritem,index) in listColor" :class="{active:index == chooseColor}"
              v-on:click="saveColor(index)">
            {{ coloritem }}
          </li>
        </ul>
      </div>
      <div class="detail__size">
        <h2 class="detail__size--title">数量</h2>
        <div class="detail__number">
          <mt-button size="small" @click="subNumber" v-bind:disabled="detailNumber<1">-</mt-button>
          <input maxlength="2" readonly type="number" v-model="detailNumber"/>
          <mt-button size="small" @click="addNumber" v-bind:disabled="detailNumber>9">+</mt-button>
        </div>
      </div>
      <mt-button @click.native="savSpec" class="detail__info--current" size="large" type="primary">确定</mt-button>
    </mt-popup>


  </div>
</template>
<script>
  import axios from "axios"
  import {Header} from 'mint-ui';
  import detailInfo from "./detailInfo"
  import {Popup} from 'mint-ui';
  import {Toast} from 'mint-ui';
  export default{
    name: 'detail',
    data(){
      return {
        sliderData: [],
        listData: [],
        imgSrc: '',
        listTitle: '',
        newPrice: '',
        oldPrice: '',
        listSize: [],
        listColor: [],
        detailNumber: 0,
        popupVisible3: false,
        chooseSize: -1,
        chooseColor: -1
      }
    },
    components: {
      detailInfo
    },
    created(){
      let listId = this.$route.params.listid;
      this.getData(listId);
      this.getsliderData();
      console.log(listId);
    },
    watch: {
      '$route': 'getData',
      detailNumber:function(val){
          if(val<0){
              val=0;
          }
          if(val>9){
              val=10;
              alert('最多购买10件');
          }
      }
    },
    methods: {
      getData: function (listid) {
        listid = listid ? listid : localStorage.getItem('detailId');  //防止当前页面刷新数据不见了
        axios.get('/mock/products/products.json').then((response) => {
          this.listData = response.data.list;
          for (var i = 0; i < this.listData.length; i++) {
            if (this.listData[i].id == listid) {
              this.imgSrc = this.listData[i].src;
              this.listTitle = this.listData[i].title;
              this.newPrice = this.listData[i].newPrice;
              this.oldPrice = this.listData[i].oldPrice;
              this.listSize = this.listData[i].size;
              this.listColor = this.listData[i].color;
            }
          }
          console.log(listid);
        });
      },
      getsliderData: function () {
        axios.get('/mock/detail/detail_slider.json').then((response) => {
          this.sliderData = response.data.list.slice(0, 4);
        });
      },
      saveSize: function (e) {
        this.chooseSize = e;
      },
      saveColor: function (e) {
        this.chooseColor = e;
      },
      savSpec: function () {
        this.popupVisible3 = false; //关闭面板

      },
      subNumber: function () {
          this.detailNumber -= 1;
      },
      addNumber: function () {
          this.detailNumber += 1;
      }



    }
  }
</script>

<style scoped="">
  .detail__slider {
    height: 200px;
    width: 100%;
  }

  .detail__slider--img {
    width: 100%;
  }

  .detail__info {
    padding: 10px 4%;
    border-bottom: 1px solid #cdcdcd;
    font-size: 14px;
    color: #333;
    text-align: left;
  }

  .detail__info--title {
    font-size: 16px;
  }

  .detail__info--price {
    line-height: 30px;
    text-align: right;
  }

  .detail__info--newprice {
    font-size: 20px;
    color: #EF4F4F;
    font-weight: 300;
  }

  .detail__info--oldprice {
    color: #999;
    text-decoration: line-through;
    padding-left: 5px;
  }

  .detail__size {
    text-align: left;
    padding: 20px 4%;
  }

  .detail__size--title {
    font-size: 14px;
  }

  .detail__size ul {
    margin-top: 20px;
    list-style: none;
    display: flex;
    align-content: center;
    flex-flow: row wrap;
  }

  .detail__size li {
    width: 30%;
    text-align: center;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    line-height: 30px;
    margin-bottom: 10px;
    color: #999;
    margin-right: 8px;
  }

  .detail__size li.active {
    border-color: #26A2FF;
    color: #26A2FF;
  }

  .detail__info-num {
    float: right;
    line-height: 33px;
    font-size: 14px;
    color: #999;
  }

  .detail__info-num span {
    font-size: 16px;
    color: #333;
    padding: 0 5px;
  }

  /*这是插件面板的样式*/
  .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .detail__number {
    padding: 15px 0;
  }

  .detail__number input {
    display: inline-block;
    font-size: 14px;
    padding: 0 12px;
    height: 31px;
    border: 1px solid #eee;
    background-color: #f6f8fa;
    box-shadow: 0 0 1px #b8bbbf;
    text-align: center;
    border-radius: 4px;
    width: 100px;
    margin: 0 10px;
  }

  .detail__info--current {
    width: 90%;
    margin: 0 5%;
  }


</style>
