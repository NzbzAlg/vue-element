
<template>
  <div class="replenishmentProposal">
    <!-- 搜索 -->
    <div class="title">
      <div class="tab_control">
        <div class="radiogroup">
          <span
            @click="summaryDetail = 1"
            :class="{ summaryDetail_active: summaryDetail === 1 }"
            >按ASIN</span
          >
          <span
            @click="summaryDetail = 2"
            :class="{ summaryDetail_active: summaryDetail === 2 }"
            >按MSKU</span
          >
        </div>
        <div class="radiogroup">
          <span
            @click="volumeCost = 1"
            :class="{ volumeCost_active: volumeCost === 1 }"
            >全部</span
          >
          <span
            @click="volumeCost = 2"
            :class="{ volumeCost_active: volumeCost === 2 }"
            >关注</span
          >
        </div>
      </div>
      <!-- 国家 -->
      <el-select
        v-model="country"
        placeholder="国家"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in countryDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 店铺 -->
      <el-select
        v-model="shop"
        placeholder="店铺"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in shopDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
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
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="procurementPlan"
            >批量生成采购计划</el-button
          >
          <el-button type="primary" size="small" @click="purchaseOrder"
            >批量生成采购单</el-button
          >
        </p>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        v-show="summaryDetail == 1"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="SKU" label="图片" align="center" fixed>
          <template>
            <img
              src="https://m.media-amazon.com/images/I/41z0rPLiCQL._SL75_.jpg"
              alt=""
              style="width: 40px; height: 40px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="asin"
          label="ASIN"
          align="center"
          width="120"
          fixed
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="品名/SKU"
          align="center"
          width="120"
          fixed
        ></el-table-column>
        <el-table-column
          prop="quantity_fba_valid"
          label="FBA库存"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quantity_fba_shipping"
          label="FBA在途"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quantity_local_qc"
          label="本地可用"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quantity_local_qc"
          label="待检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quantity_local_qc"
          label="待交付"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购计划"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="备货时长"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="销量分析"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="7/14/30天销量"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="可售库存预测"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="断货时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="销量预测"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="建议采购量"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="建议发货量"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="更新时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <el-dropdown
            split-button
            type="primary"
            size="mini"
            @click="setRules"
          >
            设置规则
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span>生成采购计划</span>
              </el-dropdown-item>
              <el-dropdown-item>生成采购单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-table-column>
      </el-table>
      <!-- 按MSKU -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        v-show="summaryDetail == 2"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="SKU" label="图片" align="center" fixed>
          <template>
            <img
              src="https://m.media-amazon.com/images/I/41z0rPLiCQL._SL75_.jpg"
              alt=""
              style="width: 40px; height: 40px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="asin"
          label="品名/SKU"
          align="center"
          width="120"
          fixed
        ></el-table-column>
        <el-table-column
          prop="quantity_fba_valid"
          label="FBA库存"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quantity_fba_shipping"
          label="FBA在途"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quantity_local_qc"
          label="本地可用"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quantity_local_qc"
          label="待检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quantity_local_qc"
          label="待交付"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购计划"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="备货时长"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="销量分析"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="7/14/30天销量"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="可售库存预测"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="断货时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="销量预测"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="建议采购量"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="建议发货量"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="更新时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <el-dropdown
            split-button
            type="primary"
            size="mini"
            @click="setRules"
          >
            设置规则
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span>生成采购计划</span>
              </el-dropdown-item>
              <el-dropdown-item>生成采购单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-table-column>
      </el-table>
    </div>
    <!-- 生成采购计划 -->
    <el-dialog
      title="添加采购计划"
      :visible.sync="procurementPlanPop"
      width="50%"
    >
      <!-- 备注 -->
      <el-divider content-position="left">备注</el-divider>
      <div class="remark">
        <el-form :model="formInline">
          <el-form-item label="备注：">
            <el-input
              v-model="formInline.user"
              type="textarea"
              :rows="1"
              style="width: 350px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-divider content-position="left">表格</el-divider>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名" align="center">
        </el-table-column>
        <el-table-column prop="address" label="店铺" align="center">
        </el-table-column>
        <el-table-column prop="address" label="FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="供应商" align="center">
        </el-table-column>
        <el-table-column prop="address" label="单箱数量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="计划采购量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="备注" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="procurementPlanPop = false">取 消</el-button>
        <el-button type="primary" @click="procurementPlanPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 生成采购单 -->
    <el-dialog title="生成采购单" :visible.sync="purchaseOrderPop" width="60%">
      <el-divider content-position="left">搜索</el-divider>
      <div class="searchBox">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="统一指定供应商">
            <el-select
              v-model="form.status"
              placeholder="状态"
              style="width: 150px"
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
          <el-form-item label="统一指定仓库">
            <el-select
              v-model="form.status"
              placeholder="状态"
              style="width: 150px"
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
          <el-form-item label="采购币种">
            <el-select
              v-model="form.status"
              placeholder="状态"
              style="width: 150px"
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
          <el-form-item label="费用分配方式">
            <el-select
              v-model="form.status"
              placeholder="状态"
              style="width: 150px"
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
        </el-form>
      </div>
      <el-divider content-position="left">表格</el-divider>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名" align="center">
        </el-table-column>
        <el-table-column prop="address" label="店铺" align="center">
        </el-table-column>
        <el-table-column prop="address" label="FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="单箱数量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="实际采购量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="单价(￥)" align="center">
        </el-table-column>
        <el-table-column prop="address" label="含税" align="center">
        </el-table-column>
        <el-table-column prop="address" label="供应商" align="center">
        </el-table-column>
        <el-table-column prop="address" label="仓库" align="center">
        </el-table-column>
        <el-table-column prop="address" label="备注" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="purchaseOrderPop = false">取 消</el-button>
        <el-button type="primary" @click="purchaseOrderPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 设置规则弹窗 -->
    <el-dialog title="设置规则" :visible.sync="setRulesPop" width="47%">
      <div class="stockTime" style="height: 200px">
        <!-- <p style="font-size: 15px; font-weight: bold; color: #000">备货时长</p> -->
        <el-divider content-position="left">备货时长</el-divider>
        <el-form :model="form" label-width="90px">
          <el-col :span="12">
            <el-form-item label="采货计划：">
              <el-input v-model="form.name" clearable>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采购交期：">
              <el-input v-model="form.name" clearable>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="质检：">
              <el-input v-model="form.name" clearable>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="FBA头程：">
              <el-input v-model="form.name" clearable>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全天数：">
              <el-input v-model="form.name" clearable>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <el-divider content-position="left">日销量设置</el-divider>
      <!-- 日销量设置 -->
      <div class="dailySetting">
        <el-form :model="form" label-width="90px">
          <el-col :span="12">
            <el-form-item label="名称：">
              <el-input v-model="form.name" clearable> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间段：">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型：">
              <el-select
                v-model="form.status"
                placeholder="状态"
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
            <el-form-item label="日销量：">
              <el-input v-model="form.name" clearable> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="计算：">
              <div style="line-height: 50px">
                <span>7天日均(1.9) ×</span>
                <el-input style="width: 120px">
                  <template slot="append">%</template>
                </el-input>
                <span>+ 14天日均(0.9) ×</span>
                <el-input style="width: 120px">
                  <template slot="append">%</template>
                </el-input>
                <span>+ 30天日均(0.4) × </span>
                <el-input style="width: 120px">
                  <template slot="append">%</template>
                </el-input>
                <span> + 60天日均(0.2) × </span>
                <el-input style="width: 120px">
                  <template slot="append">%</template>
                </el-input>
                <span> + 90天日均(0.1) ×</span>
                <el-input style="width: 120px">
                  <template slot="append">%</template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRulesPop = false">取 消</el-button>
        <el-button type="primary" @click="setRulesPop = false">确 定</el-button>
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
      summaryDetail: 1, //汇总明细选项卡
      volumeCost: 1, //数量成本选项卡
      procurementPlanPop: false, //生成采购计划弹窗
      purchaseOrderPop: false, //生成采购单弹窗
      setRulesPop: false, //设置规则弹窗
      country: "", //国家
      // 国家下拉
      countryDrop: [
        {
          id: 1,
          name: "中国",
        },
      ],
      shop: "", //店铺
      // 店铺下拉
      shopDrop: [
        {
          id: 1,
          name: "店铺",
        },
      ],
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "SKU",
        },
        {
          id: 2,
          name: "品名",
        },
        {
          id: 3,
          name: "MSKU",
        },
        {
          id: 4,
          name: "标题",
        },
      ],
      currentPage1: 1,
      value1: "",
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
      formInline: {
        user: "",
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
          label: "按ASIN",
        },
        {
          id: 2,
          label: "按MSKU",
        },
      ],
      tableData: [
        {
          fsa_id: 235031,
          parent_id: -1,
          sid: 529,
          enable: 1,
          asin: "B08DH7DT24",
          item_name:
            "Pukomc French Press Coffee Maker 34 oz,Tea Maker with 4 Level Filtration System Heat Resistant Removable Borosilicate Glass 304 Grade Stainless Steel Stylish Durable",
          small_image_url:
            "https://m.media-amazon.com/images/I/41j9sNsUGTL._SL75_.jpg",
          quantity_fba_valid: 2691,
          quantity_fba_shipping: 432,
          quantity_local_qc: 0,
          quantity_local_valid: 0,
          quantity_purchase_plan: 0,
          quantity_purchase_shipping: 0,
          quantity_sug_send: 0,
          is_out_stock: 0,
          out_stock_date: "",
          estimated_sale_quantity: 69,
          quantity_sug_replenishment: 0,
          available_sale_days: 180,
          safe_sale_quantity: 69,
          sync_time: "2020-10-21 08:59:06",
          product_info: [],
          seller_sku_relation: "PUKOMC01A",
          days_plan: 2,
          days_purchase: 0,
          days_qc: 3,
          days_toucheng: 30,
          days_total: 49,
          safe_day: 14,
          sales_avg_7: 2,
          sales_avg_14: 1,
          sales_avg_30: 1,
          sales_avg_60: 1,
          sales_avg_90: 1,
          sales_total_7: 14,
          sales_total_14: 14,
          sales_total_30: 14,
          sales_total_60: 14,
          sales_total_90: 14,
          quantity_fba_shipping_second: 0,
          is_star: 0,
          sysn_status: "0",
          status: 1,
          product_brand_text: "aa",
          category_text: "a",
          bid: 1044,
          cid: 1068,
        },
      ],
    };
  },
  methods: {
    //   生成采购计划弹窗
    procurementPlan() {
      this.procurementPlanPop = true;
    },
    // 生成采购单
    purchaseOrder() {
      this.purchaseOrderPop = true;
    },
    // 设置规则弹窗
    setRules() {
      this.setRulesPop = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
  .tab_control {
    display: inline-block;
    margin-bottom: 10px;
    float: left;
    .radiogroup {
      float: left;
      cursor: pointer;
      span {
        display: inline-block;
        width: 70px;
        height: 32px;
        border: 1px solid #ddd;
        text-align: center;
        line-height: 32px;
        background: #fff;
        font-size: 12px;
      }
      .summaryDetail_active {
        display: inline-block;
        width: 70px;
        height: 32px;
        color: #409eff;
        border: 1px solid #409eff;
        text-align: center;
        line-height: 32px;
        background: #fff;
      }
      .volumeCost_active {
        display: inline-block;
        width: 70px;
        height: 32px;
        color: #409eff;
        border: 1px solid #409eff;
        text-align: center;
        line-height: 32px;
      }
    }
    .radiogroup:nth-of-type(2) {
      margin-left: 20px;
    }
  }
}
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: center;
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
// 生成采购单 - 搜索
.searchBox {
  width: 100%;
  height: 40px;
  display: flex;
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>