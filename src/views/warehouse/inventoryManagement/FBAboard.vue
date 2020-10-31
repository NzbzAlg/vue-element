<template>
  <div class="FBAboard">
    <div class="boardTitle">
      <!-- 头部左 -->
      <div class="titleLeft">
        <p>FBA看板</p>
        <span>本模块最新更新时间：2020-10-12 06:09:59</span>
      </div>
      <!-- 头部右 -->
      <div class="titleRight">
        <div class="email-tip">
          <i class="el-icon-bell"></i>
          当前<span style="color: #65d3e3; padding: 0 4px">0</span
          >家店铺达到冗余预警线
        </div>
      </div>
    </div>
    <div class="boardContent">
      <div class="boardContent_banner">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in bannerList"
              :key="index"
            >
              <div
                class="box"
                :class="{ boxActive: isActive == index }"
                @click="bannerCLick(index)"
              >
                <p>{{ item.name }}</p>
                <p>￥{{ item.number }}</p>
                <p>
                  <span>较昨日：</span>
                  <span>{{ item.fromYesterday }}</span>
                </p>
              </div>
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <!-- 在库总成本 -->
      <costStorage v-if="isActive === 0"></costStorage>
      <!-- 需补货SKU数 -->
      <skuNumberReplenished v-if="isActive === 1"></skuNumberReplenished>
      <!-- 冗余SKU数 -->
      <redundantNumber v-if="isActive === 2"></redundantNumber>
      <!-- 最长使用天数 -->
      <maximumNumberDay v-if="isActive === 3"></maximumNumberDay>
      <!-- 周转次数 -->
      <turnover v-if="isActive === 4"></turnover>
      <!-- 总库存量 -->
      <strongerStock v-if="isActive === 5"></strongerStock>
      <!-- 预计总LTSF -->
      <expectedTotalLTSF v-if="isActive === 6"></expectedTotalLTSF>
      <!-- 上个月商品动销率 -->
      <monthSalesRate v-if="isActive === 7"></monthSalesRate>
      <!-- 预估总货值 -->
      <estimatedGross v-if="isActive === 8"></estimatedGross>
      <!-- 已发货 -->
      <shipped v-if="isActive === 9"></shipped>
      <!-- 已收到 -->
      <received v-if="isActive === 10"></received>
    </div>
    <!-- 店铺信息 -->
    <div class="storeInformation">
      <div class="InformationTitle">
        <p>
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </p>
        <p>
          <el-button type="primary" @click="customMetrics"
            >自定义指标</el-button
          >
        </p>
      </div>
      <div class="InformationTable">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="店铺信息"> </el-table-column>
          <el-table-column label="地址">
            <el-table-column prop="province" label="省份"> </el-table-column>
            <el-table-column prop="city" label="市区"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column prop="zip" label="邮编"> </el-table-column>
          </el-table-column>
        </el-table>
        <p>显示第 1 到第 1 条记录，总共 1 条记录</p>
      </div>
      <!-- 自定义指标弹窗 -->
      <el-dialog
        title="自定义指标"
        :visible.sync="customMetricsPop"
        width="40%"
      >
        <!-- 补货相关 -->
        <div class="replenishment">
          <div class="replenishment_left">
            <p>补货相关：</p>
          </div>
          <div class="replenishment_right">
            <label class="label">
              <input type="checkbox" v-model="isCheckAll" @click="checkAll" />
              全选
            </label>
            <el-row>
              <el-col
                :span="6"
                v-for="(item, index) in tempData"
                :key="index"
                style="margin-top: 10px"
              >
                <label style="cursor: pointer">
                  <input
                    type="checkbox"
                    :value="item.id"
                    v-model="saveInfo"
                    @change="singleCheck"
                  />
                  {{ item.country }}
                </label>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 冗余相关 -->
        <div class="replenishment">
          <div class="replenishment_left">
            <p>冗余相关：</p>
          </div>
          <div class="replenishment_right">
            <label class="label">
              <input
                type="checkbox"
                v-model="isredundancyAll"
                @click="checkRedundancyAll"
              />
              全选
            </label>
            <el-row>
              <el-col
                :span="6"
                v-for="(item, index) in redundancyData"
                :key="index"
                style="margin-top: 10px"
              >
                <label style="cursor: pointer">
                  <input
                    type="checkbox"
                    :value="item.id"
                    v-model="redundancyInfo"
                    @change="redundancyCheck"
                  />
                  {{ item.country }}
                </label>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 货值相关 -->
        <div class="replenishment">
          <div class="replenishment_left">
            <p>货值相关：</p>
          </div>
          <div class="replenishment_right">
            <label class="label">
              <input
                type="checkbox"
                v-model="isValueAll"
                @click="checkValueAll"
              />
              全选
            </label>
            <el-row>
              <el-col
                :span="6"
                v-for="(item, index) in valueData"
                :key="index"
                style="margin-top: 10px"
              >
                <label style="cursor: pointer">
                  <input
                    type="checkbox"
                    :value="item.id"
                    v-model="valueInfo"
                    @change="ValueCheck"
                  />
                  {{ item.country }}
                </label>
              </el-col>
            </el-row>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="customMetricsPop = false">取 消</el-button>
          <el-button type="primary" @click="customMetricsPop = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- 库龄统计 + 通知 -->
    <div class="statisticalNotification">
      <!-- 库龄统计 -->
      <div class="statistical">
        <div class="statistical_title">
          <p>
            <span>库龄统计</span>
            <span
              >按亚马逊物流库龄统计的库存商品（亚马逊方库龄统计延迟，短时间内存在一定偏差）</span
            >
          </p>
          <p>更多></p>
        </div>
        <div class="statistical_content">
          <el-table :data="statistical" style="width: 100%">
            <el-table-column
              prop="date"
              label="(天)"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="name" width="480">
              <template>
                <el-progress
                  :text-inside="true"
                  :stroke-width="18"
                  :percentage="70"
                ></el-progress>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="件数" align="center">
            </el-table-column>
            <el-table-column prop="percentage" label="百分比" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 通知 -->
      <div class="notification">
        <div class="notification_title">
          <p>
            <span>通知</span>
            <span>提高库库存绩效的机会</span>
          </p>
        </div>
        <div class="notification_content">
          <div class="notification_item">
            <p>您有<span>0</span>个SKU货值偏高</p>
            <p>更多>></p>
          </div>
          <div class="notification_item">
            <p>您有<span>0</span>件商品将产生LTSF（长期仓储费）</p>
            <p>更多>></p>
          </div>
          <div class="notification_item">
            <p>您有<span>3321</span>件商品已接收到</p>
            <p>更多>></p>
          </div>
          <div class="notification_item">
            <p>您有<span>7491</span>件商品开始发往亚马逊仓库</p>
            <p>更多>></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 冗余库存 + 需补货产品 -->
    <div class="InventoryReplenishment">
      <!-- 冗余库存 -->
      <div class="inventory">
        <div class="inventory_title">
          <p>冗余库存</p>
          <p>更多></p>
        </div>
        <div class="inventory_content">
          <el-table :data="inventory" style="width: 100%">
            <el-table-column prop="date" label="商品信息" width="400">
            </el-table-column>
            <el-table-column prop="name" label="可用库存"> </el-table-column>
            <el-table-column prop="address" label="高库龄数"> </el-table-column>
            <el-table-column prop="address" label="90日销量"> </el-table-column>
            <el-table-column prop="address" label="供货天数"> </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 需补货产品 -->
      <div class="needReplenishment">
        <div class="needReplenishment_title">
          <p>需补货产品</p>
          <p>更多></p>
        </div>
        <div class="needReplenishment_content">
          <el-table :data="inventory" style="width: 100%">
            <el-table-column prop="date" label="商品信息" width="400">
            </el-table-column>
            <el-table-column prop="name" label="可售天数"> </el-table-column>
            <el-table-column prop="address" label="建议补货量"> </el-table-column>
            <el-table-column prop="address" label="建议补货时间"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import costStorage from "./components/costStorage/index"; //在库总成本
