<template>
  <div class="procurementPlan">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-select v-model="value" placeholder="请选择分类查询">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择品牌查询" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择状态查询" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-input placeholder="请输入品名或SKU查询" style="width:210px;margin-left:20px"></el-input>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary" @click="addPurchase">添加采购单</el-button>
        <el-button type="success">生成采购单</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @expand-change="clickDetails"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="详情" type="expand">
          <template>
            <span style="color:red">商品规格：</span>
            <el-table :data="tableData" border>
              <el-table-column prop="goodsSupId" label="图片" align="center"></el-table-column>
              <el-table-column prop="specsName" label="品名/sku" align="center"></el-table-column>
              <el-table-column prop="specsOriginPrice" label="采购需求量" align="center"></el-table-column>
              <el-table-column prop="specsPrice" label="实际采购量" align="center"></el-table-column>
              <el-table-column prop="specsType" label="上次采购价" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template>
                  <el-button size="mini">利润表</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="关联编号" align="center"></el-table-column>
        <el-table-column prop="name" label="创建人" align="center"></el-table-column>
        <el-table-column prop="address" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="address" label="运营审核人" align="center"></el-table-column>
        <el-table-column prop="address" label="运营审核时间" align="center"></el-table-column>
        <el-table-column prop="address" label="物流审核人" align="center"></el-table-column>
        <el-table-column prop="address" label="物流审核时间" align="center"></el-table-column>
        <el-table-column prop="address" label="采购审核人" align="center"></el-table-column>
        <el-table-column prop="address" label="采购审核时间" align="center"></el-table-column>
        <el-table-column prop="address" label="厂家出货时间" align="center"></el-table-column>
        <el-table-column prop="address" label="采购模式" align="center"></el-table-column>
        <el-table-column prop="address" label="状态" align="center"></el-table-column>
        <el-table-column prop="address" label="接受部门" align="center"></el-table-column>
        <el-table-column prop="address" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template>
            <el-button
              size="mini"
              type="success"
              style="margin:0 10px 10px 0"
              @click="salesForecast"
            >销量预估</el-button>
            <el-button
              size="mini"
              type="danger"
              style="margin-left:0px"
              @click="RejectedPurchasePlan"
            >驳回采购计划</el-button>
            <el-button size="mini" type="warning" style="margin:0 30px 0 0">上传附件</el-button>
            <el-button size="mini" type="warning" style="margin-left:0px">查看附件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加采购单 -->
    <el-dialog title="提示" :visible.sync="addPurchasePop" width="40%">
      <el-divider content-position="left">编辑</el-divider>
      <el-form :model="form" style="height:500px">
        <el-col :span="12">
          <el-form-item label="合同编号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预付款：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实付款：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退款收款账号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退款/减免金额：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="算入成本：" label-width="120px">
            <el-checkbox v-model="form.checked"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂家出货时间：" label-width="120px">
            <el-date-picker v-model="form.name" type="date" placeholder="选择日期" style="width:240px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="辅料备货时间：" label-width="120px">
            <el-date-picker v-model="form.name" type="date" placeholder="选择日期" style="width:240px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="物流单号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="物流费用：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="采购备注：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="addGoods">
        <el-divider content-position="left">添加</el-divider>
        <el-button
          type="primary"
          size="small"
          style="margin-bottom:20px"
          @click="addPurchasedGoods"
        >添加采购商品</el-button>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="图片" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="address" label="sku" align="center"></el-table-column>
          <el-table-column prop="address" label="采购需求量" align="center"></el-table-column>
          <el-table-column prop="address" label="剩余采购量" align="center"></el-table-column>
          <el-table-column prop="address" label="不含税价" align="center"></el-table-column>
          <el-table-column prop="address" label="税率(%)" align="center"></el-table-column>
          <el-table-column prop="address" label="税额" align="center"></el-table-column>
          <el-table-column prop="address" label="总额" align="center"></el-table-column>
          <el-table-column prop="address" label="上次采购价" align="center"></el-table-column>
          <el-table-column prop="address" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPurchasePop = false">取 消</el-button>
        <el-button type="primary" @click="addPurchasePop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加采购单弹窗下面的添加采购商品弹窗 -->
    <el-dialog title="提示" :visible.sync="addPurchasedGoodsPop" width="40%">
      <div class="title">
        <el-select v-model="value" placeholder="请选择分类查询" style="width:150px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择品牌查询" style="width:150px;margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-input placeholder="请输入SKU查询" style="width:170px;margin-left:20px"></el-input>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
      <div class="content">
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="关联编号" align="center"></el-table-column>
          <el-table-column prop="name" label="创建人" align="center"></el-table-column>
          <el-table-column prop="address" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="address" label="运营审核人" align="center"></el-table-column>
          <el-table-column prop="address" label="运营审核时间" align="center"></el-table-column>
        </el-table>
      </div>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPurchasedGoodsPop = false">取 消</el-button>
        <el-button type="primary" @click="addPurchasedGoodsPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 销量预估弹窗 -->
    <el-dialog title="提示" :visible.sync="salesForecastPop" width="50%">
      <div class="title">
        <el-select v-model="value" placeholder="请选择预估国家查询" style="width:200px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择产品查询" style="width:200px;margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="销量预估" name="first">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="站点/详情" align="center"></el-table-column>
              <el-table-column prop="name" label="详情" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-3" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-4" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-5" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-6" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-7" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-8" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-9" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-10" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-11" align="center"></el-table-column>
              <el-table-column prop="address" label="2020-12" align="center"></el-table-column>
              <el-table-column prop="address" label="2021-1" align="center"></el-table-column>
              <el-table-column prop="address" label="2021-2" align="center"></el-table-column>
              <el-table-column prop="address" label="2021-3" align="center"></el-table-column>
              <el-table-column prop="address" label="2021-4" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="FBA和在途" name="second">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="站点" align="center"></el-table-column>
              <el-table-column prop="name" label="品名" align="center"></el-table-column>
              <el-table-column prop="name" label="2020-09-23FBA库存" align="center"></el-table-column>
              <el-table-column prop="name" label="预计可售至" align="center"></el-table-column>
              <el-table-column prop="name" label="在途1" align="center"></el-table-column>
              <el-table-column prop="name" label="在途2" align="center"></el-table-column>
              <el-table-column prop="name" label="在途3" align="center"></el-table-column>
              <el-table-column prop="name" label="在途4" align="center"></el-table-column>
              <el-table-column prop="name" label="在途5" align="center"></el-table-column>
              <el-table-column prop="name" label="在途6" align="center"></el-table-column>
              <el-table-column prop="name" label="共计" align="center"></el-table-column>
              <el-table-column prop="name" label="预计可售至" align="center"></el-table-column>
              <el-table-column prop="name" label="预计2021-03底需" align="center"></el-table-column>
              <el-table-column prop="name" label="厂家剩余未发货" align="center"></el-table-column>
              <el-table-column prop="name" label="手动预计日期" align="center"></el-table-column>
              <el-table-column prop="name" label="备注" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="库存预警" name="third">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="站点/品名" align="center"></el-table-column>
              <el-table-column prop="name" label="商品备货时间(天)" align="center"></el-table-column>
              <el-table-column prop="name" label="海运时间(天)" align="center"></el-table-column>
              <el-table-column prop="name" label="厂家备货时间(天)" align="center"></el-table-column>
              <el-table-column prop="name" label="库存预计销售到" align="center"></el-table-column>
              <el-table-column prop="name" label="备货预计销售至" align="center"></el-table-column>
              <el-table-column prop="name" label="库存预警" align="center"></el-table-column>
              <el-table-column prop="name" label="出货预警" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="salesForecastPop = false">取 消</el-button>
        <el-button type="primary" @click="salesForecastPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 驳回采购计划弹窗 -->
    <el-dialog title="提示" :visible.sync="RejectedPurchasePlanPop" width="30%">
      <el-form :model="form">
        <el-form-item label="驳回理由：" label-width="90px">
          <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RejectedPurchasePlanPop = false">取 消</el-button>
        <el-button type="primary" @click="RejectedPurchasePlanPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传附件弹窗 -->
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
import Crumbs from "@/components/crumbs";
export default {
  components: {
    Crumbs,
  },
  data() {
    return {
      value: "",
      currentPage1: 1,
      addPurchasePop: false, //添加采购单弹窗
      addPurchasedGoodsPop: false, //添加采购单弹窗下面的添加采购商品弹窗
      salesForecastPop: false, //销量预估弹窗
      RejectedPurchasePlanPop: false, //销量预估弹窗
      activeName: "first",
      state: [
        {
          id: 1,
          label: "全部国家",
        },
      ],
      form: {
        name: "",
        checked: false,
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀6 弄",
        },
      ],
    };
  },
  methods: {
    // 表格详情下拉
    clickDetails() {
      console.log(1);
      // if (row.goodsSupDetails == [] || row.goodsSpecs == []) {
      //   console.log(1);
      // } else {
      //   this.commodityDetails = row.goodsSupDetails;
      //   this.commercialSpecification = row.goodsSpecs;
      // }
    },
    // 添加采购单弹窗
    addPurchase() {
      this.addPurchasePop = true;
    },
    //添加采购单弹窗下面的添加采购商品弹窗
    addPurchasedGoods() {
      this.addPurchasedGoodsPop = true;
    },
    // 销量预估弹窗
    salesForecast() {
      this.salesForecastPop = true;
    },
    // 驳回采购计划
    RejectedPurchasePlan() {
      this.RejectedPurchasePlanPop = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
.paging {
  float: right;
  margin-top: 20px;
}
// /deep/.el-dialog__body {
//   height: 600px !important;
// }
</style>