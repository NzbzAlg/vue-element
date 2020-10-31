
<template>
  <div class="selfShipment">
    <!-- 搜索 -->
    <div class="title">
      <!-- 订单 -->
      <el-select
        v-model="orderForm"
        placeholder="订单"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in orderFormDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 仓库 -->
      <el-select
        v-model="warehouse"
        placeholder="仓库"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in warehouseDrop"
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
        style="margin-left: 10px; width: 255px"
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
    <!-- 表格 -->
    <div class="table">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first">
          <div class="table_button">
            <el-button type="primary" size="small">发货审核</el-button>
            <el-button size="small" @click="logisticsMode"
              >分配物流方式</el-button
            >
            <el-button size="small" @click="editDeliveryMode"
              >编辑发货仓库</el-button
            >
            <el-button size="small">更新物流信息</el-button>
            <el-button size="small">取消发货</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="channel_name"
              label="店铺"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="国家"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="订单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="商品信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="品名/SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="买家信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="订购时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="付款时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货时限"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="目的地"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center" width="110">
              <template>
                <el-dropdown split-button size="small">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待配货" name="second">
          <div class="table_button">
            <el-button type="primary" size="small">分配库存</el-button>
            <el-button size="small">虚假发货</el-button>
            <el-button size="small" @click="editDeliveryMode"
              >更新物流信息</el-button
            >
            <el-button size="small">订单重申</el-button>
            <el-button size="small">标记已发货</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="channel_name"
              label="店铺"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="国家"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="订单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="商品信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="品名/SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="买家信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="订购时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="付款时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货时限"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="目的地"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center" width="110">
              <template>
                <el-dropdown split-button size="small">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="物流下单" name="third">
          <div class="table_button">
            <el-button type="primary" size="small"
              >API物流下单并同步至亚马逊</el-button
            >
            <el-button size="small">API物流下单</el-button>
            <el-button size="small">同步至亚马逊</el-button>
            <el-button size="small">导入跟踪号</el-button>
            <el-button size="small">更新物流信息</el-button>
            <el-button size="small">释放包裹</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="channel_name"
              label="店铺"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="国家"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="订单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="商品信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="品名/SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="买家信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="订购时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="付款时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货时限"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="目的地"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center" width="110">
              <template>
                <el-dropdown split-button size="small">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待打单" name="fourth">
          <div class="table_button">
            <el-button size="small">打印拣货单</el-button>
            <el-button size="small">打印物流面单</el-button>
            <el-button size="small">标记为已打印</el-button>
            <el-button size="small">更新物流信息</el-button>
            <el-button size="small">释放包裹</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="channel_name"
              label="店铺"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="国家"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="订单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="商品信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="品名/SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="买家信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="订购时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="付款时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货时限"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="目的地"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center" width="110">
              <template>
                <el-dropdown split-button size="small">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="cancellation">
          <div class="table_button">
            <el-button size="small" type="primary">确认发货</el-button>
            <el-button size="small">打印拣货单</el-button>
            <el-button size="small">打印物流面单</el-button>
            <el-button size="small">更新物流信息</el-button>
            <el-button size="small">释放包裹</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="channel_name"
              label="店铺"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="国家"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="订单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="商品信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="品名/SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="买家信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="订购时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="付款时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货时限"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="目的地"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center" width="110">
              <template>
                <el-dropdown split-button size="small">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已发货" name="shipped">
          <div class="table_button">
            <el-button size="small">更新物流信息</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="channel_name"
              label="店铺"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="国家"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="订单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="商品信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="品名/SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="买家信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="订购时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="付款时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货时限"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="目的地"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center" width="110">
              <template>
                <el-dropdown split-button size="small">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已作废" name="beenVoided">
          <div class="table_button">
            <el-button size="small">更新物流信息</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="channel_name"
              label="店铺"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="国家"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="订单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="商品信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="品名/SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="买家信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="订购时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="付款时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货时限"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="目的地"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center" width="110">
              <template>
                <el-dropdown split-button size="small">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 分配物流方式弹窗 -->
    <el-dialog
      title="分配物流方式"
      :visible.sync="logisticsModePop"
      width="30%"
    >
      <el-form label-width="100px">
        <el-form-item label="物流方式：">
          <el-select
            v-model="form.departmentPull"
            placeholder="请选择物流方式"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in replenishment"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logisticsModePop = false">取 消</el-button>
        <el-button type="primary" @click="logisticsModePop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑发货仓库弹窗 -->
    <el-dialog
      title="编辑发货方式"
      :visible.sync="editDeliveryModePop"
      width="30%"
    >
      <el-form label-width="100px">
        <el-form-item label="发货仓库：">
          <el-select
            v-model="form.departmentPull"
            placeholder="请选择发货仓库"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in replenishment"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDeliveryModePop = false">取 消</el-button>
        <el-button type="primary" @click="editDeliveryModePop = false"
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
      logisticsModePop: false, //分配物流方式弹窗
      editDeliveryModePop: false, //分配物流方式弹窗
      orderForm: "", //订单
      // 订单下拉
      orderFormDrop: [
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "待订单",
        },
        {
          id: 3,
          name: "待同步",
        },
      ],
      warehouse: "", //仓库
      // 仓库下拉
      warehouseDrop: [
        {
          id: 1,
          name: "仓库",
        },
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "包裹号",
        },
        {
          id: 2,
          name: "订单号",
        },
        {
          id: 3,
          name: "ASIN",
        },
        {
          id: 4,
          name: "MSKU",
        },
        {
          id: 5,
          name: "标题",
        },
        {
          id: 6,
          name: "品名",
        },
        {
          id: 7,
          name: "SKU",
        },
        {
          id: 8,
          name: "目的地",
        },
        {
          id: 9,
          name: "物流方式",
        },
      ],
      currentPage1: 1,
      value1: "",
      formInline: {},
      activeName: "first",
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
          id: "58259",
          area_id: "1",
          user_id: "277734",
          merchant_id: "A2H9VTZEEV3RMA",
          name: "Roaring Skate",
          shipment_id: "FBA15LLFLLP9",
          address_line1: "Room 3035 Building 4 Shenzhou Road NO.580",
          city: "Shanghai",
          state_or_province_code: "Shanghai",
          country_code: "CN",
          postal_code: "FENGXIAN",
          destination_fulfillment_center_id: "AVP1",
          shipment_status: "5",
          shipment_status_str: "DELETED",
          label_prep_type: "SELLER_LABEL",
          are_cases_required: "1",
          total_fee_currency_code: "",
          total_fee_currency_value: "0.00",
          fee_per_unit_currency_code: "",
          fee_per_unit_currency_value: "0.00",
          total_units: "0",
          box_contents_source: "",
          currency_code: "",
          total_freight: "0.00",
          sku_number: "3",
          send_quantity: "1836",
          receive_quantity: "0",
          created_on: "0",
          create_time: "1602165532",
          modified_time: "1602165568",
          channel_name: "tomotime_US",
          channel_id: "232990",
          site_id: "1",
          shop_url: "https://www.amazon.com/sp?seller=A2H9VTZEEV3RMA",
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
  methods: {
    // 分配物流方式弹窗
    logisticsMode() {
      this.logisticsModePop = true;
    },
    // 编辑发货仓库
    editDeliveryMode() {
      this.editDeliveryModePop = true;
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
  margin-bottom: 15px;
}
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  .table_button {
    margin-bottom: 10px;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>