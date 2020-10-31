import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Login from "@/views/login/index.vue"
import Home from "@/views/index.vue"
// 管理中心 => 数据看板
import DataBoard from "@/views/home/dataBoard.vue"
//分析 => 排名分析 => 关键词分析
import KeywordAnalysis from "@/views/analyse/rankingAnalysis/keywordAnalysis.vue"
//分析 => 市场分析 => 市场分析表
import MarketAnalysisTable from "@/views/analyse/marketAnalysis/marketAnalysisTable.vue"
//分析 => 主推程序 => 主推数据
import MainData from "@/views/analyse/mainProgram/mainData.vue"
//分析 => 评论采集 => 评论数据
import ReviewData from "@/views/analyse/CommentsAcquisition/reviewData.vue"

//仓库 => 库存 => 仓库列表
import WarehouseList from "@/views/warehouse/inventory/warehouseList.vue"
//仓库 => 库存 => 库存明细
import InventoryDetail from "@/views/warehouse/inventory/inventoryDetail.vue"
//仓库 => 库存 => FBA库存
import FBAinventory from "@/views/warehouse/inventory/FBAinventory.vue"
//仓库 => 质检 => 质检单
import QualityTestingSheet from "@/views/warehouse/qualityTesting/qualityTestingSheet.vue"
//仓库 => 质检 => 到货记录
import ArrivalRecord from "@/views/warehouse/qualityTesting/arrivalRecord.vue"
//仓库 => 成本补录 => 成本补录单
import CostRecord from "@/views/warehouse/costInto/costRecord.vue"
//仓库 => 出入库 => 入库单
import GodownEntry from "@/views/warehouse/outInPut/godownEntry.vue"
//仓库 => 出入库 => 出库单
import OutboundOrder from "@/views/warehouse/outInPut/outboundOrder.vue"
//仓库 => 出入库 => 调拨单
import TransferSlip from "@/views/warehouse/outInPut/transferSlip.vue"
//仓库 => 出入库 => 出入库流水
import IncomingOutgoingFlow from "@/views/warehouse/outInPut/IncomingOutgoingFlow.vue"
//仓库 => 出入库 => 调拨单汇总
import SummaryDials from "@/views/warehouse/outInPut/SummaryDials.vue"
//仓库 => 出入库 => 补发货订单
import ReissueOrder from "@/views/warehouse/outInPut/ReissueOrder.vue"
//仓库 => 采购订单 => 未处理
import Untreated from "@/views/warehouse/purchaseOrder/untreated.vue"
//仓库 => 采购订单 => 已处理
import Processed from "@/views/warehouse/purchaseOrder/processed.vue"
//仓库 => 库存整合 => 整合
import Conformity from "@/views/warehouse/InventoryIntegration/conformity.vue"
//仓库 => 库存整合 => 整合单
import ConformityOrder from "@/views/warehouse/InventoryIntegration/conformityOrder.vue"

//仓库 => FBA库存管理 => FBA看板
import FBAboard from "@/views/warehouse/inventoryManagement/FBAboard.vue"
//仓库 => FBA库存管理 => 库存列表
import InventoryList from "@/views/warehouse/inventoryManagement/InventoryList.vue"
//仓库 => FBA库存管理 => 冗余库存列表
import RedundantList from "@/views/warehouse/inventoryManagement/redundantList.vue"
//仓库 => FBA库存管理 => 成本计算列表
import CostingList from "@/views/warehouse/inventoryManagement/costingList.vue"
//仓库 => FBA库存管理 => FBA补货中心
import ProcurementCenter from "@/views/warehouse/inventoryManagement/procurementCenter.vue"
//仓库 => FBA库存管理 => FBA配送费异常
import AbnormalDistribution from "@/views/warehouse/inventoryManagement/abnormalDistribution.vue"

//仓库 => 补货 => 补货建议
import ReplenishmentProposal from "@/views/warehouse/replenishment/replenishmentProposal.vue"

//仓库 => 货件 => 发货计划
import ShipmentSchedule from "@/views/warehouse/parcel/shipmentSchedule.vue"
//仓库 => 货件 => FBA货件
import FBAparcel from "@/views/warehouse/parcel/FBAparcel.vue"
//仓库 => 货件 => 发货单
import DispatchList from "@/views/warehouse/parcel/dispatchList.vue"
//仓库 => 货件 => 头程分摊
import FirstLegSplit from "@/views/warehouse/parcel/firstLegSplit.vue"

