<template>
  <div class="seat-components">
    <div class="top-screen">
      <div class="screen">格瓦拉剧院银屏</div>
    </div>
    <div class="center-seat-warp">
      <table  cellpadding="0" border="0">
        <tr v-for="item in seatArryList">
          <th v-for="seat in item" class="erery-seat" @click="selectSeat">
            <img v-if="seat==1" src="../../../static/img/seat.png" >
            <img v-if="seat==3" src="../../../static/img/seat1.png">
            <img v-if="seat==2" src="../../../static/img/seat2.png">
          </th>
        </tr>
      </table>
      <ul class="seatRowNum">
        <li v-for="(item,key) in seatArray">{{key+1}}</li>
      </ul>
    </div>
    <div class="bottom-seat-type">
        <ul class="seat-type-list">
          <li><img src="../../../static/img/seat.png"><span>可选座位</span></li>
          <li><img src="../../../static/img/seat1.png"><span>当前选中</span></li>
          <li><img src="../../../static/img/seat2.png"><span>已被选中</span></li>
        </ul>
        <p>本影厅共有座位个，当前已售个</p>
    </div>
  </div>
</template>
<script>
  import vue from 'vue';
  export default {
    name: 'ttms-seat',
    props:{
      seatLimit:{
        type:Number,
        default:5
      },
      seatArray:{
        type:Array,
        default:function(){
          return [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
            [0,0,2,2,2,2,2,0,0,2,2,2,2,2,0,0],
            [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
            [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
            [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
            [0,0,2,2,2,2,2,3,3,2,2,2,2,2,0,0],
            [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
            [0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0],
            [0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0],
            [0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0],
          ]
        }
      }
    },
    data(){
      return {
        selectedTickets:[],
        seatArryList:this.seatArray
      }
    },
    mounted:function(){

    },
    computed:{
    },
    methods:{
      getColumn:function(obj,row,clow){
        let j = 0;
        for(let i=0;i<obj[row].length;i++){
          if(obj[row][i]==0){
            j++;
          }
          else if(obj[row][i+1]!=0){
            break;
          }
        }
        return clow-j+1;
      },
      selectSeat:function(e){
        let seatColumn = Math.round((e.currentTarget.offsetLeft)/35);
        let seatRow = Math.round((e.currentTarget.offsetTop)/40);
        if(this.seatArryList[seatRow][seatColumn]==1){
          if(this.selectedTickets.length<this.seatLimit){
            this.seatArryList[seatRow][seatColumn]=3;
            this.seatArryList =  this.seatArray.slice(0);
            let inFactCol = this.getColumn(this.seatArryList,seatRow,seatColumn);
            let selectStatus = {};
            selectStatus.inFactRow = seatRow+1;
            selectStatus.inFactCol = inFactCol;
            selectStatus.row = seatRow;
            selectStatus.col = seatColumn;
            this.selectedTickets.push(selectStatus);
          }else{
            alert("单人最多购买"+ this.seatLimit+"票");
          }
        }
        else if(this.seatArryList[seatRow][seatColumn]==3){
          this.seatArryList[seatRow][seatColumn]=1;
          this.seatArryList =  this.seatArray.slice(0);
          let inFactCol = this.getColumn(this.seatArryList,seatRow,seatColumn);
          let selectStatus = {};
          selectStatus.inFactRow = seatRow+1;
          selectStatus.inFactCol = inFactCol;
          selectStatus.row = seatRow;
          selectStatus.col = seatColumn;
          this.selectedTickets.splice(this.selectedTickets.indexOf(selectStatus),1);
        }
        this.$emit('selectedTicket',this.selectedTickets);
      }
    }
  }
</script>
<style>
  .seat-components{
    width: 100%;
    height:610px;
  }
  .top-screen{
    width: 80%;
    height:5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 10%;
    color: #2b2b2b;
    font-size: 0.8rem;
    letter-spacing: 2px;
  }
  .screen{
    width:550px;
    height:2rem;
    border-radius: 5px 5px 50% 50%;
    background-color: #cccc;
    text-align: center;
    line-height: 2rem;
  }
  .center-seat-warp{
    width: 100%;
    height:430px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .seatRowNum{
    position: absolute;
    margin-left: -310px;
    display: flex;
    flex-direction: column;
  }
  .seatRowNum li{
    width: 25px;
    height:25px;
    margin: 0.39rem;
    text-align: center;
    line-height: 26px;
    background-color: rgba(80,191,255,1);
    color: white;
  }
  .erery-seat{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .erery-seat img{
    width: 30px;
    height:30px;
    margin: 1px 2px;
  }

  .bottom-seat-type{
    width: 100%;
    height:100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .seat-type-list{
    width: 450px;
    height:60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .seat-type-list li{
    width: 100px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .seat-type-list li img{
    width: 35px;
    height:35px;
  }
</style>
