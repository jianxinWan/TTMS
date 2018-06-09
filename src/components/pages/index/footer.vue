<template>
  <footer>
    <div class="footer-content">
      <div class="footer-top-info">
        <div class="left-logo">
          <img src="../../../../static/img/logoFont.png">
          <p>由烫烫烫提供技术支持</p>
        </div>
      </div>
      <div class="footer-bottom-info">
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
      name: 'ttms-footer'
  }
</script>

<style>
  footer{
    width: 100%;
    height:12rem;
    background-color: #2b2b2b;
    border-top: 2px solid rgba(80,191,255,1);
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .footer-content{
    width:1100px;
    height:12rem;
  }
  .footer-top-info{
    width: 100%;
    height:8rem;
    border:1px solid;
  }
  .footer-top-info .left-logo{
    height:100%;
    width: 15rem;
    color:#cccccc;
    text-align: center;
    letter-spacing: 0.2rem;
    font-size: 0.8rem;
  }
  .left-logo img{
    width: 70%;
    height:auto;
    margin: 0 auto;
  }
</style>
