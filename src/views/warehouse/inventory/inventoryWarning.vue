<template>
  <div class="inventoryWarning">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <h1>日期：2020-09-25查看的FBA库存预警表</h1>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="调拨上架时间" align="center" width="70">
        </el-table-column>
        <el-table-column prop="name" label="仓库" align="center" width="70">
        </el-table-column>
        <el-table-column prop="address" label="图片" align="center" width="70"> </el-table-column>
        <el-table-column prop="address" label="品名" align="center" width="70"> </el-table-column>
        <el-table-column prop="address" label="sku" align="center" width="70"> </el-table-column>
        <el-table-column prop="address" label="ASIN" align="center" width="70"> </el-table-column>
        <el-table-column prop="number" label="可售" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="预留" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="FBA库存" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="不可售" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="在途" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="厂家未入库" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="库存下限" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="库存上限" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="2020-08销量" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="2020-08日销量" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="2020-07销量" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="2020-07日销量" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="日销量差" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="预警销售天数" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="采购到货天数" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="预计可卖天数" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="建议采购数量" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="滞留库存" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="采购成本" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="货值" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="3个月" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="3-6个月" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="6-9个月" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="9-12个月" align="center" width="50"> </el-table-column>
        <el-table-column prop="number" label="排名" align="center" width="50"> </el-table-column>
      </el-table>
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀518 弄",
          number:633
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区",
          number:0
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上路 1519 弄",
          number:0
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市6 弄",
          number:0
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 25px;
  margin-bottom: 20px;
}
</style>