<template>
  <div class="salesForecast">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="drop">
        <div class="dropButton">
          <el-button
            icon="el-icon-search"
            @click="dropDisplays"
            size="small"
          ></el-button>
          <el-button type="success" @click="salesProducts" size="small"
            >添加销量预估产品</el-button
          >
          <el-button type="primary" @click="historicalSales" size="small"
            >查看历史销量</el-button
          >
        </div>
        <div class="dropSearch" v-show="isShow">
          <el-form ref="form" :model="form" label-width="90px">
            <el-col :span="6">
              <el-form-item label="品名/sku：">
                <el-input
                  placeholder="请输入品名或sku查询"
                  v-model="form.name"
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分类：">
                <el-select
                  v-model="form.classAll"
                  placeholder="请选择分类查询"
                  style="width: 100%"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in classAll"
                    :key="item.id"
                    :label="item.class_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品牌：">
                <el-select
                  v-model="form.brandAll"
                  placeholder="请选择品牌查询"
                  style="width: 100%"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in brandAll"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" size="small" @click="grabble"
                  >搜索</el-button
                >
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
          <template slot-scope="scope">
            <img
              :src="'http://192.168.10.190:82/' + scope.row.img"
              alt=""
              style="width: 30px; height: 30px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="品名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sku"
          label="SKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="class"
          label="分类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="brand"
          label="品牌"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template>
            <el-button type="success" size="mini" @click="newSalesProjections"
              >新的销量预估</el-button
            >
            <el-button type="primary" size="mini" @click="procurementDemand"
              >生成采购需求</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加销量预估产品弹窗 -->
    <el-dialog
      title="添加销量预估产品"
      :visible.sync="salesProductsPop"
      width="40%"
    >
      <div class="title">
        <el-select
          v-model="value"
          placeholder="请选择分类查询"
          style="width: 150px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择品牌查询"
          style="width: 150px; margin-left: 20px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入SKU查询"
          style="width: 170px; margin-left: 20px"
        ></el-input>
        <el-button type="primary" style="margin-left: 20px">查询</el-button>
      </div>
      <div class="content">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          ref="multipleTable"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="date"
            label="图片"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="品名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="sku"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="分类"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="品牌"
            align="center"
          ></el-table-column>
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
        <el-button @click="salesProductsPop = false">取 消</el-button>
        <el-button type="primary" @click="salesProductsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看历史销量弹窗 -->
    <el-dialog title="历史销量" :visible.sync="historicalSalesPop" width="40%">
      <div class="title">
        <el-select
          v-model="value"
          placeholder="请选择分类查询"
          style="width: 150px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择品牌查询"
          style="width: 150px; margin-left: 20px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入SKU查询"
          style="width: 170px; margin-left: 20px"
        ></el-input>
        <el-button type="primary" style="margin-left: 20px">查询</el-button>
      </div>
      <div class="content">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          ref="multipleTable"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="date"
            label="图片"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="品名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="sku"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="分类"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="品牌"
            align="center"
          ></el-table-column>
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
        <el-button @click="historicalSalesPop = false">取 消</el-button>
        <el-button type="primary" @click="historicalSalesPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 新的销量预估弹窗 -->
    <el-dialog title="提示" :visible.sync="newSalesProjectionsPop" width="50%">
      <div class="title">
        <el-select
          v-model="value"
          placeholder="请选择预估国家查询"
          style="width: 200px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择产品查询"
          style="width: 200px; margin-left: 20px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 20px">查询</el-button>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="销量预估" name="first">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="站点/详情"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="详情"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-3"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-4"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-5"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-6"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-7"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-8"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-9"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-10"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-11"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-12"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2021-1"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2021-2"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2021-3"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2021-4"
                align="center"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="FBA和在途" name="second">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="站点"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="品名"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="2020-09-23FBA库存"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="预计可售至"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途1"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途2"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途3"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途4"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途5"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途6"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="共计"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="预计可售至"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="预计2021-03底需"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="厂家剩余未发货"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="手动预计日期"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="备注"
                align="center"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="库存预警" name="third">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="站点/品名"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="商品备货时间(天)"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="海运时间(天)"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="厂家备货时间(天)"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="库存预计销售到"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="备货预计销售至"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="库存预警"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="出货预警"
                align="center"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newSalesProjectionsPop = false">取 消</el-button>
        <el-button type="primary" @click="newSalesProjectionsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 生成采购需求 -->
    <el-dialog title="提示" :visible.sync="procurementDemandPop" width="50%">
      <div class="title">
        <el-select
          v-model="value"
          placeholder="请选择预估国家查询"
          style="width: 200px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择产品查询"
          style="width: 200px; margin-left: 20px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 20px">查询</el-button>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="销量预估" name="first">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="站点/详情"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="详情"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-3"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-4"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-5"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-6"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-7"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-8"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-9"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-10"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-11"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2020-12"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2021-1"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2021-2"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2021-3"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="2021-4"
                align="center"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="FBA和在途" name="second">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="站点"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="品名"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="2020-09-23FBA库存"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="预计可售至"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途1"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途2"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途3"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途4"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途5"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="在途6"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="共计"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="预计可售至"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="预计2021-03底需"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="厂家剩余未发货"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="手动预计日期"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="备注"
                align="center"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="库存预警" name="third">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="站点/品名"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="商品备货时间(天)"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="海运时间(天)"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="厂家备货时间(天)"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="库存预计销售到"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="备货预计销售至"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="库存预警"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="出货预警"
                align="center"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="采购需求" name="demand">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="sku"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="下单数量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="装箱数(个)"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="箱数"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="需厂家出货时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="备注"
                align="center"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="procurementDemandPop = false">取 消</el-button>
        <el-button type="primary" @click="procurementDemandPop = false"
          >确 定</el-button
        >
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
      isShow: false,
      state: [
        {
          id: 1,
          label: "启用",
        },
        {
          id: 2,
          label: "禁用",
        },
      ],
      form: {
        name: "", //品名/sku
        classAll: "", //选择分类
        brandAll: "", //选择品牌
      },
      value: "",
      currentPage1: 1,
      salesProductsPop: false, //添加销量预估产品弹窗
      historicalSalesPop: false, //查看历史销量弹窗
      newSalesProjectionsPop: false, //新的销量预估弹窗
      procurementDemandPop: false, //生成采购需求弹窗
      activeName: "first",
      tableData: [], //列表数据
      classAll: [], //选择分类
      brandAll: [], //选择品牌
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 搜索框下拉收起
    dropDisplays() {
      this.isShow = !this.isShow;
    },
    // 列表数据
    getList() {
      this.$http
        .get(`/api/getsql/yugu`, {
          params: {
            page: this.page,
            limit: this.limit,
            search: this.form.name, //品名/sku
            class: this.form.classAll, //选择分类
            brand: this.form.brandAll, //选择品牌
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.tableData = res.data.data.data; //列表数据
            this.classAll = res.data.data.class_all; //分类数据
            this.brandAll = res.data.data.brand_all; //品牌数据
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
    // 添加销量预估产品弹窗
    salesProducts() {
      this.salesProductsPop = true;
    },
    // 查看历史销量弹窗
    historicalSales() {
      this.historicalSalesPop = true;
    },
    // 新的销量预估弹窗
    newSalesProjections() {
      this.newSalesProjectionsPop = true;
    },
    // 生成采购需求弹窗
    procurementDemand() {
      this.procurementDemandPop = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
.paging {
  float: right;
  margin-top: 20px;
}
.title {
    margin-bottom: 20px;
    height: 30px;
    .drop {
      width: 100%;
      .dropButton {
        width: 20%;
        float: left;
        margin-top: 5px;
      }
      .dropSearch {
        width: 80%;
        float: right;
      }
    }
  }

</style>