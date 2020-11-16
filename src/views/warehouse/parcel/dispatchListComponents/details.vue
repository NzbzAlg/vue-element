<template>
  <div class="details">
    <!-- 详情弹窗 -->
    <el-dialog
      title="货件计划详情"
      :visible.sync="detailsPop"
      @close="$emit('update:detailsClose', false)"
      :before-close="handleClose"
      width="65%"
    >
      <div class="detailList">
        <div class="detailList_title">
          <span>计划单号</span>
          <span>RP201022003</span>
          <span>计划中</span>
        </div>
        <div class="basic-info">
          <p>仓储和物流</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="发货仓库" label-width="75px">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择发货仓库"
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
            <el-col :span="8">
              <el-form-item label="物流方式">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择物流方式"
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
            <el-col :span="8">
              <el-form-item label="预计到货时间">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分摊方式" label-width="75px">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择分摊方式"
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
            <el-col :span="8">
              <el-form-item label="配送地址">
                <span>A8E8</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item> </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="logisticsInformation">
          <p>物流信息</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="物流商单号" label-width="90px">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="跟踪号">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物流费用">
                <el-input
                  placeholder="请输入内容"
                  v-model="value1"
                  class="input-with-select"
                >
                  <el-select v-model="value1" slot="prepend" placeholder="EUR">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他费用" label-width="90px">
                <el-input
                  placeholder="请输入内容"
                  v-model="value1"
                  class="input-with-select"
                >
                  <el-select v-model="value1" slot="prepend" placeholder="EUR">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="deliveryGoods">
          <span>发货商品</span>
          <span @click="addGoods">
            <i class="el-icon-plus"></i>
            添加商品
          </span>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="date" label="店铺/货件单号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="MSKU/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="包装规格(cm)" align="center">
        </el-table-column>
        <el-table-column prop="address" label="单品重量(g)" align="center">
        </el-table-column>
        <el-table-column prop="address" label="报关税费" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发货仓库FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="可用量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="申报量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发货量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClose">取 消</el-button>
        <el-button type="primary" @click="detailListPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 列表详情的添加商品弹窗 -->
    <el-dialog title="添加商品" :visible.sync="addGoodsPop" width="40%">
      <el-input
        placeholder="请输入MSKU、FNSKU搜索"
        style="width: 300px; margin-bottom: 10px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="MSKU/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="ASIN" align="center">
        </el-table-column>
        <el-table-column prop="address" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名/SKU" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsPop = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsPop = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailsPop: this.detailsClose,
      addGoodsPop: false, //详情弹窗的添加商品
      formInline: {},
      form: {},
      tableData: [],
      value1: "",
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
    };
  },
  props: {
    detailsClose: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    detailsClose() {
      this.detailsPop = this.detailsClose;
    },
  },
  methods: {
    addGoods() {
      this.addGoodsPop = true;
    },
    // 添加商品 - 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 右上角X号
    handleClose(done) {
      done();
    },
    cancelClose() {
      this.detailsPop = false;
    },
  },
};
</script>

<style lang="scss" scoped>
// 列表详情弹窗
.detailList {
  .detailList_title {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 15px;
    color: #000;
    span:nth-of-type(2) {
      padding-left: 10px;
    }
    span:nth-of-type(3) {
      color: #fff;
      height: 16px;
      line-height: 16px;
      border: none;
      background-color: #0abf5b;
      padding: 0 10px;
      font-size: 12px;
      display: inline-block;
      margin-left: 10px;
      border-radius: 2px;
    }
  }
  .basic-info {
    width: 100%;
    height: 155px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
  }
  .logisticsInformation {
    width: 100%;
    height: 155px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
    /deep/.el-select {
      width: 76px;
    }
  }
}
// 添加商品
.deliveryGoods {
  margin-bottom: 10px;
  span:nth-of-type(1) {
    font-weight: bold;
    color: #000;
    font-size: 14px;
  }
  span:nth-of-type(2) {
    padding-left: 10px;
    color: #338bff;
    cursor: pointer;
  }
}
</style>