//商品 => 商品数据管理
import DataManagement from "@/views/commodity/dataManagement.vue"
//商品 => 采购部商品
import MerchandiseDepartment from "@/views/commodity/merchandiseDepartment.vue"
//商品 => 产品部商品
import ProductsDepartment from "@/views/commodity/productsDepartment.vue"
//商品 => 商品管理
import CommodityManagement from "@/views/commodity/commodityManagement.vue"
//商品 => 辅料管理
import MaterialsManagement from "@/views/commodity/materialsManagement.vue"
//商品 => 品牌管理
import BrandManagement from "@/views/commodity/brandManagement.vue"
//商品 => 分类管理
import SortManagement from "@/views/commodity/sortManagement.vue"
//商品 => 供应商
import Supplier from "@/views/commodity/supplier.vue"
//商品 => 已删除商品
import DeletedItem from "@/views/commodity/deletedItem.vue"
//商品 => 批量上传图
import BatchMapUpload from "@/views/commodity/batchMapUpload.vue"

//采购 => 采购单据 => 采购计划
import ProcurementPlan from "@/views/purchase/purchasingDocuments/procurementPlan.vue"
//采购 => 采购单据 => 采购单
import PurchaseNote from "@/views/purchase/purchasingDocuments/purchaseNote.vue"
//采购 => 采购单据 => 采购变更单
import PurchaseChangeForm from "@/views/purchase/purchasingDocuments/purchaseChangeForm.vue"
//采购 => 采购付款 => 付款记录
import PaymentRecord from "@/views/purchase/purchasingPayment/paymentRecord.vue"
//采购 => 供应商协同 => 供应商
import Distributor from "@/views/purchase/supplierCollaboration/distributor.vue"

//物流 => 物流单汇总
import LogisticsSummary from "@/views/logistics/logisticsSummary.vue"
//物流 => 物流单
import LogisticsBill from "@/views/logistics/logisticsBill.vue"
//物流 => 物流商信息
import LogisticsInformation from "@/views/logistics/logisticsInformation.vue"
//物流 => 自发货汇总
import VoluntarySummary from "@/views/logistics/voluntarySummary.vue"
//物流 => 其他费用
import OtherExpenses from "@/views/logistics/otherExpenses.vue"

//销售 => Listing
import Listing from "@/views/orderForm/listing.vue"
//销售 => 售后评价
import SaleEvaluate from "@/views/orderForm/saleEvaluate.vue"
//销售 => 订单列表
import OrderList from "@/views/orderForm/orderList.vue"
//销售 => 订单发货
import SelfShipment from "@/views/orderForm/selfShipment.vue"
//销售 => 退货订单
import RefundOrder from "@/views/orderForm/refundOrder.vue"
//销售 => 移除订单
import RemovalOrder from "@/views/orderForm/removalOrder.vue"
//销售 => 客户列表
import CustomerList from "@/views/orderForm/customerList.vue"


//系统 => 用户管理
import UserManagement from "@/views/system/userManagement.vue"
//系统 => 店铺授权
import ShopAuthorization from "@/views/system/shopAuthorization.vue"
//系统 => 部门管理
import DivisionalManagement from "@/views/system/divisionalManagement.vue"
//系统 => 审批权限
import Authority from "@/views/system/authority.vue"
//系统 => 维护开关
import MaintainingState from "@/views/system/maintainingState.vue"
//系统 => 管理菜单
import ManagementMenu from "@/views/system/managementMenu.vue"
//系统 => 店铺权限
import StorePermissions from "@/views/system/storePermissions.vue"

//统计 => 进销存报表 => 库存报表
import StockReport from "@/views/evaluating/rests/stockReport.vue"
//测评 => 进销存报表 => 采购报表
import PurchaseReport from "@/views/evaluating/rests/purchaseReport.vue"
//测评 => 亚马逊报表 => 赔偿
import Compensate from "@/views/evaluating/collect/compensate.vue"
//测评 => 亚马逊报表 => 盘存
import StockTaking from "@/views/evaluating/collect/stockTaking.vue"
//测评 => 亚马逊报表 => 月仓储费
import MonthStorageFee from "@/views/evaluating/collect/monthStorageFee.vue"
//测评 => 亚马逊报表 => 长期仓储费
import LongStorageFee from "@/views/evaluating/collect/longStorageFee.vue"
//测评 => 亚马逊报表 => 移除货件
import ShipmentRemovalReport from "@/views/evaluating/collect/shipmentRemovalReport.vue"


