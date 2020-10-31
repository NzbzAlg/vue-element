
<template>
  <div class="dispatchList">
    <!-- 搜索 -->
    <div class="title">
      <!-- 到货状态 -->
      <el-select
        v-model="goodState"
        placeholder="到货状态"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in goodStateDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 付款状态 -->
      <el-select
        v-model="paymentStatus"
        placeholder="付款状态"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in paymentStatusDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 采购仓库 -->
      <el-select
        v-model="warehouse"
        placeholder="采购仓库"
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
      <!-- 店铺 -->
      <el-select
        v-model="shop"
        placeholder="店铺"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in shopDrop"
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
        <el-tab-pane label="全部" name="first">
          <div class="table_button">
            <el-button type="primary" size="small" @click="addPurchaseOrder"
              >添加采购单</el-button
            >
            <el-button size="small">批量审核</el-button>
            <el-button size="small">批量下单</el-button>
            <el-button size="small">批量申请退款</el-button>
            <el-button size="small">批量结束到货</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="详情" type="expand" width="50">
              <template slot-scope="scope">
                <el-table :data="scope.row.children" border>
                  <el-table-column
                    prop="goodsSupId"
                    label="图片"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsOriginPrice"
                    label="品名/SKU"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsPrice"
                    label="店铺/FNSKU"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsType"
                    label="单价"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="采购量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="金额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="到货量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="待到货量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="待检量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="预计到货时间"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="SKU" label="操作" align="center">
                    <template>
                      <el-dropdown
                        split-button
                        size="small"
                        @click="detailList"
                      >
                        详情
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <span>审核</span>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <span>删除</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              prop="channel_name"
              label="计划单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="创建时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="供应商"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="总金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="采购员"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="备注"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="待下单" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="待到货" name="fourth">定时补偿</el-tab-pane>
        <el-tab-pane label="已完成" name="offStocks">定时补偿</el-tab-pane>
        <el-tab-pane label="已作废" name="voided">定时补偿</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="货件计划详情" :visible.sync="detailListPop" width="65%">
      <div class="PurchaseOrder">
        <div class="PurchaseOrder_title">
          <span>采购单号</span>
          <span>PP201023003</span>
          <span>待审核</span>
        </div>
        <el-steps
          :space="200"
          :active="1"
          finish-status="success"
          :align-center="true"
        >
          <el-step title="创建"></el-step>
          <el-step title="审核"></el-step>
          <el-step title="下单"></el-step>
          <el-step title="到货"></el-step>
          <el-step title="质检"></el-step>
          <el-step title="完成质检"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <div class="PurchaseOrder_content">
          <el-form label-width="100px">
            <el-col :span="8">
              <el-form-item label="采购仓库">
                <el-input disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商">
                <el-input disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算方式">
                <el-select
                  v-model="form.departmentPull"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="付款方式">
                <el-select
                  v-model="form.departmentPull"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购币种">
                <el-select
                  v-model="form.departmentPull"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="运费">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他费用">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="费用分配方式">
                <el-select
                  v-model="form.departmentPull"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item> </el-form-item>
            </el-col>
          </el-form>
        </div>
        <el-divider></el-divider>
        <div class="PurchaseOrder_footer">
          <p>
            <span @click="purchaseGood">
              <i class="el-icon-plus"></i>
              选择采购计划
            </span>
            <span @click="addGoods">
              <i class="el-icon-plus"></i>
              添加采购商品
            </span>
            <span @click="ImportLogistics">
              <i class="el-icon-plus"></i>
              导入采购商品
            </span>
            <span> 批量设置预计到货时间 </span>
          </p>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="计划编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="图片" align="center">
            </el-table-column>
            <el-table-column prop="address" label="品名/SKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="店铺" align="center">
            </el-table-column>
            <el-table-column prop="address" label="FNSKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="单箱数量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="采购量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="单价(￥)" align="center">
            </el-table-column>
            <el-table-column prop="address" label="含税" align="center">
            </el-table-column>
            <el-table-column prop="address" label="金额(￥)" align="center">
            </el-table-column>
            <el-table-column prop="address" label="预计到货时间" align="center">
            </el-table-column>
            <el-table-column prop="address" label="备注" align="center">
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailListPop = false">取 消</el-button>
        <el-button type="primary" @click="detailListPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 列表详情的添加商品弹窗 -->
    <el-dialog title="添加商品" :visible.sync="addGoodsPop" width="50%">
      <el-input
        placeholder="请输入MSKU、FNSKU搜索"
        style="width: 300px; margin-bottom: 10px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="MSKU/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="ASIN" align="center">
        </el-table-column>
        <el-table-column prop="address" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名/SKU" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsPop = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加采购单弹窗 -->
    <el-dialog
      title="添加采购单"
      :visible.sync="addPurchaseOrderPop"
      width="60%"
    >
      <div class="PurchaseOrder">
        <div class="PurchaseOrder_title">
          <span>采购单号</span>
          <span>PP201023003</span>
          <span>待审核</span>
        </div>
        <el-steps
          :space="200"
          :active="1"
          finish-status="success"
          :align-center="true"
        >
          <el-step title="创建"></el-step>
          <el-step title="审核"></el-step>
          <el-step title="下单"></el-step>
          <el-step title="到货"></el-step>
          <el-step title="质检"></el-step>
          <el-step title="完成质检"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <div class="PurchaseOrder_content">
          <el-form label-width="100px">
            <el-col :span="8">
              <el-form-item label="采购仓库">
                <el-input disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商">
                <el-input disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算方式">
                <el-select
                  v-model="form.departmentPull"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="付款方式">
                <el-select
                  v-model="form.departmentPull"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购币种">
                <el-select
                  v-model="form.departmentPull"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="运费">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他费用">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="费用分配方式">
                <el-select
                  v-model="form.departmentPull"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item> </el-form-item>
            </el-col>
          </el-form>
        </div>
        <el-divider></el-divider>
        <div class="PurchaseOrder_footer">
          <p>
            <span @click="purchaseGood">
              <i class="el-icon-plus"></i>
              选择采购计划
            </span>
            <span @click="addGoods">
              <i class="el-icon-plus"></i>
              添加采购商品
            </span>
            <span @click="ImportLogistics">
              <i class="el-icon-plus"></i>
              导入采购商品
            </span>
            <span> 批量设置预计到货时间 </span>
          </p>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="计划编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="图片" align="center">
            </el-table-column>
            <el-table-column prop="address" label="品名/SKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="店铺" align="center">
            </el-table-column>
            <el-table-column prop="address" label="FNSKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="单箱数量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="采购量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="单价(￥)" align="center">
            </el-table-column>
            <el-table-column prop="address" label="含税" align="center">
            </el-table-column>
            <el-table-column prop="address" label="金额(￥)" align="center">
            </el-table-column>
            <el-table-column prop="address" label="预计到货时间" align="center">
            </el-table-column>
            <el-table-column prop="address" label="备注" align="center">
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPurchaseOrderPop = false">取 消</el-button>
        <el-button type="primary" @click="addPurchaseOrderPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加采购计划 -->
    <el-dialog
      title="添加计划采购商品"
      :visible.sync="purchaseGoodPop"
      width="50%"
    >
      <el-input
        placeholder="请输入MSKU、FNSKU搜索"
        style="width: 300px; margin-bottom: 10px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="MSKU/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="ASIN" align="center">
        </el-table-column>
        <el-table-column prop="address" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名/SKU" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="purchaseGoodPop = false">取 消</el-button>
        <el-button type="primary" @click="purchaseGoodPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导入物流信息弹窗 -->
    <el-dialog
      title="导入采购商品"
      :visible.sync="ImportLogisticsPop"
      width="30%"
    >
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入物流信息</el-button>
          <span style="color: #006eff">下载模板</span>
        </div>
        <div class="import-info">
          <div>注意事项：</div>
          <p>支持导入格式为xlsx的文件</p>
          <p>模板中的表头不可更改，不可删除</p>
          <p>数据记录不要超过5000条</p>
          <p>发货单支持导入多个物流单</p>
          <p>同一发货单，物流商单号或跟踪号存在相同时覆盖该条物流信息</p>
          <p>Excel表中，同一发货单存在相同=物流商单号和跟踪号时取第一条记录</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImportLogisticsPop = false">取 消</el-button>
        <el-button type="primary" @click="ImportLogisticsPop = false"
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
      detailListPop: false, //详情弹窗
      addGoodsPop: false, //详情弹窗的添加商品
      addPurchaseOrderPop: false, //添加采购单弹窗
      purchaseGoodPop: false, //添加采购计划弹窗
      ImportLogisticsPop: false, //导入采购商品
      goodState: "", //到货状态
      // 到货状态下拉
      goodStateDrop: [
        {
          id: 1,
          name: "未到货",
        },
        {
          id: 2,
          name: "部门到货",
        },
        {
          id: 3,
          name: "全部到货",
        }
      ],
      paymentStatus: "", //付款状态
      //付款状态下拉
      paymentStatusDrop: [
        {
          id: 1,
          name: "未申请",
        },
        {
          id: 2,
          name: "已申请",
        },
        {
          id: 3,
          name: "部分付款",
        },
        {
          id: 4,
          name: "已付清",
        },
      ],
      warehouse:'',//采购仓库
      // 采购仓库下拉
      warehouseDrop:[
        {
          id:1,
          name:'采购仓库'
        }
      ],
      shop:'',//店铺
      // 店铺下拉
      shopDrop:[
        {
          id:1,
          name:'店铺'
        }
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "采购单号",
        },
        {
          id: 2,
          name: "供应商",
        },
        {
          id: 3,
          name: "采购员",
        },
        {
          id: 4,
          name: "品名",
        },
        {
          id: 5,
          name: "SKU",
        },
        {
          id: 6,
          name: "FNSKU",
        },
        {
          id: 7,
          name: "备注",
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
          channel_name: "tomotime_US",
          children: [
            {
              id: 1,
              number: 312412,
            },
          ],
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
    // 详情弹窗
    detailList() {
      this.detailListPop = true;
    },
    // 详情弹窗的添加商品
    addGoods() {
      this.addGoodsPop = true;
    },
    // 添加商品 - 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 添加采购单弹窗
    addPurchaseOrder() {
      this.addPurchaseOrderPop = true;
    },
    // 选择采购计划弹窗
    purchaseGood() {
      this.purchaseGoodPop = true;
    },
    // 导入物流信息
    ImportLogistics() {
      this.ImportLogisticsPop = true;
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
// 列表详情弹窗
.detailList {
  .detailList_title {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 15px;
    color: #000;
    span:nth-of-type(2) {
      padding-left: 10px;
    }
    span:nth-of-type(3) {
      color: #fff;
      height: 16px;
      line-height: 16px;
      border: none;
      background-color: #0abf5b;
      padding: 0 10px;
      font-size: 12px;
      display: inline-block;
      margin-left: 10px;
      border-radius: 2px;
    }
  }
  .basic-info {
    width: 100%;
    height: 155px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
  }
  .logisticsInformation {
    width: 100%;
    height: 155px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
    /deep/.el-select {
      width: 76px;
    }
  }
}
.logisticsTable {
  p {
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
  }
}
// 添加商品
.deliveryGoods {
  margin-bottom: 10px;
  span:nth-of-type(1) {
    font-weight: bold;
    color: #000;
    font-size: 14px;
  }
  span:nth-of-type(2) {
    padding-left: 10px;
    color: #338bff;
    cursor: pointer;
  }
}
// 添加采购单
.PurchaseOrder {
  .PurchaseOrder_title {
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 24px;
    color: #000;
    span:nth-of-type(2) {
      padding-left: 15px;
    }
    span:nth-of-type(3) {
      display: inline-block;
      padding: 0 10px;
      background-color: #0abf5b;
      color: #fff;
      height: 16px;
      line-height: 16px;
      border: none;
      margin-left: 15px;
      font-size: 12px;
      font-weight: 400;
    }
  }
  .PurchaseOrder_content {
    height: 250px;
  }
  .PurchaseOrder_footer {
    color: #006eff;
    p {
      margin-bottom: 20px;
      span {
        padding-right: 15px;
        cursor: pointer;
      }
    }
  }
}
// 导入物流信息
.ImportLogistics {
  .ImportLogistics_title {
    margin-top: 15px;
    span {
      padding-left: 35px;
    }
  }
  .import-info {
    font-size: 12px;
    padding: 14px;
    color: #003b80;
    margin-top: 20px;
    background-color: #e5f0ff;
    border: 1px solid #97c7ff;
    line-height: 16px;
    p {
      padding-left: 20px;
    }
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>