<template>
  <div class="divisionalManagement">
    <div class="title">
      <el-button type="primary" @click="addDepartment">添加部门</el-button>
    </div>
    <!-- 列表数据 -->
    <div class="content">
      <el-table :data="department" border style="width: 100%">
        <el-table-column prop="name" label="部门名称" width="300" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="examinePop(scope.row)">查看部门角色</el-button>
            <el-button type="primary" size="mini" @click="editorialDepartment(scope.row)">编辑部门名称</el-button>
            <el-button type="primary" size="mini" @click="newDepartmentRoles(scope.row)">新增部门角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加部门弹窗 -->
    <el-dialog title="提示" :visible.sync="addDepartmentPop" width="30%">
      <el-form :model="departmentForm">
        <el-row>
          <el-col>
            <el-form-item label="部门名称：" label-width="90px">
              <el-input v-model="departmentForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDepartmentPop = false">取 消</el-button>
        <el-button type="primary" @click="addDepartmentDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑部门弹窗 -->
    <el-dialog title="提示" :visible.sync="editorialDepartmentPop" width="30%">
      <el-form :model="editDepartmentForm">
        <el-row>
          <el-col>
            <el-form-item label="部门名称：" label-width="90px">
              <el-input v-model="editDepartmentForm.data"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editorialDepartmentPop = false">取 消</el-button>
        <el-button type="primary" @click="editDepartmentDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增部门角色弹窗 -->
    <el-dialog title="提示" :visible.sync="newDepartmentRolesPop" width="30%">
      <el-form :model="newDepartmentForm">
        <el-row>
          <el-col>
            <el-form-item label="角色名称：" label-width="90px">
              <el-input v-model="newDepartmentForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDepartmentRolesPop = false">取 消</el-button>
        <el-button type="primary" @click="newDepartmentDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看账号弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-table :data="departmentDetails" border style="width: 100%">
        <el-table-column prop="groupname" label="角色" align="center" width="200"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="roleStore(scope.row)">角色店铺</el-button>
            <el-button type="primary" @click="roleWarehouse(scope.row)">角色仓库</el-button>
            <el-button type="primary" @click="roleMenu(scope.row)">角色菜单</el-button>
            <el-button type="primary" @click="rolePermission(scope.row)">角色权限</el-button>
            <el-button type="success" @click="editRoleName(scope.row)">编辑角色名称</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看角色店铺弹窗 -->
    <el-dialog title="提示" :visible.sync="roleStorePop" width="50%">
      <el-tree
        :data="roleStoreList"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="defaultProps"
        :default-checked-keys="roleStoreTable"
        :default-expand-all="true"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <!-- <button @click="getCheckedKeys"></button> -->
        <el-button @click="roleStorePop = false">取 消</el-button>
        <el-button type="primary" @click="characterConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看角色仓库弹窗 -->
    <el-dialog title="提示" :visible.sync="roleWarehousePop" width="50%">
      <el-tree
        :data="roleWarehouseList"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="roleWarehouseProps"
        :default-checked-keys="roleWarehouseTable"
        :default-expand-all="true"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleWarehousePop = false">取 消</el-button>
        <el-button type="primary" @click="roleWarehouseConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看角色菜单弹窗 -->
    <el-dialog title="提示" :visible.sync="roleMenuPop" width="50%">
      <el-tree
        :data="roleMenuList"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="roleMenuProps"
        :default-checked-keys="roleMenuTable"
        :default-expand-all="true"
      :check-strictly="true"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleMenuPop = false">取 消</el-button>
        <el-button type="primary" @click="roleMenuConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看角色权限弹窗 -->
    <el-dialog title="提示" :visible.sync="rolePermissionPop" width="50%">
      <el-tree
        :data="rolePermissionList"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="rolePermissionProps"
        :default-checked-keys="rolePermissionTable"
        :default-expand-all="true"
      ></el-tree>
      <!-- :check-strictly="true" -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolePermissionPop = false">取 消</el-button>
        <el-button type="primary" @click="rolePermissionConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色名称弹窗 -->
    <el-dialog title="提示" :visible.sync="editRoleNamePop" width="30%">
      <el-form :model="editRoleNameForm">
        <el-row>
          <el-col>
            <el-form-item label="角色名称：" label-width="90px">
              <el-input v-model="editRoleNameForm.data"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- :check-strictly="true" -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleNamePop = false">取 消</el-button>
        <el-button type="primary" @click="editRoleNameConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addDepartmentPop: false, //添加部门弹窗
      departmentForm: {
        username: "",
      }, //部门
      editorialDepartmentPop: false, //编辑部门弹窗
      editDepartmentForm: {
        data: "",
      },
      newDepartmentRolesPop: false, //新增部门角色弹窗
      newDepartmentForm: {
        name: "",
      },
      editRoleNamePop: false, //编辑角色名称弹窗
      //editRoleNameForm
      editRoleNameForm: {
        data: "",
      },
      dialogVisible: false,
      roleStorePop: false,
      roleWarehousePop: false,
      roleMenuPop: false,
      rolePermissionPop: false,
      currentPage1: 1,
      department: [], //列表数据
      departmentDetails: [], //弹窗列表数据
      roleStoreTable: [], //角色店铺数据
      roleStoreList: [], //角色店铺列表
      defaultProps: {
        //角色店铺数据
        children: "children",
        label: "shopname",
      },
      roleWarehouseTable: [], //角色仓库数据
      roleWarehouseList: [], //角色仓库列表
      roleWarehouseProps: {
        //角色仓库数据
        children: "children",
        label: "name",
      },
      roleMenuTable: [], //角色列表数据
      roleMenuList: [], //角色菜单列表
      roleMenuProps: {
        //角色菜单数据
        children: "menuChildrenVo",
        label: "menu",
      },
      rolePermissionTable: [], //角色列表数据
      rolePermissionList: [], //角色菜单数据
      rolePermissionProps: {
        //角色菜单数据
        children: "menuChildrenVo",
        label: "menuname",
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //   getCheckedKeys(){
    //       console.log(this.$refs.tree.getCheckedKeys());
    //   },
    //   添加部门
    addDepartment() {
      this.addDepartmentPop = true;
    },
    // 添加部门确定
    addDepartmentDetermine() {
      this.$http
        .post(
          `api/admin/insertdedepartment?name=${this.departmentForm.username}`
        )
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.addDepartmentPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 编辑部门
    editorialDepartment(row) {
      console.log(row.id);
      this.id = row.id;
      this.editorialDepartmentPop = true;
      this.$http
        .post(`api/admin/get_dedepartment_from_id?id=${row.id}`)
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.editDepartmentForm = res.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 编辑部门确定
    editDepartmentDetermine() {
      this.$http
        .post(
          `api/admin/updedepartment?id=${this.id}&name=${this.editDepartmentForm.data}`
        )
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.editorialDepartmentPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 新增部门角色
    newDepartmentRoles(row) {
      console.log(row.id);
      this.id = row.id;
      this.newDepartmentRolesPop = true;
    },
    // 新增部门角色确定
    newDepartmentDetermine() {
      this.$http
        .post(
          `api/admin/insertgroup?id=${this.id}&name=${this.newDepartmentForm.name}`
        )
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.newDepartmentRolesPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    examinePop(row) {
      this.dialogVisible = true;
      this.$http.post(`api/admin/get_group?id=${row.id}`).then((res) => {
        const { code, data } = res.data;
        // if (code == 200) {
        //   console.log(111);
        // } else {
        //   console.log(2222);
        // }
        this.departmentDetails = res.data.data;
      });
    },
    getList() {
      this.$http.post(`api/admin/department_list`).then((res) => {
        this.department = res.data.data;
      });
    },
    // 查看角色店铺
    roleStore(row) {
      this.id = row.id;
      this.$http.post(`api/admin/get_group_shop?id=${row.id}`).then((res) => {
        this.roleStoreList = res.data.data;
        let arr = res.data.data;
        var temporaryArray = [];
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].check == 0) {
            console.log("000");
          } else {
            temporaryArray.push(arr[i].id);
          }
        }
        this.roleStoreTable = temporaryArray;
      });
      this.roleStorePop = true;
    },
    // 查看角色店铺确定
    characterConfirmation() {
      this.pageId = this.$refs.tree.getCheckedKeys();
      let info = {
        arr: this.pageId,
        id: this.id,
      };
      this.$http.post(`api/admin/insertgroup_shop`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.getList();
          this.roleStorePop = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 查看角色仓库
    roleWarehouse(row) {
      this.id = row.id;
      this.roleWarehousePop = true;
      this.$http.post(`api/admin/get_group_cang?id=${row.id}`).then((res) => {
        this.roleWarehouseList = res.data.data;
        let arr = res.data.data;
        var temporaryArray = [];
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].check == 0) {
            console.log("000");
          } else {
            temporaryArray.push(arr[i].id);
          }
        }
        this.roleWarehouseTable = temporaryArray;
      });
    },
    // 查看角色仓库确定
    roleWarehouseConfirmation() {
      this.pageId = this.$refs.tree.getCheckedKeys();
      let info = {
        arr: this.pageId,
        id: this.id,
      };
      this.$http.post(`api/admin/insertgroup_cang`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.getList();
          this.roleWarehousePop = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 查看角色菜单
    roleMenu(row) {
      this.id = row.id;
      this.roleMenuPop = true;
      this.$http
        .post(`api/admin/get_group_emploee?id=${row.id}`)
        .then((res) => {
          this.roleMenuList = res.data.data;
          let arr = res.data.data;
          let temporaryArray = [];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].check != 0) {
               temporaryArray.push(arr[i].id);
            } 
            let tem2=arr[i].menuChildrenVo;
            for (let index = 0; index < tem2.length; index++) {
                if (tem2[index].check != 0) {
                  temporaryArray.push(tem2[index].id);
                }
              let tem3=tem2[index].menuChildrenVo;
              for (let index1 = 0; index1 < tem3.length; index1++) {
                if (tem3[index1].check != 0) {
                  temporaryArray.push(tem3[index1].id);
                }
                
              }
            }

          }
          this.roleMenuTable = temporaryArray;
        });
    },
    // 查看角色菜单确定
    roleMenuConfirmation() {
      this.pageId = this.$refs.tree.getCheckedKeys();
      this.pageId1 = this.$refs.tree.getHalfCheckedKeys();
      let idsArr = [...new Set(this.pageId1), ...new Set(this.pageId)];
      let info = {
        arr: idsArr,
        id: this.id,
      };
      this.$http.post(`api/admin/insertgroup_emploee`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.getList();
          this.roleMenuPop = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 角色权限
    rolePermission(row) {
      this.id = row.id;
      this.rolePermissionPop = true;
      this.$http
        .post(`api/admin/get_group_approval?id=${row.id}`)
        .then((res) => {
          this.rolePermissionList = res.data.data;
          let arr = res.data.data;
          var temporaryArray = [];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].check == 0) {
              console.log("000");
            } else {
              temporaryArray.push(arr[i].id);
            }
          }
          this.rolePermissionTable = temporaryArray;
        });
    },
    // 查看角色权限确定
    rolePermissionConfirmation() {
      this.pageId = this.$refs.tree.getCheckedKeys();
      let info = {
        arr: this.pageId,
        id: this.id,
      };
      this.$http.post(`api/admin/insertgroup_approval`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.getList();
          this.roleWarehousePop = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 编辑角色名称弹窗
    editRoleName(row) {
      this.id = row.id;
      this.editRoleNamePop = true;
      this.$http
        .post(`api/admin/get_group_from_id?id=${this.id}`)
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.editRoleNameForm = res.data;
          }
        });
    },
    // 编辑角色名称确定
    editRoleNameConfirmation() {
      this.$http.post(`api/admin/up_dedepartment?id=${this.id}&name=${this.editRoleNameForm.data}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
        //   this.getList();
        //   this.roleWarehousePop = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>