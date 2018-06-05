<template>
<div class="movieListBox">
  <ul class="movieList">
    <div v-for="item in movieList" class="film-poster-warp">
      <ttms-poster  :film-info="item" v-if="soonFlag"></ttms-poster>
    </div>
  </ul>
</div>
</template>
<script>
  import axios from 'axios';
export default {
  name: 'nowShowimg',
  data(){
    return {
      movieList:{},
      afterShowingList:"",
      showInfo:false,
      soonFlag:false,
    }
  },
  mounted(){
    this.getMovieInfo();
//    this.getAllMovie();
  },
  methods:{
    getMovieInfo:function(){
      let vm = this;
      axios.get("http://119.27.174.87:8080/ttms2.0/playServlet?method=showAllLimitOnSoon")
        .then(res=> {
          console.log(res.data);
          vm.movieList = res.data;
          this.soonFlag  = true;
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
//    getAllMovie:function(){
//      axios.get("http://119.27.174.87:8080/ttms2.0/playServlet?method=showAll")
//        .then(res=> {
//          console.log(res);
//        })
//        .catch(err => {
//          console.log(err);
//        });
//    },
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
</style>
