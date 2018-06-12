// initial state
const state = {
    name:"",
    status:""
};

// getters
const getters = {

};
// actions
const actions = {

};
// mutations
const mutations = {
  setUserStatus:function(state,status){
    state.status = status;
  },
  setUserName:function(state,name){
    state.name = name;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
