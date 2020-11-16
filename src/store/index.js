import Vue from 'vue'
import Vuex from 'vuex'
import Allid from './Allid';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      // url:'http://192.168.10.189:8000/'
      url:'http://api.eterp.cn/'
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    Allid
  }
})
