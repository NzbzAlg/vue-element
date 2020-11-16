
<template>
  <div class="SummaryDials">
    <!-- 搜索 -->
    <div class="title">
      <!-- 国家 -->
      <el-select
        v-model="country"
        placeholder="国家"
        clearable
        filterable
        size="medium"
        style="width: 150px"
        @change="changeSearch()"
      >
        <el-option
          v-for="item in countryDrop"
          :key="item.id"
          :label="item.countryname"
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
        @change="changeSearch()"
      >
        <el-option
          v-for="item in shopDrop"
          :key="item.id"
          :label="item.shopname"
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
        @change="changeSearch()"
      >
        <el-option
          v-for="item in stateDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 配对 -->
      <el-select
        v-model="batchPairSelect"
        placeholder="配对"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
        @change="changeSearch()"
      >
        <el-option
          v-for="item in batchPairSelectDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 配送方式 -->
      <el-select
        v-model="modeDistribution"
        placeholder="配送方式"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
        @change="changeSearch()"
      >
        <el-option
          v-for="item in modeDistributionDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 日期 -->
      <el-date-picker
        v-model="date"
        type="daterange"
        align="center"
        unlink-panels
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        size="medium"
        style="margin-left: 10px; width: 255px"
        @change="changeSearch()"
      >
      </el-date-picker>
      <!-- 搜索 -->
      <el-input
        placeholder="搜索内容"
        v-model="searchContent"
        class="input-with-select"
        style="width: 275px; margin-left: 10px"
        size="medium"
        clearable
        @keyup.enter.native="changeSearch"
        @clear="clearChageSearch"
      >
        <el-select
          v-model="multipleDrop"
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
      <!-- <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      > -->
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="batchPair"
            >批量配对</el-button
          >
          <!-- <el-button size="small" @click="ImportPair">导入配对</el-button> -->
          <el-button size="small" @click="assignedCharge"
            >批量分配负责人</el-button
          >
          <!-- <el-button size="small" @click="ImportAllocation"
            >导入分配负责人</el-button
          > -->
        </p>
      </div>
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%"
        height="600"
        ref="multipleTable"
        @selection-change="listSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="channel_name" label="图片" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <el-image
                slot="reference"
                :src="$store.state.url + scope.row.img"
                :alt="$store.state.url + scope.row.img"
                style="width: 50px; height: 50px"
              ></el-image>
              <el-image
                :src="$store.state.url + scope.row.img"
                style="max-height: 200px; max-width: 200px"
              ></el-image>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="MSKU/FNSKU" align="center" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.MSKU }}</span>
            <br />
            <span>{{ scope.row.FNSKU }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ASIN"
          label="ASIN"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="operator"
          label="标题"
          align="center"
        ></el-table-column>
        <el-table-column label="品名/SKU" align="center" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.goods_name }}</span>
            <br />
            <span>{{ scope.row.goods_sku }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shop_name"
          label="店铺"
          align="center"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="country"
          label="国家"
          align="center"
        ></el-table-column>
        <el-table-column prop="ListingPrice" label="价格" align="center">
        </el-table-column>
        <el-table-column
          prop="InStockSupplyQuantity"
          label="FBA可售"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="count"
          label="销量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="销售额(外币)"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="广告费"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="排名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="评论"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="charge_preson"
          label="负责人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="操作"
          align="center"
          width="130px"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-dropdown
              split-button
              size="small"
              @click="pair(scope.row)"
              v-if="scope.row.is_content == 0"
            >
              配对
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="statistics(scope.row)">
                  统计
                </el-dropdown-item>
                <!-- <el-dropdown-item>
                  <span @click="brandLabel">打印标签</span>
                </el-dropdown-item> -->
                <el-dropdown-item
                  @click.native="allocationPrincipal(scope.row)"
                >
                  分配负责人
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown
              split-button
              size="small"
              @click="cancelPairing(scope.row)"
              v-if="scope.row.is_content == 1"
            >
              取消配对
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="statistics(scope.row)">
                  统计
                </el-dropdown-item>
                <!-- <el-dropdown-item>
                  <span @click="brandLabel">打印标签</span>
                </el-dropdown-item> -->
                <el-dropdown-item
                  @click.native="allocationPrincipal(scope.row)"
                >
                  分配负责人
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 批量配对弹窗 -->
    <el-dialog title="批量配对" :visible.sync="batchPairPop" width="40%" :close-on-click-modal='false'>
      <el-input
        placeholder="请输入品名、SKU搜索"
        style="width: 300px; margin-bottom: 10px"
        v-model="batchPairName"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="batchPairSearch"
        ></el-button>
      </el-input>
      <el-table
        :data="batchPairTableData"
        border
        style="width: 100%"
        height="450"
      >
        <el-table-column prop="date" label="图片" align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.img"
              alt=""
              style="width: 30px; height: 30px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="goods_name" label="品名" align="center">
        </el-table-column>
        <el-table-column prop="goods_sku" label="SKU" align="center">
        </el-table-column>
        <el-table-column prop="category_name" label="分类" align="center">
        </el-table-column>
        <el-table-column prop="brand_name" label="品牌" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              style="color: #409eff; cursor: pointer"
              @click="batchPairConfirm(scope.row)"
              >配对</span
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 配对分页 -->
      <pagination
        :page="batchPairPage"
        :total="batchPairTotal"
        :limit="batchPairLimit"
        @handleCurrentChange="batchPairCurrentChange"
        @handleSizeChange="batchPairSizeChange"
      />
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="batchPairPop = false">取 消</el-button> -->
        <!-- <el-button type="primary" @click="batchPairPop = false">确 定</el-button> -->
      </span>
    </el-dialog>
    <!-- 导入配对弹窗 -->
    <el-dialog title="导入配对" :visible.sync="ImportPairPop" width="30%">
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入配对</el-button>
          <span style="color: #006eff">下载配对模板</span>
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
        <el-button @click="ImportPairPop = false">取 消</el-button>
        <el-button type="primary" @click="ImportPairPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 批量分配负责人弹窗 -->
    <el-dialog
      title="批量设置负责人"
      :visible.sync="assignedChargePop"
      width="25%"
      :close-on-click-modal='false'
    >
      <div style="margin: 20px 0 10px 0">
        <span style="padding: 0 15px">负责人</span>
        <el-select
          v-model="principal"
          placeholder="负责人"
          style="width: 75%"
          clearable
          filterable
        >
          <el-option
            v-for="item in principalDrop"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignedChargePop = false">取 消</el-button>
        <el-button type="primary" @click="assignedChargeConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 分配负责人弹窗 -->
    <el-dialog title="分配负责人" :visible.sync="principalPop" width="25%" :close-on-click-modal='false'>
      <div style="margin: 20px 0 10px 0">
        <span style="padding: 0 15px">负责人</span>
        <el-select
          v-model="principal"
          placeholder="负责人"
          style="width: 75%"
          clearable
          filterable
        >
          <el-option
            v-for="item in principalDrop"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="principalPop = false">取 消</el-button>
        <el-button type="primary" @click="principalConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导入分配负责人弹窗 -->
    <el-dialog
      title="导入负责人"
      :visible.sync="ImportAllocationPop"
      width="30%"
    >
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入负责人</el-button>
          <span style="color: #006eff">下载导入模板</span>
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
        <el-button @click="ImportAllocationPop = false">取 消</el-button>
        <el-button type="primary" @click="ImportAllocationPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 统计弹窗 -->
    <el-dialog title="统计" :visible.sync="statisticsPop" width="50%">
      <div class="statistics">
        <div class="statistics_title">
          <img :src="$store.state.url + statisticsImg" alt="" />
          <p>
            <span>{{ this.statisticsTitle }}</span>
            <br />
            <span>MSKU：{{ this.statisticsMsku }}</span>
          </p>
        </div>
        <div class="statistics_echarts">
          <!-- <div class="tabs">
            <span @click="tabmsg((msg = 7))" :class="{ tab_active: msg === 7 }"
              >7天</span
            >
            <span
              @click="tabmsg((msg = 15))"
              :class="{ tab_active: msg === 15 }"
              >15天</span
            >
            <span
              @click="tabmsg((msg = 30))"
              :class="{ tab_active: msg === 30 }"
              >30天</span
            >
          </div> -->
          <div
            id="statisticalChart"
            :style="{ width: '100%', height: '400px' }"
          ></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statisticsPop = false">取 消</el-button>
        <el-button type="primary" @click="statisticsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 打印标签弹窗 -->
    <el-dialog title="打印商品标签" :visible.sync="brandLabelPop" width="45%">
      <div class="brandLabel">
        <p>FNSKU标签打印设置</p>
        <div class="brandLabel_title">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="12" style="margin-top: 10px">
              <el-form-item label="请选择打印纸张类型" label-width="160px">
                <el-select v-model="form.status" clearable>
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="margin-top: 10px">
              <el-form-item>
                <el-checkbox
                  v-model="checked"
                  style="margin-right: 15px"
                ></el-checkbox>
                <el-select
                  v-model="form.status"
                  clearable
                  placeholder="打印SKU"
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
              <el-form-item label-width="160px">
                <el-checkbox v-model="checked" style="margin-left: 40px"
                  >打印自定义内容</el-checkbox
                >
                <el-select v-model="form.status" clearable>
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <p>打印FNSKU标签</p>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="图片" align="center">
          </el-table-column>
          <el-table-column prop="name" label="MSKU/FNSKU" align="center">
          </el-table-column>
          <el-table-column prop="address" label="标题" align="center">
          </el-table-column>
          <el-table-column prop="address" label="打印数量" align="center">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="brandLabelPop = false">取 消</el-button>
        <el-button type="primary" @click="brandLabelPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 配对弹窗 -->
    <el-dialog title="配对" :visible.sync="pairPop" width="40%">
      <el-input
        placeholder="请输入品名、SKU搜索"
        style="width: 300px; margin-bottom: 10px"
        v-model="pairName"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="pairSearch"
        ></el-button>
        <!-- @click="pairSearch" -->
      </el-input>
      <el-table :data="pairTableData" border style="width: 100%" height="450">
        <el-table-column prop="date" label="图片" align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.img"
              alt=""
              style="width: 30px; height: 30px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="goods_name" label="品名" align="center">
        </el-table-column>
        <el-table-column prop="goods_sku" label="SKU" align="center">
        </el-table-column>
        <el-table-column prop="category_name" label="分类" align="center">
        </el-table-column>
        <el-table-column prop="brand_name" label="品牌" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              style="color: #409eff; cursor: pointer"
              @click="pairConfirm(scope.row)"
              >配对</span
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 配对分页 -->
      <pagination
        :page="pairPage"
        :total="pairTotal"
        :limit="pairLimit"
        @handleCurrentChange="pairCurrentChange"
        @handleSizeChange="pairSizeChange"
      />
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="batchPairPop = false">取 消</el-button> -->
        <!-- <el-button type="primary" @click="batchPairPop = false">确 定</el-button> -->
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
import pagination from "@/components/pagination"; // 分页
export default {
  components: {
    pagination,
  },
  data() {
    return {
      loading: true,
      batchPairPop: false, //批量匹配弹窗
      pairPop: false, //匹配弹窗
      ImportPairPop: false, //导入商品弹窗
      assignedChargePop: false, //批量分配负责人弹窗
      principalPop: false, //分配负责人弹窗
      ImportAllocationPop: false, //导入分配负责人弹窗
      statisticsPop: false, //统计弹窗
      brandLabelPop: false, //打印标签弹窗
      checked: false,
      country: "", //国家
      countryDrop: [], // 国家下拉
      shop: "", //店铺
      shopDrop: [], //店铺下拉
      state: "", //状态
      // 状态下拉
      stateDrop: [
        {
          id: 1,
          name: "在售",
        },
        {
          id: 2,
          name: "停售",
        },
        {
          id: 3,
          name: "已删除",
        },
      ],
      batchPairSelect: "", //配对
      // 配对下拉
      batchPairSelectDrop: [
        {
          id: 1,
          name: "已配对",
        },
        {
          id: 2,
          name: "未配对",
        },
      ],
      modeDistribution: "", //配送方式
      // 配送方式下拉
      modeDistributionDrop: [
        {
          id: 1,
          name: "FBA",
        },
        {
          id: 2,
          name: "FBM",
        },
      ],
      date: [], //日期
      searchContent: "", //搜索
      multipleDrop: 1, //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "MSKU",
        },
        {
          id: 2,
          name: "FNSKU",
        },
        {
          id: 3,
          name: "ASIN",
        },
        {
          id: 4,
          name: "ParentASIN",
        },
        {
          id: 5,
          name: "SKU",
        },
        {
          id: 6,
          name: "品名",
        },
        {
          id: 7,
          name: "标题",
        },
      ],
      tableData: [], //列表数据
      page: 1,
      limit: 10,
      total: 0,
      batchPairTableData: [], //批量配对列表
      batchPairName: "", //批量配对搜索
      batchPairPage: 1,
      batchPairLimit: 10,
      batchPairTotal: 0,
      pairTableData: [], //配对列表
      pairName: "", //配对搜索
      pairPage: 1,
      pairLimit: 10,
      pairTotal: 0,
      principal: "", //分配负责人
      principalDrop: [], //分配负责人下拉
      formInline: {},
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
      statisticsImg: "", //统计弹窗图片
      statisticsTitle: "", //统计弹窗title
      statisticsMsku: "", //统计弹窗msku
      // msg: 7,
      // day: "", //天
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
    this.getList();
  },
  methods: {
    // 列表数据
    getList() {
      // 日期清空
      if (!this.date) {
        this.date = [];
      }
      this.$http
        .get(`sale/listing_list`, {
          params: {
            page: this.page,
            limit: this.limit,
            selcountry: this.country, //国家
            selshop: this.shop, //店铺
            selstatus: this.state, //状态
            selbatchPair: this.batchPairSelect, //配对
            sendtype: this.modeDistribution, //配送方式
            start_time: this.date[0], //开始日期
            end_time: this.date[1], //结束日期
            msku: this.multipleDrop == 1 ? this.searchContent : "", //MSKU
            fnsku: this.multipleDrop == 2 ? this.searchContent : "", //FNSKU
            asin: this.multipleDrop == 3 ? this.searchContent : "", //ASIN
            parentasin: this.multipleDrop == 4 ? this.searchContent : "", //parentAsin
            sku: this.multipleDrop == 5 ? this.searchContent : "", //SKU
            goods_name: this.multipleDrop == 6 ? this.searchContent : "", //品名
            titel: this.multipleDrop == 7 ? this.searchContent : "", //标题
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.loading = false;
            this.tableData = res.data.data.data;
            this.total = res.data.count;
            this.countryDrop = res.data.data.country; //国家
            this.shopDrop = res.data.data.shoparr; //店铺
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 列表选择
    listSelectionChange(val) {
      this.listSelection = val;
      this.listSelection = [];
      for (let i = 0; i < val.length; i++) {
        if (this.listSelection.indexOf(val[i].id) === -1) {
          this.listSelection.push(val[i].id);
        }
      }
    },
    // 搜索
    changeSearch() {
      this.loading = true;
      this.page = 1;
      this.getList();
    },
    // 清除搜索input
    clearChageSearch() {
      this.loading = true;
      this.getList();
    },
    // 批量配对
    batchPair() {
      if (this.listSelection == undefined) {
        this.$message.error("需选择配对产品");
      } else {
        this.batchPairPop = true;
        this.$http
          .get(`goods/goods_search`, {
            params: {
              page: this.batchPairPage,
              limit: this.batchPairLimit,
              name: this.batchPairName,
            },
          })
          .then((res) => {
            const { code, data } = res.data;
            if (code == 200) {
              this.batchPairTableData = res.data.data;
              this.batchPairTotal = res.data.count;
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
    },
    // 批量配对搜索
    batchPairSearch() {
      this.batchPairPage = 1;
      this.batchPair();
    },
    // 批量配对确定
    batchPairConfirm(row) {
      this.goods_id = row.id;
      this.$confirm("此操作将配对该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let info = {
            goods_id: this.goods_id,
            listing_id: this.listSelection,
          };
          this.$http.post(`sale/pair_listing`, info).then((res) => {
            const { code, data } = res.data;
            if (code == 200) {
              this.$message.success(res.data.message);
              this.getList();
              this.batchPairPop = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消配对",
          });
        });
    },
    // 配对弹窗
    pair(row) {
      console.log(row);
      this.listing_id = row.id;
      this.pairPop = true;
      this.$http
        .get(`goods/goods_search`, {
          params: {
            page: this.pairPage,
            limit: this.pairLimit,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.pairTableData = res.data.data;
            this.pairTotal = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 配对搜索
    pairSearch() {
      this.pairPage = 1;
      this.$http
        .get(`goods/goods_search`, {
          params: {
            page: this.pairPage,
            limit: this.pairLimit,
            name: this.pairName,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.pairTableData = res.data.data;
            this.pairTotal = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 配对确定
    pairConfirm(row) {
      this.goods_id = row.id;
      this.$confirm("此操作将配对该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let info = {
            goods_id: this.goods_id,
            listing_id: this.listing_id,
          };
          this.$http.post(`sale/pair_listing`, info).then((res) => {
            const { code, data } = res.data;
            if (code == 200) {
              this.$message.success(res.data.message);
              this.getList();
              this.pairPop = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消配对",
          });
        });
    },
    // 取消配对
    cancelPairing(row) {
      this.$confirm("此操作将取消该条配对, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .get(`sale/unpair_listing?listing_id=${row.id}`)
            .then((res) => {
              const { code, data } = res.data;
              if (code == 200) {
                this.$message.success(res.data.message);
                this.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消配对",
          });
        });
    },
    // 导入商品弹窗
    ImportPair() {
      this.ImportPairPop = true;
    },
    // 批量分配负责人弹窗
    assignedCharge() {
      if (this.listSelection == undefined) {
        this.$message.error("需选择分配商品");
      } else {
        this.assignedChargePop = true;
        this.$http.get(`user/get_users`).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.principalDrop = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 批量分配负责人确定
    assignedChargeConfirm() {
      let info = {
        listing_id: this.listSelection,
        user_id: this.principal,
      };
      this.$http.post(`sale/new_listing_charge_preson`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.getList();
          this.assignedChargePop = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 分配负责人弹窗
    allocationPrincipal(row) {
      this.id = row.id;
      this.principalPop = true;
      this.$http.get(`user/get_users`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.principalDrop = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 分配负责人弹窗确定
    principalConfirm() {
      let info = {
        listing_id: this.id,
        user_id: this.principal,
      };
      this.$http.post(`sale/new_listing_charge_preson`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.getList();
          this.principalPop = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 导入分配负责人弹窗
    ImportAllocation() {
      this.ImportAllocationPop = true;
    },
    // 统计弹窗
    statistics(row) {
      this.id = row.id;
      console.log(this.msg);
      this.statisticsPop = true;
      this.$nextTick(() => {
        //  执行echarts方法
        this.statisticalLine();
      });
    },
    // tabmsg(msg) {
    //   this.day = this.msg;
    //   if ((this.day = this.msg)) {
    //     this.statisticalLine();
    //   }
    // },
    // 统计折线图
    statisticalLine() {
      this.$http.get(`sale/get_statistics?id=${this.id}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.statisticsImg = res.data.data.listing.img; //图片
          this.statisticsTitle = res.data.data.listing.titel; //标题
          this.statisticsMsku = res.data.data.listing.MSKU; //msku
          this.time = res.data.data.time;
          this.count = res.data.data.count;
          this.sale = res.data.data.sale;
          let myChart = this.$echarts.init(
            document.getElementById("statisticalChart")
          );
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: "axis",
            },
            legend: {
              padding: [20, 0, 0, 0],
              data: ["订单量", "销量"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "6%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: this.time,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "订单量",
                type: "line",
                data: this.sale,
                smooth: true,
              },
              {
                name: "销量",
                type: "line",
                data: this.count,
                smooth: true,
              },
            ],
          });
          window.onresize = myChart.resize;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 打印标签弹窗
    brandLabel() {
      this.brandLabelPop = true;
    },
    // 分页下拉
    handleCurrentChange(val) {
      this.page = val;
      this.loading = true;
      this.getList();
    },
    // 分页右滚
    handleSizeChange(val) {
      this.loading = true;
      this.limit = val;
      this.page = 1;
      this.getList();
    },
    // 批量配对分页下拉
    batchPairCurrentChange(val) {
      this.batchPairPage = val;
      this.batchPair();
    },
    // 批量配对分页右滚
    batchPairSizeChange(val) {
      this.batchPairLimit = val;
      this.batchPairPage = 1;
      this.batchPair();
    },
    // 配对分页下拉
    pairCurrentChange(val) {
      this.pairPage = val;
      this.$http
        .get(`goods/goods_search`, {
          params: {
            page: this.pairPage,
            limit: this.pairLimit,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.pairTableData = res.data.data;
            this.pairTotal = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 配对分页右滚
    pairSizeChange(val) {
      this.pairLimit = val;
      this.pairPage = 1;
      this.$http
        .get(`goods/goods_search`, {
          params: {
            page: this.pairPage,
            limit: this.pairLimit,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.pairTableData = res.data.data;
            this.pairTotal = res.data.count;
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
// 导入商品信息
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
//统计弹窗
.statistics {
  .statistics_title {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: start;
    img {
      width: 60px;
      height: 60px;
    }
    p {
      padding-left: 15px;
      span:nth-of-type(1) {
        display: inline-block;
        width: 400px;
        max-height: 45px;
        font-size: 16px;
        line-clamp: 2;
        overflow: hidden;
        color: #000;
      }
      span:nth-of-type(2) {
        font-size: 12px;
        color: #888;
      }
    }
  }
  .statistics_echarts {
    // .tabs {
    //   span {
    //     display: inline-block;
    //     width: 40px;
    //     text-align: center;
    //     cursor: pointer;
    //   }
    //   .tab_active {
    //     font-weight: bold;
    //     color: #409eff;
    //     border-bottom: 3px solid #409eff;
    //     cursor: pointer;
    //   }
    // }
  }
}
// 打印商品标签
.brandLabel {
  p {
    margin-bottom: 15px;
  }
  p:nth-of-type(2) {
    margin-top: 15px;
  }
  .brandLabel_title {
    width: 100%;
    height: 120px;
    border: 1px solid #ddd;
  }
}

.paging {
  float: right;
  margin-top: 20px;
}
</style>