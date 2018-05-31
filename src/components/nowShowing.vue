<template>
<div class="movieListBox">
  <ul class="movieList">
    <li v-for="item in afterShowingList" @mouseenter="showMovieInfo" @mouseleave="closeMovieInfo">
      <div class="movieImg">
        <img :src="'https://img.alicdn.com/bao/uploaded/'+item.poster" />
      </div>
      <div class="movieInfo">
        <p>导演:{{item.director}}</p>
        <p>主演:{{item.leadingRole}}</p>
        <p>类型:{{item.type}}</p>
        <p>地区:{{item.country}}</p>
        <p>语言:{{item.language}}</p>
        <p>片长:{{item.duration}}</p>
      </div>
      <p class="movie-name"><span>{{item.showName}}</span></p>
      <p class="openTime"><span>上映时间:{{item.openTime}}</span></p>
    </li>
  </ul>
</div>
</template>
<script>
  import axios from 'axios';
export default {
  name: 'nowShowimg',
  data(){
    return {
      movieList:"",
      afterShowingList:"",
      showInfo:false
    }
  },
  mounted(){
    this.getMovieInfo();
  },
  methods:{
    getMovieInfo:function(){
      let vm = this;
      axios.get("movies/showAction.json?_ksTS=1527663095698_79&jsoncallback=jsonp80&action=showAction&n_s=new&event_submit_doGetSoon=true")
        .then(res=> {
          let str1 =res.data.slice(10);
          let str2 = str1.slice(0,length-2);
          let movieListInfo = JSON.parse(str2);
          vm.afterShowingList = movieListInfo.returnValue.slice(0,5);
          console.log(vm.afterShowingList);
          vm.movieList =movieListInfo;
        })
        .catch(err => {
          console.log(err);
        });
//      $.ajax({
//        url:'https://dianying.taobao.com/showAction.json?_ksTS=1527677777377_79&jsoncallback=jsonp80&action=showAction&n_s=new&event_submit_doGetSoon=true',
//        type : 'get',
//        dataType : 'jsonp',
//        success : function(res){
//          console.log(res);
//        },
//        error : function(){
//          alert("请求出错！");
//        }
//      })
    },
    showMovieInfo:function(e){
      let movieDom = e.currentTarget.getElementsByClassName('movieInfo')[0];
      movieDom.style.visibility="visible";
      movieDom.classList.add("fadeIn");
    },
    closeMovieInfo:function(e){
      let movieDom = e.currentTarget.getElementsByClassName('movieInfo')[0];
      movieDom.style.visibility="hidden";
      movieDom.classList.add("fadeOut");
    }
  }
}
</script>

<style>
  .movieListBox{
    width: 100%;
    margin-top: 10px;
  }
  .movieList{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .movieList li{
    list-style: none;
    width:161px;
    height:273px;
    border: 1px solid #ccc;
  }
  .movieList li:hover{
    cursor: pointer;
  }
  .movieImg{
    position: absolute;
    z-index: 1;
    width:161px;
    height:224px;
  }
  .movieInfo {
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
  .movieInfo p{
    width:130px;
    height:1.5rem;
    overflow: hidden;
    line-height: 1.5rem;
    margin-top: 0.25rem;
    letter-spacing: 2px;
  }
  .movieImg img{
    width: 100%;
    height:100%;
  }
  .movie-name{
    position: absolute;
    display: block;
    bottom: 14px;
    width:141px;
    padding: 0 10px;
    height:1.5rem;
    line-height: 1.5rem;
    text-align: start;
    overflow: hidden;
    color:white;
    z-index: 11;
    background: linear-gradient(rgba(128,128,128,0.6),rgba(100,100,100,0.5), rgba(0,0,0,0.8));
  }
  .openTime{
    margin-top:240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
  }
</style>
