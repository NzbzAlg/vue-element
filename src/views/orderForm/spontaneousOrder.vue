<template>
  <div class="spontaneousOrder">
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
          <el-select v-model="value" placeholder="请选择状态查询" style="margin-left:20px">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left:20px">查询</el-button>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="订单号" align="center"></el-table-column>
        <el-table-column prop="date" label="订单详情" align="center"></el-table-column>
        <el-table-column prop="name" label="库存详情" align="center"></el-table-column>
        <el-table-column prop="name" label="店铺" align="center"></el-table-column>
        <el-table-column prop="name" label="发货状态" align="center"></el-table-column>
        <el-table-column prop="name" label="物流商/物流单号" align="center"></el-table-column>
        <el-table-column prop="name" label="订单金额" align="center"></el-table-column>
        <el-table-column prop="name" label="发货模式" align="center"></el-table-column>
        <el-table-column prop="name" label="买家姓名" align="center"></el-table-column>
        <el-table-column prop="name" label="买家邮箱" align="center"></el-table-column>
        <el-table-column prop="name" label="下单时间" align="center"></el-table-column>
        <el-table-column prop="name" label="收件人" align="center"></el-table-column>
        <el-table-column prop="name" label="邮编" align="center"></el-table-column>
        <el-table-column prop="name" label="国家/城市" align="center"></el-table-column>
        <el-table-column prop="name" label="地址1" align="center"></el-table-column>
        <el-table-column prop="name" label="地址2" align="center"></el-table-column>
        <el-table-column prop="name" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template>
            <el-button size="mini" type="success" @click="remark">备注</el-button>
            <el-button size="mini" type="primary" @click="goShopping">去采购</el-button>
            <el-button size="mini" type="primary" @click="goDelivery">去发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 备注弹窗 -->
    <el-dialog title="提示" :visible.sync="remarkPop" width="30%">
      <el-form :model="form">
        <el-form-item label="备注：" label-width="60px">
          <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remarkPop = false">取 消</el-button>
        <el-button type="primary" @click="remarkPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 去发货弹窗 -->
    <el-dialog title="提示" :visible.sync="goDeliveryPop" width="30%">
      <el-form :model="form">
        <el-form-item label="物流单号：" label-width="90px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注：" label-width="90px">
          <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="物流商：" label-width="90px">
          <el-select v-model="value" placeholder="请选择店铺查询">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goDeliveryPop = false">取 消</el-button>
        <el-button type="primary" @click="goDeliveryPop = false">确 定</el-button>
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
          name: "SKU",
        },
      ],
      remarkPop: false, //备注弹窗
      goDeliveryPop: false, //去发货弹窗
      value: "",
      currentPage1: 1,
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
    //   备注
    remark() {
      this.remarkPop = true;
    },
    // 去采购
    goShopping() {
      this.$confirm("确认后采购将会进行采购, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "采购成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消采购",
          });
        });
    },
    // 去发货
    goDelivery() {
      this.goDeliveryPop = true;
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
// /deep/.el-select .el-input {
//   width: 160px !important;
// }
</style>