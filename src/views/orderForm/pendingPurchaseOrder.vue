<template>
  <div class="pendingPurchaseOrder">
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
          <el-select v-model="value" placeholder="请选择店铺查询" style="margin-left:20px">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left:20px">查询</el-button>
        </div>
      </div>
      <div class="title_right">
          <el-button type="primary" @click="addPurchase">添加零散采购单</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="订单号" align="center"></el-table-column>
        <el-table-column prop="name" label="订单详情" align="center"></el-table-column>
        <el-table-column prop="address" label="库存详情" align="center"></el-table-column>
        <el-table-column prop="address" label="店铺" align="center"></el-table-column>
        <el-table-column prop="address" label="订单金额" align="center"></el-table-column>
        <el-table-column prop="address" label="买家姓名" align="center"></el-table-column>
        <el-table-column prop="address" label="买家邮箱" align="center"></el-table-column>
        <el-table-column prop="address" label="下单时间" align="center"></el-table-column>
        <el-table-column prop="address" label="发货状态" align="center"></el-table-column>
        <el-table-column prop="address" label="备注" align="center"></el-table-column>
        <el-table-column prop="address" label="追踪物流单号" align="center"></el-table-column>
        <el-table-column prop="address" label="收件人" align="center"></el-table-column>
        <el-table-column prop="address" label="邮编" align="center"></el-table-column>
        <el-table-column prop="address" label="国家/城市" align="center"></el-table-column>
        <el-table-column prop="address" label="地址1" align="center"></el-table-column>
        <el-table-column prop="address" label="地址2" align="center"></el-table-column>
      </el-table>
    </div>
    <!-- 添加采购单 -->
    <el-dialog title="提示" :visible.sync="addPurchasePop" width="40%">
      <el-divider content-position="left">编辑</el-divider>
      <el-form :model="form" style="height:500px">
        <el-col :span="12">
          <el-form-item label="合同编号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预付款：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实付款：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退款收款账号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退款/减免金额：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="算入成本：" label-width="120px">
            <el-checkbox v-model="form.checked"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂家出货时间：" label-width="120px">
            <el-date-picker v-model="form.name" type="date" placeholder="选择日期" style="width:240px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="辅料备货时间：" label-width="120px">
            <el-date-picker v-model="form.name" type="date" placeholder="选择日期" style="width:240px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="物流单号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="物流费用：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="采购备注：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="addGoods">
        <el-divider content-position="left">商品</el-divider>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="图片" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="address" label="sku" align="center"></el-table-column>
          <el-table-column prop="address" label="采购需求量" align="center"></el-table-column>
          <el-table-column prop="address" label="剩余采购量" align="center"></el-table-column>
          <el-table-column prop="address" label="不含税价" align="center"></el-table-column>
          <el-table-column prop="address" label="税率(%)" align="center"></el-table-column>
          <el-table-column prop="address" label="税额" align="center"></el-table-column>
          <el-table-column prop="address" label="总额" align="center"></el-table-column>
          <el-table-column prop="address" label="上次采购价" align="center"></el-table-column>
          <el-table-column prop="address" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPurchasePop = false">取 消</el-button>
        <el-button type="primary" @click="addPurchasePop = false">确 定</el-button>
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
          name: "订单号",
        },
        {
          id: 2,
          name: "买家姓名",
        },
        {
          id: 3,
          name: "买家邮箱",
        },
        {
          id: 4,
          name: "ASIN",
        },
        {
          id: 5,
          name: "Title",
        },
        {
          id: 6,
          name: "SellerSKU",
        },
        {
          id: 7,
          name: "追踪物流单号",
        },
      ],
      value: "",
      currentPage1: 1,
      addPurchasePop: false, //添加采购单弹窗
      activeName: "first",
      state: [
        {
          id: 1,
          label: "全部国家",
        },
      ],
      form: {
        name: "",
        checked: false,
      },
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
    // 添加采购单弹窗
    addPurchase() {
      this.addPurchasePop = true;
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
// /deep/.el-dialog__body {
//   height: 600px !important;
// }
</style>