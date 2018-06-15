<template>
  <div class="hall-warp">
    <div class="headerNav">
      <div class="funBtn">
        <router-link to="/ttms/TTT/admin/halls/showHall">
          查看演出厅
        </router-link>
      </div>
    </div>
    <div class="show-warp-nav">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'manageHall',
}
</script>
<style>
.hall-warp{
  width: 100%;
  min-height:600px;
}
.headerNav{
  width: 100%;
  height:2rem;
  line-height: 2rem;
  padding:0.5rem 0.5rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.headerNav .funBtn{
  padding: 0 0.5rem;
  margin-left: 2rem;
  border:1px solid #ccc;
}
.headerNav .funBtn:hover{
  background-color:rgba(80,191,255,1);
  color: white;
  cursor: pointer;
}
</style>
