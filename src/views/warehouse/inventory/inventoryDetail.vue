
<template>
  <div class="inventoryDetail">
    <!-- 搜索 -->
    <div class="title">
      <!-- 仓库 -->
      <el-select
        v-model="warehouse"
        placeholder="仓库"
        clearable
        filterable
        size="medium"
        style="width: 150px"
        @change="changeSearch"
      >
        <el-option
          v-for="item in warehouseDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 国家 -->
      <el-select
        v-model="country"
        placeholder="国家"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
        @change="changeSearch"
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
        @change="changeSearch"
      >
        <el-option
          v-for="item in shopDrop"
          :key="item.id"
          :label="item.shopname"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 分类 -->
      <el-select
        v-model="classify"
        placeholder="分类"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
        @change="changeSearch"
      >
        <el-option
          v-for="item in classifyDrop"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 品牌 -->
      <el-select
        v-model="brand"
        placeholder="品牌"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
        @change="changeSearch"
      >
        <el-option
          v-for="item in brandDrop"
          :key="item.id"
          :label="item.brand_name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 搜索 -->
      <el-input
        placeholder="搜索内容"
        v-model="searchContent"
        class="input-with-select"
        style="width: 240px; margin-left: 10px"
        size="medium"
        clearable
        @change="changeSearch"
      >
        <el-select
          v-model="multipleDrop"
          slot="prepend"
          size="medium"
          style="width: 90px"
        >
          <el-option
            v-for="item in multipleConditions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-input>
      <!-- <el-button
        type="primary"
        size="medium"
        style="margin-left: 10px"
        @click="search"
        >搜索</el-button
      > -->
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <!-- <el-button size="small" type="primary" @click="warehouseInitial"
          >导入仓库初始值</el-button
        > -->
      </div>
      <el-table :data="tableData" border style="width: 100%" height="600">
        <el-table-column
          prop="img"
          label="图片"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="$store.state.url + scope.row.img" alt="" style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="品名"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="goods_sku"
          label="SKU"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="FNSKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="warehouse"
          label="仓库"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="goods_commodity"
          label="单位"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="available_quantity"
          label="可用量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="deliverd_quantity"
          label="待发货量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="inspected_quantity"
          label="待检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="defective_quantity"
          label="次品量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待到货量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="total"
          label="实际总量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="预计总量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="采购单价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="单位库存成本"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="inventory_cost"
          label="库存成本"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 导入仓库初始值 -->
    <el-dialog
      title="导入库存初始值"
      :visible.sync="warehouseInitialPop"
      width="30%"
    >
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入仓库初始值</el-button>
          <span style="color: #006eff">下载模板</span>
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
        <el-button @click="warehouseInitialPop = false">取 消</el-button>
        <el-button type="primary" @click="warehouseInitialPop = false"
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
import pagination from "@/components/pagination"; // 分页
export default {
  components: {
    pagination,
  },
  data() {
    return {
      warehouseInitialPop: false, //导入仓库初始值弹窗
      warehouse: "", //仓库
      warehouseDrop: [],//仓库下拉
      country: "", //国家
      countryDrop: [],//国家下拉
      shop: "", //店铺
      shopDrop: [],// 店铺下拉
      classify: "", //分类
      classifyDrop: [],// 分类下拉
      brand: "", //品牌
      brandDrop: [], // 品牌分类
      searchContent: "", //搜索
      multipleDrop: 1, //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "品名",
        },
        {
          id: 2,
          name: "SKU",
        },
        {
          id: 3,
          name: "MSKU",
        },
        {
          id: 4,
          name: "FNSKU",
        },
      ],
      tableData: [], //列表数据
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 列表数据
    getList() {
      this.$http
        .get(`warehouse/warehouse_details`, {
          params: {
            page: this.page,
            limit: this.limit,
            selcang: this.warehouse,//仓库
            selcountry: this.country,//国家
            selshop: this.shop,//店铺
            seltype: this.classify,//分类
            selbrand: this.brand,//品牌
            proname: this.multipleDrop == 1 ? this.searchContent : "",//品名
            sku: this.multipleDrop == 2 ? this.searchContent : "",//SKU
            MSKU: this.multipleDrop == 3 ? this.searchContent : "",//MSKU
            FNSKU: this.multipleDrop == 4 ? this.searchContent : "",//SFNKU
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.count;
            this.warehouseDrop = res.data.data.warehouse; //仓库
            this.countryDrop = res.data.data.country; //国家
            this.shopDrop = res.data.data.shop; //店铺
            this.classifyDrop = res.data.data.type; //分类
            this.brandDrop = res.data.data.brand; //品牌
            this.principalDrop = res.data.data.user; //用户
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 搜索
    changeSearch() {
      this.page = 1
      this.getList();
    },
    // 导入仓库初始值弹窗
    warehouseInitial() {
      this.warehouseInitialPop = true;
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
// 导入仓库初始值
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
</style>