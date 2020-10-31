
<template>
  <div class="iSKUmonthlyProfits">
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
        <el-table-column label="iSKU" align="center">
        </el-table-column>
        <el-table-column label="商品销售额" align="center">
          <el-table-column label="商品销售额" align="center" sortable>
          </el-table-column>
          <el-table-column label="销售量" align="center" sortable>
          </el-table-column>
          <el-table-column label="多渠道数量" align="center" sortable>
          </el-table-column>
        </el-table-column>
        <el-table-column label="退款" align="center">
          <el-table-column label="退款量" align="center" width="80px" sortable>
          </el-table-column>
          <el-table-column label="退款" align="center" width="80px" sortable>
          </el-table-column>
          <el-table-column label="退款率" align="center" width="80px" sortable>
          </el-table-column>
        </el-table-column>
        <el-table-column label="亚马逊费用" align="center">
          <el-table-column label="亚马逊销售佣金" align="center" sortable>
          </el-table-column>
          <el-table-column label="FBA代发货费用" align="center" sortable>
          </el-table-column>
          <el-table-column label="多渠道配送费用" align="center" sortable>
          </el-table-column>
          <el-table-column label="FBA退货处理费" align="center" sortable>
          </el-table-column>
          <el-table-column label="返还亚马逊销售佣金" align="center" sortable>
          </el-table-column>
          <el-table-column label="FBA月仓储费用" align="center" sortable>
          </el-table-column>
          <el-table-column label="结算费" align="center" sortable>
          </el-table-column>
          <el-table-column label="亚马逊费用占比" align="center" sortable>
          </el-table-column>
          <el-table-column label="返还运费" align="center" sortable>
          </el-table-column>
          <el-table-column label="其他" align="center" sortable>
          </el-table-column>
        </el-table-column>
        <el-table-column label="促销" align="center">
          <el-table-column label="promote折扣" align="center" sortable>
          </el-table-column>
          <el-table-column label="退款返还promote折扣" align="center" sortable>
          </el-table-column>
        </el-table-column>
        <el-table-column label="CPC广告" align="center">
          <el-table-column label="CPC销量" align="center" sortable>
          </el-table-column>
          <el-table-column label="CPC销量占比" align="center" sortable>
          </el-table-column>
          <el-table-column label="CPC商品销售额" align="center" sortable>
          </el-table-column>
           <el-table-column label="CPC花费" align="center" sortable>
          </el-table-column>
          <el-table-column label="CPC花费占比" align="center" sortable>
          </el-table-column>
        </el-table-column>
        <el-table-column label="采购/物流" align="center">
          <el-table-column label="采购成本" align="center" sortable>
          </el-table-column>
          <el-table-column label="物流/头程" align="center" sortable>
          </el-table-column>
          <el-table-column label="成本/物流费用占比" align="center" sortable>
          </el-table-column>
        </el-table-column>
        <el-table-column label="运营费用" align="center">
          <el-table-column label="运营费用占比" align="center" sortable>
          </el-table-column>
        </el-table-column>
        <el-table-column label="测评费用" align="center">
          <el-table-column label="测评费用" align="center" sortable>
          </el-table-column>
        </el-table-column>
        <el-table-column label="利润" align="center">
          <el-table-column label="利润" align="center" sortable>
          </el-table-column>
          <el-table-column label="利润率" align="center" sortable>
          </el-table-column>
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
      currentPage1: 1,
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
      dataNumber: [
        {
          id: 1,
          title: "商品销售额",
          number: "$12912.49",
        },
        {
          id: 2,
          title: "订单量",
          number: 722,
        },
        {
          id: 3,
          title: "销售数量",
          number: 800,
        },
        {
          id: 4,
          title: "费用",
          number: "-$12912.49",
        },
        {
          id: 5,
          title: "退款",
          number: "-$12912.49",
        },
        {
          id: 6,
          title: "净利润",
          number: "$12912.49",
        },
      ], //头部数据
      departmentPull: [],
      replenishment: [
        //是否当前补货
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "是",
        },
        {
          id: 3,
          name: "否",
        },
        {
          id: 4,
          name: "无需提醒",
        },
      ],
      state: [
        //状态
        {
          id: 1,
          label: "启用",
        },
        {
          id: 2,
          label: "禁用",
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
        },
      ],
      remarkData: [], //商品备注列表
      labelTableData: [], //新建标签列表
      groupTableData: [], //新建分组列表
    };
  },
  mounted() {},
  methods: {
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
  justify-content: space-between;
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
// 备注
.remark {
  p {
    font-size: 14px;
    margin-bottom: 10px;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>