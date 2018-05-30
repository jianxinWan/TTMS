<template>
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
          <p>
            <span>
              <router-link to="/index/nowShowing" tag="span">正在热映</router-link>
            </span>
            <span style="padding-left:20px">
              <router-link to="/index/afterShowing" tag="span">即将上映</router-link>
            </span>
          </p>
          <span>
            <a href="#">查看全部&gt</a>
          </span>
        </div>
        <div class="movie-list">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
            }
//            {
//              id:3,
//              imgSrc:"http://p1.meituan.net/mmc/05200dedfe05e78164106a038517a5f3179251.jpg",
//              aboutInfo:''
//            }
          ],
          showNextBtn:false,

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
        }
      },
      mounted(){
        this.swiper();
        this.bannerFocus();
      }
    }
</script>
<style lang="less">
  @import "../assets/style/index-content.css";
</style>
