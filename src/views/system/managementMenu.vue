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
          <h3 style="margin-bottom: 15px">
            一级菜单：{{ item.menu }}
            <el-button
              type="success"
              size="mini"
              @click="addSecondaryMenu(item)"
              >添加二级菜单</el-button
            >
            <el-button type="primary" size="mini" @click="editLevelMenu(item)"
              >编辑</el-button
            >
          </h3>
          <div
            class="twoClassify"
            v-for="itemChild in item.menuChildrenVo"
            :key="itemChild.id"
          >
            <h4 style="margin-bottom: 15px">
              二级菜单：{{ itemChild.menu }}
              <span v-if="itemChild.menuUrl != null">|</span>
              {{ itemChild.menuUrl }}
              <el-button
                type="success"
                size="mini"
                @click="addThreeMenu(itemChild)"
                >添加三级菜单</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="editTwoMenu(itemChild)"
                >编辑</el-button
              >
            </h4>
            <div class="threeClassify">
              <span
                v-for="itemChild_Child in itemChild.menuChildrenVo"
                :key="itemChild_Child.id"
              >
                <span
                  >三级菜单：{{ itemChild_Child.menu }}
                  <b style="padding: 0 10px">|</b>
                  路由：{{ itemChild_Child.menuUrl }}
                  <span style="padding-left: 10px">
                    接口：{{ itemChild_Child.href }}
                  </span>
                </span>
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left: 10px"
                  @click="editThreeMenu(itemChild_Child)"
                  >编辑</el-button
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
    <!-- 编辑一级菜单弹窗 -->
    <el-dialog
      title="编辑一级菜单"
      :visible.sync="editLevelMenuPop"
      width="30%"
    >
      <el-form :model="editLevelOneMenu">
        <el-form-item label="一级菜单名称：" label-width="110px">
          <el-input v-model="editLevelOneMenu.menu"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editLevelMenuPop = false">取 消</el-button>
        <el-button type="primary" @click="editOneMenuDetermine"
          >确 定</el-button
        >
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
    <!-- 编辑二级菜单 -->
    <el-dialog title="编辑二级菜单" :visible.sync="editTwoMenuPop" width="30%">
      <el-form :model="editLevelTwoMenu">
        <el-form-item label="二级菜单名称：" label-width="110px">
          <el-input v-model="editLevelTwoMenu.menu"></el-input>
        </el-form-item>
        <el-form-item label="二级菜单路由：" label-width="110px">
          <el-input v-model="editLevelTwoMenu.menuUrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editTwoMenuPop = false">取 消</el-button>
        <el-button type="primary" @click="editTwoMenuDetermine"
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
    <!-- 编辑三级菜单 -->
    <el-dialog
      title="编辑三级菜单"
      :visible.sync="editThreeMenuPop"
      width="30%"
    >
      <el-form :model="editLevelThreeMenu">
        <el-form-item label="三级菜单名称：" label-width="110px">
          <el-input v-model="editLevelThreeMenu.menu"></el-input>
        </el-form-item>
        <el-form-item label="三级菜单路由：" label-width="110px">
          <el-input v-model="editLevelThreeMenu.menuUrl"></el-input>
        </el-form-item>
        <el-form-item label="三级菜单接口：" label-width="110px">
          <el-input v-model="editLevelThreeMenu.href"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editThreeMenuPop = false">取 消</el-button>
        <el-button type="primary" @click="editThreeMenuDetermine"
          >确 定</el-button
        >
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
      editLevelMenuPop: false, //编辑一级菜单弹窗
      addSecondaryMenuPop: false, //添加二级菜单弹窗
      editTwoMenuPop: false, //编辑二级菜单弹窗
      addThreeMenuPop: false, //添加三级菜单弹窗
      editThreeMenuPop: false, //编辑三级菜单弹窗
      levelOneMenu: {
        //添加一级菜单
        oneMenuName: "",
      },
      // 编辑一级菜单名称
      editLevelOneMenu: {
        menu: "",
      },
      levelTwoMenu: {
        //添加二级菜单
        twoMenuName: "", //名称
        twoMenuPort: "", //接口
        twoMenuUrl: "", //路由
      },
      // 编辑二级菜单名称
      editLevelTwoMenu: {},
      levelThreeMenu: {
        //添加三级菜单
        threeMenuName: "", //名称
        threeMenuPort: "", //接口
        threeMenuUrl: "", //路由
      },
      // 编辑三级菜单
      editLevelThreeMenu: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 列表数据
    getList() {
      this.$http.get(`admin/do_menu`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.menuList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
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
        this.$http.post(`admin/addrank1`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.addOneMenuPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 编辑一级菜单弹窗
    editLevelMenu(item) {
      this.id = item.id;
      this.editLevelMenuPop = true;
      this.$http.get(`get_menu_name?id=${this.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.editLevelOneMenu = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 编辑一级菜单确定
    editOneMenuDetermine() {
      this.$http
        .get(`admin/update_menu`, {
          params: {
            id: this.id,
            name: this.editLevelOneMenu.menu,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.editLevelMenuPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
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
          name: this.levelTwoMenu.twoMenuName,
          href: this.levelTwoMenu.twoMenuPort,
          menuUrl: this.levelTwoMenu.twoMenuUrl,
          id: this.id,
        };
        this.$http.post(`admin/addrank2`, info).then((res) => {
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
    // 编辑二级菜单弹窗
    editTwoMenu(itemChild) {
      this.id = itemChild.id;
      this.editTwoMenuPop = true;
      this.$http.get(`admin/get_menu_name?id=${this.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.editLevelTwoMenu = res.data.data;
          console.log(this.editLevelTwoMenu);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 编辑二级菜单确定
    editTwoMenuDetermine() {
      this.$http
        .get(`admin/update_menu`, {
          params: {
            id: this.id,
            name: this.editLevelTwoMenu.menu,
            menuUrl: this.editLevelTwoMenu.menuUrl,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.editTwoMenuPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
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
          name: this.levelThreeMenu.threeMenuName,
          href: this.levelThreeMenu.threeMenuPort,
          menuUrl: this.levelThreeMenu.threeMenuUrl,
          id: this.id,
        };
        this.$http.post(`admin/addrank3`, info).then((res) => {
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
    //编辑三级菜单弹窗
    editThreeMenu(itemChild_Child) {
      this.editThreeMenuPop = true;
      this.id = itemChild_Child.id;
      this.$http.get(`admin/get_menu_name?id=${this.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.editLevelThreeMenu = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //编辑三级菜单确定
    editThreeMenuDetermine() {
      this.$http
        .get(`admin/update_menu`, {
          params: {
            id: this.id,
            name: this.editLevelThreeMenu.menu,
            href: this.editLevelThreeMenu.href,
            menuUrl: this.editLevelThreeMenu.menuUrl,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.editThreeMenuPop = false;
            this.getList();
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