//新品流程 => 运营 => 运营流程
import OperationProcess from "@/views/newProcess/operation/operationProcess.vue"
//新品流程 => 运营 => 运营校对
import OperatingProofreading from "@/views/newProcess/operation/operatingProofreading.vue"
//新品流程 => 运营 => 运营校对复核
import OperationalProofreadingReview from "@/views/newProcess/operation/operationalProofreadingReview.vue"
//新品流程 => 产品 => 产品流程
import ProductProcess from "@/views/newProcess/product/productProcess.vue"
//新品流程 => 产品 => 产品校对
import ProductCheck from "@/views/newProcess/product/productCheck.vue"
//新品流程 => 产品 => 产品校对复核
import ProductProofreadingReview from "@/views/newProcess/product/productProofreadingReview.vue"
//新品流程 => 定价流程 => 定价流程
import PricingProcess from "@/views/newProcess/pricingProcess/pricingProcess.vue"

//财务数据 => 数据 => 每月库存
import MonthlyInventory from "@/views/financialData/information/monthlyInventory.vue"
//财务数据 => 数据 => 应付账款表
import StatementAccountsPayable from "@/views/financialData/information/statementAccountsPayable.vue"
//财务数据 => 数据 => 合同汇总表
import SummaryContract from "@/views/financialData/information/summaryContract.vue"
//财务数据 => 数据 => VAT报表一
import VATReportOne from "@/views/financialData/information/VATReportOne.vue"
//财务数据 => 数据 => VAT报表二
import VATReportTwo from "@/views/financialData/information/VATReportTwo.vue"
//财务数据 => 数据 => VAT报表三
import VATReportThree from "@/views/financialData/information/VATReportThree.vue"
//财务数据 => 报表 => 入库单
import FinancialReceipt from "@/views/financialData/reportForms/financialReceipt.vue"
//财务数据 => 报表 => 调拨单
import FinancialTransfer from "@/views/financialData/reportForms/financialTransfer.vue"
//财务数据 => 店铺财物状况 => 店铺利润报告
import StoreProfitReport from "@/views/financialData/financialStatusStore/storeProfitReport.vue"
//财务数据 => 店铺财物状况 => ASIN费用解析(付款)
import CostAnalysis from "@/views/financialData/financialStatusStore/costAnalysis.vue"
//财务数据 => 店铺财物状况 => 交易数据
import TransactionData from "@/views/financialData/financialStatusStore/transactionData.vue"
//财务数据 => 店铺财物状况 => 运营费用明细
import OperatingExpenses from "@/views/financialData/financialStatusStore/operatingExpenses.vue"
//财务数据 => 店铺财物状况 => 利润月报
import MonthlyProfits from "@/views/financialData/financialStatusStore/monthlyProfits.vue"
//财务数据 => 店铺财物状况 => 回款记录
import RemittanceRecord from "@/views/financialData/financialStatusStore/remittanceRecord.vue"
//财务数据 => 退款管理 => 退款分析
import AnalysisRefund from "@/views/financialData/refundManagement/analysisRefund.vue"
//财务数据 => 退款管理 => 退款明细
import RefundDetail from "@/views/financialData/refundManagement/refundDetail.vue"
//财务数据 => VAT智算 => VAT报告
import VatReport from "@/views/financialData/vatWisdom/vatReport.vue"
//财务数据 => VAT智算 => 报税国家设置
import CountrySetting from "@/views/financialData/vatWisdom/countrySetting.vue"
//财务数据 => VAT智算 => VAT手动计算
import ManualCalculation from "@/views/financialData/vatWisdom/manualCalculation.vue"
//财务数据 => 设置 => 运营费用设置
import OperatingSetting from "@/views/financialData/financialSetup/operatingSetting.vue"
//财务数据 => 设置 => 财务相关设置
import FinancialRelated from "@/views/financialData/financialSetup/financialRelated.vue"


