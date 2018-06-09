import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const allFilmInfo = {
  state: {

  },
  mutations: {

  },
  actions: {
    fetchData ({ commit }) {
      axios.get('http://127.0.0.1:8081/api/books')
        .then(function (response) {
          commit('initBooks', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    //book是调用该操作时传过来的附加参数
    addItem ({ commit }, book) {
      return axios.post('http://127.0.0.1:8081/api/add', book)
        .then(function (response) {
          if (!response || response.status !== 200 || response.data.err) {
            return true
          } else {
            commit('addNewBook', book);
            return false
          }});
    }
  },
  getters: {

  }
};



const store = new Vuex.Store({
  modules:{
    allFilmInfo:allFilmInfo
  }
});

export default  store
