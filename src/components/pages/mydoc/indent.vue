<template>
  <div v-if="indentFlag" class="indent-warp">
    <div class="qrCode">
      <div class="leftCode">
        <img src="http://139.199.104.60/ttms/img/code.png" width="150px" height="150px">
      </div>
      <div class="right-codeNum">
        <h3>请及时通过二维码取票，格瓦拉影城祝您观影愉快！</h3>
        <h2>取票码:2321 4355 6745 3397</h2>
      </div>
    </div>
    <ttms-indent :payIndentInfo="payIndent"></ttms-indent>
  </div>
</template>
<script>
export default {
  name: 'indent',
  data(){
    return {
      payIndent:{},
      indentFlag:false
    }
  },
  mounted:function(){
    this.getLocalStorage();
  },
  methods:{
    getLocalStorage:function(){
      let indentInfo =JSON.parse(localStorage.indent);
      if(indentInfo){
        this.payIndent = indentInfo;
        this.indentFlag = true;
      }else{

      }
    }
  }
}
</script>

<style>
  .indent-warp{
    padding: 1rem;
  }
  .indentList{
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .qrCode{
    width: 100%;
    height:200px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .right-codeNum{
    margin-left: 80px;
    line-height: 2rem;
    text-align: left;
  }
  .right-codeNum h2{
    color:rgba(80,191,255,1);
  }
</style>
