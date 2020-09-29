<template>
  <div class="maintainingState">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="addCategories">添加大类</el-button>
    </div>
    <div class="content">
      <!-- 分类 -->
      <div class="classify">
        <div class="oneClassify" v-for="item in categoryListing" :key="item.id">
          <h3>
            {{ item.menuname }}
            <el-button type="success" size="mini" @click="addSmallClass(item)"
              >添加小类</el-button
            >
          </h3>
          <div
            class="twoClassify"
            v-for="itemChild in item.menuChildrenVo"
            :key="itemChild.id"
          >
            <h4>
              {{ itemChild.menuname }}
              <el-button type="success" size="mini" @click="addPermission(itemChild)">添加权限</el-button>
            </h4>
            <div class="threeClassify">
              <span
                v-for="itemChild_Child in itemChild.menuChildrenVo"
                :key="itemChild_Child.id"
              >
                <span>权限名称：{{ itemChild_Child.menuname }} <b style="padding:0 10px">|</b> 权限路径：{{itemChild_Child.href}}</span> 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加大类弹窗 -->
    <el-dialog title="添加大类" :visible.sync="addCategoriesPop" width="30%">
      <el-form :model="broadHeading">
        <el-form-item label="大类名称：" label-width="90px">
          <el-input
            v-model="broadHeading.bigData"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCategoriesPop = false">取 消</el-button>
        <el-button type="primary" @click="categoriesDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加小类弹窗 -->
    <el-dialog title="添加小类" :visible.sync="addSmallClassPop" width="30%">
      <el-form :model="subclass">
        <el-form-item label="小类名称：" label-width="90px">
          <el-input v-model="subclass.smallData" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSmallClassPop = false">取 消</el-button>
        <el-button type="primary" @click="smallDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加权限弹窗 -->
    <el-dialog title="添加权限" :visible.sync="addPermissionPop" width="30%">
      <el-form :model="formPermission">
        <el-form-item label="权限名：" label-width="90px">
          <el-input v-model="formPermission.permissionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限路径：" label-width="90px">
          <el-input v-model="formPermission.accessPath" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPermissionPop = false">取 消</el-button>
        <el-button type="primary" @click="addPermissionDetermine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryListing: [], //列表数据
      addCategoriesPop: false, //添加大类弹窗
      addSmallClassPop: false, //添加大类弹窗
      addPermissionPop: false, //添加权限弹窗
      broadHeading: {
        //添加大类数据
        bigData: "",
      },
      subclass: {
        //添加小类数据
        smallData: "",
      },
      formPermission:{
        //权限添加
        permissionName:'',
        accessPath:''
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 添加大类弹窗
    addCategories() {
      this.addCategoriesPop = true;
    },
    // 添加大类确定
    categoriesDetermine() {
      if (this.broadHeading.bigData == "") {
        this.$message.error("添加大类名称不能为空");
      } else {
        let info = {
          name: this.broadHeading.bigData,
        };
        this.$http.post(`/api/admin/addbig`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.addCategoriesPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 添加小类弹窗
    addSmallClass(item) {
      this.menuname = item.menuname;
      this.addSmallClassPop = true;
    },
    // 添加小类确定
    smallDetermine() {
      if (this.subclass.smallData == "") {
        this.$message.error("添加小类名称不能为空");
      } else {
        let info = {
          name: this.menuname,
          name1: this.subclass.smallData,
        };
        this.$http.post(`/api/admin/addxiao`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.addSmallClassPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 添加权限弹窗
    addPermission(itemChild){
      this.id = itemChild.id
      this.addPermissionPop = true
    },
    // 添加权限确定
    addPermissionDetermine(){
      if (this.formPermission.permissionName == "") {
        this.$message.error("添加权限名称不能为空");
      } else if(this.formPermission.accessPath == ""){
        this.$message.error("添加权限路径不能为空");
      } else {
        let info = {
          name1: this.formPermission.permissionName,
          name2: this.formPermission.accessPath,
          id:this.id
        };
        this.$http.post(`/api/admin/addquan`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.addPermissionPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 列表数据
    getList() {
      this.$http.get(`/api/admin/shenpi`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.categoryListing = res.data.data;
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