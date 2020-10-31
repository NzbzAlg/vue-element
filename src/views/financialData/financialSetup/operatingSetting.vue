
<template>
  <div class="operatingSetting">
    <!-- 搜索 -->
    <div class="title">
      <!-- 日期 -->
      <el-date-picker
        v-model="date"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        size="medium"
        style="width: 255px;"
      >
      </el-date-picker>
      <!-- 搜索 -->
      <el-input
        placeholder="搜索内容"
        v-model="searchContent"
        class="input-with-select"
        style="width: 275px; margin-left: 10px"
        size="medium"
      >
        <el-select
          v-model="multipleDrop"
          clearable
          filterable
          slot="prepend"
          size="medium"
          style="width: 105px"
        >
          <el-option
            v-for="item in multipleConditions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <el-button size="small" type="primary" @click="addWarehouse"
          >增加运营费用</el-button
        >
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="number"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="开始日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="创建日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="费用产生规则"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="分类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="描述"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="商品"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="操作"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 添加仓库弹窗 -->
    <el-dialog title="增加运营费用" :visible.sync="addWarehousePop" width="40%">
      <el-form :model="form" label-width="90px">
        <el-col :span="12">
          <el-form-item label="店铺">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="序列号">
            <el-input placeholder="序列号" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="描述">
            <el-input placeholder="描述" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品">
            <el-input placeholder="产品" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额">
            <el-input placeholder="必填" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="规则">
            <span>从 - 开始 仅一次</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.name"
              type="date"
              placeholder="选择日期"
              style="width: 270px"
            >
            </el-date-picker>
            <span style="padding-left: 15px"
              >开始时间不得早于您的财务数据获取时间 (2020-10-08)</span
            >
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否重复">
            <el-checkbox v-model="checked" @change="repetition">是</el-checkbox>
            <div class="repetition">
              <p>
                每
                <el-input
                  size="small"
                  style="width: 50px"
                  :disabled="disabled"
                ></el-input>
                <el-select
                  v-model="form.status"
                  placeholder="天"
                  style="width: 60px; margin-left: 5px"
                  clearable
                  size="small"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
                产生一次费用
              </p>
              <p>
                结束于
                <el-radio-group v-model="radio">
                  <el-radio :label="3">不结束</el-radio>
                  <el-radio :label="6"
                    >进行<el-input
                      style="width: 50px"
                      size="small"
                      :disabled="disabled"
                    ></el-input
                    >次后</el-radio
                  >
                  <el-radio :label="9">
                    <el-date-picker
                      v-model="form.name"
                      type="date"
                      placeholder="选择日期"
                      style="width: 115px"
                      size="small"
                      :disabled="disabled"
                    >
                    </el-date-picker>
                  </el-radio>
                </el-radio-group>
              </p>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWarehousePop = false">取 消</el-button>
        <el-button type="primary" @click="addWarehousePop = false"
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
      addWarehousePop: false, //增加运营费用
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "SKU",
        },
        {
          id: 2,
          name: "费用描述",
        },
      ],
      currentPage1: 1,
      disabled: false,
      checked: false,
      radio: 3,
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
          number: 2,
        },
      ],
      // 日期快捷方式
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.disabled = true;
  },
  methods: {
    repetition(e) {
      console.log(e);
      if (e == false) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    // 搜索框展开收起
    dropDisplays() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.$refs.title.style.height = "100px";
      } else {
        this.$refs.title.style.height = "30px";
      }
    },
    // 添加仓库弹窗
    addWarehouse() {
      this.addWarehousePop = true;
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
// 列表详情弹窗
.listDetails {
  .listDetails_title {
    font-size: 15px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
    span:nth-of-type(2) {
      padding-left: 15px;
    }
    span:nth-of-type(3) {
      display: inline-block;
      padding: 0 10px;
      background-color: #0abf5b;
      color: #fff;
      height: 16px;
      line-height: 16px;
      border: none;
      margin-left: 15px;
      font-size: 12px;
      font-weight: 400;
    }
  }
  .listDetails_content {
    height: 330px;
    p {
      font-size: 15px;
      font-weight: bold;
      color: #000;
    }
  }
  .listDetails_table {
    p {
      font-size: 15px;
      font-weight: bold;
      color: #000;
      margin-bottom: 15px;
    }
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>