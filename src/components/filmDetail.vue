<template>
  <div>
    <div class="detail-warp">
      <div class="bgArea" :style="bgStyle">
      </div>
      <div class="all-info-warp">
        <div v-if="!detailFlag" class="loading-warp">
          <ttms-loading></ttms-loading>
        </div>
        <div v-else class="detail-film-info animated fadeIn">
          <div class="detail-center-warp">
            <div class="cont-tit">
              <h2>{{detailInfo.showName}}</h2>
              <h2 v-if="detailInfo.status==1" style="margin-left: 30px">{{detailInfo.score}}</h2>
              <h3 v-if="detailInfo.status==0" style="margin-left: 30px">即将上映</h3>
            </div>
            <hr/>
            <div class="cont-info">
              <div class="cont-pic">
                <img :src="detailInfo.poster">
              </div>
              <div class="cont-otherInfo-warp">
                <p>导演:{{detailInfo.director}}</p>
                <p>主演:{{detailInfo.starring}}</p>
                <p>类型:{{detailInfo.plot}}</p>
                <p>制片国家/地区:{{detailInfo.country}}</p>
                <p>语言:{{detailInfo.language}}</p>
                <p>片长:{{detailInfo.duration}}</p>
                <p>剧情介绍:{{detailInfo.introduction}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buyTicket-warp">

    </div>
    <ttms-footer></ttms-footer>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from 'axios';
    export default {
      name: 'App',
      data(){
        return {
          filmId:this.$route.params.id,
          detailFlag:false,
          detailInfo:{},
          bgStyle:{
            backgroundImage: ""
          }
        }
      },
      computed:{
      },
      mounted:function(){
        this.getFilmInfoById();
      },
      methods:{
        getFilmInfoById:function(){
          axios.get("http://119.27.174.87:8080/ttms2.0/playServlet?method=showAll")
            .then(res=> {
              let allFilmInfo = res.data;
              console.log(res.data);
              allFilmInfo.forEach(function(item){
                if(item.pid == this.filmId){
                  this.detailInfo = item;
                  this.detailFlag=true;
                  Vue.set(this.bgStyle,'backgroundImage',"url("+item.poster+")");
                }
              }.bind(this));
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
</script>

<style scoped>
  .detail-warp{
    width:100%;
    height:400px;
    border: 1px solid;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
  }
  .bgArea{
    position: relative;
    width: 100%;
    height:400px;
    background-size:90%;
    filter:blur(30px);
  }
  .all-info-warp{
    position: absolute;
    width:100%;
    height:400px;
    background-color: rgba(128,128,128,0.5);
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .all-info-warp hr{
    border: 0.01rem solid white;
  }
  .loading-warp{
    width: 100%;
    height:400px;
  }
  .detail-center-warp{
    width:1100px;
    height:380px;
    margin: 10px 0;
    color: white;
  }
  .cont-tit{
    width: 100%;
    height:50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .cont-info{
    margin-top: 10px;
    width: 100%;
    height:320px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    letter-spacing: 2px;
  }
  .cont-pic{
    width:210px;
    height:280px;
  }
  .cont-pic img{
    width: 100%;
    height:100%;
  }
  .cont-otherInfo-warp{
    width: 590px;
    height:auto;
    margin-left: 10px;
    text-align: start;
    line-height: 1.5rem;
  }

  .buyTicket-warp{
    width: 100%;
    height:400px;
  }
</style>
