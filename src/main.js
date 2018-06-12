// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App';
import router from './router';
import register from './register/'
import WVUE from 'wvue-ui';
import Vuex from 'vuex';
import store from './store/index'
import 'swiper/dist/css/swiper.min.css';
Vue.config.productionTip = false;

Vue.use(WVUE);
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  register
});
