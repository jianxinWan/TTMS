<template>
  <div class="show-hall-warp">
    <table cellspacing="0" cellpadding="0" border="0" class="hall-list-table" v-if="hallFlag">
      <thead>
      <tr>
        <th>序号</th>
        <th>详情</th>
        <th>影厅大小</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in hallListInfo" v-if="item.status == 1">
        <th>{{item.name}}</th>
        <th>{{item.introduction}}</th>
        <th>{{item.row}}行{{item.col}}列</th>
        <th>
          <span v-if="item.status == 1">正常</span>
        </th>
        <th>
          <w-button type="info" @click="deleteHall(item)">删除</w-button>
          <w-button type="success" @click="alterSeat(item)">修改座位</w-button>
        </th>
      </tr>
      </tbody>
    </table>
    <div class="add-hall-form" v-if="showAddHallForm">
      <w-input label="Name" v-model="addHallInfo.name"></w-input>
      <w-input label="Introduction" v-model="addHallInfo.introduction"></w-input>
      <w-input label="Row" v-model="addHallInfo.row" ></w-input>
      <w-input label="Col" v-model="addHallInfo.col" ></w-input>
      <w-button type="success" broad @click="addHallAjax">确认添加</w-button>
    </div>
    <div class="add-hall-btn">
      <w-button type="info" @click="addBtnCli">
        <span v-if="!showAddHallForm">
          添加影厅
        </span>
        <span v-else>
          收起列表
        </span>
      </w-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'showHall',
  data(){
    return{
      hallListInfo:{},
      hallFlag:false,
      showAddHallForm:false,
      addHallInfo:{
        "name":"",
        "row":"",
        "col":"",
        "introduction":""
      }
    }
  },
  mounted:function(){
    this.getHallAjax();
  },
  methods:{
    getHallAjax:function(){
      $.ajax({
        type: "GET",
        dataType:"json",
        url: "http://119.27.174.87:8080/ttms2.0/studioServlet?method=showAll",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function (res) {
          this.hallListInfo = res;
          this.hallFlag = true;
        }.bind(this),
        error: function (err) {
          alert("通信错误");
        }
      });
    },
    deleteHall:function(val){
      let cr = confirm("确认删除？");
      if(cr){
        $.ajax({
          type: "GET",
          dataType:"json",
          url: "http://119.27.174.87:8080/ttms2.0/studioServlet?method=deleteStudio",
          data:{
            "name":val.name
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function (res) {
            alert("删除成功");
          }.bind(this),
          error: function (err) {
            alert("通信错误");
          }
        });
      }
    },
    addHallAjax:function(){
      $.ajax({
        type: "POST",
        dataType:"json",
        url: "http://119.27.174.87:8080/ttms2.0/studioServlet",
        data:{
          "name":this.addHallInfo.name,
          "row":this.addHallInfo.row,
          "col":this.addHallInfo.col,
          "introduction":this.addHallInfo.introduction,
          "method":"addStudio"
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function (res) {
//          let json = JSON.parse(res);
//          if(json.fail){
//            alert(json.fail);
//          }else {
//            alert(json.success);
//          }
          if(res.fail){
            alert(res.fail);
          }else{
            alert(res.success);
          }
          this.$router.push({path:'/ttms/TTT/admin/halls/showHall'});
        }.bind(this),
        error: function (err) {
          alert("通信错误");
        }
      });
    },
    addBtnCli:function(){
      this.showAddHallForm = !this.showAddHallForm;
    },
    alterSeat:function(val){
      let pathStr = "/ttms/TTT/admin/halls/alterHall/"+val.sid+"/"+val.row+"/"+ val.col+"/"+val.name + "/";
      console.log(pathStr);
      this.$router.push({path:pathStr});
    }
  }
}
</script>
<style>
  .show-hall-warp{
    padding: 10px;
    width: 100%;
    min-height: 600px;
  }
  .hall-list-table{
    width: 100%;
    height:100%;
  }
  .hall-list-table th{
    padding: 0.5rem 1rem;
    border: 0.01rem solid #ccc;
    height: 2rem;
  }
  .add-hall-btn{
    border-top: 1px solid #ccc;
    margin-top: 1rem;
    width: 100%;
    height: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
