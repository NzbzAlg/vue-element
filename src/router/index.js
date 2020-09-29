import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/index.vue"
import Home from "@/views/index.vue"
// 管理中心 => 控制台
import User from "@/views/home/user.vue"
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
//仓库 => 库存 => 库存预警
import InventoryWarning from "@/views/warehouse/inventory/inventoryWarning.vue"
//仓库 => 库存 => FBA预估
import FBAestimate from "@/views/warehouse/inventory/FBAestimate.vue"
//仓库 => 质检 => 质检单
import QualityTestingSheet from "@/views/warehouse/qualityTesting/qualityTestingSheet.vue"
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
//仓库 => 采购订单 => 退款单
import RefundOrder from "@/views/warehouse/purchaseOrder/refundOrder.vue"
//仓库 => 库存整合 => 整合
import Conformity from "@/views/warehouse/InventoryIntegration/conformity.vue"
//仓库 => 库存整合 => 整合单
import ConformityOrder from "@/views/warehouse/InventoryIntegration/conformityOrder.vue"

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
//商品 => Listing
import Listing from "@/views/commodity/Listing.vue"
//商品 => 供应商
import Supplier from "@/views/commodity/supplier.vue"
//商品 => 已删除商品
import DeletedItem from "@/views/commodity/deletedItem.vue"
//商品 => 批量上传图
import BatchMapUpload from "@/views/commodity/batchMapUpload.vue"

//采购 => 采购计划 => 直接采购
import DirectProcurement from "@/views/purchase/procurementPlan/directProcurement.vue"
//采购 => 采购单 => 全部
import All from "@/views/purchase/purchaseNote/all.vue"
//采购 => 采购单 => 已驳回
import HasBeenRejected from "@/views/purchase/purchaseNote/hasBeenRejected.vue"
//采购 => 采购单 => 待审核
import ToAudit from "@/views/purchase/purchaseNote/toAudit.vue"
//采购 => 采购单 => 待付款
import Obligation from "@/views/purchase/purchaseNote/obligation.vue"
//采购 => 采购单 => 已完成
import OffStocks from "@/views/purchase/purchaseNote/offStocks.vue"
//采购 => 合同采购 => 驳回的需求
import RejectedDemand from "@/views/purchase/contractPurchase/rejectedDemand.vue"
//采购 => 合同采购 => 销量预估
import SalesForecast from "@/views/purchase/contractPurchase/salesForecast.vue"
//采购 => 合同采购 => 已生成需求
import GeneratedRequirement from "@/views/purchase/contractPurchase/generatedRequirement.vue"
//采购 => 合同采购 => 采购需求
import ProcurementRequirement from "@/views/purchase/contractPurchase/procurementRequirement.vue"
//采购 => 合同采购 => 出货计划
import ShippingPlan from "@/views/purchase/contractPurchase/shippingPlan.vue"
//采购 => 合同采购 => 厂家出货统计
import ShipmentStatistics from "@/views/purchase/contractPurchase/shipmentStatistics.vue"
//采购 => 合同采购 => 驳回的采购
import RejectedPurchase from "@/views/purchase/contractPurchase/rejectedPurchase.vue"
//采购 => 合同采购 => 出货明细
import DeliveryList from "@/views/purchase/contractPurchase/deliveryList.vue"
//采购 => 合同采购 => 出货明细表
import ShippingSchedule from "@/views/purchase/contractPurchase/shippingSchedule.vue"
//采购 => 合同采购 => 完成出货计划
import FulfilmentPlan from "@/views/purchase/contractPurchase/fulfilmentPlan.vue"
//采购 => 合同采购表 => 采购汇总
import PurchaseSummary from "@/views/purchase/contractPurchaseSchedule/purchaseSummary.vue"
//采购 => 合同采购表 => 采购单价趋势图
import PurchasePriceChart from "@/views/purchase/contractPurchaseSchedule/purchasePriceChart.vue"
//采购 => 合同采购表 => 采购单价趋势
import PurchasingPriceTrend from "@/views/purchase/contractPurchaseSchedule/purchasingPriceTrend.vue"
//采购 => 合同采购表 => 采购计划
import ProcurementPlan from "@/views/purchase/contractPurchaseSchedule/procurementPlan.vue"
//采购 => 合同采购表 => 待审采购单
import PurchaseOrder from "@/views/purchase/contractPurchaseSchedule/purchaseOrder.vue"
//采购 => 合同采购表 => 质检中
import QualityInspection from "@/views/purchase/contractPurchaseSchedule/qualityInspection.vue"
//采购 => 合同采购表 => 采购入库单
import  PurchaseReceipt from "@/views/purchase/contractPurchaseSchedule/purchaseReceipt.vue"
//采购 => 合同采购表 => 驳回单
import RejectSingle from "@/views/purchase/contractPurchaseSchedule/rejectSingle.vue"
//采购 => 合同采购表 => 已完成
import ContractCompleted from "@/views/purchase/contractPurchaseSchedule/contractCompleted.vue"
//采购 => 合同采购表 => 采购单汇总
import SummaryPurchaseOrder from "@/views/purchase/contractPurchaseSchedule/summaryPurchaseOrder.vue"
//采购 => 测款采购 => 事业部
import BusinessDivision from "@/views/purchase/measurementPurchasing/businessDivision.vue"
//采购 => 测款采购 => 产品部
import ProductDepartment from "@/views/purchase/measurementPurchasing/productDepartment.vue"
//采购 => 测款采购 => 执行副总
import ExecutivePresident from "@/views/purchase/measurementPurchasing/executivePresident.vue"

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

