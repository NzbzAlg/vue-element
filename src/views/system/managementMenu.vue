<template>
  <div class="managementMenu">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="addOneMenu">添加一级菜单</el-button>
    </div>
    <div class="content">
      <!-- 分类 -->
      <div class="classify">
        <div class="oneClassify" v-for="item in menuList" :key="item.id">
          <h3>
            一级菜单：{{ item.menu }}
            <el-button
              type="success"
              size="mini"
              @click="addSecondaryMenu(item)"
              >添加二级菜单</el-button
            >
          </h3>
          <div
            class="twoClassify"
            v-for="itemChild in item.menuChildrenVo"
            :key="itemChild.id"
          >
            <h4>
              二级菜单：{{ itemChild.menu }}
              <span v-if="itemChild.menuUrl != null">|</span>
              {{ itemChild.menuUrl }}
              <el-button
                type="success"
                size="mini"
                @click="addThreeMenu(itemChild)"
                >添加三级菜单</el-button
              >
            </h4>
            <div class="threeClassify">
              <span
                v-for="itemChild_Child in itemChild.menuChildrenVo"
                :key="itemChild_Child.id"
              >
                <span
                  >三级菜单：{{ itemChild_Child.menu }}
                  <b style="padding: 0 10px">|</b> 路径：{{
                    itemChild_Child.menuUrl
                  }}</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加一级菜单弹窗 -->
    <el-dialog title="添加一级菜单" :visible.sync="addOneMenuPop" width="30%">
      <el-form :model="levelOneMenu">
        <el-form-item label="一级菜单名称：" label-width="110px">
          <el-input
            v-model="levelOneMenu.oneMenuName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOneMenuPop = false">取 消</el-button>
        <el-button type="primary" @click="oneMenuDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加二级菜单弹窗 -->
    <el-dialog
      title="添加二级菜单"
      :visible.sync="addSecondaryMenuPop"
      width="30%"
    >
      <el-form :model="levelTwoMenu">
        <el-form-item label="二级菜单名称：" label-width="110px">
          <el-input
            v-model="levelTwoMenu.twoMenuName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="二级菜单路由：" label-width="110px">
          <el-input
            v-model="levelTwoMenu.twoMenuUrl"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="二级菜单接口：" label-width="110px">
          <el-input
            v-model="levelTwoMenu.twoMenuPort"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSecondaryMenuPop = false">取 消</el-button>
        <el-button type="primary" @click="secondaryMenuDetermine"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加三级菜单 -->
    <el-dialog title="添加三级菜单" :visible.sync="addThreeMenuPop" width="30%">
      <el-form :model="levelThreeMenu">
        <el-form-item label="三级菜单名称：" label-width="110px">
          <el-input
            v-model="levelThreeMenu.threeMenuName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="三级菜单路由：" label-width="110px">
          <el-input
            v-model="levelThreeMenu.threeMenuUrl"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="三级菜单接口：" label-width="110px">
          <el-input
            v-model="levelThreeMenu.threeMenuPort"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addThreeMenuPop = false">取 消</el-button>
        <el-button type="primary" @click="threeMenuDetermine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [], //列表数据
      addOneMenuPop: false, //添加一级菜单弹窗
      addSecondaryMenuPop: false, //添加二级菜单弹窗
      addThreeMenuPop: false, //添加二级菜单弹窗
      levelOneMenu: {
        //添加一级菜单
        oneMenuName: "",
      },
      levelTwoMenu: {
        //添加二级菜单
        twoMenuName: "", //名称
        twoMenuPort: "", //接口
        twoMenuUrl: "", //路由
      },
      levelThreeMenu: {
        //添加三级菜单
        threeMenuName: "", //名称
        threeMenuPort: "", //接口
        threeMenuUrl: "", //路由
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 添加一级菜单弹窗
    addOneMenu() {
      this.addOneMenuPop = true;
    },
    // 添加一级菜单确定
    oneMenuDetermine() {
      if (this.levelOneMenu.oneMenuName == "") {
        this.$message.error("添加一级菜单名称不能为空");
      } else {
        let info = {
          name: this.levelOneMenu.oneMenuName,
        };
        this.$http.post(`/api/admin/addrank1`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            // this.addOneMenuPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 添加二级菜单弹窗
    addSecondaryMenu(item) {
      this.id = item.id;
      this.addSecondaryMenuPop = true;
    },
    // 添加二级菜单确定
    secondaryMenuDetermine() {
      if (this.levelTwoMenu.twoMenuName == "") {
        this.$message.error("添加二级菜单名称不能为空");
      } else {
        let info = {
          name1: this.levelTwoMenu.twoMenuName,
          href: this.levelTwoMenu.twoMenuPort,
          menuUrl: this.levelTwoMenu.twoMenuUrl,
          id: this.id,
        };
        this.$http.post(`/api/admin/addrank2`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.addSecondaryMenuPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 添加三级菜单弹窗
    addThreeMenu(itemChild) {
      this.id = itemChild.id;
      this.addThreeMenuPop = true;
    },
    // 添加三级菜单确定
    threeMenuDetermine() {
      if (this.levelThreeMenu.threeMenuName == "") {
        this.$message.error("添加三级菜单名称不能为空");
      } else {
        let info = {
          name1: this.levelThreeMenu.threeMenuName,
          href: this.levelThreeMenu.threeMenuPort,
          menuUrl: this.levelThreeMenu.threeMenuUrl,
          id: this.id,
        };
        this.$http.post(`/api/admin/addrank3`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.addThreeMenuPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 列表数据
    getList() {
      this.$http.get(`/api/admin/do_menu`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.menuList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
}
.classify {
  h4 {
    margin-left: 40px;
  }
  .threeClassify {
    width: 100%;
    span {
      padding-left: 60px;
      display: inline-block;
      margin-bottom: 20px;
    }
  }
}
</style>