<template>
  <div class="shopAuthorization">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-input placeholder="请输入店铺查询" style="width:210px;" v-model="nameSearch"></el-input>
        <el-button type="primary" style="margin-left:20px" @click="grabble">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary" @click="addAccount">添加</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="shopname" label="店铺" align="center"></el-table-column>
        <el-table-column prop="department" label="部门" align="center"></el-table-column>
        <el-table-column prop="shopin" label="站点" align="center" width="130"></el-table-column>
        <el-table-column prop="shoptime" label="授权时间" align="center"></el-table-column>
        <el-table-column prop="seller_code" label="卖家编号" align="center"></el-table-column>
        <el-table-column prop="token" label="token" align="center" width="400"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editAccount(scope.row)">修改信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加店铺弹窗 -->
    <el-dialog title="添加店铺" :visible.sync="addAccountPop" width="30%">
      <el-form :model="addAccountForm" label-width="140px">
        <el-row>
          <el-col>
            <el-form-item label="店铺名：">
              <el-input v-model="addAccountForm.shopname"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="卖家编号：">
              <el-input v-model="addAccountForm.seller_code"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="MWS Auth Token">
              <el-input v-model="addAccountForm.token"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="站点：">
              <el-select
                v-model="addAccountForm.country"
                placeholder="请选择站点"
                @change="siteDrop($event)"
              >
                <el-option
                  v-for="item in siteList"
                  :key="item.id"
                  :label="item.countryname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门：">
              <el-select
                v-model="addAccountForm.department"
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
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAccountPop = false">取 消</el-button>
        <el-button type="primary" @click="addDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改店铺弹窗 -->
    <el-dialog title="添加店铺" :visible.sync="editAccountPop" width="30%">
      <el-form :model="editAccountForm" label-width="140px">
        <el-row>
          <el-col>
            <el-form-item label="店铺名：">
              <el-input v-model="editAccountForm.shopname"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="卖家编号：">
              <el-input v-model="editAccountForm.seller_code"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="MWS Auth Token">
              <el-input v-model="editAccountForm.token"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="站点：">
              <el-select
                v-model="editAccountForm.country"
                placeholder="请选择站点"
                @change="siteDrop($event)"
              >
                <el-option
                  v-for="item in siteList"
                  :key="item.id"
                  :label="item.countryname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门：">
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
      nameSearch: "",
      addAccountPop: false, //添加店铺弹窗
      addAccountForm: {}, //添加店铺数据
      editAccountPop: false, //修改店铺弹窗
      editAccountForm: {}, //修改店铺数据
      siteId: "", //站点下拉框id
      departmentId: "", //部门下拉框id
      page: 1,
      limit: 10,
      total: 0,
      siteList: [], //站点下拉框数据
      departmentList: [], //部门下拉框数据
      tableData: [], //列表数据
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 列表数据
    getList() {
      this.$http
        .get(`api/admin/shop`, {
          params: {
            page: this.page,
            limit: this.limit,
            shopname: this.nameSearch,
          },
        })
        .then((res) => {
          // console.log(res.data.data)
          const { code, data } = res.data;
          if (code == 200) {
            this.tableData = res.data.data;
            this.total = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 搜索
    grabble() {
      this.getList();
    },
    // 添加弹窗
    addAccount() {
      this.addAccountPop = true;
      this.$http.post(`api/admin/get_addshop_arr`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.siteList = res.data.data.country_arr;
          this.departmentList = res.data.data.department_arr;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 添加确定
    addDetermine() {
      let info = {
        shopname: this.addAccountForm.shopname,
        token: this.addAccountForm.token,
        seller_code: this.addAccountForm.seller_code,
        countryid: this.siteId,
        d_id: this.departmentId,
      };
      this.$http.post(`api/admin/insertshop`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.getList();
          this.addAccountPop = false;
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 修改弹窗
    editAccount(row) {
      this.id = row.id;
      this.editAccountPop = true;
      this.$http.post(`api/admin/getshop_by_id?id=${this.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          console.log(res.data.data);
          this.editAccountForm = res.data.data;
          this.siteList = res.data.data.country_arr;
          this.departmentList = res.data.data.department_arr;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 获取站点下拉框id
    siteDrop(event) {
      this.siteId = event;
    },
    // 获取部门下拉框id
    departmentDrop(event) {
      this.departmentId = event;
    },
    // 修改弹窗确定
    modifiedDetermine() {
      let info = {
        id: this.id,
        shopname: this.editAccountForm.shopname,
        token: this.editAccountForm.token,
        seller_code: this.editAccountForm.seller_code,
        countryid:
          this.siteId != "" ? this.siteId : this.editAccountForm.countryid,
        d_id:
          this.departmentId != ""
            ? this.departmentId
            : this.editAccountForm.d_id,
      };
      this.$http.post(`api/admin/updateshop`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.getList();
          this.editAccountPop = false;
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
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
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  .title_left {
    float: left;
  }
  .title_right {
    float: right;
  }
}
</style>