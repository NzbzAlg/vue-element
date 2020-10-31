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
            style="width: 36px; height: 36px"
          />
          <p>紫缘管理系统</p>
        </div>
        <!-- 个人信息 -->
        <div class="information">
          <div class="switchStore">
            <div class="switchStore_title">
              <img
                src="https://admin.captainbi.com/statics/amzcaptain/img/country/DE.png"
                alt=""
              />
              <span>tomotime_us</span>
              <span>
                <i class="el-icon-arrow-down"></i>
              </span>
              <div class="hidden_content">
                <div class="selectStore">
                  <p>
                    <span
                      @click="isActive = 1"
                      :class="{ dayActive: isActive === 1 }"
                      >按店铺</span
                    >
                    <span
                      @click="isActive = 2"
                      :class="{ dayActive: isActive === 2 }"
                      >按国家</span
                    >
                    <span
                      @click="isActive = 3"
                      :class="{ dayActive: isActive === 3 }"
                      >按站点</span
                    >
                    <span
                      @click="isActive = 4"
                      :class="{ dayActive: isActive === 4 }"
                      >多选店铺</span
                    >
                    <span
                      @click="isActive = 5"
                      :class="{ dayActive: isActive === 5 }"
                      >子账号</span
                    >
                  </p>
                </div>
                <div class="selectContent" v-show="isActive == 1">
                  <div class="selectContent_item">
                    <img
                      src="https://admin.captainbi.com/statics/amzcaptain/img/country/DE.png"
                      alt=""
                    />
                    <span>tomotime_us</span>
                  </div>
                  <div class="selectContent_item">
                    <img
                      src="https://admin.captainbi.com/statics/amzcaptain/img/country/DE.png"
                      alt=""
                    />
                    <span>tomotime_us</span>
                  </div>
                  <div class="selectContent_item">
                    <img
                      src="https://admin.captainbi.com/statics/amzcaptain/img/country/DE.png"
                      alt=""
                    />
                    <span>tomotime_us</span>
                  </div>
                  <div class="selectContent_item">
                    <img
                      src="https://admin.captainbi.com/statics/amzcaptain/img/country/DE.png"
                      alt=""
                    />
                    <span>tomotime_us</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="userinfo">
            <span>
              <i class="el-icon-user"></i> 登录账户:{{ info.username }}
            </span>
            <!-- 系统通知 -->
            <el-popover
              placement="top-start"
              title="通知"
              width="200"
              trigger="click"
            >
              <el-divider></el-divider>
              <div>
                <p>
                  <i class="el-icon-success" sColor></i
                  ><a href="#">这是第一条通知</a>
                </p>
                <p><i class="el-icon-warning" wColor></i>这是第一条警告通知</p>
              </div>
              <el-divider></el-divider>
              <div class="btn-ground">
                <el-button type="primary" size="mini">全部已读</el-button>
                <el-button type="danger" size="mini">清空</el-button>
              </div>
              <p slot="reference" multiBtn @click="MQBox">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="系统通知"
                  placement="bottom"
                >
                  <i class="el-icon-message-solid badge"></i>
                </el-tooltip>
              </p>
            </el-popover>
            <!-- 刷新页面 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新页面"
              placement="bottom"
            >
              <p multiBtn @click="$router.go(0)">
                <i class="el-icon-refresh"></i>
              </p>
            </el-tooltip>
            <!-- 个人信息 -->
            <el-dropdown
              trigger="hover"
              placement="bottom"
              @command="handleCommand"
            >
              <p class="el-dropdown-link" multiBtn>
                <el-avatar
                  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                ></el-avatar>
              </p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="updatePass"
                  >修改密码</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <!-- <span style="cursor: pointer">
              <i class="el-icon-setting"></i> 修改密码
            </span>
            <span @click="quit" style="cursor: pointer">
              <i class="el-icon-switch-button"></i> 退出
            </span> -->
          </div>
        </div>
      </div>
      <!-- 头部下 -->
      <div class="headerBottom">
        <el-tabs
          v-model="activePath"
          @tab-click="changetab"
          @tab-remove="removeTab"
          type="card"
        >
          <el-tab-pane
            v-for="item in editableTabss"
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
          @select="handleselect"
        >
          <!-- 一级菜单 -->
          <template v-for="(item, index) in menulist">
            <el-submenu
              :index="item.id + ''"
              :key="index"
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
              <template v-for="(itemChild, index) in item.menuChildrenVo">
                <el-submenu
                  v-if="
                    itemChild.menuChildrenVo && itemChild.menuChildrenVo.length
                  "
                  :index="itemChild.id + ''"
                  :key="index"
                >
                  <template slot="title">
                    <div>
                      <i :class="itemChild.icon"></i>
                      <span>{{ itemChild.menu }}</span>
                    </div>
                  </template>
                  <!-- 三级菜单 -->
                  <el-menu-item
                    v-for="itemChild_Child in itemChild.menuChildrenVo"
                    :index="itemChild_Child.menuUrl + ''"
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
                  :index="itemChild.menuUrl + ''"
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
  inject: ["reload"], // 注入重载的功能（注入依赖）
  components: {
    // Crumbs,
  },
  data() {
    return {
      isActive: 1,
      activePath: "",
      editableTabs: [],
      editableTabss: [
        {
          close: null,
          menu: "数据看板",
          path: "dataBoard",
        },
      ],
      isCollapse: false,
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
        162: "el-icon-data-line",
        173: "el-icon-box",
        200: "el-icon-s-home",
      },
      list: JSON.parse(window.sessionStorage.getItem("menulist")),
    };
  },
  created() {
    this.getList();
    this.activePath = window.sessionStorage.getItem("activePath");
    this.editableTabss = JSON.parse(
      window.sessionStorage.getItem("editableTabs")
    );
  },
  methods: {
    handleselect(index) {
      if (index === this.activePath) {
        this.reload();
      }
    },
    handleCommand(command) {
      if (command === "updatePass") {
        // this.$router.push({
        //   path: "/updatePass",
        // });
      } else if (command == "logout") {
        this.$confirm("确定要退出登录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // //清除token
            sessionStorage.removeItem("token");
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
      }
    },
    MQBox() {},
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
      this.activePath = itemChild.menuUrl;
    },
    //添加tab
    addTab(itemChild) {
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
        close: true,
      });
      this.editableTabss = this.editableTabs;
      this.activePath = newTabName;
      window.sessionStorage.setItem(
        "editableTabs",
        JSON.stringify(this.editableTabss)
      ); //存储editableTabs
    },
    //点击tab,切换导航颜色
    changetab(targetName) {
      this.targetclickname = targetName.name;
      let tabs = this.editableTabss;
      let activeName = targetName.name;
      tabs.forEach((tab, index) => {
        if (tab.path === targetName.name) {
          this.$router.push(tab.path);
        }
      });
      this.activePath = activeName;
      window.sessionStorage.setItem("activePath", this.activePath);
    },
    //关闭tab
    removeTab(targetName) {
      let tabs = this.editableTabss;
      let activeName = this.activePath;
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
      this.editableTabss = tabs.filter((tab) => tab.path !== targetName);
      //解决刷新消失
      window.sessionStorage.setItem(
        "editableTabs",
        JSON.stringify(this.editableTabss)
      );
      window.sessionStorage.setItem("activePath", this.activePath);
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
  height: 105px !important;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  padding: 0 0px 0 0;
  box-sizing: border-box;
  .headetTop {
    height: 60px;
    background: #303133;
    display: flex;
    justify-content: space-between;
    .header_logo {
      width: 11%;
      height: 99%;
      display: flex;
      justify-content: center;
      float: left;
      border-bottom: 1px solid #333;
      box-shadow: 0 0 3px 2px #000000;
      img {
        vertical-align: middle;
        float: left;
        margin-top: 11px;
      }
      p {
        float: left;
        line-height: 60px;
        color: #c0c4cc;
        margin-left: 10px;
      }
    }
    .information {
      width: 88%;
      height: 60px;
      line-height: 60px;
      color: #fff;
      margin-right: 20px;
      font-size: 15px;
      .switchStore {
        float: left;
        height: 100%;
        .switchStore_title {
          margin-left: 40px;
          position: relative;
          img {
            width: 20px;
            height: 13px;
            vertical-align: middle;
          }
          span {
            font-size: 14px;
            padding-left: 10px;
          }

          .hidden_content {
            display: none;
            width: 400px;
            // height: 100px;
            background: #fff;
            box-shadow: 0 1px 8px #c2c2c2;
            position: absolute;
            top: 60px;
            z-index: 999;
            .selectStore {
              // padding:0 20px;
              p {
                text-align: center;
                span {
                  padding: 7px 10px;
                  min-width: 50px;
                  text-align: center;
                  color: #27b8d0;
                  border-left: 1px solid #27b8d0;
                  border-top: 1px solid #27b8d0;
                  border-bottom: 1px solid #27b8d0;
                  border-right: 1px solid #27b8d0;
                  font-size: 12px;
                  font-weight: normal;
                  cursor: pointer;
                }
                span:hover {
                  padding: 7px 10px;
                  min-width: 50px;
                  text-align: center;
                  color: #fff;
                  border-left: 1px solid #27b8d0;
                  border-top: 1px solid #27b8d0;
                  border-bottom: 1px solid #27b8d0;
                  border-right: 1px solid #27b8d0;
                  font-size: 12px;
                  font-weight: normal;
                  cursor: pointer;
                  background: #27b8d0;
                }
                .dayActive {
                  padding: 7px 10px;
                  min-width: 50px;
                  text-align: center;
                  color: #fff;
                  border-left: 1px solid #27b8d0;
                  border-top: 1px solid #27b8d0;
                  border-bottom: 1px solid #27b8d0;
                  border-right: 1px solid #27b8d0;
                  font-size: 12px;
                  font-weight: normal;
                  cursor: pointer;
                  background: #27b8d0;
                }
              }
            }
            .selectContent {
              color: #000;
              padding: 20px;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              .selectContent_item {
                background: #eae7e7;
                width: 49%;
                height: 30px;
                line-height: 30px;
                margin-top: 5px;
              }
            }
          }
        }
        .switchStore_title:hover {
          cursor: pointer;
          .hidden_content {
            display: block;
          }
        }
      }
      .userinfo {
        float: right;
        p[multiBtn] {
          width: 38px;
          max-width: 38px;
          height: 38px;
          max-height: 38px;
          font-size: 18px;
          border-radius: 38px;
          margin: 2px;
          cursor: pointer;
          display: inline-flex;
          vertical-align: middle;
        }

        [multiBtn] i {
          line-height: 38px;
          margin: 0 auto;
        }

        [multiBtn]:hover {
          box-shadow: 0 0 6px #b3b3b3 inset;
          transition: all 0.5s ease;
        }
        .badge:after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #e60000;
          border-radius: 10px;
        }
      }
    }
  }
  .headerBottom {
    width: 89%;
    height: 43px;
    // background: darksalmon;
    float: right;
    box-shadow: 0 1px 3px 0 #595959;
    background: #fff;
    /deep/.el-tabs {
      height: 100%;
    }
    /deep/.el-tabs__header {
      border: none !important;
    }
    /deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      border: none;
    }
    /deep/.el-tabs__item {
      cursor: pointer;
      background-color: #d9d9d9;
      color: #4d4d4d;
      border: 0px;
      padding-left: 15px;
      font-size: 14px;
      box-shadow: 1px 1px 1px 1px #999999;
      margin-left: 10px;
      height: 34px;
      line-height: 34px;
      margin-top: 5px;
      border-radius: 5px;
    }
    /deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    /deep/.el-tabs__nav-scroll {
      height: 50px;
    }
    /deep/.el-tabs__item.is-active {
      background: #303133;
      color: #fff;
    }
    /deep/.el-tabs__item.is-active:before {
      content: " ";
      width: 8px;
      height: 8px;
      background-color: #00cc00;
      border-radius: 5px;
      z-index: 1000;
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
    }
    /deep/.el-tabs__item:hover {
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #303133;
  z-index: 1000;
  margin-top: 60px;
  box-shadow: 0 3px 3px 2px #000000;
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