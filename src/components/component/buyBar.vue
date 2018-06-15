<template>
  <div class="buy-bar-warp">
    <ul class="buy-bar-list">
      <li class="finish-status" id="bar-1"><i class="w-icon-favfill"></i>1.选择影片，场次</li>
      <li class="now-status" id="bar-2">2.选座，填手机号</li>
      <li class="after-finish-status" id="bar-3">3.确认订单，支付</li>
      <li class="after-finish-status" id="bar-4">4.支付成功，影院取票观影</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ttms-buybar',
  data(){
    return {

    }
  },
  mounted:function(){
    this.setProgress();
  },
  props:{
    progress:{
      type:String,
      default:"2"
    }
  },
  methods:{
    setProgress:function(){
      if(this.progress=="2"){
        document.getElementById("bar-1").className="finish-status";
        document.getElementById("bar-2").className="now-status";
        document.getElementById("bar-3").className="after-finish-status";
        document.getElementById("bar-4").className="after-finish-status";
      }else if(this.progress=="3"){
        document.getElementById("bar-1").className="finish-status";
        document.getElementById("bar-2").className="finish-status";
        document.getElementById("bar-3").className="now-status";
        document.getElementById("bar-4").className="after-finish-status";
      }else if(this.progress=="4"){
        document.getElementById("bar-1").className="finish-status";
        document.getElementById("bar-2").className="finish-status";
        document.getElementById("bar-3").className="finish-status";
        document.getElementById("bar-4").className="now-status";
      }
    }
  }
}
</script>

<style>
  .buy-bar-warp{
    width: 100%;
    padding: 0 5px;
    height:3rem;
  }
  .buy-bar-list{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .buy-bar-list li{
    width: 24.8%;
    height:100%;
    text-align: center;
    line-height: 3rem;
  }
  .finish-status {
    color: rgba(80, 191, 255, 1);
    border-bottom: 2px solid rgba(80, 191, 255, 1);
  }
  .now-status{
    color: red;
    border-bottom: 2px solid red;
  }
  .after-finish-status{
    color:#ccc;
    border-bottom: 2px solid #ccc;
  }
</style>
