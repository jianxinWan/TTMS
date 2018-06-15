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
      <div class="buyTicket-center-warp">
        <div class="buy-tit">
          <h2>选座购票</h2>
        </div>
        <hr/>
        <div class="buy-cont">
          <table cellspacing="0" cellpadding="0" border="0" class="performanceTable">
            <thead>
              <tr>
                <th>放映时间</th>
                <th>语言版本</th>
                <th>放映厅</th>
                <th>座位情况</th>
                <th>现价/影院价</th>
                <th>选座购票</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in performancePlan.scheduleList">
                <th>
                  <h2>{{item.startTime.hours}}:{{item.startTime.minutes}}</h2>
                  <p>预计{{item.endTime.hours}}:{{item.endTime.minutes}}离场</p>
                </th>
                <th>{{performancePlan.language}}</th>
                <th>{{item.studio.name}}</th>
                <th>{{item.studio.status}}</th>
                <th>{{item.price}}</th>
                <th>
                  <router-link tag="div" :to ="{name:'buyTickets',params:{pid:performancePlan.pid,sid:item.sid}}">
                    <w-button type="info">选座购票</w-button>
                  </router-link>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
          },
          performancePlan:{}
        }
      },
      computed:{
      },
      mounted:function(){
        this.getFilmInfoById();
        this.getPerformancePlan();
      },
      methods:{
        getFilmInfoById:function(){
          axios.get("http://119.27.174.87:8080/ttms2.0/playServlet?method=showAll")
            .then(res=> {
              let allFilmInfo = res.data;
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
        },
        getPerformancePlan:function(){
          $.ajax({
            type: "GET",
            dataType:"json",
            url: "http://119.27.174.87:8080/ttms2.0/playServlet",
            data: {
              "method": "selectOne",
              "id":this.$route.params.id
            },
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
              this.performancePlan = res;
            }.bind(this),
            error: function (err) {
              alert("通信错误");
            }
          });
        }
      }
    }
</script>

<style scoped>
  .detail-warp{
    width:100%;
    height:400px;
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
    height:auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }
  .buyTicket-center-warp{
    width:1100px;
    height:auto;
    padding: 10px 0;
  }
  .buy-tit{
    width: 100%;
    height:2.5rem;
    display: flex;
    color:rgba(80,80,80,1);
    flex-direction: row;
    letter-spacing: 4px;
    justify-content: flex-start;
  }
  .buy-cont{
    width: 100%;
    height: auto;
    margin: 15px 0;
  }
  .performanceTable{
    width: 100%;
    height: auto;
    color: #797979;
  }
  .performanceTable thead tr{
    width: 100%;
    height:2.5rem;
    background-color:#F6F6F6;
    font-size: 1.05rem;
    letter-spacing: 1px;
  }
  .performanceTable tbody tr{
    width: 100%;
    height:3.75rem;
  }
  .performanceTable tbody tr:nth-child(even){
    background-color: #F6F6F6;
  }
</style>
