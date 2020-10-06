<template>
  <el-container>
    <el-header>
      <!-- 头部上 -->
      <div class="headetTop">
        <!-- logo -->
        <div class="header_logo">
          <img
            src="../assets/image/logo.png"
            alt=""
            style="width: 48px; height: 48px"
          />
          <h1>紫缘天下</h1>
        </div>
        <!-- 个人信息 -->
        <div class="information">
          <span>
            <i class="el-icon-user"></i> 登录账户:{{ info.username }}
          </span>
          <span style="cursor: pointer;"> <i class="el-icon-setting"></i> 修改密码 </span>
          <span @click="quit" style="cursor: pointer;">
            <i class="el-icon-switch-button"></i> 退出
          </span>
        </div>
      </div>
      <!-- 头部下 -->
      <div class="headerBottom">
        <el-tabs
          v-model="editableTabsValue"
          @tab-click="changetab"
          @tab-remove="removeTab"
          type="card"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.menu"
            :name="item.path"
            :closable="item.close"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width: 11%">
        <el-menu
          background-color="#303133"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <template v-for="item in menulist">
            <el-submenu
              :index="item.id + ''"
              :key="item.id"
              v-show="item.statusId"
              v-if="item.menuChildrenVo"
            >
              <template slot="title">
                <div>
                  <i :class="iconObj[item.id]"></i>
                  <span style="color: #fff">{{ item.menu }}</span>
                </div>
              </template>
              <!-- 二级菜单 -->
              <template v-for="itemChild in item.menuChildrenVo">
                <el-submenu
                  v-if="
                    itemChild.menuChildrenVo && itemChild.menuChildrenVo.length
                  "
                  :index="itemChild.id + ''"
                  :key="itemChild.menuUrl"
                  @click="
                    saveNavState(itemChild.menuUrl), activeName(itemChild.menu)
                  "
                >
                  <template slot="title">
                    <i :class="itemChild.icon"></i>
                    <span>{{ itemChild.menu }}</span>
                  </template>
                  <!-- 三级菜单 -->
                  <el-menu-item
                    v-for="itemChild_Child in itemChild.menuChildrenVo"
                    :index="itemChild_Child.menuUrl"
                    :key="itemChild_Child.menuUrl"
                    @click="
                      saveNavState(itemChild_Child.menuUrl),
                        activeName(itemChild_Child.menu),
                        goTo(itemChild_Child)
                    "
                  >
                    <i :class="itemChild_Child.icon"></i>
                    <span slot="title">{{ itemChild_Child.menu }}</span>
                  </el-menu-item>
                </el-submenu>
                <!-- 判断是否有三级分页 -->
                <el-menu-item
                  v-else
                  :index="itemChild.menuUrl"
                  :key="itemChild.menuUrl"
                  @click="
                    saveNavState(itemChild.menuUrl),
                      activeName(itemChild.menu),
                      goTo(itemChild)
                  "
                >
                  <i :class="itemChild.icon"></i>
                  <span slot="title">{{ itemChild.menu }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main style="overflow-x: hidden">
        <transition mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Crumbs from "@/components/crumbs";
export default {
  components: {
    // Crumbs,
  },
  data() {
    return {
      editableTabsValue: "keywordAnalysis",
      editableTabs: [
        {
          menu: "关键词分析",
          path: "keywordAnalysis",
          close:null
        },
      ],
      // editableTabs:JSON.parse(window.sessionStorage.getItem('editableTabs')) ,
      activeIndex: "keywordAnalysis",
      isCollapse: false,
      activePath: "",
      info: JSON.parse(window.sessionStorage.getItem("info")), //取username
      menulist: [],
      iconObj: {
        1: "el-icon-pie-chart",
        6: "el-icon-discount",
        17: "el-icon-shopping-bag-1",
        23: "el-icon-shopping-cart-full",
        41: "el-icon-truck",
        43: "el-icon-document",
        45: "el-icon-setting",
        67: "el-icon-bangzhu",
        107: "el-icon-refresh",
        116: "el-icon-bank-card",
        135: "el-icon-suitcase-1",
      },
      // 
      list: JSON.parse(window.sessionStorage.getItem("menulist")),
    };
  },
  created() {
    this.getList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    getList() {
      this.$http
        .get(`api/login/get_menu`, {
          params: {},
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.menulist = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 折叠
    button_menu() {
      this.isCollapse = !this.isCollapse;
    },
    //退出
    quit() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // //清除token
          // sessionStorage.removeItem("token");
          //清除path
          sessionStorage.removeItem("activePath");
          //清除二级菜单
          sessionStorage.removeItem("activeName");
          // 清除存储信息
          sessionStorage.removeItem("info");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    activeName(activeName) {
      window.sessionStorage.setItem("activeName", activeName);
    },
    goTo(itemChild) {
      this.addTab(itemChild);
      this.editableTabsValue = itemChild.menuUrl;
      this.activeIndex = itemChild.menuUrl;
    },
    //添加tab
    addTab(itemChild) {
      console.log('itemChild',itemChild)
      this.targetclickname = itemChild;
      //如果已经打开了，则不添加
      for (let i = 0; i < this.editableTabs.length; i++) {
        if (itemChild.menu == this.editableTabs[i].menu) {
          return;
        }
      }
      let newTabName = itemChild.menu;
      this.editableTabs.push({
        menu: itemChild.menu,
        path: itemChild.menuUrl,
        close:true
      });
      // window.sessionStorage.setItem("editableTabs", JSON.stringify(this.editableTabs)); //存储editableTabs
      this.editableTabsValue = newTabName;
      
    },
    //点击tab,切换导航颜色
    changetab(targetName) {
      this.targetclickname = targetName.name;
      let tabs = this.editableTabs;
      let activeName = targetName.name;
      tabs.forEach((tab, index) => {
        if (tab.path === targetName.name) {
          this.$router.push(tab.path);
        }
      });
      this.editableTabsValue = activeName;
      this.activePath = activeName;
      console.log(this.activePath)
    },
    //关闭tab
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.path;
              this.$router.push(nextTab.path);
            }
          }
        });
      }
      this.targetclickname = activeName;
      this.activePath = activeName;
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.path !== targetName);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.28s;
}
.v-enter,
.v-leave-active {
  opacity: 0;
}
/* v-transform */
.v-transform-leave-active,
.v-transform-enter-active {
  transition: all 0.5s;
}
.v-enter {
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
  position: absolute;
}

.el-header {
  height: 101px !important;
  background: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  padding: 0 0px 0 0;
  box-sizing:border-box;
  .headetTop {
    height: 60px;
    background: #303133;
    .header_logo {
      width: 11.1%;
      height: 100%;
      background: #35363a;
      display: flex;
      justify-content: center;
      float: left;
      img {
        vertical-align: middle;
        float: left;
        margin-top: 5px;
      }
      h1 {
        float: left;
        line-height: 60px;
        color: #fff;
        margin-left: 10px;
      }
    }
    .information {
      float: right;
      line-height: 60px;
      color: #fff;
      margin-right: 20px;
      font-size: 15px;
    }
  }
  .headerBottom {
    width: 89%;
    height: 41px;
    // background: darksalmon;
    float: right;
  }
}
.el-aside {
  background-color: rgb(48, 49, 51);
  z-index: 1000;
  margin-top: 60px;
}
.el-main {
  background: #f0f2f5;
  margin-top: 100px;
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