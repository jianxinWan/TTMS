<template>
  <div>
    <li @mouseenter="showMovieInfo" @mouseleave="closeMovieInfo" class="poster-warp">
      <div class="movieImg">
        <img :src="filmInfo.poster" width="100%" height="100%" />
      </div>
      <div class="movieInfo animated">
        <p>导演:{{filmInfo.director}}</p>
        <p>主演:{{filmInfo.starring}}</p>
        <p>类型:{{filmInfo.plot}}</p>
        <p>地区:{{filmInfo.country}}</p>
        <p>语言:{{filmInfo.language}}</p>
        <p>片长:{{filmInfo.duration}}</p>
      </div>
      <div class="movie-name">
        <div class="blurArea"></div>
        <div class="film-name-warp">{{filmInfo.showName}}</div>
      </div>
      <div class="openTime">
        <span class="nowShow-warp" v-if="filmInfo.status==1||filmInfo.status==3">
          <p v-if="option=='0'" style="text-align: center" @click="offLineClick">下线</p>
          <p v-if="option=='1'" style="text-align: center">购票</p>
          <p v-if="option=='4'" style="text-align: center" @click="addPlanClick">添加演出</p>
        </span>
        <div class="afterShow-warp" v-if="filmInfo.status==0">
          <p v-if="option=='0'" style="text-align: center" class="off-line" @click="offLineClick">下线</p>
          <p v-if="option=='4'" style="text-align: center;font-size: 18px;color:black;" @click="addPlanClick">添加演出</p>
          <p v-else>上映时间:</p>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
  export default {
    name:'ttms-poster',
    props: {
      filmInfo:{},
      option:{
        type:String,
        default:"1"
      }
    },
    data(){
      return {
      }
    },
    mounted:function(){
    },
    methods:{
      showMovieInfo:function(e){
        let movieDom = e.currentTarget.getElementsByClassName('movieInfo')[0];
        movieDom.classList.remove("fadeOut");
        movieDom.style.visibility="visible";
        movieDom.classList.add("fadeIn");
      },
      closeMovieInfo:function(e){
        let movieDom = e.currentTarget.getElementsByClassName('movieInfo')[0];
        movieDom.classList.remove("fadeIn");
        movieDom.style.visibility="hidden";
        movieDom.classList.add("fadeOut");
      },
      offLineClick:function(){
        this.$emit('offline',this.filmInfo);
      },
      addPlanClick:function(){
        this.$emit('addPlan',this.filmInfo);
      }
    }
  }
</script>
<style>
  /*.poster{*/
    /*position: absolute;*/
  /*}*/
  .poster-warp{
    list-style: none;
    width:161px;
    height:273px;
    border: 1px solid #ccc;
  }
  .poster-warp:hover{
    cursor: pointer;
  }
  .poster-warp .movieImg{
    position: absolute;
    z-index: 1;
    width:161px;
    height:224px;
  }
  .poster-warp .movieInfo {
    position: absolute;
    visibility: hidden;
    width: 141px;
    height: 214px;
    z-index: 11;
    padding-top:10px;
    padding-left: 20px;
    font-size: 0.8rem;
    color: whitesmoke;
    text-align: start;
    background-color: rgba(0,0,0,0.57);
  }
  .poster-warp .movieInfo p{
    width:130px;
    height:1.5rem;
    overflow: hidden;
    line-height: 1.5rem;
    margin-top: 0.25rem;
    letter-spacing: 2px;
  }
  .poster-warp .movieImg img{
    width: 100%;
    height:100%;
  }
  .poster-warp .movie-name{
    position: relative;
    width:161px;
    height:3rem;
    margin-top: 176px;
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border: none;
    border-bottom: 1px solid #ccc;
  }
  .poster-warp .blurArea{
    position: relative;
    filter: blur(17px);
    width: 100%;
    height:100%;
    background: linear-gradient(rgba(255,255,255,0.8),rgba(0,0,0,0.8));
  }
  .poster-warp .film-name-warp{
    position: absolute;
    display: inline-block;
    /*padding: 0.1rem 0.5rem;*/
    color:white;
    z-index: 12;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: start;
    overflow: hidden;
    width:130px;
    padding:0 15px;
  }
  .poster-warp .nowShow-warp{
    width: 100%;
    display: inline-block;
    line-height:50px;
    letter-spacing: 3px;
    font-size: 1.1rem;
  }
  .poster-warp .nowShow-warp:hover{
    background-color:rgba(80,191,255,1);
    color: white;
  }
  .poster-warp .afterShow-warp{
    display: inline-block;
    width: 100%;
    line-height:50px;
    font-size: 0.8rem;
    color: #ccc;
  }
  .poster-warp  .off-line{
    font-size: 1rem;
    color: #2b2b2b;
  }
</style>