import skuNumberReplenished from "./components/skuNumberReplenished/index"; //需补货SKU数
import redundantNumber from "./components/redundantNumber/index"; //冗余SKU数
import maximumNumberDay from "./components/maximumNumberDay/index"; //最长使用天数
import turnover from "./components/turnover/index"; //周转次数
import strongerStock from "./components/strongerStock/index"; //总库存量
import expectedTotalLTSF from "./components/expectedTotalLTSF/index"; //预计总LTSF
import monthSalesRate from "./components/monthSalesRate/index"; //上个月商品动销率
import estimatedGross from "./components/estimatedGross/index"; //预估总货值
import shipped from "./components/shipped/index"; //已发货
import received from "./components/received/index"; //已收到
export default {
  components: {
    costStorage,
    skuNumberReplenished,
    redundantNumber,
    maximumNumberDay,
    turnover,
    strongerStock,
    expectedTotalLTSF,
    monthSalesRate,
    estimatedGross,
    shipped,
    received,
  },
  data() {
    return {
      isActive: 0, //选项卡默认值
      bannerList: [
        {
          id: 1,
          name: "在库总成本",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 2,
          name: "需补货SKU数",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 3,
          name: "冗余SKU数",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 4,
          name: "最长使用天数",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 5,
          name: "周转次数",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 6,
          name: "总库存量",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 7,
          name: "预计总LTSF",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 8,
          name: "上个月商品动销率",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 9,
          name: "预估总货值",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 10,
          name: "已发货",
          number: 5.75,
          fromYesterday: 0.0,
        },
        {
          id: 11,
          name: "已收到",
          number: 5.75,
          fromYesterday: 0.0,
        },
      ],
      options: [
        {
          value: "选项1",
          label: "原始币别",
        },
        {
          value: "选项2",
          label: "基准币别",
        },
      ],
      value: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      statistical: [
        {
          date: "0-90",
          number: "82121",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          percentage: "45.22%",
        },
        {
          date: "90-180",
          number: "82121",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          percentage: "45.22%",
        },
        {
          date: "180-270",
          number: "82121",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          percentage: "45.22%",
        },
        {
          date: "270-365",
          number: "82121",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          percentage: "45.22%",
        },
        {
          date: ">365",
          number: "82121",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          percentage: "45.22%",
        },
      ],
      customMetricsPop: false, //自定义指标弹窗
      isCheckAll: false, //补货相关
      saveInfo: [], //补货相关保存选择的数据,用于上传后台
      tempData: [
        //补货相关
        { id: 0, country: "可售" },
        { id: 1, country: "在途" },
        { id: 2, country: "接收中" },
        { id: 3, country: "总库存量" },
        { id: 4, country: "预留库存" },
        { id: 5, country: "不可售" },
        { id: 6, country: "处理中" },
        { id: 7, country: "是否当前补货" },
        { id: 8, country: "可售天数" },
        { id: 9, country: "建议补货" },
        { id: 10, country: "建议补货时间" },
        { id: 11, country: "需补货SKU" },
        { id: 12, country: "需补货成本" },
      ],
      isredundancyAll: false, //冗余相关
      redundancyInfo: [], //冗余相关保存选择的数据,用于上传后台
      redundancyData: [
        //冗余相关
        { id: 0, country: "冗余SKU数" },
        { id: 1, country: "<90" },
        { id: 2, country: "90-180" },
        { id: 3, country: "180-270" },
        { id: 4, country: "270-365" },
        { id: 5, country: ">365" },
        { id: 6, country: "预计总LTSF" },
        { id: 7, country: "<365天LTSF" },
        { id: 8, country: ">365天LTSF" },
      ],
      isValueAll: false, //货值相关
      valueInfo: [], //货值相关保存选择的数据,用于上传后台
      valueData: [
        //货值相关
        { id: 0, country: "在库总成本" },
        { id: 1, country: "预估总货值" },
      ],
      inventory: [],
    };
  },
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 7,
      spaceBetween: 30,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  },
  methods: {
    // banner选项卡
    bannerCLick(index) {
      this.isActive = index;
    },
    // 自定义指标弹窗
    customMetrics() {
      this.customMetricsPop = true;
    },
    // 补货相关单选
    singleCheck() {
      if (this.saveInfo.length === this.tempData.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
    // 补货相关全选
    checkAll() {
      let that = this;
      this.tempData.forEach((item) => {
        if (!that.isCheckAll) {
          that.saveInfo.push(item.id);
        } else {
          that.saveInfo = [];
        }
      });
    },
    // 冗余相关单选
    redundancyCheck() {
      if (this.redundancyInfo.length === this.redundancyData.length) {
        this.isredundancyAll = true;
      } else {
        this.isredundancyAll = false;
      }
    },
    // 冗余相关全选
    checkRedundancyAll() {
      let that = this;
      this.redundancyData.forEach((item) => {
        if (!that.isredundancyAll) {
          that.redundancyInfo.push(item.id);
        } else {
          that.redundancyInfo = [];
        }
      });
    },
    // 货值相关单选
    ValueCheck() {
      if (this.valueInfo.length === this.valueData.length) {
        this.isValueAll = true;
      } else {
        this.isValueAll = false;
      }
    },
    // 货值相关全选
    checkValueAll() {
      let that = this;
      this.valueData.forEach((item) => {
        if (!that.isValueAll) {
          that.valueInfo.push(item.id);
        } else {
          that.valueInfo = [];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.boardTitle {
  display: flex;
  justify-content: space-between;
  .titleLeft {
    p {
      display: inline-block;
      color: #073b49;
      font-size: 24px;
    }
    span {
      padding-left: 20px;
      font-size: 12px;
      color: #073b49;
    }
  }
  .titleRight {
    .email-tip {
      background: #fff;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      border: 1px solid #3bbdd3;
      font-size: 12px;
      vertical-align: top;
      margin: 0 20px 0 0;
      border-radius: 4px;
    }
  }
}
.boardContent {
  width: 100%;
  height: 400px;
  background: #fff;
  margin-top: 20px;
  .boardContent_banner {
    padding: 10px 60px 0;
    position: relative;
    .box {
      border: 2px solid #eee;
      height: 73px;
      box-shadow: 0 0 10px #dbf3f7;
      border-radius: 4px;
      padding: 10px 5%;
      p:nth-of-type(2) {
        color: #27b8d0;
        font-size: 18px;
        margin: 6px 0 8px;
        font-weight: bold;
      }
      p:nth-of-type(3) {
        display: flex;
        justify-content: space-between;
        color: #666666;
        font-size: 12px;
      }
    }
    .boxActive {
      border: 2px solid #27b8d0;
      height: 73px;
      box-shadow: 0 0 10px #dbf3f7;
      border-radius: 4px;
      padding: 10px 5%;
      p:nth-of-type(2) {
        color: #27b8d0;
        font-size: 18px;
        margin: 6px 0 8px;
        font-weight: bold;
      }
      p:nth-of-type(3) {
        display: flex;
        justify-content: space-between;
        color: #666666;
        font-size: 12px;
      }
    }
  }
}
.storeInformation {
  width: 100%;
  height: 255px;
  background: #fff;
  margin-top: 20px;
  .InformationTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background: #fff;
    p {
      padding: 0 20px;
    }
  }
  .InformationTable {
    p {
      font-size: 12px;
      color: #9b9b9b;
      padding-left: 20px;
      margin-top: 20px;
    }
  }
}
// 补货相关弹窗
.replenishment {
  width: 100%;
  height: 120px;
  // background: saddlebrown;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .replenishment_left {
    width: 20%;
    height: 100%;
    // background: salmon;
    p {
      font-size: 14px;
      color: #073b49;
      font-weight: bold;
      width: 90px;
      text-align-last: justify;
    }
  }
  .replenishment_right {
    width: 80%;
    height: 100%;
    // background: seagreen;
  }
}
// 库龄统计 + 通知
.statisticalNotification {
  width: 100%;
  height: 340px;
  // background: seagreen;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .statistical {
    width: 49%;
    height: 100%;
    // background: seashell;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 0 10px #dcdcdc;
    .statistical_title {
      height: 45px;
      line-height: 50px;
      margin: 0 20px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: #073b49;
      font-weight: bold;
      position: relative;
      z-index: 1;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      p:nth-of-type(1) {
        span:nth-of-type(2) {
          font-size: 12px;
          color: #999;
          padding-left: 10px;
        }
      }
      p:nth-of-type(2) {
        color: #333;
        font-size: 14px;
      }
    }
    .statistical_content {
      padding: 0 10px 10px 10px;
    }
  }
  .notification {
    width: 49%;
    height: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 0 10px #dcdcdc;
    .notification_title {
      height: 45px;
      line-height: 45px;
      margin: 0 20px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: #073b49;
      font-weight: bold;
      position: relative;
      z-index: 1;
      font-size: 18px;
      p {
        span:nth-of-type(2) {
          color: #999;
          font-size: 12px;
          padding-left: 10px;
        }
      }
    }
    .notification_content {
      padding: 0 20px 20px;
      .notification_item {
        width: 100%;
        height: 65px;
        // background: seashell;
        display: flex;
        justify-content: space-between;
        line-height: 65px;
        font-size: 14px;
        p:nth-of-type(1) {
          margin-left: 10px;
          span {
            font-weight: bold;
            color: #24b7ce;
          }
        }
        p:nth-of-type(2) {
          color: #26cfe8;
          font-size: 14px;
          margin-right: 10px;
        }
      }
      .notification_item:nth-child(even) {
        background: #f3f3f3;
      }
    }
  }
}
// 冗余库存 + 需补货产品
.InventoryReplenishment {
  width: 100%;
  height: 465px;
  // background: seashell;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  // 冗余库存
  .inventory {
    width: 49%;
    height: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 0 10px #dcdcdc;
    .inventory_title {
      height: 45px;
      line-height: 45px;
      margin: 0 20px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: #073b49;
      font-weight: bold;
      position: relative;
      z-index: 1;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      p:nth-of-type(2) {
        color: #333;
        font-size: 14px;
      }
    }
    .inventory_content {
      padding: 0 10px 10px 10px;
    }
  }
  // 需补货产品
  .needReplenishment {
    width: 49%;
    height: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 0 10px #dcdcdc;
    .needReplenishment_title {
      height: 45px;
      line-height: 45px;
      margin: 0 20px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: #073b49;
      font-weight: bold;
      position: relative;
      z-index: 1;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      p:nth-of-type(2) {
        color: #333;
        font-size: 14px;
      }
    }
    .needReplenishment_content {
      padding: 0 10px 10px 10px;
    }
  }
}
</style>