//工具类 => 考勤核算
import AttendanceAccounting from "@/views/utilityClass/attendanceAccounting.vue"
//工具类 => PDF箱贴
import PDFboxLabel from "@/views/utilityClass/PDFboxLabel.vue"
//工具类 => 店铺报表
import StoreReport from "@/views/utilityClass/storeReport.vue"
//工具类 => 店铺分析表
import ShopAnalysisTable from "@/views/utilityClass/shopAnalysisTable.vue"
//工具类 => 跨境早报
import CrossBorderMorning from "@/views/utilityClass/crossBorderMorning.vue"
//工具类 => 店铺销量报表
import StoreSalesReport from "@/views/utilityClass/storeSalesReport.vue"

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    name:"login",
    path:"/login",
    component:Login
  },
  {
    name:"home",
    path:"/home",
    component:Home,
    // redirect:"/home",
    children:[
      //控制台 => 数据看板
      {
        name:"dataBoard",
        path:"/dataBoard",
        component:DataBoard
      },

      //分析 => 排名分析 => 关键词分析
      {
        name:"keywordAnalysis",
        path:"/keywordAnalysis",
        component:KeywordAnalysis
      },
      //分析 => 市场分析 => 市场分析表
      {
        name:"marketAnalysisTable",
        path:"/marketAnalysisTable",
        component:MarketAnalysisTable
      },
      //分析 => 主推程序 => 主推数据
      {
        name:"mainData",
        path:"/mainData",
        component:MainData
      },
      //分析 => 评论采集 => 评论数据
      {
        name:"reviewData",
        path:"/reviewData",
        component:ReviewData
      },
      
      //仓库 => 库存 => 仓库列表
      {
        name:"warehouseList",
        path:"/warehouseList",
        component:WarehouseList
      },
      //仓库 => 库存 => 库存明细
      {
        name:"inventoryDetail",
        path:"/inventoryDetail",
        component:InventoryDetail
      },
      //仓库 => 库存 => FBA库存
      {
        name:"FBAinventory",
        path:"/FBAinventory",
        component:FBAinventory
      },
      //仓库 => 质检 => 质检单
      {
        name:"qualityTestingSheet",
        path:"/qualityTestingSheet",
        component:QualityTestingSheet
      },
      //仓库 => 质检 => 到货记录
      {
        name:"arrivalRecord",
        path:"/arrivalRecord", 
        component:ArrivalRecord
      },
      //仓库 => 成本补录 => 成本补录单
      {
        name:"costRecord",
        path:"/costRecord", 
        component:CostRecord
      },
      //仓库 => 出入库 => 入库单
      {
        name:"godownEntry",
        path:"/godownEntry",
        component:GodownEntry
      },
      //仓库 => 出入库 => 出库单
      {
        name:"outboundOrder",
        path:"/outboundOrder",
        component:OutboundOrder
      },
      //仓库 => 出入库 => 调拨单
      {
        name:"transferSlip",
        path:"/transferSlip",
        component:TransferSlip
      },
      //仓库 => 出入库 => 出入库流水
      {
        name:"IncomingOutgoingFlow",
        path:"/IncomingOutgoingFlow",
        component:IncomingOutgoingFlow
      },
      //仓库 => 出入库 => 调拨单汇总
      {
        name:"SummaryDials",
        path:"/SummaryDials",
        component:SummaryDials
      },
      //仓库 => 出入库 => 补发货订单
      {
        name:"ReissueOrder",
        path:"/ReissueOrder",
        component:ReissueOrder
      },
      //仓库 => 采购订单 => 未处理
      {
        name:"untreated",
        path:"/untreated",
        component:Untreated
      },
      //仓库 => 采购订单 => 已处理
      {
        name:"processed",
        path:"/processed",
        component:Processed
      },
      //仓库 => 库存整合 => 整合
      {
        name:"conformity",
        path:"/conformity",
        component:Conformity
      },
      //仓库 => 库存整合 => 整合单
      {
        name:"conformityOrder",
        path:"/conformityOrder",
        component:ConformityOrder
      },
      //仓库 => FBA库存管理 => FBA看板
      {
        name:"FBAboard",
        path:"/FBAboard",
        component:FBAboard
      },
      //仓库 => FBA库存管理 => 库存列表
      {
        name:"InventoryList",
        path:"/InventoryList",
        component:InventoryList
      },
      //仓库 => FBA库存管理 => 冗余库存列表
      {
        name:"redundantList",
        path:"/redundantList",
        component:RedundantList
      },
      //仓库 => FBA库存管理 => 成本计算列表
      {
        name:"costingList",
        path:"/costingList",
        component:CostingList
      },
      //仓库 => FBA库存管理 => FBA补货中心
      {
        name:"procurementCenter",
        path:"/procurementCenter",
        component:ProcurementCenter
      },
      //仓库 => FBA库存管理 => FBA配送费异常
      {
        name:"abnormalDistribution",
        path:"/abnormalDistribution",
        component:AbnormalDistribution
      },
      //仓库 => 补货 => 补货建议
      {
        name:"replenishmentProposal",
        path:"/replenishmentProposal",
        component:ReplenishmentProposal
      },
      //仓库 => 货件 => 发货计划
      {
        name:"shipmentSchedule",
        path:"/shipmentSchedule",
        component:ShipmentSchedule
      },
      //仓库 => 货件 => FBA货件
      {
        name:"FBAparcel",
        path:"/FBAparcel",
        component:FBAparcel
      },
      //仓库 => 货件 => 发货单
      {
        name:"dispatchList",
        path:"/dispatchList",
        component:DispatchList
      },
      //仓库 => 货件 => 头程分摊
      {
        name:"firstLegSplit",
        path:"/firstLegSplit",
        component:FirstLegSplit
      },


      //商品 => 商品数据管理
      {
        name:"dataManagement",
        path:"/dataManagement",
        component:DataManagement
      },
      //商品 => 采购部商品
      {
        name:"merchandiseDepartment",
        path:"/merchandiseDepartment",
        component:MerchandiseDepartment
      },
      //商品 => 产品部商品
      {
        name:"productsDepartment",
        path:"/productsDepartment",
        component:ProductsDepartment
      },
      //商品 => 商品管理
      {
        name:"commodityManagement",
        path:"/commodityManagement",
        component:CommodityManagement
      },
      //商品 => 辅料管理
      {
        name:"materialsManagement",
        path:"/materialsManagement",
        component:MaterialsManagement
      },
      //商品 => 品牌管理
      {
        name:"brandManagement",
        path:"/brandManagement",
        component:BrandManagement
      },
      //商品 => 分类管理
      {
        name:"sortManagement",
        path:"/sortManagement",
        component:SortManagement
      },
      //商品 => 供应商
      {
        name:"supplier",
        path:"/supplier",
        component:Supplier
      },
      //商品 => 已删除商品
      {
        name:"deletedItem",
        path:"/deletedItem",
        component:DeletedItem
      },
      //商品 => 批量图上传
      {
        name:"batchMapUpload",
        path:"/batchMapUpload",
        component:BatchMapUpload
      },

      //采购 => 采购单据 => 采购计划
      {
        name:"procurementPlan",
        path:"/procurementPlan",
        component:ProcurementPlan
      },
      //采购 => 采购单据 => 采购单
      {
        name:"purchaseNote",
        path:"/purchaseNote",
        component:PurchaseNote
      },
      //采购 => 采购单据 => 采购变更单
      {
        name:"purchaseChangeForm",
        path:"/purchaseChangeForm",
        component:PurchaseChangeForm
      },
      //采购 => 采购付款 => 付款记录
      {
        name:"paymentRecord",
        path:"/paymentRecord",
        component:PaymentRecord
      },
      //采购 => 供应商协同 => 供应商
      {
        name:"distributor",
        path:"/distributor",
        component:Distributor
      },

      
      //物流 => 物流单汇总
      {
        name:"logisticsSummary",
        path:"/logisticsSummary",
        component:LogisticsSummary
      },
      //物流 => 物流单
      {
        name:"logisticsBill",
        path:"/logisticsBill",
        component:LogisticsBill
      },
      //物流 => 物流商信息
      {
        name:"logisticsInformation",
        path:"/logisticsInformation",
        component:LogisticsInformation
      },
      //物流 => 自发货汇总
      {
        name:"voluntarySummary",
        path:"/voluntarySummary",
        component:VoluntarySummary
      },
      //物流 => 其他费用
      {
        name:"otherExpenses",
        path:"/otherExpenses",
        component:OtherExpenses
      },

      //销售 => Listing
      {
        name:"listing",
        path:"/listing",
        component:Listing
      },
      //销售 => 售后评价
      {
        name:"saleEvaluate",
        path:"/saleEvaluate",
        component:SaleEvaluate
      },
      //销售 => 订单列表
      {
        name:"orderList",
        path:"/orderList",
        component:OrderList
      },
      //销售 => 订单发货
      {
        name:"selfShipment",
        path:"/selfShipment",
        component:SelfShipment
      },
      //销售 => 订单退货
      {
        name:"refundOrder",
        path:"/refundOrder",
        component:RefundOrder
      },
      //销售 => 移除订单
      {
        name:"removalOrder",
        path:"/removalOrder",
        component:RemovalOrder
      },
      //销售 => 客户列表
      {
        name:"customerList",
        path:"/customerList",
        component:CustomerList
      },

      //系统 => 用户管理
      {
        name:"userManagement",
        path:"/userManagement",
        component:UserManagement
      },
      //系统 => 店铺授权
      {
        name:"shopAuthorization",
        path:"/shopAuthorization",
        component:ShopAuthorization
      },
      //系统 => 部门管理
      {
        name:"divisionalManagement",
        path:"/divisionalManagement",
        component:DivisionalManagement
      },
      //系统 => 审批权限
      {
        name:"authority",
        path:"/authority",
        component:Authority
      },
      //系统 => 维护开关
      {
        name:"maintainingState",
        path:"/maintainingState",
        component:MaintainingState
      },
      //系统 => 管理菜单
      {
        name:"managementMenu",
        path:"/managementMenu",
        component:ManagementMenu
      },
      //系统 => 店铺权限
      {
        name:"storePermissions",
        path:"/storePermissions",
        component:StorePermissions
      },

      //统计 => 进销存报表 => 库存报表
      {
        name:"stockReport",
        path:"/stockReport",
        component:StockReport
      },
      //统计 => 进销存报表 => 采购报表
      {
        name:"purchaseReport",
        path:"/purchaseReport",
        component:PurchaseReport
      },
      //统计 => 亚马逊报表 => 赔偿
      {
        name:"compensate",
        path:"/compensate",
        component:Compensate
      },
      //测评 => 亚马逊报表 => 盘存
      {
        name:"stockTaking",
        path:"/stockTaking",
        component:StockTaking
      },
      //测评 => 亚马逊报表 => 月仓储费
      {
        name:"monthStorageFee",
        path:"/monthStorageFee",
        component:MonthStorageFee
      },
      //测评 => 亚马逊报表 => 长期仓储费
      {
        name:"longStorageFee",
        path:"/longStorageFee",
        component:LongStorageFee
      },
      //测评 => 亚马逊报表 => 移除货件
      {
        name:"shipmentRemovalReport",
        path:"/shipmentRemovalReport",
        component:ShipmentRemovalReport
      },

      
      

      //新品流程 => 运营 => 运营流程
      {
        name:"operationProcess",
        path:"/operationProcess",
        component:OperationProcess
      },
      //新品流程 => 运营 => 运营校对
      {
        name:"operatingProofreading",
        path:"/operatingProofreading",
        component:OperatingProofreading
      },
      //新品流程 => 运营 => 运营校对复核
      {
        name:"operationalProofreadingReview",
        path:"/operationalProofreadingReview",
        component:OperationalProofreadingReview
      },
      //新品流程 => 产品 => 产品流程
      {
        name:"productProcess",
        path:"/productProcess",
        component:ProductProcess
      },
      //新品流程 => 产品 => 产品校对
      {
        name:"productCheck",
        path:"/productCheck",
        component:ProductCheck
      },
      //新品流程 => 产品 => 产品校对复核
      {
        name:"productProofreadingReview",
        path:"/productProofreadingReview",
        component:ProductProofreadingReview
      },
      //新品流程 => 定价流程 => 定价流程
      {
        name:"pricingProcess",
        path:"/pricingProcess",
        component:PricingProcess
      },

      //财务数据 => 数据 => 每月库存
      {
        name:"monthlyInventory",
        path:"/monthlyInventory",
        component:MonthlyInventory
      },
      //财务数据 => 数据 => 应付账款表
      {
        name:"statementAccountsPayable",
        path:"/statementAccountsPayable",
        component:StatementAccountsPayable
      },
      //财务数据 => 数据 => 合同汇总表
      {
        name:"summaryContract",
        path:"/summaryContract",
        component:SummaryContract
      },
      //财务数据 => 数据 => VAT报表一
      {
        name:"VATReportOne",
        path:"/VATReportOne",
        component:VATReportOne
      },
      //财务数据 => 数据 => VAT报表二
      {
        name:"VATReportTwo",
        path:"/VATReportTwo",
        component:VATReportTwo
      },
      //财务数据 => 数据 => VAT报表三
      {
        name:"VATReportThree",
        path:"/VATReportThree",
        component:VATReportThree
      },
      //财务数据 => 报表 => 入库单
      {
        name:"financialReceipt",
        path:"/financialReceipt",
        component:FinancialReceipt
      },
      //财务数据 => 报表 => 调拨单
      {
        name:"financialTransfer",
        path:"/financialTransfer",
        component:FinancialTransfer
      },
      //财务数据 => 店铺财物状况 => 店铺利润报告
      {
        name:"storeProfitReport",
        path:"/storeProfitReport",
        component:StoreProfitReport
      },
      //财务数据 => 店铺财物状况 => ASIN费用解析(付款)
      {
        name:"costAnalysis",
        path:"/costAnalysis",
        component:CostAnalysis
      },
      //财务数据 => 店铺财物状况 => 交易数据
      {
        name:"transactionData",
        path:"/transactionData",
        component:TransactionData
      },
      //财务数据 => 店铺财物状况 => 运营费用明细
      {
        name:"operatingExpenses",
        path:"/operatingExpenses",
        component:OperatingExpenses
      },
      //财务数据 => 店铺财物状况 => 利润月报
      {
        name:"monthlyProfits",
        path:"/monthlyProfits",
        component:MonthlyProfits
      },
      //财务数据 => 店铺财物状况 => 回款记录
      {
        name:"remittanceRecord",
        path:"/remittanceRecord",
        component:RemittanceRecord
      },
      //财务数据 => 退款管理 => 退款分析
      {
        name:"analysisRefund",
        path:"/analysisRefund",
        component:AnalysisRefund
      },
      //财务数据 => 退款管理 => 退款明细
      {
        name:"refundDetail",
        path:"/refundDetail",
        component:RefundDetail
      },
      //财务数据 => VAT智算 => VAT报告
      {
        name:"vatReport",
        path:"/vatReport",
        component:VatReport
      },
      //财务数据 => VAT智算 => 报税国家设置
      {
        name:"countrySetting",
        path:"/countrySetting",
        component:CountrySetting
      },
      //财务数据 => VAT智算 => VAT报告
      {
        name:"manualCalculation",
        path:"/manualCalculation",
        component:ManualCalculation
      },
      //财务数据 => 设置 => 运营费用设置
      {
        name:"operatingSetting",
        path:"/operatingSetting",
        component:OperatingSetting
      },
      //财务数据 => 设置 => 财务相关报告
      {
        name:"financialRelated",
        path:"/financialRelated",
        component:FinancialRelated
      },


      //工具类 => 考勤核算
      {
        name:"attendanceAccounting",
        path:"/attendanceAccounting",
        component:AttendanceAccounting
      },
      //工具类 => PDF箱贴
      {
        name:"PDFboxLabel",
        path:"/PDFboxLabel",
        component:PDFboxLabel
      },
      //工具类 => 店铺报表
      {
        name:"storeReport",
        path:"/storeReport",
        component:StoreReport
      },
      //工具类 => 店铺分析表
      {
        name:"shopAnalysisTable",
        path:"/shopAnalysisTable",
        component:ShopAnalysisTable
      },
      //工具类 => 跨境早报
      {
        name:"crossBorderMorning",
        path:"/crossBorderMorning",
        component:CrossBorderMorning
      },
      //工具类 => 店铺销量报表
      {
        name:"storeSalesReport",
        path:"/storeSalesReport",
        component:StoreSalesReport
      },
    ] 
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach( (to, from, next) => {
  if( to.path === '/login' ) return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if( !tokenStr ) return next( '/login' )
  next()
} )
// Nprogress.js进度条
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 700, showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
