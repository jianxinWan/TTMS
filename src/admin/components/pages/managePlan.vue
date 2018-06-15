<template>
  <div class="manage-plan-warp">
    <div class="plan-Manu">
      <span>添加演出计划</span>
    </div>
    <div class="film-show-warp" v-if="!addPlanFlag">
      <ul class="film-list">
        <div v-for="item in allPlayInfo" class="film-poster-warp" v-if="item.status!=2">
          <div>
            <ttms-poster  :film-info="item" option="4" @addPlan="getFilmCallback"></ttms-poster>
          </div>
        </div>
      </ul>
    </div>
    <div class="add-plan-warp" v-else>
      <div class="cont-info">
        <div class="cont-pic">
          <img :src="itemFilmInfo.poster" width="161px" height="224px"/>
        </div>
        <div class="cont-otherInfo-warp">
          <p>导演:{{itemFilmInfo.director}}</p>
          <p>主演:{{itemFilmInfo.starring}}</p>
          <p>类型:{{itemFilmInfo.plot}}</p>
          <p>制片国家/地区:{{itemFilmInfo.country}}</p>
          <p>语言:{{itemFilmInfo.language}}</p>
          <p>片长:{{itemFilmInfo.duration}}</p>
        </div>
      </div>
      <div class="buy-cont">
        <table cellspacing="0" cellpadding="0" border="0" class="performanceTable">
          <thead>
          <tr>
            <th>放映时间</th>
            <th>语言版本</th>
            <th>放映厅</th>
            <th>座位情况</th>
            <th>现价/影院价</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in scheduleList">
            <th>
              <h2>{{item.startTime.hours}}:{{item.startTime.minutes}}</h2>
              <p>预计{{item.endTime.hours}}:{{item.endTime.minutes}}离场</p>
            </th>
            <th>{{itemFilmInfo.language}}</th>
            <th>{{item.studio.name}}</th>
            <th>{{item.studio.status}}</th>
            <th>{{item.price}}</th>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div v-if="addFormFlag">
          <div style="display: flex;flex-direction: column;justify-content:center;width: 100%">
            <w-input label="date" v-model="addFromInfo.date"></w-input>
            <w-input label="price" v-model="addFromInfo.price"></w-input>
            <w-input label="studioName" v-model="addFromInfo.studioName"></w-input>
            <w-button type="success" @click="addPlanAjax">确定添加</w-button>
          </div>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: flex-start;width: 100%;margin-top: 20px">
          <w-button type="info" @click="showAddPlanFrom">
            <span v-if="addFormFlag">
              收起表单
            </span>
            <span v-if="!addFormFlag">
              添加信息
            </span>
          </w-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'manage-plan',
  data(){
    return {
      allPlayInfo:{},
      addPlanFlag:false,
      itemFilmInfo:{},
      scheduleList:{},
      addFormFlag:false,
      addFromInfo:{
        date:"",
        price:"",
        studioName:""
      }
    }
  },
  mounted:function(){
    this.getAllplayInfo();
  },
  methods:{
    getAllplayInfo:function () {
      $.ajax({
        type: "GET",
        dataType:"json",
        url: "http://119.27.174.87:8080/ttms2.0/playServlet?method=showAll",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function (res) {
          this.allPlayInfo = res;
        }.bind(this),
        error: function (err) {
          alert("通信错误");
        }
      });
    },
    getFilmCallback(info){
      this.addPlanFlag = true;
      this.itemFilmInfo = info;
      $.ajax({
        type: "GET",
        dataType:"json",
        url: "http://119.27.174.87:8080/ttms2.0/scheduleServlet?method=selectOnPid",
        data:{
          "pid":this.itemFilmInfo.pid
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function (res) {
          this.scheduleList=res;
        }.bind(this),
        error: function (err) {
          alert("通信错误");
        }
      });
    },
    addPlanAjax:function(){
      console.log(this.addFromInfo.startTime,this.addFromInfo.price,this.itemFilmInfo.pid,this.itemFilmInfo.duration,this.addFromInfo.studioName);
      $.ajax({
        type: "POST",
        url: "http://119.27.174.87:8080/ttms2.0/scheduleServlet",
        data: {
          "date" :this.addFromInfo.date,
          "price" :this.addFromInfo.price,
          "pid" : this.itemFilmInfo.pid,
          "studioName" : this.addFromInfo.studioName,
          "duration" :this.itemFilmInfo.duration,
          "method" : "addSchedule"
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success:function(data){
          alert(data);
        }
      });
    },
    showAddPlanFrom:function(){
      this.addFormFlag=!this.addFormFlag;
    }
  }
}
</script>
<style>
  .manage-plan-warp{
    width: 100%;
    height:100%;
    min-height:600px;
  }
  .plan-Manu{
    width: 100%;
    height:3rem;
    border-bottom: 1px solid #ccc;
  }
  .film-show-warp{
    width: 100%;
    height:auto;
  }
  .film-list{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .film-poster-warp {
    margin-top: 2rem;
    margin-left: 1rem;
  }
  .add-plan-warp{
    padding: 2rem;
  }
  .cont-info{
    margin-top: 10px;
    width: 100%;
    height:280px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    letter-spacing: 2px;
  }
  .cont-pic{
    width:161px;
    height:224px;
  }
  .cont-otherInfo-warp{
    width: 590px;
    height:auto;
    margin-left:5px;
    text-align: start;
    line-height: 1.5rem;
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
