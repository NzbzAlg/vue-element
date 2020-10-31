
<template>
  <div class="logisticsBill">
    <!-- 搜索 -->
    <div class="title">
      <el-input
        v-model="logisticsMode"
        placeholder="搜索物流方式"
        clearable
        size="medium"
        style="width: 150px"
      ></el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="addLogistics"
            >添加物流方式</el-button
          >
        </p>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="number"
          label="物流方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="材积计算参数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="时效(天)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="操作人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="更新时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="操作" align="center">
          <template>
            <el-dropdown split-button size="small" @click="detailList">
              详情
              <el-dropdown-menu slot="dropdown">
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
    <el-dialog title="详情" :visible.sync="detailListPop" width="40%">
      <el-form label-width="100px">
        <el-col :span="24">
          <el-form-item label="物流方式">
            <el-input style="width: 260px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计费类型">
            <el-select
              v-model="form.departmentPull"
              placeholder="请选择"
              clearable
              style="width: 100%"
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
          <el-form-item label="材积参数">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮编">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="时效">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="运费规则">
            <el-input placeholder="请输入" style="width: 190px">
              <template slot="append">kg</template>
            </el-input>
            -
            <el-input placeholder="请输入" style="width: 190px">
              <template slot="append">kg</template>
            </el-input>
            <el-input
              placeholder="请输入"
              style="width: 190px; margin-left: 25px"
            >
              <template slot="append">CNY/kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailListPop = false">取 消</el-button>
        <el-button type="primary" @click="detailListPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加物流方式弹窗 -->
    <el-dialog title="添加物流方式" :visible.sync="addLogisticsPop" width="40%">
      <el-form label-width="100px">
        <el-col :span="24">
          <el-form-item label="物流方式">
            <el-input style="width: 260px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计费类型">
            <el-select
              v-model="form.departmentPull"
              placeholder="请选择"
              clearable
              style="width: 100%"
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
          <el-form-item label="材积参数">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮编">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="时效">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="运费规则">
            <el-input placeholder="请输入" style="width: 190px">
              <template slot="append">kg</template>
            </el-input>
            -
            <el-input placeholder="请输入" style="width: 190px">
              <template slot="append">kg</template>
            </el-input>
            <el-input
              placeholder="请输入"
              style="width: 190px; margin-left: 25px"
            >
              <template slot="append">CNY/kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addLogisticsPop = false">取 消</el-button>
        <el-button type="primary" @click="addLogisticsPop = false"
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
      logisticsMode:'',//物流方式
      detailListPop: false, //详情弹窗
      addLogisticsPop: false, //添加物流方式弹窗
      currentPage1: 1,
      value1: "",
      formInline: {},
      activeName: "first",
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
          id: "58259",
          number: 1,
          children: [
            {
              size: 1,
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 详情弹窗
    detailList() {
      this.detailListPop = true;
    },
    // 添加物流方式弹窗
    addLogistics() {
      this.addLogisticsPop = true;
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
  .tabItem {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}

.paging {
  float: right;
  margin-top: 20px;
}
</style>