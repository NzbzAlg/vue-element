<template>
  <div class="generatedRequirement">
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
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center"></el-table-column>
        <el-table-column prop="name" label="品名" align="center"></el-table-column>
        <el-table-column prop="address" label="SKU" align="center"></el-table-column>
        <el-table-column prop="address" label="类型" align="center"></el-table-column>
        <el-table-column prop="address" label="分类" align="center"></el-table-column>
        <el-table-column prop="address" label="品牌" align="center"></el-table-column>
        <el-table-column prop="address" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="address" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template>
            <el-button type="primary" size="mini" @click="procurementDemand">生成采购需求</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 生成采购需求 -->
    <el-dialog title="提示" :visible.sync="procurementDemandPop" width="50%">
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
          <el-tab-pane label="采购需求" name="demand">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="名称" align="center"></el-table-column>
              <el-table-column prop="name" label="sku" align="center"></el-table-column>
              <el-table-column prop="name" label="下单数量" align="center"></el-table-column>
              <el-table-column prop="name" label="装箱数(个)" align="center"></el-table-column>
              <el-table-column prop="name" label="箱数" align="center"></el-table-column>
              <el-table-column prop="name" label="需厂家出货时间" align="center"></el-table-column>
              <el-table-column prop="name" label="备注" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="procurementDemandPop = false">取 消</el-button>
        <el-button type="primary" @click="procurementDemandPop = false">确 定</el-button>
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
import Crumbs from "@/components/crumbs";
export default {
  components: {
    Crumbs,
  },
  data() {
    return {
      value: "",
      currentPage1: 1,
      procurementDemandPop: false, //生成采购需求弹窗
      activeName: "first",
      state: [
        {
          id: 1,
          label: "全部国家",
        },
      ],
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
    // 生成采购需求弹窗
    procurementDemand() {
      this.procurementDemandPop = true;
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
</style>