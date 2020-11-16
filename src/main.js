import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 接口配置
import { axios } from './api/http'
Vue.prototype.$http = axios;

//引入element插件
import ElementUI from 'element-ui';
//引入element的css样式
import 'element-ui/lib/theme-chalk/index.css';
//引入重置样式表
import "@/assets/css/reset.css"
Vue.use(ElementUI);

//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//swiper
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(vueSwiper)

// vxe-table表格
import "xe-utils";
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
