<template>
<div class="movieListBox">
  <ul class="movieList">
    <li v-for="item in afterShowingList">
      <div class="movieImg">
        <img :src="'https://img.alicdn.com/bao/uploaded/'+item.poster" />
      </div>
      <div class="movieInfo"></div>
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
      afterShowingList:""
    }
  },
  beforeMount(){
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
    width:161px;
    height:224px;
    z-index: -1;
  }
  /*.movieInfo{*/
    /*width:161px;*/
    /*height:224px;*/
    /*z-index: 1;*/
  /*}*/
  .movieImg img{
    width: 100%;
    height:100%;
  }
  .openTime{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
  }
</style>
