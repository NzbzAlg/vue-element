
<template>
  <div class="abnormalDistribution">
    <!-- 搜索 -->
    <div class="title">
      <el-input
        placeholder="搜索内容"
        v-model="searchContent"
        class="input-with-select"
        style="width: 275px"
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
    <!-- 表格 -->
    <div class="table">
      <p class="tabItem">
        <span @click="msg = 1" :class="{ tab_active: msg === 1 }"
          >全部商品</span
        >
        <span @click="msg = 2" :class="{ tab_active: msg === 2 }"
          >异常商品</span
        >
      </p>
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="date"
          label="商品信息"
          align="center"
          width="350"
          fixed
        >
          <template slot-scope="scope">
            <div class="information">
              <div class="informationImg">
                <img
                  :src="scope.row.img"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </div>
              <div class="informationSize">
                <p>
                  <img
                    :src="scope.row.nationalFlag"
                    alt=""
                    style="width: 18px; height: 14px"
                  />
                  <span style="color: #6699ff"
                    >「{{ scope.row.tomotime }}」</span
                  >
                </p>
                <p>
                  <span>{{ scope.row.name }}</span>
                  <span>{{ scope.row.money }}</span>
                </p>
                <p>
                  <span
                    >ASIN:<span style="color: #6699ff">{{
                      scope.row.ASIN
                    }}</span></span
                  >
                  <span>
                    <el-popover placement="bottom" width="50" trigger="click">
                      <ul class="commodityDrop">
                        <li @click="goodsSet">商品设置</li>
                        <li @click="commodityNote">商品备注</li>
                      </ul>
                      <el-button slot="reference" size="mini">操作∨</el-button>
                    </el-popover>
                  </span>
                </p>
                <p>SKU:{{ scope.row.SKU }}</p>
                <p>FNSKU:{{ scope.row.FNSKU }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="SKU" label="亚马逊预估标准配送费" align="center">
        </el-table-column>
        <el-table-column label="实际配送费" align="center"></el-table-column>
        <el-table-column label="差异" align="center"></el-table-column>
        <el-table-column label="异常" align="center"></el-table-column>
      </el-table>
    </div>
    <!-- 商品设置弹窗 -->
    <el-dialog title="商品信息设置" :visible.sync="goodsSetPop" width="30%">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="商品信息" name="first">
          <div class="merchandiseNews">
            <div class="merchandiseDetail">
              <p>
                <img
                  src="https://m.media-amazon.com/images/I/41QeS1EwXqL._SL75_.jpg"
                  alt=""
                  style="width: 48px; height: 48px"
                />
              </p>
              <div>
                <p>
                  Tomotime Ceramic Tea Cup with Infuser and Lid Tea Mugs Wooden
                  Handle 400ml/13.4oz Cyan Blue
                </p>
                <p>ASIN：<span style="color: #6699ff">B07YCZLDGP</span></p>
                <p>SKU：TM023-Z-Cyan blue</p>
                <p>FNSKU：X002BRE007</p>
              </div>
            </div>
            <!-- 创建时间 -->
            <div class="createTime">
              <p>创建时间</p>
              <p>2020-10-08</p>
            </div>
            <!-- 商品标签 -->
            <div class="brandLabel">
              <p>
                <span>商品标签</span>
                <span @click="manageTags">管理标签</span>
              </p>
              <p>
                <el-tag>标签一</el-tag>
              </p>
            </div>
            <!-- 分组 -->
            <div class="group">
              <p>
                <span>分组</span>
                <span @click="managementGroup">管理分组</span>
              </p>
              <p>
                <el-tag>标签一</el-tag>
              </p>
            </div>
            <!-- 售价 -->
            <div class="sellingPrice">
              <p>售价</p>
              <p>
                <img
                  src="https://admin.captainbi.com/statics/amzcaptain/img/country/US.png"
                  alt=""
                />
                <span>$19.99</span>
              </p>
            </div>
            <!-- 采购成本 -->
            <div class="procurementCost">
              <p>采购成本</p>
              <p>
                <img
                  src="https://admin.captainbi.com/statics/amzcaptain/img/country/US.png"
                  alt=""
                />
                <input type="text" />
              </p>
            </div>
            <!-- 头程物流 -->
            <div class="chengLogistics">
              <p>采购成本(FBA)</p>
              <p>
                <img
                  src="https://admin.captainbi.com/statics/amzcaptain/img/country/US.png"
                  alt=""
                />
                <input type="text" />
              </p>
            </div>
            <!-- 物流 -->
            <div class="logistics">
              <p>物流(FBM)</p>
              <p>
                <img
                  src="https://admin.captainbi.com/statics/amzcaptain/img/country/US.png"
                  alt=""
                />
                <input type="text" />
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品备注" name="second">
          <div class="remark">
            <p>备注日期</p>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              style="margin-bottom: 20px"
            >
            </el-date-picker>
            <p>备注内容</p>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容,如推广事件、投放广告、用于分析指标升降的原因"
              v-model="textarea"
              style="margin-bottom: 20px"
            >
            </el-input>
            <p>备注历史</p>
            <el-table :data="remarkData" style="width: 100%">
              <el-table-column prop="date" label="备注时间" align="center">
              </el-table-column>
              <el-table-column prop="namea" label="操作用户" align="center">
              </el-table-column>
              <el-table-column prop="address" label="备注内容" align="center">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goodsSetPop = false">取 消</el-button>
        <el-button type="primary" @click="goodsSetPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 管理标签弹窗 -->
    <el-dialog title="标签管理" :visible.sync="manageTagsPop" width="30%">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        style="float: right"
        @click="newLabel"
        >新建标签</el-button
      >
      <el-table :data="labelTableData" style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="标签" width="300">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.address"
              placeholder="请输入标签名"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span style="color: #409eff; cursor: pointer">确定</span>
            <span
              style="padding-left: 10px; color: #409eff; cursor: pointer"
              @click="cancelLabel(scope.$index)"
              >取消</span
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="manageTagsPop = false">取 消</el-button>
        <el-button type="primary" @click="manageTagsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 管理分组弹窗 -->
    <el-dialog title="分组管理" :visible.sync="managementGroupPop" width="30%">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        style="float: right"
        @click="newGroup"
        >新建分组</el-button
      >
      <el-table :data="groupTableData" style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="标签" width="300">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.address"
              placeholder="请输入分组名"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span style="color: #409eff; cursor: pointer">确定</span>
            <span
              style="padding-left: 10px; color: #409eff; cursor: pointer"
              @click="cancelGroup(scope.$index)"
              >取消</span
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="managementGroupPop = false">取 消</el-button>
        <el-button type="primary" @click="managementGroupPop = false"
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
        }
      ],
      currentPage1: 1,
      value1: "",
      textarea: "",
      goodsSetPop: false, //商品设置弹窗
      activeName: "first", //商品设置选项卡
      manageTagsPop: false, //管理标签弹窗
      managementGroupPop: false, //管理分组弹窗
      msg: 1,
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
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
  methods: {
    // 搜索框展开收起
    dropDisplays() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.$refs.title.style.height = "100px";
      } else {
        this.$refs.title.style.height = "30px";
      }
    },
    // 商品设置弹窗
    goodsSet() {
      this.goodsSetPop = true;
      this.activeName = "first";
    },
    // 商品备注弹窗
    commodityNote() {
      this.goodsSetPop = true;
      this.activeName = "second";
    },
    // 商品设置 + 商品备注选项卡
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 管理标签弹窗
    manageTags() {
      this.manageTagsPop = true;
    },
    // 新建标签
    newLabel() {
      var list = {
        address: this.address,
      };
      this.labelTableData.unshift(list);
    },
    // 取消标签
    cancelLabel(index) {
      this.labelTableData.splice(index, 1);
    },
    // 管理分组弹窗
    managementGroup() {
      this.managementGroupPop = true;
    },
    // 新建分组
    newGroup() {
      var list = {
        address: this.address,
      };
      this.groupTableData.unshift(list);
    },
    // 取消分组
    cancelGroup(index) {
      this.groupTableData.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
  margin-bottom: 15px;
}
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: center;
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  .tabItem {
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    padding-bottom: 20px;
    span {
      display: inline-block;
      padding-bottom: 3px;
    }
    span:hover {
      color: #409eff;
    }
    span:nth-of-type(2) {
      margin-left: 20px;
    }
    .tab_active {
      font-weight: bold;
      color: #409eff;
      border-bottom: 3px solid #409eff;
    }
  }
}
.information {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .informationImg {
    width: 20%;
    height: 100%;
    margin-top: 20px;
    // background: slategray;
  }
  .informationSize {
    width: 80%;
    height: 110%;
    margin-left: 10px;
    cursor: pointer;
    // background: steelblue;
    p {
      font-size: 12px;
      text-align: left;
    }
    p:nth-of-type(1) {
      img {
        vertical-align: middle;
        padding-right: 5px;
      }
    }
    p:nth-of-type(2) {
      span:nth-of-type(2) {
        padding-left: 20px;
        color: #999;
        float: right;
      }
    }
    p:nth-of-type(3) {
      span:nth-of-type(2) {
        // padding-left: 20px;
        min-width: 38px;
        background: #e9e9e9;
        color: #666;
        float: right;
        display: inline-block;
        text-align: center;
      }
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