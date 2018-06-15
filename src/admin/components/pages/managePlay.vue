<template>
  <div class="manage-play-warp">
    <div class="fun-header">
      <p @click="showAllClick">查看所有</p>
      <p @click="addClick">
          添加剧目
      </p>
      <p @click="alterClick">
          修改剧目
      </p>
    </div>
    <div class="film-show-warp">
      <ul class="film-list" v-if="!addFlag&&!alterFlag">
        <div v-for="item in allPlayInfo" class="film-poster-warp" v-if="item.status!=2">
          <div>
            <ttms-poster  :film-info="item" option="0" @offline="getFilmCallback"></ttms-poster>
          </div>
        </div>
      </ul>
      <div v-else>
        <div v-if="alterFlag">
          <div class="alterSearch">
            <w-input label="电影名称" v-model="searchName"></w-input>
            <w-button type="info" @click="searchMovieByName">查询</w-button>
          </div>
          <ttms-play-add-alter v-if="searchFlag" option="1" :play-info="searchPlayInfo"></ttms-play-add-alter>
        </div>
        <div v-if="addFlag">
          <ttms-play-add-alter ></ttms-play-add-alter>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'manage-play',
  data(){
    return {
      allPlayInfo:{},
      showList:{},
      getAllFlag:false,
      addFlag:false,
      alterFlag:false,
      searchName:"超时空同居",
      searchFlag:false,
      searchPlayInfo:""
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
          console.log(res);
          this.showList = this.allPlayInfo = res;
          this.getAllFlag = true;
        }.bind(this),
        error: function (err) {
          alert("通信错误");
        }
      });
    },
    getFilmCallback:function(filmInfo){
      let res = confirm("是否确定下线");
      if (res == true)
      {
        $.ajax({
          type: "GET",
          dataType:"json",
          url: "http://119.27.174.87:8080/ttms2.0/playServlet",
          data:{
            "method":"dropOffPlay",
            "pid":filmInfo.pid
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function (res) {
            alert(res.succuss);
            this.getAllplayInfo();
          }.bind(this),
          error: function (err) {
            alert("通信错误");
          }
        });
      }
    },
    addClick:function(){
      this.addFlag = true;
      this.alterFlag = false;
      this.searchFlag =false;
    },
    alterClick:function () {
      this.alterFlag  =true;
      this.addFlag = false;
    },
    showAllClick:function(){
      this.addFlag = this.alterFlag = this.searchFlag = false;
    },
    searchMovieByName:function(){
      if(this.searchName !=""){
        for(let i=0;i<this.allPlayInfo.length;i++){
          if(this.allPlayInfo[i].showName == this.searchName){
            this.searchFlag = true;
            this.searchPlayInfo = this.allPlayInfo[i];
          }
        }
      }else{
        alert("搜索信息不能为空！");
      }
    }
  }
}
</script>

<style>
  .manage-play-warp{
    width: 100%;
    height:100%;
  }
  .fun-header{
    width: 100%;
    height:1rem;
    line-height: 2rem;
    padding: 0.5rem 0.5rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .fun-header p{
    margin-left: 2rem;
  }
  .fun-header p:hover{
    cursor: pointer;
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
  .alterSearch{
    display:flex;
    flex-direction: row;
    align-items: center;
  }
</style>
