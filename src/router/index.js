import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/index.vue"
import Home from "@/views/home/index.vue"
import User from "@/views/home/user.vue"
//首页欢迎
//客户管理
import Customer from "@/views/customer/customer.vue"
//任务管理
import Management from "@/views/management/management.vue"
//终端管理
import Terminal from "@/views/terminal/terminal.vue"
//财务
import Finance from "@/views/finance/finance.vue"

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    name:"login",
    path:"/login",
    component:Login
  },
  {
    name:"home",
    path:"/home",
    component:Home,
    // redirect:"/home",
    children:[
      // {   
      //   name:"welcome",
      //   path:"/welcome",
      //   component:Welcome
      // },
      //系统管理
      {
        name:"user",
        path:"/user",
        component:User
      },
      //客户管理
      {
        name:"customer",
        path:"/customer",
        component:Customer
      },
      //任务管理
      {
        name:"management",
        path:"/management",
        component:Management
      },
      //终端管理
      {
        name:"terminal",
        path:"/terminal",
        component:Terminal
      },
      //财务管理
      {
        name:"finance",
        path:"/finance",
        component:Finance
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
