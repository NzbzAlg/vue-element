<template>
  <div class="procurementRequirement">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <div class="title">
      <div class="drop">
        <div class="dropButton">
          <el-button
            icon="el-icon-search"
            @click="dropDisplays"
            size="small"
          ></el-button>
        </div>
        <div class="dropSearch" v-show="isShow">
          <el-form ref="form" :model="form" label-width="90px">
            <el-col :span="6">
              <el-form-item label="sku：">
                <el-input
                  placeholder="请输入sku查询"
                  v-model="form.sku"
                  clearable
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：">
                <el-select
                  v-model="form.state"
                  placeholder="请选择状态查询"
                  style="width: 100%"
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
            <el-col :span="6">
              <el-form-item label="需求数量：">
                <el-select
                  v-model="form.quantityRequired"
                  placeholder="请选择需求数量查询"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in quantityRequired"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间：">
                <el-date-picker
                  v-model="dataTime"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%"
                ></el-date-picker>
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
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @expand-change="expandChange"
      >
        <el-table-column label="详情" type="expand">
          <template slot-scope="scope">
            <p style="color: red; margin: 0 0 10px 10px">商品规格：</p>
            <el-table :data="scope.row.goods" border>
              <el-table-column prop="Model" label="图片" align="center">
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
                label="sku"
                align="center"
              ></el-table-column>
              <el-table-column label="采购需求量" align="center">
                <template slot-scope="scope">
                  <span v-html="scope.row.country_arr"></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="count"
                label="实际采购量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="scount"
                label="装箱数(个)"
                align="center"
              ></el-table-column>
              <el-table-column prop="stock" label="箱数" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.count / scope.row.scount }}</span>
                  <span></span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="plan_num"
          label="关联编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="path"
          label="创建部门"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="creat_man"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="creat_time"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="man_xuqiu_yun"
          label="运营审核人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="time_xuqiu_yun"
          label="运营审核时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="man_wuliu"
          label="物流审核人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="time_wuliu"
          label="物流审核时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="man_xuqiu"
          label="采购审核人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="time_xuqiu"
          label="采购审核时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="c_time"
          label="需厂家出货时间"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">待生成计划</span>
            <span v-if="scope.row.status == -1">待采购审核</span>
            <span v-if="scope.row.status == -1.5">待物流审核</span>
            <span v-if="scope.row.status == -2">待运营审核</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ps"
          label="备注"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span style="cursor: pointer">{{ scope.row.ps }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              style="margin: 0 10px 10px 0"
              @click="salesForecast"
              >销量预估</el-button
            >
            <el-button
              size="mini"
              type="danger"
              style="margin-left: 0px"
              @click="deleteDemand(scope.row)"
              >删除需求</el-button
            >
            <el-button
              size="mini"
              type="warning"
              style="margin: 0 10px 0 0"
              @click="dismissDemand(scope.row)"
              >驳回需求</el-button
            >
            <el-button
              size="mini"
              type="primary"
              style="margin-left: 0px"
              @click="operationalAudit(scope.row)"
              v-if="scope.row.status == -2"
              >运营审核</el-button
            >
            <el-button
              size="mini"
              type="primary"
              style="margin-left: 0px"
              @click="logisticsAudit(scope.row)"
              v-if="scope.row.status == -1.5"
              >物流审核</el-button
            >
            <el-button
              size="mini"
              type="primary"
              style="margin-left: 0px"
              @click="purchaseAudit(scope.row)"
              v-if="scope.row.status == -1"
              >采购审核</el-button
            >
            <el-button
              size="mini"
              type="primary"
              style="margin-left: 0px"
              @click="generatePlan(scope.row)"
              v-if="scope.row.status == -0"
              >生成计划</el-button
            >
            <el-button
              size="mini"
              type="primary"
              style="margin: 10px 0 0 0"
              @click="compile(scope.row)"
              >备注</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 销量预估弹窗 -->
    <el-dialog title="提示" :visible.sync="salesForecastPop" width="50%">
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
        <el-button @click="salesForecastPop = false">取 消</el-button>
        <el-button type="primary" @click="salesForecastPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除需求弹窗 -->
    <el-dialog title="提示" :visible.sync="deleteDemandPop" width="30%">
      <el-form :model="deleteForm">
        <el-form-item label="删除理由：" label-width="90px">
          <el-input v-model="deleteForm.reason" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDemandPop = false">取 消</el-button>
        <el-button type="primary" @click="deleteDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 驳回需求弹窗 -->
    <el-dialog title="提示" :visible.sync="dismissDemandPop" width="30%">
      <el-form :model="rejectForm">
        <el-form-item label="驳回理由：" label-width="90px">
          <el-input v-model="rejectForm.reason" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dismissDemandPop = false">取 消</el-button>
        <el-button type="primary" @click="rejectDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生成计划弹窗 -->
    <el-dialog title="提示" :visible.sync="generatePlanPop" width="30%">
      <el-form :model="planForm">
        <el-col :span="24">
          <el-form-item label="采购模式：" label-width="90px">
            <el-select
              v-model="planForm.pattern"
              placeholder="请选择状态查询"
              style="width: 100%"
            >
              <el-option
                v-for="item in purchasingPattern"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="部门：" label-width="90px">
            <el-select
              v-model="planForm.group"
              placeholder="请选择状态查询"
              style="width: 100%"
            >
              <el-option
                v-for="item in group"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="generatePlanPop = false">取 消</el-button>
        <el-button type="primary" @click="planDetermination">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 备注弹窗 -->
    <el-dialog title="备注" :visible.sync="compilePop" width="30%">
      <el-form :model="compileForm" label-width="90px">
        <el-form-item label="备注：">
          <el-input v-model="compileForm.ps" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="compilePop = false">取 消</el-button>
        <el-button type="primary" @click="compileDetermine">确 定</el-button>
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
      value: "",
      isShow: false,
      salesForecastPop: false, //销量预估弹窗
      deleteDemandPop: false, //删除需求弹窗
      dismissDemandPop: false, //驳回需求弹窗
      generatePlanPop: false, //生成计划弹窗
      compilePop: false, //备注弹窗
      activeName: "first",
      form: {
        sku: "", //sku
        state: "", //状态
        quantityRequired: "", //需求数量
      },
      dataTime: "",
      // 状态
      state: [
        {
          id: 1,
          label: "代运营审核",
        },
        {
          id: 2,
          label: "待物流审核",
        },
        {
          id: 3,
          label: "待采购审核",
        },
        {
          id: 4,
          label: "待生成计划",
        },
      ],
      // 需求数量
      quantityRequired: [
        {
          id: 1,
          label: "大于300",
        },
        {
          id: 2,
          label: "小于等于300",
        },
      ],
      // 采购模式
      purchasingPattern: [
        {
          id: 1,
          label: "大宗采购",
        },
        {
          id: 2,
          label: "测款采购",
        },
        {
          id: 3,
          label: "样品采购",
        },
      ],
      // 部门
      group: [
        {
          id: 1,
          label: "采购部",
        },
        {
          id: 2,
          label: "产品中心",
        },
      ],
      classAll: [],
      brandAll: [],
      tableData: [], //列表数据
      goods: [], //列表详情数据
      deleteForm: {
        //删除需求
        reason: "",
      },
      rejectForm: {
        //驳回需求
        reason: "",
      },
      compileForm: {
        ps: "", //备注
      },
      // 生成计划
      planForm: {
        pattern: "", //采购模式
        group: "", //部门
      },
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
    // 列表详情下拉数据
    expandChange(row) {
      console.log(row);
      if (row.goods == []) {
        console.log(1);
      } else {
        this.goods = row.goods;
      }
    },
    // 列表数据
    getList() {
      this.$http
        .get(`api/getsql/show_xuqiu`, {
          params: {
            page: this.page,
            limit: this.limit,
            sku: this.form.sku, //sku
            status: this.form.state, //状态
            sel_num: this.form.quantityRequired, //需求数量
            stime: this.dataTime[0], //开始日期
            etime: this.dataTime[1], //结束日期
          },
        })
        .then((res) => {
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
    //销量预估
    salesForecast() {
      this.salesForecastPop = true;
    },
    // 删除需求
    deleteDemand(row) {
      console.log(row);
      this.id = row.id;
      this.deleteDemandPop = true;
    },
    // 删除确定
    deleteDetermine() {
      this.$http
        .get(`api/getsql/del_need`, {
          params: {
            id: this.id,
            del_ps: this.deleteForm.reason,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.deleteDemandPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 驳回需求
    dismissDemand(row) {
      this.id = row.id;
      this.dismissDemandPop = true;
    },
    // 驳回确定
    rejectDetermine() {
      this.$http
        .get(`api/getsql/bohui_need`, {
          params: {
            id: this.id,
            bohui_ps: this.rejectForm.reason,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.dismissDemandPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 运营审核
    operationalAudit(row) {
      this.$confirm("确认运营审核通过吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .get(`api/getsql/shen_xuqiu_yun`, {
              params: {
                id: row.id,
              },
            })
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
            message: "已取消审核",
          });
        });
    },
    // 物流审核
    logisticsAudit(row) {
      this.$confirm("确认物流审核通过吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .get(`api/getsql/shen_xuqiu_wuliu`, {
              params: {
                id: row.id,
              },
            })
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
            message: "已取消审核",
          });
        });
    },
    // 采购审核
    purchaseAudit(row) {
      this.$confirm("确认采购审核通过吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .get(`api/getsql/shen_xuqiu`, {
              params: {
                id: row.id,
              },
            })
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
            message: "已取消审核",
          });
        });
    },
    // 生成计划
    generatePlan(row) {
      this.id = row.id;
      this.generatePlanPop = true;
    },
    // 生成计划确定
    planDetermination() {
      this.$http
        .get(`api/getsql/create_plan`, {
          params: {
            purchaseid: this.id,
            mode: this.planForm.pattern,
            group: this.planForm.group,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.generatePlanPop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 备注弹窗
    compile(row) {
      this.id = row.id;
      this.compilePop = true;
      this.$http
        .post(`api/getsql/get_ps_by_purchaseid?id=${this.id}`)
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.compileForm = res.data.data;
            console.log(res.data.data);
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 编辑确定
    compileDetermine() {
      this.$http
        .get(`api/getsql/change_ps_xuqiu`, {
          params: {
            id: this.id,
            ps: this.compileForm.ps,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.compilePop = false;
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
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
.title {
    margin-bottom: 20px;
    height: 30px;
    .drop {
      width: 100%;
      .dropButton {
        width: 5%;
        float: left;
        margin-top: 5px;
      }
      .dropSearch {
        width: 95%;
        float: right;
      }
    }
  }
</style>