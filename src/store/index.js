import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as mutations from './mutations';
import  User from './modules/user'
import Allfilm from './modules/getFilmInfo'

Vue.use(Vuex);
const store = new Vuex.Store({
  modules:{
    user:User,
    allfilm:Allfilm
  }
});
export default store;
