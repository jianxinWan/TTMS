<template>
  <div class="add-Play-warp">
    <div class="add-form-warp">
      <div class="top-info">
        <img :src="playInfoObj.poster" width="161px" height="224px" v-if="option==1" />
        <img :src="addFromInfo.poster" width="161px" height="224px" v-if="option==0" />
        <div style="margin-left:20px">
          <w-input v-if="option==1" label="posterLink" v-model="playInfoObj.poster"></w-input>
          <w-input v-if="option==0" label="posterLink" v-model="addFromInfo.poster"></w-input>
        </div>
      </div>
      <div class="add-form" v-if="option ==1 ">
        <w-input label="showNmae" v-model="playInfoObj.showName">
        </w-input>
        <w-input label="score" v-model="playInfoObj.score">
        </w-input>
        <w-input label="director" v-model="playInfoObj.director">
        </w-input>
        <w-input label="starring" v-model="playInfoObj.starring">
        </w-input>
        <w-input label="plot" v-model="playInfoObj.plot">
        </w-input>
        <w-input label="country" v-model="playInfoObj.country">
        </w-input>
        <w-input label="language" v-model="playInfoObj.language">
        </w-input>
        <w-input label="duration" v-model="playInfoObj.duration">
        </w-input>
        <w-input label="introduction" v-model="playInfoObj.introduction">
        </w-input>
        <w-input label="status" v-model="playInfoObj.status">
        </w-input>
      </div >
      <div class="add-form" v-if="option == 0">
        <w-input label="showNmae" v-model="addFromInfo.showName">
        </w-input>
        <w-input label="score" v-model="addFromInfo.score">
        </w-input>
        <w-input label="director" v-model="addFromInfo.director">
        </w-input>
        <w-input label="starring" v-model="addFromInfo.starring">
        </w-input>
        <w-input label="plot" v-model="addFromInfo.plot">
        </w-input>
        <w-input label="country" v-model="addFromInfo.country">
        </w-input>
        <w-input label="language" v-model="addFromInfo.language">
        </w-input>
        <w-input label="duration" v-model="addFromInfo.duration">
        </w-input>
        <w-input label="introduction" v-model="addFromInfo.introduction">
        </w-input>
        <w-input label="status" v-model="addFromInfo.status">
        </w-input>
      </div>
      <div class="addPlay-submit-warp">
        <div v-if="option == 0">
          <w-button type="info" @click="addPlayAjax">添加信息</w-button>
        </div>
        <div v-if="option ==1 ">
          <w-button type="info" @click="alterPlay" >修改信息</w-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ttms-play-add-alter',
    props:{
      option:{
        type:String,
        default:"0"
      },
      playInfo:{
        type:Object,
        default:function(){
          return {}
        }
      }
    },
    data(){
      return{
        playInfoObj:this.playInfo,
        imgSrc:"https://img.alicdn.com/bao/uploaded/i3/TB1akIXlCfD8KJjSszhXXbIJFXa_.jpg_160x240.jpg",
        addFromInfo:{
          "showName":"忠犬大营救",
          "poster":"https://img.alicdn.com/bao/uploaded/i3/TB1m_1GeqLN8KJjSZFmXXcQ6XXa_.jpg_160x240.jpg",
          "score":"0",
          "director":"张帆",
          'starring':" 刘晓晔 / 纪帅",
          "plot":"喜剧",
          "country":"中国大陆",
          "language":"汉语普通话",
          "duration":"90",
          "introduction":"该片讲述女青年顾晓月（刘晓晔饰）收养了一只小金毛犬取名哈林，聪明的哈林经过训练学会了技能，却不料被江洋大盗基德（张山饰）盯上，把狗绑走，于是，小月在男朋友李医生（纪帅饰）和爱狗人士的帮助下展开了一场惊心动魄的忠犬大营救.......",
          "picture":"1111",
          "status":"0",
          "date":"2018-8-1",
        }
      }
    },
    mounted:function(){
      if(this.option=="0"){
        this.playInfoObj ={};
      }
    },
    methods:{
      addPlayAjax:function(){
        console.log(this.addFromInfo.showName);
        $.ajax({
          type: "POST",
          url: "http://119.27.174.87:8080/ttms2.0/playServlet",
          data: {
            "showName":this.addFromInfo.showName,
            "poster":this.addFromInfo.poster,
            "score":this.addFromInfo.score,
            "director":this.addFromInfo.director,
            'starring':this.addFromInfo.starring,
            "plot":this.addFromInfo.plot,
            "country":this.addFromInfo.country,
            "language":this.addFromInfo.language,
            "duration":this.addFromInfo.duration,
            "introduction":this.addFromInfo.introduction,
            "picture":"1111",
            "status":this.addFromInfo.status,
            "date":"2018-8-1",
            "method":"addPlay",
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success:function(res){
            let json = JSON.parse(res);
            if(json.fail){
              alert(json.fail);
            }else{
              alert(json.success);
            }

          }.bind(this),
          error:function(err){
            alert("通信错误！");
          }
        })
      },
      alterPlay:function(){
        console.log(this.playInfoObj.showName,this.playInfoObj.poster,this.playInfoObj.score.toString());
        $.ajax({
          type: "POST",
          url: "http://119.27.174.87:8080/ttms2.0/playServlet",
          data: {
            "showName":this.playInfoObj.showName,
            "poster":this.playInfoObj.poster,
            "score":this.playInfoObj.score.toString(),
            "director":this.playInfoObj.director,
            'starring':this.playInfoObj.starring,
            "plot":this.playInfoObj.plot.toString(),
            "country":this.playInfoObj.country,
            "language":this.playInfoObj.language,
            "duration":this.playInfoObj.duration.toString(),
            "introduction":this.playInfoObj.introduction,
            "picture":"1111",
            "status":this.playInfoObj.status,
            "date":"2018-8-1",
            "method":"modifyPlay",
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success:function(res){
            console.log(res);
          }.bind(this),
          error:function(err){
            alert("通信错误！");
          }
        })
      }
    }
  }
</script>

<style>
  .add-Play-warp{
    margin-top: 10px;
    width: 100%;
    min-height:600px;
    border:1px solid #ccc;
  }
  .add-form-warp{
    margin:1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .top-info{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
  }
  .add-form{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .addPlay-submit-warp{
    width: 100%;
    height: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
