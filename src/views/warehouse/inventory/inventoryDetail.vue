
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
      <!-- 分类 -->
      <el-select
        v-model="classify"
        placeholder="分类"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in classifyDrop"
          :key="item.id"
          :label="item.name"
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
      >
        <el-option
          v-for="item in brandDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 负责人 -->
      <el-select
        v-model="principal"
        placeholder="品牌"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in principalDrop"
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
        style="width:240px;margin-left:10px"
        size="medium"
      >
        <el-select
          v-model="multipleDrop"
          clearable
          filterable
          slot="prepend"
          size="medium"
          style="width: 90px;"
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
        <el-button size="small" type="primary" @click="warehouseInitial"
          >导入仓库初始值</el-button
        >
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="number"
          label="图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="品名/SKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="FNSKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="仓库"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="单位"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="可用量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待发货量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="次品量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待到货量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="实际总量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="预计总量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购单价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="单位库存成本"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
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
      warehouseInitialPop: false, //导入仓库初始值弹窗
      warehouse: "", //仓库
      //仓库下拉
      warehouseDrop: [
        {
          id: 1,
          name: "仓库1",
        },
      ],
      country: "", //国家
      //国家下拉
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
          name: "ST-US",
        },
      ],
      classify: "", //分类
      // 分类下拉
      classifyDrop: [
        {
          id: 1,
          name: "分类",
        },
      ],
      brand: "", //品牌
      // 品牌分类
      brandDrop: [
        {
          id: 1,
          name: "品牌",
        },
      ],
      principal: "", //负责人
      // 负责人下拉
      principalDrop: [
        {
          id: 1,
          name: "负责人",
        },
      ],
      searchContent: "", //搜索
      multipleDrop:'',//多个下拉值
      multipleConditions:[
        {
          id:1,
          name:'品名'
        },
        {
          id:2,
          name:'SKU'
        },
        {
          id:3,
          name:'MSKU'
        },
        {
          id:4,
          name:'FNSKU'
        },
      ],
      currentPage1: 1,
      tableData: [
        {
          id: 1,
          number: 2,
        },
      ],
    };
  },
  methods: {
    // 导入仓库初始值弹窗
    warehouseInitial() {
      this.warehouseInitialPop = true;
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
.paging {
  float: right;
  margin-top: 20px;
}
</style>