import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios';
//引入element插件
import ElementUI from 'element-ui';
//引入element的css样式
import 'element-ui/lib/theme-chalk/index.css';
//引入重置样式表
import "@/assets/css/reset.css"

// axios.defaults.baseURL = "http://47.105.207.228:8875"
// Vue.prototype.$http = axios;

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
