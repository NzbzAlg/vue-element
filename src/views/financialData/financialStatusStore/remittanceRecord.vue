
<template>
  <div class="remittanceRecord">
    <div class="title">
      <!-- 结算状态 -->
      <el-select
        v-model="closeAccount"
        placeholder="结算状态"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in closeAccountDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 转账状态 -->
      <el-select
        v-model="transferAccounts"
        placeholder="转账状态"
        clearable
        filterable
        size="medium"
        style="width: 150px;margin-left:10px"
      >
        <el-option
          v-for="item in transferAccountsDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 日期 -->
      <el-date-picker
        v-model="date"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        size="medium"
        style="width: 255px; margin-left: 10px"
      >
      </el-date-picker>
      <!-- 搜索 -->
      <el-input
        placeholder="搜索内容"
        v-model="searchContent"
        class="input-with-select"
        style="width: 275px; margin-left: 10px"
        size="medium"
      >
        <el-select
          v-model="multipleDrop"
          clearable
          filterable
          slot="prepend"
          size="medium"
          style="width: 105px"
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
    <!-- 数据展示 -->
    <div class="dataPresentation">
      <div
        class="dataPresentation_item"
        v-for="item in dataNumber"
        :key="item.id"
      >
        <div class="dataPresentation_content">
          <p>{{ item.title }}</p>
          <p>{{ item.number }}</p>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="店铺" align="center"></el-table-column>
        <el-table-column label="结算周期" align="center"></el-table-column>
        <el-table-column label="余额" align="center"></el-table-column>
        <el-table-column label="状态" align="center"></el-table-column>
        <el-table-column label="转账金额" align="center"></el-table-column>
        <el-table-column label="转账日期" align="center"></el-table-column>
        <el-table-column label="转账状态" align="center"></el-table-column>
        <el-table-column label="账号尾号" align="center"></el-table-column>
        <el-table-column label="ACH编码" align="center"></el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope" style="position: relative">
            <span>{{ scope.row.brush_order_amount }}</span>
            <i
              class="el-icon-edit"
              style="padding-left: 5px; font-size: 16px; cursor: pointer"
              @click="editBoxShow(scope.row)"
            ></i>
            <div class="editBox" v-show="scope.row.isEditBox">
              <input type="text" style="width: 70px; float: left" />
              <span>确定</span>
              <span @click="cancelBoxShow(scope.row)">取消</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      closeAccount: "", //结算状态
      // 结算状态下拉
      closeAccountDrop: [
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "已结算",
        },
        {
          id: 3,
          name: "未结算",
        },
      ],
      transferAccounts:'',//转账状态
      // 转账状态下拉
      transferAccountsDrop:[
        {
          id:1,
          name:'全部'
        },
        {
          id:2,
          name:'成功'
        },
        {
          id:3,
          name:'失败'
        }
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "ASIN",
        },
        {
          id: 2,
          name: "SKU",
        },
        {
          id: 3,
          name: "费用描述",
        },
      ],
      currentPage1: 1,
      dataNumber: [
        {
          id: 1,
          title: "已结总计",
          number: "$12912.49",
        },
        {
          id: 2,
          title: "转账失败",
          number: "$722",
        },
        {
          id: 3,
          title: "未结余额",
          number: "$800",
        },
      ],
      tableData: [
        {
          img: "https://m.media-amazon.com/images/I/41BWijdiIxL._SL200_.jpg",
          nationalFlag:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/US.png", //国旗
          tomotime: "tomotime_US",
          name: "Tomotime Ceramic Tea Cup with Infuser and Lid Tea ...",
          money: "$19.99",
          ASIN: "B01FZ5B706", //ASIN
          SKU: "ROADRS1YE41-FBA", //SKU
          FNSKU: "X00165UBPX", //FNSKU
          AOG: 0, //到货
          stockUp: 0, //备货
          state: 0, //是否当前补货
          daysAvailable: 0, //可售天数
          suggestedQuantity: 0, //建议补货数量
          captureTime: "202-2-1", //建议补货时间
          yesterdaySales: 0, //昨日销量
          threedaySales: 0, //3日销量
          sevendaySales: 0, //7日销量
          fourteendaySales: 0, //14日销量
          thirtydaySales: 0, //30日销量
          sixtydaySales: 0, //60日销量
          ninetydaySales: 0, //90日销量
          yesterdayReturn: 0, //昨日退货量
          threedayReturn: 0, //3日退货量
          sevendayReturn: 0, //7日退货量
          fourteendayReturn: 0, //14日退货量
          thirtydayReturn: 0, //30日退货量
          sixtydayReturn: 0, //60日退货量
          ninetydayReturn: 0, //90日退货量
          isEditBox: false,
        },
        {
          img: "https://m.media-amazon.com/images/I/41BWijdiIxL._SL200_.jpg",
          nationalFlag:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/US.png", //国旗
          tomotime: "tomotime_US",
          name: "Tomotime Ceramic Tea Cup with Infuser and Lid Tea ...",
          money: "$19.99",
          ASIN: "B01FZ5B706", //ASIN
          SKU: "ROADRS1YE41-FBA", //SKU
          FNSKU: "X00165UBPX", //FNSKU
          AOG: 0, //到货
          stockUp: 0, //备货
          state: 0, //是否当前补货
          daysAvailable: 0, //可售天数
          suggestedQuantity: 0, //建议补货数量
          captureTime: "202-2-1", //建议补货时间
          yesterdaySales: 0, //昨日销量
          threedaySales: 0, //3日销量
          sevendaySales: 0, //7日销量
          fourteendaySales: 0, //14日销量
          thirtydaySales: 0, //30日销量
          sixtydaySales: 0, //60日销量
          ninetydaySales: 0, //90日销量
          yesterdayReturn: 0, //昨日退货量
          threedayReturn: 0, //3日退货量
          sevendayReturn: 0, //7日退货量
          fourteendayReturn: 0, //14日退货量
          thirtydayReturn: 0, //30日退货量
          sixtydayReturn: 0, //60日退货量
          ninetydayReturn: 0, //90日退货量
          isEditBox: false,
        },
        {
          img: "https://m.media-amazon.com/images/I/41BWijdiIxL._SL200_.jpg",
          nationalFlag:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/US.png", //国旗
          tomotime: "tomotime_US",
          name: "Tomotime Ceramic Tea Cup with Infuser and Lid Tea ...",
          money: "$19.99",
          ASIN: "B01FZ5B706", //ASIN
          SKU: "ROADRS1YE41-FBA", //SKU
          FNSKU: "X00165UBPX", //FNSKU
          AOG: 0, //到货
          stockUp: 0, //备货
          state: 0, //是否当前补货
          daysAvailable: 0, //可售天数
          suggestedQuantity: 0, //建议补货数量
          captureTime: "202-2-1", //建议补货时间
          yesterdaySales: 0, //昨日销量
          threedaySales: 0, //3日销量
          sevendaySales: 0, //7日销量
          fourteendaySales: 0, //14日销量
          thirtydaySales: 0, //30日销量
          sixtydaySales: 0, //60日销量
          ninetydaySales: 0, //90日销量
          yesterdayReturn: 0, //昨日退货量
          threedayReturn: 0, //3日退货量
          sevendayReturn: 0, //7日退货量
          fourteendayReturn: 0, //14日退货量
          thirtydayReturn: 0, //30日退货量
          sixtydayReturn: 0, //60日退货量
          ninetydayReturn: 0, //90日退货量
          isEditBox: false,
        },
      ],
      // 日期快捷方式
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // 编辑弹窗
    editBoxShow(row) {
      row.isEditBox = true;
    },
    // 取消弹窗
    cancelBoxShow(row) {
      row.isEditBox = false;
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
.title{
  margin-bottom: 15px;
}
.iSKUmonthlyProfits {
  margin-bottom: 10px;
}
// 数据展示
.dataPresentation {
  width: 100%;
  height: 142px;
  margin: 10px auto 20px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  overflow: hidden;
  transition: all 0.2s ease-in 0s;
  display: flex;
  // justify-content: space-between;
  .dataPresentation_item {
    width: 16%;
    height: 100%;
    // background: salmon;
    .dataPresentation_content {
      margin-top: 35px;
      height: 72px;
      border-right: 1px solid #869fa6;
      padding-left: 15%;
      p:nth-of-type(1) {
        font-size: 14px;
        color: #073b49;
      }
      p:nth-of-type(2) {
        font-size: 24px;
        margin-top: 15px;
        font-weight: bold;
        color: #409eff;
      }
    }
  }
  .dataPresentation_item:last-child {
    .dataPresentation_content {
      border-right: none;
    }
  }
}
// 表格
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  .tabItem {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    p:nth-of-type(1) {
      width: 230px;
      display: flex;
      justify-content: space-between;
    }
  }
}
// 商品下拉
.el-popover .commodityDrop {
  li {
    height: 30px;
    line-height: 30px;
    color: #000;
    font-size: 12px;
    text-align: center;
  }
  li:hover {
    background: #409eff;
    color: #fff;
    cursor: pointer;
    text-align: center;
  }
}
// 商品信息设置 => 商品信息弹窗
.merchandiseNews {
  padding: 0 15px;
  .merchandiseDetail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    p {
      font-size: 12px;
    }
    div {
      margin-left: 10px;
      p {
        padding: 2px 0;
      }
    }
  }
  // 创建时间
  .createTime {
    margin-top: 30px;
    font-size: 12px;
    p:nth-of-type(2) {
      margin-top: 5px;
      margin-left: 25px;
    }
  }
  // 商品标签
  .brandLabel {
    margin-top: 20px;
    font-size: 12px;
    p:nth-of-type(1) {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(2) {
        color: #6699ff;
        cursor: pointer;
      }
    }
    p:nth-of-type(2) {
      margin-top: 5px;
      margin-left: 25px;
    }
  }
  // 分组
  .group {
    margin-top: 20px;
    font-size: 12px;
    p:nth-of-type(1) {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(2) {
        color: #6699ff;
        cursor: pointer;
      }
    }
    p:nth-of-type(2) {
      margin-top: 5px;
      margin-left: 25px;
    }
  }
  // 售价
  .sellingPrice {
    margin-top: 30px;
    font-size: 12px;
    p:nth-of-type(2) {
      margin-top: 5px;
      margin-left: 25px;
      img {
        width: 28px;
        height: 20px;
        vertical-align: middle;
        margin-bottom: 5px;
      }
      span {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
  // 采购成本
  .procurementCost {
    margin-top: 30px;
    font-size: 12px;
    p:nth-of-type(2) {
      margin-top: 5px;
      margin-left: 25px;
      img {
        width: 28px;
        height: 20px;
        vertical-align: middle;
        margin-bottom: 5px;
      }
      input {
        margin-left: 10px;
        width: 60px;
        height: 18px;
        border: 1px solid #000;
      }
    }
  }
  // 头程物流
  .chengLogistics {
    margin-top: 30px;
    font-size: 12px;
    p:nth-of-type(2) {
      margin-top: 5px;
      margin-left: 25px;
      img {
        width: 28px;
        height: 20px;
        vertical-align: middle;
        margin-bottom: 5px;
      }
      input {
        margin-left: 10px;
        width: 60px;
        height: 18px;
        border: 1px solid #000;
      }
    }
  }
  // 物流
  .logistics {
    margin-top: 30px;
    font-size: 12px;
    p:nth-of-type(2) {
      margin-top: 5px;
      margin-left: 25px;
      img {
        width: 28px;
        height: 20px;
        vertical-align: middle;
        margin-bottom: 5px;
      }
      input {
        margin-left: 10px;
        width: 60px;
        height: 18px;
        border: 1px solid #000;
      }
    }
  }
}
//   表格弹出编辑框
.editBox {
  width: 160px;
  height: 30px;
  position: absolute;
  top: 8px;
  left: 0px;
  background: #fff;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 0 10px #dfdfdf;
  z-index: 999;
  input {
    vertical-align: middle;
  }
  span {
    font-size: 12px;
    cursor: pointer;
    color: #409eff;
  }
  span:nth-of-type(1) {
    padding-right: 10px;
  }
}

.paging {
  float: right;
  margin-top: 20px;
}
</style>