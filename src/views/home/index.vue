<template>
  <el-container>
    <el-header>
      <div class="header_left"></div>
      <div class="header_right">
        <el-button type="info">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="button_menu" @click="button_menu">折叠</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id+''"
            v-for="item in menulist"
            :key="item.id"
            v-if="item.children&&list.includes(item.id)"
          >
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span style="color:#fff">{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                v-if="list.includes(subItem.id)"
                @click="saveNavState(subItem.path),activeName(subItem.authName)"
              >{{subItem.authName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activePath:'',
      menulist: [
        {
          id: "1",
          authName: "系统管理",
          children: [
            {
              id: "11",
              authName: "用户管理",
              path: "/user"
            }
          ]
        },
        {
          id: "2",
          authName: "客户管理",
          path: "user",
          children: [
            {
              id: "12",
              authName: "创建客户",
              path: "/customer"
            }
          ]
        },
        {
          id: "3",
          authName: "任务管理",
          path: "user",
          children: [
            {
              id: "13",
              authName: "创建任务",
              path: "/management"
            }
          ]
        },
        {
          id: "4",
          authName: "终端管理",
          path: "user",
          children: [
            {
              id: "14",
              authName: "绑定设备",
              path: "/terminal"
            }
          ]
        },
        {
          id: "5",
          authName: "财务管理",
          path: "user",
          children: [
            {
              id: "15",
              authName: "财务管理",
              path: "/finance"
            }
          ]
        }
      ],
      iconObj: {
        "1": "el-icon-s-home",
        "2": "el-icon-s-order",
        "3": "el-icon-s-platform",
        "4": "el-icon-s-open",
        "5": "el-icon-menu"
      },
      list: JSON.parse(window.sessionStorage.getItem("menulist"))
    };
  },
  created(){
    this.activePath = window.sessionStorage.getItem("activePath")
  },
  methods: {
    button_menu() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    },
    activeName(activeName){
      window.sessionStorage.setItem('activeName',activeName)
    }
  }
};
</script>

<style scoped>
.el-header {
  background: #2c2a29;
}
.el-aside {
  background: #333744;
  /* height: 100%; */
}
.el-main {
  background: #edeae8;
}
.header_left {
  width: 400px;
  height: 100%;
  float: left;
}
.header_right {
  float: right;
  line-height: 60px;
}
.el-menu {
  border: none;
}
.button_menu {
  background: saddlebrown;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>