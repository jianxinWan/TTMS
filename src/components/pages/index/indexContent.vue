<template>
  <div>
    <div class="index-content">
      <div class="index-banner">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in bannerInfoList">
              <img :src="item.imgSrc">
              <div v-show="showNextBtn">
                <div  class="swiper-button-prev"></div>
                <div  class="swiper-button-next"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="recommend-list">
        <div class="recommend-cont">
          <div class="recommend-header">
            <p class=" ">
              <span @click="nowShow">
                正在热映
              </span>
              <span style="padding-left:20px" @click="afterShow">
                即将上映
              </span>
            </p>
            <span>
            <a href="/#/film">查看全部&gt</a>
          </span>
          </div>
          <div class="movie-list">
            <div class="loading-area" v-if="!(nowShowFlag||afterShowFlag)" >
              <ttms-loading></ttms-loading>
            </div>
            <div v-for="item in showFilmList" v-if="(nowShowFlag||afterShowFlag)&&item.status!=2" class="animated fadeIn">
              <router-link tag="div" :to ="{name:'filmInfo',params :{id:item.pid}}">
                <ttms-poster :film-info="item"></ttms-poster>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ttms-footer></ttms-footer>
  </div>
</template>
<script>
  import axios from 'axios';
  import Swiper from 'swiper';
    export default {
      name: 'App',
      data(){
        return {
          bannerInfoList:[
            {
              id:1,
              imgSrc:"http://img3.ixingmei.com/upload/shop/editor/web-101-101-5.jpg?360",
              aboutInfo:''
        },
            {
              id:2,
              imgSrc:"http://img3.ixingmei.com/upload/shop/editor/web-101-101-1.jpg?820",
              aboutInfo:''
            },
            {
              id:3,
              imgSrc:"https://gw.alicdn.com/tfs/TB1ksnduamWBuNjy1XaXXXCbXXa-1600-460.png",
              aboutInfo:''
            }
          ],
          showNextBtn:false,
          nowShowFlag:false,
          afterShowFlag:false,
          showFilmList:[],
          nowShowList:[],
          afterShowList:[]
        }
      },
      methods: {
        swiper:function(){
          let mySwiper = new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动
            loop : true,
            pagination: {
              el: '.swiper-pagination'
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        },
        bannerFocus:function(){
          $(".swiper-container").mouseenter(function (e) {
            this.showNextBtn = true;
          });
          $(".swiper-container").mouseleave(function (e) {
            this.showNextBtn = false;
          })
        },
        getInfo:function(){
          console.log("1111");
          let vm  = this;
          this.$loading.start();
          axios.get("http://119.27.174.87:8080/ttms2.0/playServlet?method=showAllLimitOnCurrent")
            .then(res=> {
              vm.nowShowList = [];//清空
              vm.nowShowList = res.data;
              vm.showFilmList = vm.nowShowList;
              vm.nowShowFlag=true;
              this.$loading.end();
            })
            .catch(err => {
              console.log(err);
            });
          axios.get("http://119.27.174.87:8080/ttms2.0/playServlet?method=showAllLimitOnSoon")
            .then(res=> {
              vm.afterShowList = [];//清空
              vm.afterShowList = res.data;
              vm.afterShowFlag=true;
              this.$loading.end();
            })
            .catch(err => {
              this.$loading.error();
              console.log(err);
            });
        },
        nowShow:function(){
          if(this.nowShowFlag){
            this.showFilmList = [];
            this.showFilmList = this.nowShowList;
          }else{
            this.getInfo();
          }
        },
        afterShow:function(){
          if(this.afterShowFlag){
            this.showFilmList = [];
            this.showFilmList = this.afterShowList;
          }else{
            this.getInfo();
          }
        }
      },
      mounted(){
        this.swiper();
        this.bannerFocus();
        this.getInfo();
      }
    }
</script>
<style lang="less">
  @import "../../../assets/style/index-content.less";
</style>
