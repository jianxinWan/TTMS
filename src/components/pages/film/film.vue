<template>
  <div>
    <div class="film-content">
      <div class="top-nav-warp">
        <ul class="top-nav-list">

          <li @click="statusSelect('1',$event)" class="activeNav">正在上映</li>
          <li @click="statusSelect('0',$event)">即将上映</li>
          <li @click="statusSelect('10',$event)" >查看全部</li>
        </ul>
      </div>
      <div class="search-warp">
        <div class="type-select-warp search-type" >
          <label>类型：</label>
          <p class="options-List" id="typeSelect">
            <span v-for="item in searchSelect.type" class="search-options" @click="typeSelect(item.option,$event)">{{item.option}}</span>
          </p>
        </div>
        <hr/>
        <div class="area-select-warp search-type">
          <label>地区：</label>
          <p class="options-List" id="areaSelect">
            <span v-for="item in searchSelect.area" class="search-options" @click="countrySelect(item.option,$event)">{{item.option}}</span>
          </p>
        </div>
        <hr/>
        <div class="area-select-warp search-type">
          <label>时间：</label>
          <p class="options-List" id="timeSelect">
            <span v-for="item in searchSelect.time" class="search-options">{{item.option}}</span>
          </p>
        </div>
      </div>
      <div class="movie-list-warp">
        <div class="sort-select-warp">
          <p>
            <a href="#">
              <span>按时间排序</span>
            </a>
            <a href="#">
            <span>
              按评分排序
            </span>
            </a>
          </p>
        </div>
        <div class="film-show-warp">
          <div class="loading-warp" v-if="!flag">
            <ttms-loading></ttms-loading>
          </div>
          <ul class="film-list">
            <div v-for="item in showList" class="film-poster-warp">
              <router-link tag="div" :to ="{name:'filmInfo',params :{id:item.pid}}">
                <ttms-poster  :film-info="item" v-if="flag"></ttms-poster>
              </router-link>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <ttms-footer></ttms-footer>
  </div>
</template>
<script>
  import axios from 'axios';
    export default {
      name: 'film',
      data(){
        return {
          fileName:'film',
          allFilmInfo:[],
          showList:[],
          searchSelect:{
            type:[
              {
                option:'全部',
              },
              {
                option:'爱情',
              },
              {
                option:'喜剧',
              },
              {
                option:'动画',
              },
              {
                option:'剧情',
              },
              {
                option:'恐怖',
              },
              {
                option:'惊悚',
              },
              {
                option:'科幻',
              },
              {
                option:'动作',

              },
              {
                option:'悬疑',

              },
              {
                option:'犯罪',
              },
              {
                option:'冒险',

              },
              {
                option:'战争',

              },
              {
                option:'奇幻',
              },
              {
                option:'运动',

              },
              {
                option:'家庭',
              },
              {
                option:'古装',

              },
              {
                option:'武侠',
              },
            ],
            area:[
              {
                option:'全部'
              },
              {
                option:'中国大陆',
              },
              {
                option:'美国',
              },
              {
                option:'韩国',
              },
              {
                option:'日本',
              },
              {
                option:'中国香港',
              },
              {
                option:'中国台湾',
              },
              {
                option:'泰国',
              },
              {
                option:'印度',
              },
              {
                option:'法国',
              },
            ],
            time:[
              {
                option:'全部'
              },
              {
                option:'2018年以后',
              },
              {
                option:'2018',
              },
              {
                option:'2017',
              },
              {
                option:'2016',
              },
              {
                option:'2015',
              },
              {
                option:'2014',
              },
              {
                option:'2013',
              },
            ]
          },
          flag:false
        }
      },
      created:function(){
        this.getAllMovieInfo();
      },
      mounted:function(){
        this.initSpan();
      },
      methods:{
        async getAllMovieInfo() {
          axios.get("http://119.27.174.87:8080/ttms2.0/playServlet?method=showAll")
            .then(res=> {
              console.log(res.data);
              this.allFilmInfo = res.data;
              this.showList = this.allFilmInfo;
              this.flag=true;
              this.statusSelect(1,this,true);
            })
            .catch(err => {
              console.log(err);
            });
        },
        hasClass:function(element, cls) {
          return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
        },
        initSpan:function(){
          document.getElementById("typeSelect").firstChild.classList.add("activeLi");
          document.getElementById("areaSelect").firstChild.classList.add("activeLi");
          document.getElementById("timeSelect").firstChild.classList.add("activeLi");
          document.getElementsByClassName("top-nav-list")[0].firstChild.classList.add("activeNav");
        },
        statusSelect:function(status,e,first){
          if(status==10){
            this.showList = this.allFilmInfo;
          }else{
            this.showList=[];
            for(let item in this.allFilmInfo){
              if(this.allFilmInfo[item].status==status){
                this.showList.push(this.allFilmInfo[item]);
              }
            }
            this.showList = this.showList.slice(0);
          }
          if(!first){
            let liChildren = document.getElementsByClassName("top-nav-list")[0].children;
            for(let i=0;i<liChildren.length;i++){
              if(this.hasClass(liChildren[i],"activeNav")){
                liChildren[i].className = "";
              }
            }
            e.currentTarget.classList.add("activeNav");
          }
        },
        countrySelect:function(country,e){
          if(country == "全部"){
            this.showList = this.allFilmInfo;
            let liChildren = document.getElementById("areaSelect").children;
            for(let i=0;i<liChildren.length;i++){
              if(this.hasClass(liChildren[i],"activeLi")){
                liChildren[i].classList.remove("activeLi");
              }
            }
            e.currentTarget.classList.add("activeLi");
          }else{
            this.showList=[];
            for(let item in this.allFilmInfo){
              if(this.allFilmInfo[item].country == country){
                this.showList.push(this.allFilmInfo[item]);
              }
            }
            this.showList = this.showList.slice(0);
            let liChildren = document.getElementById("areaSelect").children;
            for(let i=0;i<liChildren.length;i++){
              if(this.hasClass(liChildren[i],"activeLi")){
                liChildren[i].classList.remove("activeLi");
              }
            }
            e.currentTarget.classList.add("activeLi");
          }
        },
        typeSelect:function(type,e){
          if(type == "全部"){
            this.showList = this.allFilmInfo;
            let liChildren = document.getElementById("typeSelect").children;
            for(let i=0;i<liChildren.length;i++){
              if(this.hasClass(liChildren[i],"activeLi")){
                liChildren[i].classList.remove("activeLi");
              }
            }
            e.currentTarget.classList.add("activeLi");
          }else{
            this.showList=[];
            for(let item in this.allFilmInfo){
              if(this.allFilmInfo[item].plot.indexOf(type)>-1){
                this.showList.push(this.allFilmInfo[item]);
              }
            }
            this.showList = this.showList.slice(0);
            let liChildren = document.getElementById("typeSelect").children;
            for(let i=0;i<liChildren.length;i++){
              if(this.hasClass(liChildren[i],"activeLi")){
                liChildren[i].classList.remove("activeLi");
              }
            }
            e.currentTarget.classList.add("activeLi");
          }
        }
      }
    }
