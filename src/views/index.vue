<template>
  <el-container>
    <el-header>
      <div class="header_top">
        <div class="headerTop_left">
          <!-- <i class="el-icon-s-fold" @click="button_menu"></i> -->
        </div>
        <div class="headerTop_right">
          <span>
            <i class="el-icon-user"></i> 登录账户:{{info.username}}
          </span>
          <span>
            <i class="el-icon-setting"></i> 修改密码
          </span>
          <span @click="quit">
            <i class="el-icon-switch-button"></i> 退出
          </span>
        </div>
      </div>
      <!-- <div class="header_bottom">
        <Crumbs style="margin-left:200px;margin-top:10px"></Crumbs>
      </div>-->
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- <div class="button_menu" @click="button_menu">折叠</div> -->
        <el-menu
          background-color="#304156"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <template v-for="item in menulist">
            <el-submenu
              :index="item.id + ''"
              :key="item.id"
              v-show="item.statusId"
              v-if="item.menuChildrenVo"
            >
              <template slot="title">
                <div>
                  <i :class="iconObj[item.id]"></i>
                  <span style="color:#fff">{{item.menu}}</span>
                </div>
              </template>
              <!-- 二级菜单 -->
              <template v-for="itemChild in item.menuChildrenVo">
                <el-submenu
                  v-if="itemChild.menuChildrenVo && itemChild.menuChildrenVo.length"
                  :index="itemChild.id + ''"
                  :key="itemChild.menuUrl"
                  @click="saveNavState(itemChild.menuUrl),activeName(itemChild.menu)"
                >
                  <template slot="title">
                    <i :class="itemChild.icon"></i>
                    <span>{{itemChild.menu}}</span>
                  </template>
                  <!-- 三级菜单 -->
                  <el-menu-item
                    v-for="itemChild_Child in itemChild.menuChildrenVo"
                    :index="itemChild_Child.menuUrl"
                    :key="itemChild_Child.menuUrl"
                    @click="saveNavState(itemChild_Child.menuUrl),activeName(itemChild_Child.menu)"
                  >
                    <i :class="itemChild_Child.icon"></i>
                    <span slot="title">{{itemChild_Child.menu}}</span>
                  </el-menu-item>
                </el-submenu>
                <!-- 判断是否有三级分页 -->
                <el-menu-item
                  v-else
                  :index="itemChild.menuUrl"
                  :key="itemChild.menuUrl"
                  @click="saveNavState(itemChild.menuUrl),activeName(itemChild.menu)"
                >
                  <i :class="itemChild.icon"></i>
                  <span slot="title">{{itemChild.menu}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Crumbs from "@/components/crumbs";
export default {
  components: {
    // Crumbs,
  },
  data() {
    return {
      isCollapse: false,
      activePath: "",
      info: JSON.parse(window.sessionStorage.getItem("info")), //取username
      menulist: [
        // {
        //   id: 1,
        //   menuName: "管理中心",
        //   menuUrl: null,
        //   statusId: 1,
        //   menuChildrenVo: [
        //     {
        //       id: 10,
        //       menuName: "控制台",
        //       menuUrl: "user",
        //       statusId: 10,
        //       menuChildrenVo: [],
        //     },
        //   ],
        // },
        // {
        //   id: 2,
        //   menuImage: null,
        //   menuName: "分析",
        //   menuUrl: null,
        //   statusId: 2,
        //   menuChildrenVo: [
        //     {
        //       id: 20,
        //       menuName: "排名分析",
        //       menuUrl: null,
        //       statusId: 20,
        //       menuChildrenVo: [
        //         {
        //           id: 201,
        //           menuName: "关键词分析",
        //           menuUrl: "keywordAnalysis",
        //           statusId: 201,
        //         },
        //       ],
        //     },
        //     {
        //       id: 21,
        //       menuName: "市场分析",
        //       menuUrl: null,
        //       statusId: 21,
        //       menuChildrenVo: [
        //         {
        //           id: 210,
        //           menuName: "市场分析表",
        //           menuUrl: "marketAnalysisTable",
        //           statusId: 210,
        //         },
        //       ],
        //     },
        //     {
        //       id: 22,
        //       menuName: "主推程序",
        //       menuUrl: null,
        //       statusId: 22,
        //       menuChildrenVo: [
        //         {
        //           id: 220,
        //           menuName: "主推数据",
        //           menuUrl: "mainData",
        //           statusId: 220,
        //         },
        //       ],
        //     },
        //     {
        //       id: 23,
        //       menuName: "评论采集",
        //       menuUrl: null,
        //       statusId: 23,
        //       menuChildrenVo: [
        //         {
        //           id: 230,
        //           menuName: "评论数据",
        //           menuUrl: "reviewData",
        //           statusId: 230,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: 3,
        //   menuName: "仓库",
        //   menuUrl: null,
        //   statusId: 3,
        //   menuChildrenVo: [
        //     {
        //       id: 30,
        //       menuName: "库存",
        //       menuUrl: null,
        //       statusId: 30,
        //       menuChildrenVo: [
        //         {
        //           id: 301,
        //           menuName: "仓库列表",
        //           menuUrl: "warehouseList",
        //           statusId: 301,
        //         },
        //         {
        //           id: 302,
        //           menuName: "库存明细",
        //           menuUrl: "inventoryDetail",
        //           statusId: 302,
        //         },
        //         {
        //           id: 303,
        //           menuName: "FBA库存",
        //           menuUrl: "FBAinventory",
        //           statusId: 303,
        //         },
        //         {
        //           id: 304,
        //           menuName: "库存预警",
        //           menuUrl: "inventoryWarning",
        //           statusId: 304,
        //         },
        //       ],
        //     },
        //     {
        //       id: 31,
        //       menuName: "质检",
        //       menuUrl: null,
        //       statusId: 31,
        //       menuChildrenVo: [
        //         {
        //           id: 310,
        //           menuName: "质检单",
        //           menuUrl: "qualityTestingSheet",
        //           statusId: 310,
        //         },
        //       ],
        //     },
        //     {
        //       id: 32,
        //       menuName: "出入库",
        //       menuUrl: null,
        //       statusId: 32,
        //       menuChildrenVo: [
        //         {
        //           id: 321,
        //           menuName: "入库单",
        //           menuUrl: "godownEntry",
        //           statusId: 321,
        //         },
        //         {
        //           id: 322,
        //           menuName: "出库单",
        //           menuUrl: "outboundOrder",
        //           statusId: 322,
        //         },
        //         {
        //           id: 323,
        //           menuName: "调拨单",
        //           menuUrl: "transferSlip",
        //           statusId: 323,
        //         },
        //         {
        //           id: 324,
        //           menuName: "出入库流水",
        //           menuUrl: "IncomingOutgoingFlow",
        //           statusId: 324,
        //         },
        //         {
        //           id: 325,
        //           menuName: "调拨单汇总",
        //           menuUrl: "SummaryDials",
        //           statusId: 325,
        //         },
        //         {
        //           id: 326,
        //           menuName: "补发货订单",
        //           menuUrl: "ReissueOrder",
        //           statusId: 326,
        //         },
        //       ],
        //     },
        //     {
        //       id: 33,
        //       menuName: "采购订单",
        //       menuUrl: null,
        //       statusId: 33,
        //       menuChildrenVo: [
        //         {
        //           id: 330,
        //           menuName: "未处理",
        //           menuUrl: "untreated",
        //           statusId: 330,
        //         },
        //         {
        //           id: 331,
        //           menuName: "已处理",
        //           menuUrl: "processed",
        //           statusId: 331,
        //         },
        //         {
        //           id: 332,
        //           menuName: "退款单",
        //           menuUrl: "refundOrder",
        //           statusId: 332,
        //         },
        //       ],
        //     },
        //     {
        //       id: 34,
        //       menuName: "库存整合",
        //       menuUrl: null,
        //       statusId: 34,
        //       menuChildrenVo: [
        //         {
        //           id: 341,
        //           menuName: "整合",
        //           menuUrl: "conformity",
        //           statusId: 341,
        //         },
        //         {
        //           id: 342,
        //           menuName: "整合单",
        //           menuUrl: "conformityOrder",
        //           statusId: 342,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: 4,
        //   menuName: "商品",
        //   menuUrl: null,
        //   statusId: 4,
        //   menuChildrenVo: [
        //     {
        //       id: 41,
        //       menuName: "商品数据管理",
        //       menuUrl: "dataManagement",
        //       statusId: 41,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 42,
        //       menuName: "采购部商品",
        //       menuUrl: "merchandiseDepartment",
        //       statusId: 42,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 43,
        //       menuName: "产品部商品",
        //       menuUrl: "productsDepartment",
        //       statusId: 43,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 44,
        //       menuName: "商品管理",
        //       menuUrl: "commodityManagement",
        //       statusId: 44,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 45,
        //       menuName: "辅料管理",
        //       menuUrl: "materialsManagement",
        //       statusId: 45,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 46,
        //       menuName: "品牌管理",
        //       menuUrl: "brandManagement",
        //       statusId: 46,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 47,
        //       menuName: "分类管理",
        //       menuUrl: "sortManagement",
        //       statusId: 47,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 48,
        //       menuName: "Listing",
        //       menuUrl: "Listing",
        //       statusId: 48,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 49,
        //       menuName: "供应商",
        //       menuUrl: "supplier",
        //       statusId: 49,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 411,
        //       menuName: "已删除商品",
        //       menuUrl: "deletedItem",
        //       statusId: 411,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 412,
        //       menuName: "批量图上传",
        //       menuUrl: "batchMapUpload",
        //       statusId: 412,
        //       menuChildrenVo: [],
        //     },
        //   ],
        // },
        // {
        //   id: 5,
        //   menuName: "采购",
        //   menuUrl: null,
        //   statusId: 5,
        //   menuChildrenVo: [
        //     {
        //       id: 50,
        //       menuName: "采购计划",
        //       menuUrl: null,
        //       statusId: 50,
        //       menuChildrenVo: [
        //         {
        //           id: 501,
        //           menuName: "直接采购",
        //           menuUrl: "directProcurement",
        //           statusId: 501,
        //         },
        //       ],
        //     },
        //     {
        //       id: 51,
        //       menuName: "采购单",
        //       menuUrl: null,
        //       statusId: 51,
        //       menuChildrenVo: [
        //         {
        //           id: 511,
        //           menuName: "全部",
        //           menuUrl: "all",
        //           statusId: 511,
        //         },
        //         {
        //           id: 512,
        //           menuName: "已驳回",
        //           menuUrl: "hasBeenRejected",
        //           statusId: 512,
        //         },
        //         {
        //           id: 513,
        //           menuName: "待审核",
        //           menuUrl: "toAudit",
        //           statusId: 513,
        //         },
        //         {
        //           id: 514,
        //           menuName: "待付款",
        //           menuUrl: "obligation",
        //           statusId: 514,
        //         },
        //         {
        //           id: 515,
        //           menuName: "已完成",
        //           menuUrl: "offStocks",
        //           statusId: 515,
        //         },
        //       ],
        //     },
        //     {
        //       id: 52,
        //       menuName: "合同采购",
        //       menuUrl: null,
        //       statusId: 52,
        //       menuChildrenVo: [
        //         {
        //           id: 520,
        //           menuName: "驳回的需求",
        //           menuUrl: "rejectedDemand",
        //           statusId: 520,
        //         },
        //         {
        //           id: 521,
        //           menuName: "销量预估",
        //           menuUrl: "salesForecast",
        //           statusId: 521,
        //         },
        //         {
        //           id: 522,
        //           menuName: "已生成需求",
        //           menuUrl: "generatedRequirement",
        //           statusId: 522,
        //         },
        //         {
        //           id: 523,
        //           menuName: "采购需求",
        //           menuUrl: "procurementRequirement",
        //           statusId: 523,
        //         },
        //         {
        //           id: 524,
        //           menuName: "出货计划",
        //           menuUrl: "shippingPlan",
        //           statusId: 524,
        //         },
        //         {
        //           id: 525,
        //           menuName: "厂家出货统计",
        //           menuUrl: "shipmentStatistics",
        //           statusId: 525,
        //         },
        //         {
        //           id: 526,
        //           menuName: "驳回的采购",
        //           menuUrl: "rejectedPurchase",
        //           statusId: 526,
        //         },
        //         {
        //           id: 527,
        //           menuName: "出货明细",
        //           menuUrl: "deliveryList",
        //           statusId: 527,
        //         },
        //         {
        //           id: 528,
        //           menuName: "出货明细表",
        //           menuUrl: "shippingSchedule",
        //           statusId: 528,
        //         },
        //         {
        //           id: 529,
        //           menuName: "完成出货计划",
        //           menuUrl: "fulfilmentPlan",
        //           statusId: 529,
        //         },
        //       ],
        //     },
        //     {
        //       id: 53,
        //       menuName: "合同采购表",
        //       menuUrl: null,
        //       statusId: 53,
        //       menuChildrenVo: [
        //         {
        //           id: 530,
        //           menuName: "采购汇总",
        //           menuUrl: "purchaseSummary",
        //           statusId: 530,
        //         },
        //         {
        //           id: 531,
        //           menuName: "采购单价趋势",
        //           menuUrl: "purchasingPriceTrend",
        //           statusId: 531,
        //         },
        //         {
        //           id: 532,
        //           menuName: "采购计划",
        //           menuUrl: "procurementPlan",
        //           statusId: 532,
        //         },
        //         {
        //           id: 533,
        //           menuName: "待审采购单",
        //           menuUrl: "purchaseOrder",
        //           statusId: 533,
        //         },
        //         {
        //           id: 534,
        //           menuName: "质检中",
        //           menuUrl: "qualityInspection",
        //           statusId: 534,
        //         },
        //         {
        //           id: 535,
        //           menuName: "采购入库单",
        //           menuUrl: "purchaseReceipt",
        //           statusId: 535,
        //         },
        //         {
        //           id: 536,
        //           menuName: "驳回单",
        //           menuUrl: "rejectSingle",
        //           statusId: 536,
        //         },
        //         {
        //           id: 537,
        //           menuName: "已完成",
        //           menuUrl: "contractCompleted",
        //           statusId: 537,
        //         },
        //         {
        //           id: 538,
        //           menuName: "采购单汇总",
        //           menuUrl: "summaryPurchaseOrder",
        //           statusId: 538,
        //         },
        //       ],
        //     },
        //     {
        //       id: 54,
        //       menuName: "测款采购",
        //       menuUrl: null,
        //       statusId: 54,
        //       menuChildrenVo: [
        //         {
        //           id: 540,
        //           menuName: "事业部",
        //           menuUrl: "businessDivision",
        //           statusId: 540,
        //         },
        //         {
        //           id: 541,
        //           menuName: "产品部",
        //           menuUrl: "productDepartment",
        //           statusId: 541,
        //         },
        //         {
        //           id: 542,
        //           menuName: "执行副总",
        //           menuUrl: "executivePresident",
        //           statusId: 542,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: 6,
        //   menuName: "物流",
        //   menuUrl: null,
        //   statusId: 6,
        //   menuChildrenVo: [
        //     {
        //       id: 61,
        //       menuName: "物流单汇总",
        //       menuUrl: "logisticsSummary",
        //       statusId: 61,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 62,
        //       menuName: "物流单",
        //       menuUrl: "logisticsBill",
        //       statusId: 62,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 63,
        //       menuName: "物流商信息",
        //       menuUrl: "logisticsInformation",
        //       statusId: 63,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 64,
        //       menuName: "自发货汇总",
        //       menuUrl: "voluntarySummary",
        //       statusId: 64,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 65,
        //       menuName: "其他费用",
        //       menuUrl: "otherExpenses",
        //       statusId: 65,
        //       menuChildrenVo: [],
        //     },
        //   ],
        // },
        // {
        //   id: 7,
        //   menuName: "订单",
        //   menuUrl: null,
        //   statusId: 7,
        //   menuChildrenVo: [
        //     {
        //       id: 71,
        //       menuName: "订单列表",
        //       menuUrl: "orderList",
        //       statusId: 71,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 72,
        //       menuName: "自发货订单",
        //       menuUrl: "spontaneousOrder",
        //       statusId: 72,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 73,
        //       menuName: "待采购订单",
        //       menuUrl: "pendingPurchaseOrder",
        //       statusId: 73,
        //       menuChildrenVo: [],
        //     },
        //   ],
        // },
        // {
        //   id: 8,
        //   menuName: "系统",
        //   menuUrl: null,
        //   statusId: 8,
        //   menuChildrenVo: [
        //     {
        //       id: 81,
        //       menuName: "用户管理",
        //       menuUrl: "userManagement",
        //       statusId: 81,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 82,
        //       menuName: "店铺授权",
        //       menuUrl: "shopAuthorization",
        //       statusId: 82,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 83,
        //       menuName: "部门管理",
        //       menuUrl: "divisionalManagement",
        //       statusId: 83,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 84,
        //       menuName: "审批权限",
        //       menuUrl: "authority",
        //       statusId: 84,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 85,
        //       menuName: "维护开关",
        //       menuUrl: "maintainingState",
        //       statusId: 85,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 86,
        //       menuName: "管理菜单",
        //       menuUrl: "managementMenu",
        //       statusId: 86,
        //       menuChildrenVo: [],
        //     },
        //     {
        //       id: 87,
        //       menuName: "店铺权限",
        //       menuUrl: "storePermissions",
        //       statusId: 87,
        //       menuChildrenVo: [],
        //     },
        //   ],
        // },
        // {
        //   id: 9,
        //   menuName: "测评",
        //   menuUrl: null,
        //   statusId: 9,
        //   menuChildrenVo: [
        //     {
        //       id: 91,
        //       menuName: "其他",
        //       menuUrl: null,
        //       statusId: 91,
        //       menuChildrenVo: [
        //         {
        //           id: 911,
        //           menuName: "QA1",
        //           menuUrl: "QA1",
        //           statusId: 911,
        //         },
        //         {
        //           id: 912,
        //           menuName: "QA2",
        //           menuUrl: "QA2",
        //           statusId: 912,
        //         },
        //         {
        //           id: 913,
        //           menuName: "QA3",
        //           menuUrl: "QA3",
        //           statusId: 913,
        //         },
        //         {
        //           id: 914,
        //           menuName: "SE1",
        //           menuUrl: "SE1",
        //           statusId: 914,
        //         },
        //         {
        //           id: 915,
        //           menuName: "SE2",
        //           menuUrl: "SE2",
        //           statusId: 915,
        //         },
        //         {
        //           id: 916,
        //           menuName: "SE3",
        //           menuUrl: "SE3",
        //           statusId: 916,
        //         },
        //       ],
        //     },
        //     {
        //       id: 92,
        //       menuName: "汇总",
        //       menuUrl: null,
        //       statusId: 92,
        //       menuChildrenVo: [
        //         {
        //           id: 921,
        //           menuName: "月账单",
        //           menuUrl: "monthlyBill",
        //           statusId: 921,
        //         },
        //         {
        //           id: 922,
        //           menuName: "日账单",
        //           menuUrl: "onBill",
        //           statusId: 922,
        //         },
        //         {
        //           id: 923,
        //           menuName: "测评订单",
        //           menuUrl: "evaluateOrder",
        //           statusId: 923,
        //         },
        //         {
        //           id: 924,
        //           menuName: "预付订单",
        //           menuUrl: "orderAdvance",
        //           statusId: 924,
        //         },
        //         {
        //           id: 925,
        //           menuName: "其他订单",
        //           menuUrl: "otherOrders",
        //           statusId: 925,
        //         },
        //         {
        //           id: 926,
        //           menuName: "请款下载",
        //           menuUrl: "pleaseDownload",
        //           statusId: 926,
        //         },
        //       ],
        //     },
        //     {
        //       id: 93,
        //       menuName: "服务商",
        //       menuUrl: null,
        //       statusId: 93,
        //       menuChildrenVo: [
        //         {
        //           id: 931,
        //           menuName: "列表",
        //           menuUrl: "facilitatorList",
        //           statusId: 931,
        //         },
        //       ],
        //     },
        //     {
        //       id: 94,
        //       menuName: "评论汇总",
        //       menuUrl: null,
        //       statusId: 94,
        //       menuChildrenVo: [
        //         {
        //           id: 941,
        //           menuName: "订单汇总",
        //           menuUrl: "orderSummary",
        //           statusId: 941,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: 10,
        //   menuName: "新品流程",
        //   menuUrl: null,
        //   statusId: 10,
        //   menuChildrenVo: [
        //     {
        //       id: 101,
        //       menuName: "运营",
        //       menuUrl: null,
        //       statusId: 101,
        //       menuChildrenVo: [
        //         {
        //           id: 1010,
        //           menuName: "运营流程",
        //           menuUrl: "operationProcess",
        //           statusId: 1010,
        //         },
        //         {
        //           id: 1011,
        //           menuName: "运营校对",
        //           menuUrl: "operatingProofreading",
        //           statusId: 1011,
        //         },
        //         {
        //           id: 1012,
        //           menuName: "运营校对复核",
        //           menuUrl: "operationalProofreadingReview",
        //           statusId: 1012,
        //         },
        //       ],
        //     },
        //     {
        //       id: 102,
        //       menuName: "产品",
        //       menuUrl: null,
        //       statusId: 102,
        //       menuChildrenVo: [
        //         {
        //           id: 1020,
        //           menuName: "产品流程",
        //           menuUrl: "productProcess",
        //           statusId: 1020,
        //         },
        //         {
        //           id: 1021,
        //           menuName: "产品校对",
        //           menuUrl: "productCheck",
        //           statusId: 1021,
        //         },
        //         {
        //           id: 1022,
        //           menuName: "产品校对复核",
        //           menuUrl: "productProofreadingReview",
        //           statusId: 1022,
        //         },
        //       ],
        //     },
        //     {
        //       id: 103,
        //       menuName: "定价流程",
        //       menuUrl: null,
        //       statusId: 103,
        //       menuChildrenVo: [
        //         {
        //           id: 1030,
        //           menuName: "定价流程",
        //           menuUrl: "pricingProcess",
        //           statusId: 1030,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: 11,
        //   menuName: "财务数据",
        //   menuUrl: null,
        //   statusId: 11,
        //   menuChildrenVo: [
        //     {
        //       id: 110,
        //       menuName: "数据",
        //       menuUrl: null,
        //       statusId: 110,
        //       menuChildrenVo: [
        //         {
        //           id: 1101,
        //           menuName: "每月库存",
        //           menuUrl: "monthlyInventory",
        //           statusId: 1101,
        //         },
        //         {
        //           id: 1102,
        //           menuName: "应付账款表",
        //           menuUrl: "statementAccountsPayable",
        //           statusId: 1102,
        //         },
        //         {
        //           id: 1103,
        //           menuName: "合同汇总表",
        //           menuUrl: "summaryContract",
        //           statusId: 1103,
        //         },
        //         {
        //           id: 1104,
        //           menuName: "VAT报表一",
        //           menuUrl: "VATReportOne",
        //           statusId: 1104,
        //         },
        //         {
        //           id: 1105,
        //           menuName: "VAT报表二",
        //           menuUrl: "VATReportTwo",
        //           statusId: 1105,
        //         },
        //         {
        //           id: 1106,
        //           menuName: "VAT报表三",
        //           menuUrl: "VATReportThree",
        //           statusId: 1106,
        //         },
        //       ],
        //     },
        //     {
        //       id: 111,
        //       menuName: "报表",
        //       menuUrl: null,
        //       statusId: 111,
        //       menuChildrenVo: [
        //         {
        //           id: 1111,
        //           menuName: "入库单",
        //           menuUrl: "reportGodownEntry",
        //           statusId: 1111,
        //         },
        //         {
        //           id: 1112,
        //           menuName: "调拨单",
        //           menuUrl: "reportTransferSlip",
        //           statusId: 1112,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: 12,
        //   menuName: "工具类",
        //   menuUrl: null,
        //   statusId: 12,
        //   menuChildrenVo: [
        //     {
        //       id: 121,
        //       menuName: "考勤核算",
        //       menuUrl: "attendanceAccounting",
        //       statusId: 121,
        //     },
        //     {
        //       id: 122,
        //       menuName: "PDF箱贴",
        //       menuUrl: "PDFboxLabel",
        //       statusId: 122,
        //     },
        //     {
        //       id: 123,
        //       menuName: "店铺报表",
        //       menuUrl: "storeReport",
        //       statusId: 123,
        //     },
        //     {
        //       id: 124,
        //       menuName: "店铺分析表",
        //       menuUrl: "shopAnalysisTable",
        //       statusId: 124,
        //     },
        //     {
        //       id: 125,
        //       menuName: "跨境早报",
        //       menuUrl: "crossBorderMorning",
        //       statusId: 125,
        //     },
        //     {
        //       id: 126,
        //       menuName: "店铺销量报表",
        //       menuUrl: "storeSalesReport",
        //       statusId: 126,
        //     },
        //   ],
        // },
        // {
        //   id: 5,
        //   menuName: "营销功能",
        //   menuUrl: null,
        //   statusId: 9,
        //   menuChildrenVo: [
        //     {
        //       id: 10,
        //       menuName: "0元购",
        //       menuUrl: null,
        //       statusId: 10,
        //       menuChildrenVo: [
        //         {
        //           id: 11,
        //           menuName: "购买零元购列表",
        //           menuUrl: "functionSet",
        //           statusId: 11,
        //         },
        //         {
        //           id: 12,
        //           menuName: "零元购列表",
        //           menuUrl: "commodity",
        //           statusId: 12,
        //         },
        //         {
        //           id: 13,
        //           menuName: "商品列表",
        //           menuUrl: "terminal",
        //           statusId: 13,
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
      iconObj: {
        1: "el-icon-setting",
        6: "el-icon-s-cooperation",
        17: "el-icon-s-unfold",
        23: "el-icon-s-shop",
        41: "el-icon-s-finance",
        43: "el-icon-s-custom",
        45: "el-icon-menu",
        67: "el-icon-shopping-cart-1",
        107: "el-icon-thumb",
        116: "el-icon-orange",
        135: "el-icon-service",
        12: "el-icon-bell",
      },
      list: JSON.parse(window.sessionStorage.getItem("menulist")),
    };
  },
  created() {
    this.getList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  // {
  //          headers:{
  //           'HTTP_TOKEN':'44368aa56b317a0cdee4fbed2b93db89d14d552e'
  //       },
  //     }
  methods: {
    getList() {
      this.$http.get(`api/login/get_menu`,{
        params:{

        }
      }).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.menulist = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 折叠
    button_menu() {
      this.isCollapse = !this.isCollapse;
    },
    //退出
    quit() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // //清除token
          // sessionStorage.removeItem("token");
          //清除path
          sessionStorage.removeItem("activePath");
          //清除二级菜单
          sessionStorage.removeItem("activeName");
          // 清除存储信息
          sessionStorage.removeItem("info");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    activeName(activeName) {
      window.sessionStorage.setItem("activeName", activeName);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  height: 50px !important;
  background: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  .header_top {
    background: #ffffff;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .headerTop_left {
      margin-left: 200px;
    }
    .headerTop_right {
      line-height: 50px;
      span {
        padding: 0 5px;
      }
    }
  }
  .header_bottom {
    width: 100%;
    height: 30px;
  }
}
.el-aside {
  background-color: rgb(48, 65, 86);
  z-index: 1000;
}
.el-main {
  background: #f0f2f5;
  margin-top: 50px;
}
.el-menu {
  border: none;
}
.button_menu {
  background: saddlebrown;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>