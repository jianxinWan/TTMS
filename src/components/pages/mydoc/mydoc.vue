<template>
  <div>
    <div class="mydoc-all-warp">
      <div class="left-nav-warp">
        <ul class="user-menu-list">
          <li>
            <router-link to="/mydoc/indent" tag="a">
              查看订单
            </router-link>
          </li>
          <li>修改个人信息</li>
          <li>关于我们团队</li>
          <li>格瓦拉影院</li>
        </ul>
      </div>
      <div class="right-userInfo">
        <router-view></router-view>
      </div>
    </div>
    <ttms-footer></ttms-footer>
  </div>
</template>
<script>
    export default {
        name: 'mydoc',
    }
</script>

<style>
  .mydoc-all-warp{
    z-index: 20;
    width: 100%;
    min-height: 700px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 50px;
  }
  .left-nav-warp{
    width:14rem;
    border: 1px solid #ccc;
    box-shadow: 3px 3px 2px  #ccc;
  }
  .user-menu-list{
    width: 10rem;
    padding: 2rem;
  }
  .user-menu-list li{
    width: 100%;
    height:2.5rem;
    line-height: 2.5rem;
    text-align: left;
  }
  .user-menu-list li:hover{
    color:rgba(80,191,255,1);
    cursor: pointer;
  }
  .right-userInfo{
    width: 100%;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-left:50px;
  }
</style>
