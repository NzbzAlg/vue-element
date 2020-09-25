<template>
  <div class="qualityInspection">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <div>
          <el-input placeholder="请输入查询内容" v-model="dropDown" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option
                v-for="item in dropDownValue"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-input>
        </div>
        <div style="margin-left:20px">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-select v-model="value" placeholder="请选择采购类型" filterable style="margin-left:20px;">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择供应商" filterable style="margin-left:20px;">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择部门" style="margin-left:20px">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择状态" style="margin-left:20px">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
        </div>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" @expand-change="clickDetails">
        <el-table-column label="查看商品" type="expand">
          <template>
            <span style="color:red">商品规格：</span>
            <el-table :data="tableData" border>
              <el-table-column prop="goodsSupId" label="图片" align="center"></el-table-column>
              <el-table-column prop="specsName" label="品名/sku" align="center"></el-table-column>
              <el-table-column prop="specsOriginPrice" label="采购价(已算是否含税)" align="center"></el-table-column>
              <el-table-column prop="specsPrice" label="税率(%)" align="center"></el-table-column>
              <el-table-column prop="specsType" label="上次采购价" align="center"></el-table-column>
              <el-table-column prop="stock" label="采购量" align="center"></el-table-column>
              <el-table-column prop="stock" label="总价(元)" align="center"></el-table-column>
              <el-table-column prop="stock" label="入库量" align="center"></el-table-column>
              <el-table-column prop="stock" label="待质检量" align="center"></el-table-column>
              <el-table-column prop="stock" label="待签收量" align="center"></el-table-column>
              <el-table-column prop="stock" label="次品量" align="center"></el-table-column>
              <el-table-column prop="stock" label="退款次品量" align="center"></el-table-column>
              <el-table-column prop="stock" label="备注" align="center"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="采购类型" align="center"></el-table-column>
        <el-table-column prop="date" label="合同编号" align="center"></el-table-column>
        <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="name" label="创建人" align="center"></el-table-column>
        <el-table-column prop="name" label="供应商" align="center"></el-table-column>
        <el-table-column prop="name" label="仓库/物流单号" align="center"></el-table-column>
        <el-table-column prop="name" label="厂家出货时间" align="center"></el-table-column>
        <el-table-column prop="name" label="备注" align="center"></el-table-column>
        <el-table-column prop="name" label="状态" align="center"></el-table-column>
        <el-table-column prop="name" label="接受部门" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="560">
          <template>
            <el-button size="mini" type="success" @click="details">详情</el-button>
            <el-button size="mini" type="primary">付款记录</el-button>
            <el-button size="mini" type="primary" @click="addPaymentRecords">添加付款记录</el-button>
            <el-button size="mini" type="primary">出货计划</el-button>
            <el-button size="mini" type="warning">查看附件</el-button>
            <el-button size="mini" type="warning">上传附件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="提示" :visible.sync="detailsPop" width="60%">
      <p style="font-weight: bold;margin-bottom:20px;color:#000">合同号：ZYTX-JCKT-021</p>
      <el-divider content-position="left">步骤</el-divider>
      <div style="width:90%;margin-left:50px">
        <el-steps :active="1">
          <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 3" description="这段就没那么长了"></el-step>
        </el-steps>
      </div>
      <div>
        <el-divider content-position="left">基本信息</el-divider>
        <el-form :model="form" style="height:185px">
          <el-col :span="8">
            <el-form-item label="采购仓库：" label-width="120px">
              <el-input style="width:210px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商：" label-width="120px">
              <el-input style="width:210px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人：" label-width="100px">
              <el-input style="width:210px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式：" label-width="120px">
              <el-input style="width:210px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：" label-width="120px">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div>
        <el-divider content-position="left">商品信息</el-divider>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="图片" align="center"></el-table-column>
          <el-table-column prop="name" label="品名/sku" align="center"></el-table-column>
          <el-table-column prop="name" label="采购量" align="center"></el-table-column>
          <el-table-column prop="name" label="税率(%)" align="center"></el-table-column>
          <el-table-column prop="name" label="单价(已算是否含税)" align="center"></el-table-column>
          <el-table-column prop="name" label="上次采购价" align="center"></el-table-column>
          <el-table-column prop="name" label="金额" align="center"></el-table-column>
          <el-table-column prop="name" label="入库量" align="center"></el-table-column>
          <el-table-column prop="name" label="待质检量" align="center"></el-table-column>
          <el-table-column prop="name" label="待签收量" align="center"></el-table-column>
          <el-table-column prop="name" label="次品量" align="center"></el-table-column>
          <el-table-column prop="name" label="退款次品量" align="center"></el-table-column>
          <el-table-column prop="name" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsPop = false">取 消</el-button>
        <el-button type="primary" @click="detailsPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加付款记录弹窗 -->
    <el-dialog title="添加付款记录" :visible.sync="addPaymentRecordsPop" width="30%">
      <div style="font-weight: bold;margin-bottom:20px">合同单号：</div>
      <el-form :model="form">
        <el-col :span="12">
          <el-form-item label="类型：" label-width="90px">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额：" label-width="90px">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="备注：" label-width="90px">
          <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPaymentRecordsPop = false">取 消</el-button>
        <el-button type="primary" @click="addPaymentRecordsPop = false">确 定</el-button>
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
      dropDown: "", //下拉框input值
      select: "",
      dropDownValue: [
        {
          id: 1,
          name: "编号",
        },
        {
          id: 2,
          name: "sku",
        },
        {
          id: 3,
          name: "物流单",
        },
      ],
      value: "",
      currentPage1: 1,
      detailsPop: false, //详情弹窗
      addPaymentRecordsPop: false, //驳回需求弹窗
      activeName: "first",
      form: {
        name: "",
      },
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
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
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
    // 详情弹窗
    details() {
      this.detailsPop = true;
    },
    // 添加付款记录弹窗
    addPaymentRecords() {
      this.addPaymentRecordsPop = true;
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
    div {
      float: left;
    }
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