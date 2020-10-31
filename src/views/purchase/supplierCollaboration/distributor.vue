
<template>
  <div class="distributor">
    <!-- 搜索 -->
    <div class="title">
      <!-- 搜索 -->
      <el-input
        v-model="supplier"
        placeholder="搜索供应商、跟进人名称"
        clearable
        size="medium"
        style="width: 210px;"
      ></el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <el-button size="small" type="primary" @click="addSupplier"
          >添加供应商</el-button
        >
        <el-button size="small" @click="importSupplier">导入供应商</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="channel_name"
          label="供应商"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="网址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="联系人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="联系电话"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="QQ" align="center"></el-table-column>
        <el-table-column
          prop="SKU"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="跟进人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="操作" align="center">
          <template>
            <el-dropdown split-button size="small" @click="detailList">
              详情
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span>审核</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span>删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="供应商详情" :visible.sync="detailListPop" width="30%">
      <div class="detailList">
        <div class="basicInformation">
          <p>基本信息</p>
          <el-form label-width="80px">
            <el-col :span="24" style="height: 46px">
              <el-form-item label="级别">
                <span>★</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="规模">
                <span>少于50人</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="跟进人">
                <span>超级管理员</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="联系人">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="联系电话">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="QQ">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="邮箱">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="传真">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="height: 46px">
              <el-form-item label="备注">
                <span>123123123</span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="finance">
          <p>财务</p>
          <el-form label-width="80px">
            <el-col :span="12" style="height: 46px">
              <el-form-item label="结算方式">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="支付方式">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="户名">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 46px">
              <el-form-item label="开支行">
                <span>123123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="height: 46px">
              <el-form-item label="开户账号">
                <span>123123123</span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="detailListPop = false">取 消</el-button>
        <el-button type="primary" @click="detailListPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加供应商 -->
    <el-dialog title="添加供应商" :visible.sync="addSupplierPop" width="40%">
      <div class="addSupplier">
        <div class="basicInformation">
          <p>基本信息</p>
          <el-form label-width="80px">
            <el-col :span="24">
              <el-form-item label="供应商">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="级别">
                <el-select
                  v-model="form.departmentPull"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in replenishment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规模">
                <el-select
                  v-model="form.departmentPull"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in replenishment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟进人">
                <el-select
                  v-model="form.departmentPull"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in replenishment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传真">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" placeholder="请输入内容">
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="finance">
          <p>财务</p>
          <el-form label-width="80px">
            <el-col :span="12">
              <el-form-item label="结算方式">
                <el-select
                  v-model="form.departmentPull"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in replenishment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付方式">
                <el-select
                  v-model="form.departmentPull"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in replenishment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户名">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开支行">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="卡号">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSupplierPop = false">取 消</el-button>
        <el-button type="primary" @click="addSupplierPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导入供应商弹窗 -->
    <el-dialog
      title="导入采购商品"
      :visible.sync="importSupplierPop"
      width="30%"
    >
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入供应商</el-button>
          <span style="color: #006eff; padding-left: 24px">下载模板</span>
        </div>
        <div class="import-info">
          <div>注意事项：</div>
          <p>支持导入格式为xlsx的文件</p>
          <p>模板中的表头不可更改，不可删除</p>
          <p>数据记录不要超过5000条</p>
          <p>发货单支持导入多个物流单</p>
          <p>同一发货单，物流商单号或跟踪号存在相同时覆盖该条物流信息</p>
          <p>Excel表中，同一发货单存在相同=物流商单号和跟踪号时取第一条记录</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importSupplierPop = false">取 消</el-button>
        <el-button type="primary" @click="importSupplierPop = false"
          >确 定</el-button
        >
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
      supplier:"",//供应商、跟进人
      currentPage1: 1,
      detailListPop: false, //详情弹窗
      addSupplierPop: false, //添加供应商弹窗
      importSupplierPop: false, //导入供应商弹窗
      isShow: false,
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
      departmentPull: [],
      replenishment: [
        //是否当前补货
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "是",
        },
        {
          id: 3,
          name: "否",
        },
        {
          id: 4,
          name: "无需提醒",
        },
      ],
      state: [
        //状态
        {
          id: 1,
          label: "启用",
        },
        {
          id: 2,
          label: "禁用",
        },
      ],
      tableData: [
        {
          id: 1,
          channel_name: "1",
        },
      ],
    };
  },
  methods: {
    // 编辑弹窗
    detailList() {
      this.detailListPop = true;
    },
    // 添加供应商弹窗
    addSupplier() {
      this.addSupplierPop = true;
    },
    // 导入供应商
    importSupplier() {
      this.importSupplierPop = true;
    },
    // 列表详情
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
  .table_button {
    margin-bottom: 10px;
  }
}
// 详情弹窗
.detailList {
  .basicInformation {
    height: 305px;
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
  .finance {
    height: 167px;
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
  .site {
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
}
// 添加供应商
.addSupplier {
  .basicInformation {
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
  .finance {
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
  .site {
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
}
// 导入供应商
.ImportLogistics {
  .ImportLogistics_title {
    margin-top: 15px;
    span {
      padding-left: 35px;
    }
  }
  .import-info {
    font-size: 12px;
    padding: 14px;
    color: #003b80;
    margin-top: 20px;
    background-color: #e5f0ff;
    border: 1px solid #97c7ff;
    line-height: 16px;
    p {
      padding-left: 20px;
    }
  }
}

.paging {
  float: right;
  margin-top: 20px;
}
</style>