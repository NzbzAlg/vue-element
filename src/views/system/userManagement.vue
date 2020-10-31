<template>
  <div class="userManagement">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <!-- 部门 -->
      <el-select
        v-model="departmentModel"
        placeholder="部门"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in departmentSelect"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 状态 -->
      <el-select
        v-model="state"
        placeholder="状态"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in stateDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 姓名 -->
      <el-input
        placeholder="搜索姓名"
        filterable
        style="width: 150px; margin-left: 10px"
        size="medium"
        v-model="name"
      ></el-input>
      <el-button
        type="primary"
        size="medium"
        style="margin-left: 10px"
        @click="grabble"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="638"
        stripe
      >
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="员工编号"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="groupname"
          label="角色"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lastlogintime"
          label="最后登录时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editAccount(scope.row)"
              >修改信息</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.status == 1"
              @click="accountDisabled(scope.row)"
              >禁用</el-button
            >
            <el-button
              size="mini"
              type="success"
              v-if="scope.row.status == 0"
              @click="accountOpening(scope.row)"
              >启用</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改信息弹窗 -->
    <el-dialog title="修改信息" :visible.sync="editAccountPop" width="30%">
      <el-form :model="editAccountForm" label-width="120px">
        <el-row>
          <el-col>
            <el-form-item label="员工账号：">
              <el-input v-model="editAccountForm.username" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="员工编号：">
              <el-input v-model="editAccountForm.code" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="输入新密码：">
              <el-input
                v-model="editAccountForm.userNewpwd"
                show-password
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="确认新密码：">
              <el-input
                v-model="editAccountForm.userNewpwd1"
                show-password
                @change="confirmPassword($event)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="输入名字：" :required="true">
              <el-input v-model="editAccountForm.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门：" :required="true">
              <el-select
                v-model="editAccountForm.department"
                placeholder="请选择部门"
                @change="departmentDrop($event)"
              >
                <el-option
                  v-for="item in departmentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色：">
              <el-select
                v-model="editAccountForm.group"
                placeholder="请选择角色"
                @change="roleDrop($event)"
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.groupname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAccountPop = false">取 消</el-button>
        <el-button type="primary" @click="modifiedDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <pagination
      :page="page"
      :total="total"
      :limit="limit"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import Crumbs from "@/components/crumbs"; //面包屑
import pagination from "@/components/pagination"; // 分页
export default {
  components: {
    Crumbs,
    pagination,
  },
  data() {
    return {
      departmentModel: "", //部门
      // 部门下拉
      departmentSelect: [],
      state: "", //状态
      stateDrop: [
        //状态下拉
        {
          id: 0,
          name: "启用",
        },
        {
          id: 1,
          name: "禁用",
        },
      ],
      name: "", //姓名
      editAccountPop: false,
      editAccountForm: {},
      page: 1,
      limit: 13,
      total: 0,
      departmentList: [],
      roleList: [],
      tableData: [], //列表数据
      departmentDropId: "", //部门id
      roleDId: "", //角色id
      groupname: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    dropDisplays() {
      this.isShow = !this.isShow;
    },
    // 确认密码
    confirmPassword(event) {
      console.log(event.length);
      if (event.length < 6) {
        this.$message.error("密码长度不能小于6位");
      } else if (
        this.editAccountForm.userNewpwd != this.editAccountForm.userNewpwd1
      ) {
        this.$message.error("原密码与新密码不一致！");
      }
    },
    // 列表数据
    getList() {
      this.$http
        .get(`api/admin/userlist`, {
          params: {
            page: this.page,
            limit: this.limit,
            name: this.name, //姓名
            d_id: this.departmentModel, //部门
            status: this.state, //状态
          },
        })
        .then((res) => {
          // console.log(res.data.data)
          const { code, data } = res.data;
          if (code == 200) {
            this.tableData = res.data.data.list;
            this.departmentSelect = res.data.data.department;
            this.total = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 账号禁用
    accountDisabled(row) {
      this.$http.post(`api/admin/disable_user?id=${row.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 账号启用
    accountOpening(row) {
      this.$http.post(`api/admin/undisable_user?id=${row.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 搜索
    grabble() {
      this.getList();
    },
    // 修改信息弹窗
    editAccount(row) {
      this.editAccountPop = true;
      this.id = row.id;
      this.d_id = row.d_id;
      this.groupid = row.groupid;
      this.department = row.department; //部门
      this.group = row.group; //角色
      this.$http.post(`api/admin/getoneuser_by_id?id=${row.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.editAccountForm = res.data.data;
          this.departmentList = res.data.data.department_arr;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 修改信息确定
    modifiedDetermine() {
      if (this.editAccountForm.username == "") {
        this.$message.error("账号不能为空");
      } else if (this.editAccountForm.code == "") {
        this.$message.error("员工编号不能为空");
      } else {
        let info = {
          id: this.id,
          d_id: this.departmentDropId == "" ? this.d_id : this.departmentDropId, //部门
          groupid: this.roleDId == "" ? this.groupid : this.roleDId, //角色
          username: this.editAccountForm.username, //新账号
          userpwd: this.editAccountForm.userNewpwd, //新密码
          code: this.editAccountForm.code, //员工编号
        };
        this.$http.post(`api/admin/update_user`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.getList();
            this.editAccountPop = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 下拉框
    departmentDrop(event) {
      this.departmentDropId = event;
      this.$http.post(`api/admin/get_group_by_did?id=${event}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.roleList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    roleDrop(event) {
      this.roleDId = event;
    },

    // 分页下拉
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 分页右滚
    handleSizeChange(val) {
      this.limit = val;
      this.page = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 15px;
}
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
}
</style>