//订单 => 订单列表
import OrderList from "@/views/orderForm/orderList.vue"
//订单 => 自发货订单
import SpontaneousOrder from "@/views/orderForm/spontaneousOrder.vue"
//订单 => 待采购订单
import PendingPurchaseOrder from "@/views/orderForm/pendingPurchaseOrder.vue"

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

//测评 => 其他 => QA1
import QA1 from "@/views/evaluating/rests/QA1.vue"
//测评 => 其他 => QA2
import QA2 from "@/views/evaluating/rests/QA2.vue"
//测评 => 其他 => QA3
import QA3 from "@/views/evaluating/rests/QA3.vue"
//测评 => 其他 => SE1
import SE1 from "@/views/evaluating/rests/SE1.vue"
//测评 => 其他 => SE2
import SE2 from "@/views/evaluating/rests/SE2.vue"
//测评 => 其他 => SE3
import SE3 from "@/views/evaluating/rests/SE3.vue"
//测评 => 汇总 => 月账单
import MonthlyBill from "@/views/evaluating/collect/monthlyBill.vue"
//测评 => 汇总 => 日账单
import OnBill from "@/views/evaluating/collect/onBill.vue"
//测评 => 汇总 => 测评订单
import EvaluateOrder from "@/views/evaluating/collect/evaluateOrder.vue"
//测评 => 汇总 => 预付订单
import OrderAdvance from "@/views/evaluating/collect/orderAdvance.vue"
//测评 => 汇总 => 其他订单
import OtherOrders from "@/views/evaluating/collect/otherOrders.vue"
//测评 => 汇总 => 请款下载
import PleaseDownload from "@/views/evaluating/collect/pleaseDownload.vue"
//测评 => 服务商 => 列表
import FacilitatorList from "@/views/evaluating/facilitator/facilitatorList.vue"
//测评 => 测评汇总 => 订单汇总
import OrderSummary from "@/views/evaluating/testSummary/orderSummary.vue"

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
      //管理中心 => 控制台
      {
        name:"user",
        path:"/user",
        component:User
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
      //仓库 => 库存 => 库存预警
      {
        name:"inventoryWarning",
        path:"/inventoryWarning",
        component:InventoryWarning
      },
      //仓库 => 库存 => FBA预估
      {
        name:"FBAestimate",
        path:"/FBAestimate",
        component:FBAestimate
      },
      //仓库 => 质检 => 质检单
      {
        name:"qualityTestingSheet",
        path:"/qualityTestingSheet",
        component:QualityTestingSheet
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
      //仓库 => 采购订单 => 退款单
      {
        name:"refundOrder",
        path:"/refundOrder",
        component:RefundOrder
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
      //商品 => Listing
      {
        name:"Listing",
        path:"/Listing",
        component:Listing
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

      //采购 => 采购计划 => 直接采购
      {
        name:"directProcurement",
        path:"/directProcurement",
        component:DirectProcurement
      },
      //采购 => 采购单 => 全部
      {
        name:"all",
        path:"/all",
        component:All
      },
      //采购 => 采购单 => 已驳回
      {
        name:"hasBeenRejected",
        path:"/hasBeenRejected",
        component:HasBeenRejected
      },
      //采购 => 采购单 => 待审核
      {
        name:"toAudit",
        path:"/toAudit",
        component:ToAudit
      },
      //采购 => 采购单 => 待付款
      {
        name:"obligation",
        path:"/obligation",
        component:Obligation
      },
      //采购 => 采购单 => 已完成
      {
        name:"offStocks",
        path:"/offStocks",
        component:OffStocks
      },
      //采购 => 合同采购 => 驳回的需求
      {
        name:"rejectedDemand",
        path:"/rejectedDemand",
        component:RejectedDemand
      },
      //采购 => 合同采购 => 销量预估
      {
        name:"salesForecast",
        path:"/salesForecast",
        component:SalesForecast
      },
      //采购 => 合同采购 => 已生成需求
      {
        name:"generatedRequirement",
        path:"/generatedRequirement",
        component:GeneratedRequirement
      },
      //采购 => 合同采购 => 采购需求
      {
        name:"procurementRequirement",
        path:"/procurementRequirement",
        component:ProcurementRequirement
      },
      //采购 => 合同采购 => 出货计划
      {
        name:"shippingPlan",
        path:"/shippingPlan",
        component:ShippingPlan
      },
      //采购 => 合同采购 => 厂家出货统计
      {
        name:"shipmentStatistics",
        path:"/shipmentStatistics",
        component:ShipmentStatistics
      },
      //采购 => 合同采购 => 驳回的采购
      {
        name:"rejectedPurchase",
        path:"/rejectedPurchase",
        component:RejectedPurchase
      },
      //采购 => 合同采购 => 出货明细
      {
        name:"deliveryList",
        path:"/deliveryList",
        component:DeliveryList
      },
      //采购 => 合同采购 => 出货明细表
      {
        name:"shippingSchedule",
        path:"/shippingSchedule",
        component:ShippingSchedule
      },
      //采购 => 合同采购 => 完成出货计划
      {
        name:"fulfilmentPlan",
        path:"/fulfilmentPlan",
        component:FulfilmentPlan
      },
      //采购 => 合同采购表 => 采购汇总
      {
        name:"purchaseSummary",
        path:"/purchaseSummary",
        component:PurchaseSummary 
      },
      //采购 => 合同采购表 => 采购单价趋势图
      {
        name:"purchasePriceChart",
        path:"/purchasePriceChart",
        component:PurchasePriceChart
      },
      //采购 => 合同采购表 => 采购单价趋势
      {
        name:"purchasingPriceTrend",
        path:"/purchasingPriceTrend",
        component:PurchasingPriceTrend
      },
      //采购 => 合同采购表 => 采购计划
      {
        name:"procurementPlan",
        path:"/procurementPlan",
        component:ProcurementPlan
      },
      //采购 => 合同采购表 => 待审采购单
      {
        name:"purchaseOrder",
        path:"/purchaseOrder",
        component:PurchaseOrder
      },
      //采购 => 合同采购表 => 质检中
      {
        name:"qualityInspection",
        path:"/qualityInspection",
        component:QualityInspection
      },
      //采购 => 合同采购表 => 采购入库单
      {
        name:"purchaseReceipt",
        path:"/purchaseReceipt",
        component:PurchaseReceipt
      },
      //采购 => 合同采购表 => 驳回单
      {
        name:"rejectSingle",
        path:"/rejectSingle",
        component:RejectSingle
      },
      //采购 => 合同采购表 => 已完成
      {
        name:"contractCompleted",
        path:"/contractCompleted",
        component:ContractCompleted
      },
      //采购 => 合同采购表 => 采购单汇总
      {
        name:"summaryPurchaseOrder",
        path:"/summaryPurchaseOrder",
        component:SummaryPurchaseOrder
      },
      //采购 => 测款采购 => 事业部
      {
        name:"businessDivision",
        path:"/businessDivision",
        component:BusinessDivision
      },
      //采购 => 测款采购 => 产品部
      {
        name:"productDepartment",
        path:"/productDepartment",
        component:ProductDepartment
      },
      //采购 => 测款采购 => 执行副总
      {
        name:"executivePresident",
        path:"/executivePresident",
        component:ExecutivePresident
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

      //订单 => 订单列表
      {
        name:"orderList",
        path:"/orderList",
        component:OrderList
      },
      //订单 => 自发货订单
      {
        name:"spontaneousOrder",
        path:"/spontaneousOrder",
        component:SpontaneousOrder
      },
      //订单 => 待采购订单
      {
        name:"pendingPurchaseOrder",
        path:"/pendingPurchaseOrder",
        component:PendingPurchaseOrder
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

      //测评 => 其他 => QA1
      {
        name:"QA1",
        path:"/QA1",
        component:QA1
      },
      //测评 => 其他 => QA2
      {
        name:"QA2",
        path:"/QA2",
        component:QA2
      },
      //测评 => 其他 => QA3
      {
        name:"QA3",
        path:"/QA3",
        component:QA3
      },
      //测评 => 其他 => SE1
      {
        name:"SE1",
        path:"/SE1",
        component:SE1
      },
      //测评 => 其他 => SE2
      {
        name:"SE2",
        path:"/SE2",
        component:SE2
      },
      //测评 => 其他 => SE3
      {
        name:"SE3",
        path:"/SE3",
        component:SE3
      },
      //测评 => 汇总 => 月账单
      {
        name:"monthlyBill",
        path:"/monthlyBill",
        component:MonthlyBill
      },
      //测评 => 汇总 => 日账单
      {
        name:"onBill",
        path:"/onBill",
        component:OnBill
      },
      //测评 => 汇总 => 测评订单
      {
        name:"evaluateOrder",
        path:"/evaluateOrder",
        component:EvaluateOrder
      },
      //测评 => 汇总 => 预付订单
      {
        name:"orderAdvance",
        path:"/orderAdvance",
        component:OrderAdvance
      },
      //测评 => 汇总 => 其他订单
      {
        name:"otherOrders",
        path:"/otherOrders",
        component:OtherOrders
      },
      //测评 => 汇总 => 请款下载
      {
        name:"pleaseDownload",
        path:"/pleaseDownload",
        component:PleaseDownload
      },
      //测评 => 服务商 => 列表
      {
        name:"facilitatorList",
        path:"/facilitatorList",
        component:FacilitatorList
      },
      //测评 => 测评汇总 => 订单汇总
      {
        name:"orderSummary",
        path:"/orderSummary",
        component:OrderSummary
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
// router.beforeEach( (to, from, next) => {
//   if( to.path === '/login' ) return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if( !tokenStr ) return next( '/login' )
//   next()
// } )

export default router