</script>

<style scoped>
  .film-content{
    width: 100%;
    height:auto;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .top-nav-warp{
    width: 100%;
    height:3.75rem;
    background-color: #47464a;
  }
  .top-nav-list{
    line-height: 3.75rem;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .top-nav-list li{
    padding: 0.2rem 2rem;
    font-size: 1.1rem;
  }
  .top-nav-list li:hover{
    cursor: pointer;
    color: rgba(80,191,255,1);
  }
  .activeNav{
    color:rgba(80,191,255,1);
  }
  .activeLi{
    background-color: rgba(80,191,255,1);
    color: white;
    border-radius: 0.6rem;
    font-size: 1rem;
    display: inline-block;
    padding:0.2rem 0.8rem;
  }
  .search-warp{
    width: 1078px;
    height:223px;
    padding: 0 20px;
    margin-top: 40px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .search-warp hr{
    width: 100%;
  }
  .search-type{
    width: 100%;
    height:3.8rem;
    margin: 0.4rem 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .search-type label{
    font-size: 1.1rem;
    width: 4rem;
    display: inline-block;
  }
  .search-options:hover{
    cursor: pointer;
    background-color: rgba(80,191,255,1);
    color: white;
    border-radius: 0.6rem;
  }
  .options-List{
   text-align: left;
  }
  .search-options{
    display: inline-block;
    font-size: 1rem;
    padding:0.2rem 0.8rem;
  }
  /*.search-options:first-child{*/
    /*background-color: rgba(80,191,255,1);*/
    /*color: white;*/
    /*border-radius: 0.6rem;*/
  /*}*/
  .movie-list-warp{
    margin-top: 40px;
    width:1120px;
    height:auto;
    border: 1px solid #ccc;
  }
  .sort-select-warp{
    width: 100%;
    height:2rem;
    text-align: left;
    line-height: 2rem;
  }
  .sort-select-warp p span{
    padding: 0.1rem 0.5rem;
    font-size: 1rem;
  }
  .film-show-warp{
    width: 100%;
    padding: 0.5rem 0.5rem;
  }
  .film-list{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .film-poster-warp{
    margin-left: 3rem;
    margin-top: 2rem;
    border: none;
  }
</style>
