import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUserId:window.sessionStorage.getItem("loginUserId")
  },
  mutations: {
    adduser(state,id){
      state.loginUserId=id;
      window.sessionStorage.setItem("loginUserId",id);
    }
  },
  actions: {
    login(context,args){
      context.commit("adduser",args)
    }
  }
})
