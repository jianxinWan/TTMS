<template>
  <div class="indent-table">
    <p class="indentInd">订单ID:{{payIndent.sid}}</p>
    <table cellspacing="0" cellpadding="0">
      <thead>
      <tr>
        <th>电影</th>
        <th>场次</th>
        <th>票数/座位</th>
        <th>金额</th>
        <th>接收电子码的电话号码</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th id="indent-th1">
          <div class="indent-movie">
            <div class="indent-left-Img">
              <img src="https://img.alicdn.com/bao/uploaded/i3/TB1gr2sf3KTBuNkSne1XXaJoXXa_.jpg_160x240.jpg">
            </div>
            <div class="indent-right-info">
              <div><b>{{payIndent.ticketList[0].showName}}</b></div>
              <p>开始时间：{{payIndent.ticketList[0].startTime.hours}}:{{payIndent.ticketList[0].startTime.minutes}}</p>
              <p>结束时间：{{payIndent.ticketList[0].endTime.hours}}:{{payIndent.ticketList[0].endTime.minutes}}</p>
            </div>
          </div>
        </th>
        <th id="indent-th2">
          <div class="session-warp">
            <p>格瓦拉影城</p>
            <p>{{payIndent.ticketList[0].name}}</p>
            <p>{{payIndent.ticketList[0].startTime.month}}月{{payIndent.ticketList[0].startTime.day}}日--{{payIndent.ticketList[0].startTime.hours}}:{{payIndent.ticketList[0].startTime.minutes}}</p>
          </div>
        </th>
        <th id="indent-th3">
          <div class="seatList">
            <p>{{payIndent.ticketList.length}}张</p>
            <ul class="ticketList">
              <li type="info" v-for="item in payIndent.ticketList">
                {{item.row+1}}排{{item.col+1}}列
              </li>
            </ul>
          </div>
        </th>
        <th id="indent-th4">
          <div class="aLLMoney">
            <h2>￥{{payIndent.ticketList[0].price * payIndent.ticketList.length}}</h2>
          </div>
        </th>
        <th id="indent-th5">
          <h2>{{payIndent.sale.user.phoneNumber}}</h2>
          <p>
            1.短信可能会被手机软件拦截，请到该软件中查找短信
          </p>
          <p>
            2.若要修改手机号，需要您重新下单
          </p>
        </th>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'ttms-indent',
    data(){
      return{
        payIndent:this.payIndentInfo
      }
    },
    props:{
      payIndentInfo:{
        type:Object
      }
    }
  }
</script>

<style>
  .indent-table{
    width: 100%;
    height:auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .indent-table table{
    width: 98%;
    height:auto;
    border: 0.01rem solid #ccc;
  }
  .indent-table table thead tr{
    height:3rem;
  }
  .indent-table table th{
    border: 0.01rem solid #ccc;
  }
  .indent-movie{
    width:230px;
    height:150px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .indent-movie img{
    width:84px;
    height:133px;
  }
  .indent-right-info{
    margin: 10px;
    text-align: left;
  }
  .indent-right-info p{
    font-size: 0.8rem;
    margin-top: 0.8rem;
    line-height: 1.2rem;
    color: #5e5862;
  }

  .seatList{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .ticketList{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .ticketList li{
    width: 100px;
    padding: 3px 0;
    border: 1px solid rgba(80, 191, 255, 1);
    font-size: 0.8rem;
    margin-top: 4px;
  }
  .session-warp p{
    margin-top: 1rem;
    font-size: 1rem;
    letter-spacing: 2px;
  }
  .aLLMoney{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .aLLMoney h2{
    display: inline-block;
    width: 120px;
    color: red;
  }
  .indentInd{
    text-align: left;
    margin-left: 20px;
    height:30px;
    line-height: 30px;
    color: #878787;
  }
  #indent-th1{
    width: 22%;
  }
  #indent-th2{
    width: 15%;
  }
  #indent-th3{
    width: 22%;
  }
  #indent-th4{
    width: 15%;
  }
  #indent-th5{
    width: 26%;
    padding: 10px;
  }
</style>
