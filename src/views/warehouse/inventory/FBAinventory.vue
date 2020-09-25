<template>
  <div class="FBAinventory">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <div class="title">
      <el-select
        v-model="countryValue"
        filterable
        placeholder="请选择国家查询"
        @change="countryQuery($event)"
      >
        <el-option
          v-for="item in country"
          :key="item.id"
          :label="item.countryname"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="warehouseValue"
        filterable
        placeholder="请选择仓库查询"
        style="margin-left:20px"
        @change="warehouseQuery($event)"
      >
        <el-option v-for="item in warehouse" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select
        v-model="categoryValue"
        placeholder="请选择类别查询"
        style="margin-left:20px"
        @change="categoryQuery($event)"
      >
        <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input
        placeholder="请输入MSKU查询"
        v-model="msku"
        style="width:210px;margin-left:20px"
        v-show="this.categoryId == 1"
      ></el-input>
      <el-input
        placeholder="请输入FNSKU查询"
        v-model="fnsku"
        style="width:210px;margin-left:20px"
        v-show="this.categoryId == 2"
      ></el-input>
      <el-input
        placeholder="请输入ASIN查询"
        v-model="asin"
        style="width:210px;margin-left:20px"
        v-show="this.categoryId == 3"
      ></el-input>
      <el-input
        placeholder="请输入品名或SKU查询"
        v-model="sku"
        style="width:210px;margin-left:20px"
        v-show="this.categoryId == 4"
      ></el-input>
      <el-input
        placeholder="请输入品名或SKU查询"
        v-model="sku"
        style="width:210px;margin-left:20px"
        v-show="this.categoryId == 5"
      ></el-input>
      <el-button type="primary" style="margin-left:20px" @click="grabble">查询</el-button>
    </div>
    <!-- 列表数据 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" height="720">
        <el-table-column label="查看" align="center" type="expand">
          <template slot-scope="scope">
            <div style="margin-bottom:10px">
              <span style="color: #99a9bf;font-size:16px">FBA在途信息：</span>
              <div v-for="(fbaMessage,index) in scope.row.onway" :key="index">
                <span>{{fbaMessage.name}}</span>
              </div>
            </div>
            <div>
              <span style="color: #99a9bf;font-size:16px">调拨信息：</span>
              <div v-for="(transfersInformation,index) in scope.row.onway_local" :key="index">
                <span>{{transfersInformation.name}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="warehouse" label="仓库" align="center"></el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img
              :src="'http://192.168.10.189:82/'+ scope.row.img"
              alt
              style="width:50px;height:50px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="good_name" label="商品名" align="center"></el-table-column>
        <el-table-column prop="sku" label="sku" align="center"></el-table-column>
        <el-table-column prop="ASIN" label="ASIN" align="center"></el-table-column>
        <el-table-column prop="SellerSKU" label="MSKU" align="center"></el-table-column>
        <el-table-column prop="FNSKU" label="FNSKU" align="center"></el-table-column>
        <el-table-column prop="TotalSupplyQuantity" label="总数" align="center"></el-table-column>
        <el-table-column prop="InStockSupplyQuantity" label="可售" align="center"></el-table-column>
        <el-table-column prop="unsell" label="不可售" align="center"></el-table-column>
        <el-table-column prop="yuliu" label="预留" align="center"></el-table-column>
        <el-table-column prop="working" label="working" align="center"></el-table-column>
        <el-table-column prop="shipped" label="shipped" align="center"></el-table-column>
        <el-table-column prop="receiving" label="receiving" align="center"></el-table-column>
        <el-table-column prop="onwaysum" label="FBA在途" align="center"></el-table-column>
        <el-table-column prop="onway_local_sum" label="调拨量" align="center"></el-table-column>
        <el-table-column prop="cj_sum" label="厂家库存" align="center"></el-table-column>
        <el-table-column prop="inv1" label="3个月" align="center"></el-table-column>
        <el-table-column prop="inv2" label="3-6个月" align="center"></el-table-column>
        <el-table-column prop="inv3" label="6-9个月" align="center"></el-table-column>
        <el-table-column prop="inv4" label="9-12个月" align="center"></el-table-column>
        <el-table-column prop="do_time" label="同步时间" align="center" width="180"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="checkSales(scope.row)">查看销量</el-button>
            <el-button size="mini" type="danger">删除库存</el-button>
            <el-button size="mini" type="success">修改系数</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看销量弹窗 -->
    <el-dialog title="提示" :visible.sync="checkSalesPop" width="80%">
      <div class="title">
        <span>请选择时间区域：</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" style="margin-left:20px" @click="dateQuery">查询</el-button>
      </div>
      <!-- <div v-for="(item,key,index) in headerMonth">

        {{ index }}. {{ key }} : {{ item }}

        </div> -->
      <el-table :data="salesTableData" style="width: 100%">
        <el-table-column
          v-for="(item,key) in headerMonth"
          :key="key"
          v-if="key == -1"
          :prop="item.prop"
          :label="item.month"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="'http://192.168.10.189:82/'+scope.row.img" alt style="width:20px;height:50px" />
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item,key) in headerMonth"
          :key="key"
          v-if="key > -1"
          :prop="item.prop"
          :label="item.month"
          align="center"
        >
        </el-table-column>
        <!-- </div> -->
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkSalesPop = false">取 消</el-button>
        <el-button type="primary" @click="checkSalesPop = false">确 定</el-button>
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
      value1: "",
      demoTable: [
        {
          id: 0,
          month: "站点",
        },
        {
          id: 0,
          month: "站点",
        },
        {
          id: 0,
          month: "站点",
        },
        {
          id: 0,
          month: "站点",
        },
      ],
      countryValue: "",
      countryId: "",
      warehouseValue: "",
      warehouseId: "",
      categoryValue: "",
      page: 1,
      limit: 6,
      total: 0,
      msku: "", //MSKU
      fnsku: "", //fnsku
      asin: "", //asin
      sku: "", //品名或者sku搜索
      category: [
        //选择类别
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
          name: "品名",
        },
        {
          id: 5,
          name: "SKU",
        },
      ],
      categoryId: 1, //类别id
      tableData: [], //列表数据
      warehouse: [], //仓库
      country: [], //国家
      checkSalesPop: false, //查看销量弹窗
      salesTableData: [], //查看销量列表数据
      headerMonth: [], //销量表头数据
      salesData: [], //销量数据
    };
  },
  mounted() {
    this.getList();
    this.getSearch();
  },
  methods: {
    //   列数数据
    getList() {
      this.$http
        .get(`api/fba/get_all`, {
          params: {
            limit: this.limit,
            page: this.page,
            cang: this.warehouseId,
            sel_country: this.countryId,
            msku: this.msku,
            fnsku: this.fnsku,
            asin: this.asin,
            sku: this.sku,
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
    // 国家下拉框查询
    countryQuery(event) {
      this.countryId = event;
    },
    // 仓库下拉框查询
    warehouseQuery(event) {
      this.warehouseId = event;
    },
    // 类别下拉框查询
    categoryQuery(event) {
      this.categoryId = event;
    },
    // 国家查询跟仓库查询
    getSearch() {
      this.$http.get(`/api/fba/fba_get_all_need`).then((res) => {
        console.log(res);
        const { code, data } = res.data;
        if (code == 200) {
          this.warehouse = res.data.data.cang; //仓库
          this.country = res.data.data.country; //国家
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 查看销量
    checkSales(row) {
      this.sku = row.sku;
      this.checkSalesPop = true;
      this.$http.get(`/api/getsql/history?sku=${this.sku}`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.headerMonth = res.data.data.month;
          this.salesTableData = res.data.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //日期查询
    dateQuery() {
      this.$http
        .get(`/api/getsql/history`, {
          params: {
            stime: this.value1[0],
            etime: this.value1[1],
            sku: this.sku,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.headerMonth = res.data.data.month;
            this.salesTableData = res.data.data.data;
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
  margin-bottom: 20px;
}
</style>