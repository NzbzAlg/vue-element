
<template>
  <div class="commodityManagement">
    <!-- 搜索 -->
    <div class="title">
      <!-- 商品类型 -->
      <el-select
        v-model="commodityType"
        placeholder="商品类型"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in commodityTypeDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 分类 -->
      <el-select
        v-model="classify"
        placeholder="分类"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in classifyDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 品牌 -->
      <el-select
        v-model="brand"
        placeholder="品牌"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in brandDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 状态 -->
      <el-select
        v-model="state"
        placeholder="状态"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in stateDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
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
      <div class="table_button">
        <el-button type="primary" size="small" @click="addGoods"
          >添加商品</el-button
        >
        <el-button size="small" @click="addGoodsJoint">添加组合商品</el-button>
        <!-- <el-dropdown
          size="small"
          split-button
          trigger="click"
          style="margin-left: 10px"
        >
          导入商品
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span>导入组合商品</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span>导入更新商品</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span>导入关联供应商</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          size="small"
          split-button
          trigger="click"
          style="margin-left: 10px"
        >
          批量编辑
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span>批量删除</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span>批量删除图片</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span>批量同步listing图片</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <el-button size="small" style="margin-left: 10px" @click="brandLabel"
          >打印标签</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="number"
          label="图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="图片/SKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="分类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购成本"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="默认头程费用"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="供应商"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="交期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="操作" align="center">
          <template>
            <el-dropdown
              size="small"
              split-button
              trigger="click"
              @click="addGoods"
            >
              详情
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span>打印标签</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span>删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加商品弹窗 -->
    <el-dialog title="添加商品" :visible.sync="addGoodsPop" width="40%">
      <div class="addGoods">
        <div class="addGoods_title">
          <div class="addGoodsTitle_img">
            <img
              src="https://m.media-amazon.com/images/I/41+ds5YaSIL._SL75_.jpg"
              alt=""
            />
          </div>
          <div class="addGoodsTitle_size">
            <el-form label-width="50px">
              <el-col :span="24">
                <el-form-item label="品名">
                  <el-input placeholder="请输入" v-model="form.name" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="SKU">
                  <el-input placeholder="请输入" v-model="form.name" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>
        <div class="addGoodsTitle_content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本" name="first">
              <el-form label-width="80px">
                <el-col :span="12">
                  <el-form-item label="型号：">
                    <el-input
                      placeholder="请输入"
                      v-model="form.name"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="单位">
                    <el-input
                      placeholder="请输入"
                      v-model="form.name"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态">
                    <el-select
                      v-model="form.departmentPull"
                      placeholder="请选择状态"
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
                <el-col :span="12">
                  <el-form-item label="分类">
                    <el-select
                      v-model="form.departmentPull"
                      placeholder="全部分类"
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
                <el-col :span="12">
                  <el-form-item label="品牌">
                    <el-select
                      v-model="form.departmentPull"
                      placeholder="全部品牌"
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
                <el-col :span="12">
                  <el-form-item label="开发人">
                    <el-input
                      placeholder="请输入"
                      v-model="form.name"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="商品描述">
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入"
                      v-model="form.name"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="采购" name="second">
              <div class="purchase">
                <div class="purchasingInformation">
                  <p>采购信息</p>
                  <el-form label-width="80px">
                    <el-col :span="12">
                      <el-form-item label="采购员">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="采购交期">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">天</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="采购成本">
                        <el-input
                          placeholder="CNY"
                          v-model="form.name"
                          clearable
                          style="width: 80px"
                        >
                        </el-input>
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                          style="width: 200px"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </div>
                <div class="procurementRules">
                  <p>采购规则</p>
                  <el-form label-width="80px">
                    <el-col :span="24">
                      <el-form-item label="商品材质">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单品规格">
                        <el-input
                          placeholder="长"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="宽"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="高"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                          <template slot="append">cm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单品净重">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">g</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="包装规格">
                        <el-input
                          placeholder="长"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="宽"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="高"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                          <template slot="append">cm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单品毛重">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">g</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="箱规">
                        <el-input
                          placeholder="长"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="宽"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="高"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                          <template slot="append">cm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单箱重量">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">kg</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单箱数量">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">g</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </div>
                <div class="supplier">
                  <p>
                    <span>供应商</span>
                    <span @click="associatedSupplier">
                      <i class="el-icon-plus"></i>
                      关联供应商
                    </span>
                  </p>
                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%; margin-top: 10px"
                  >
                    <el-table-column
                      prop="date"
                      label="供应商名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="最小采购量"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="采购单价(CNY)"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="采购单价(USD)"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="采购链接"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="首选供应商"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="address" label="操作" align="center">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="物流" name="third">
              <div class="logistics">
                <el-form label-width="90px">
                  <el-col :span="12">
                    <el-form-item label="申报单价">
                      <el-input
                        placeholder="请输入内容"
                        v-model="form.name"
                        class="input-with-select"
                      >
                        <el-select
                          v-model="form.name"
                          slot="prepend"
                          placeholder="请选择"
                          style="width: 90px"
                        >
                          <el-option label="餐厅名" value="1"></el-option>
                          <el-option label="订单号" value="2"></el-option>
                          <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="中文报关名">
                      <el-input
                        placeholder="请输入"
                        v-model="form.name"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="英文报关名">
                      <el-input
                        placeholder="请输入"
                        v-model="form.name"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-table
                    :data="logisticsTableData"
                    height="250"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="country" label="国家" align="center">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="默认头程费用(含税)"
                      align="center"
                      width="240"
                    >
                      <template slot-scope="scope" v-if="scope.row.id != 1">
                        <el-input
                          placeholder="请输入内容"
                          v-model="input3"
                          class="input-with-select"
                          size="small"
                        >
                          <el-select
                            v-model="select"
                            slot="prepend"
                            style="width:85px"
                            
                          >
                            <el-option label="CNY" value="1"></el-option>
                            <el-option label="USD" value="2"></el-option>
                            <el-option label="EUR" value="3"></el-option>
                          </el-select>
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="HS Code"
                      align="center"
                    >
                      <template>
                        <el-input size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="税率" align="center">
                      <template slot-scope="scope" v-if="scope.row.id !=1">
                        <el-input size="small"></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsPop = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 关联供应商弹窗 -->
    <el-dialog
      title="选择供应商"
      :visible.sync="associatedSupplierpop"
      width="40%"
    >
      <el-input
        placeholder="请输入供应商搜索"
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
        <el-table-column prop="date" label="供应商名称" align="center">
        </el-table-column>
        <el-table-column prop="name" label="联系人" align="center">
        </el-table-column>
        <el-table-column prop="address" label="联系电话" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="associatedSupplierpop = false">取 消</el-button>
        <el-button type="primary" @click="associatedSupplierpop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加组合商品弹窗 -->
    <el-dialog
      title="添加组合商品"
      :visible.sync="addGoodsJointPop"
      width="40%"
    >
      <div class="addGoods">
        <div class="addGoods_title">
          <div class="addGoodsTitle_img">
            <img
              src="https://m.media-amazon.com/images/I/41+ds5YaSIL._SL75_.jpg"
              alt=""
            />
          </div>
          <div class="addGoodsTitle_size">
            <el-form label-width="50px">
              <el-col :span="24">
                <el-form-item label="品名">
                  <el-input placeholder="请输入" v-model="form.name" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="SKU">
                  <el-input placeholder="请输入" v-model="form.name" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>
        <div class="addGoodsTitle_content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本" name="first">
              <el-form label-width="80px">
                <el-col :span="12">
                  <el-form-item label="型号：">
                    <el-input
                      placeholder="请输入"
                      v-model="form.name"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="单位">
                    <el-input
                      placeholder="请输入"
                      v-model="form.name"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态">
                    <el-select
                      v-model="form.departmentPull"
                      placeholder="请选择状态"
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
                <el-col :span="12">
                  <el-form-item label="分类">
                    <el-select
                      v-model="form.departmentPull"
                      placeholder="全部分类"
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
                <el-col :span="12">
                  <el-form-item label="品牌">
                    <el-select
                      v-model="form.departmentPull"
                      placeholder="全部品牌"
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
                <el-col :span="12">
                  <el-form-item label="开发人">
                    <el-input
                      placeholder="请输入"
                      v-model="form.name"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="商品描述">
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入"
                      v-model="form.name"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-form>
              <div class="containsGoods">
                <p>
                  <span>包含商品</span>
                  <span @click="addContains">
                    <i class="el-icon-plus"></i>
                    添加商品
                  </span>
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="采购" name="second">
              <div class="purchase">
                <div class="purchasingInformation">
                  <p>采购信息</p>
                  <el-form label-width="80px">
                    <el-col :span="12">
                      <el-form-item label="采购员">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="采购交期">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">天</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="采购成本">
                        <el-input
                          placeholder="CNY"
                          v-model="form.name"
                          clearable
                          style="width: 80px"
                        >
                        </el-input>
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                          style="width: 200px"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </div>
                <div class="procurementRules">
                  <p>采购规则</p>
                  <el-form label-width="80px">
                    <el-col :span="24">
                      <el-form-item label="商品材质">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单品规格">
                        <el-input
                          placeholder="长"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="宽"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="高"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                          <template slot="append">cm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单品净重">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">g</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="包装规格">
                        <el-input
                          placeholder="长"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="宽"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="高"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                          <template slot="append">cm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单品毛重">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">g</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="箱规">
                        <el-input
                          placeholder="长"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="宽"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                        </el-input>
                        <el-input
                          placeholder="高"
                          v-model="form.name"
                          clearable
                          style="width: 32%"
                        >
                          <template slot="append">cm</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单箱重量">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">kg</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="单箱数量">
                        <el-input
                          placeholder="请输入"
                          v-model="form.name"
                          clearable
                        >
                          <template slot="append">g</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </div>
                <div class="supplier">
                  <p>
                    <span>供应商</span>
                    <span @click="associatedSupplier">
                      <i class="el-icon-plus"></i>
                      关联供应商
                    </span>
                  </p>
                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%; margin-top: 10px"
                  >
                    <el-table-column
                      prop="date"
                      label="供应商名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="最小采购量"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="采购单价(CNY)"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="采购单价(USD)"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="采购链接"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="首选供应商"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="address" label="操作" align="center">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="物流" name="third">
              <div class="logistics">
                <el-form label-width="90px">
                  <el-col :span="12">
                    <el-form-item label="申报单价">
                      <el-input
                        placeholder="请输入内容"
                        v-model="form.name"
                        class="input-with-select"
                      >
                        <el-select
                          v-model="form.name"
                          slot="prepend"
                          placeholder="请选择"
                          style="width: 90px"
                        >
                          <el-option label="餐厅名" value="1"></el-option>
                          <el-option label="订单号" value="2"></el-option>
                          <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="中文报关名">
                      <el-input
                        placeholder="请输入"
                        v-model="form.name"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="英文报关名">
                      <el-input
                        placeholder="请输入"
                        v-model="form.name"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-table
                    :data="tableData"
                    height="250"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="date" label="国家" align="center">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="默认头程费用(含税)"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="HS Code"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="address" label="税率" align="center">
                    </el-table-column>
                  </el-table>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsJointPop = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsJointPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加商品弹窗 -->
    <el-dialog title="选择商品" :visible.sync="addContainsPop" width="40%">
      <el-input
        placeholder="请输入品名/SKU搜索"
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
        <el-table-column prop="name" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="分类" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品牌" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addContainsPop = false">取 消</el-button>
        <el-button type="primary" @click="addContainsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 打印标签  -->
    <el-dialog title="打印标签" :visible.sync="brandLabelPop" width="45%">
      <div class="brandLabel">
        <div class="operate-section">
          <span>设定统一打印量</span>
          <el-input style="width: 135px" placeholder="请输入"></el-input>
        </div>
        <div class="operate-table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="图片" align="center">
            </el-table-column>
            <el-table-column prop="name" label="品名/SKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="打印" align="center">
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="brandLabelPop = false">取 消</el-button>
        <el-button type="primary" @click="brandLabelPop = false"
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
      input3:'',
      select:'',
      addGoodsPop: false, //添加商品弹窗
      associatedSupplierpop: false, //关联供应商弹窗
      addGoodsJointPop: false, //添加组合商品弹窗
      addContainsPop: false, //添加商品弹窗
      brandLabelPop: false, //打印标签弹窗
      commodityType: "", //商品类型
      // 商品类型下拉
      commodityTypeDrop: [
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "普通商品",
        },
        {
          id: 3,
          name: "组合商品",
        },
      ],
      date: "", //日期
      classify: "", //分类
      //分类下拉
      classifyDrop: [
        {
          id: 1,
          name: "分类",
        },
      ],
      brand: "", //品牌
      //品牌下拉
      brandDrop: [
        {
          id: 1,
          name: "品牌",
        },
      ],
      state: "", //状态
      //状态下拉
      stateDrop: [
        {
          id: 1,
          name: "状态",
        },
      ],
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "SKU",
        },
        {
          id: 2,
          name: "品名",
        },
        {
          id: 3,
          name: "开发人",
        },
        {
          id: 4,
          name: "采购员",
        },
        {
          id: 5,
          name: "供应商",
        },
      ],
      logisticsTableData: [
        {
          id: 1,
          country: "中国",
        },
        {
          id: 2,
          country: "美国",
        },
      ], //物流列表
      activeName: "first",
      currentPage1: 1,
      disabled: false,
      checked: false,
      radio: 3,
      form: {
        name: "",
      },
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
          id: 1,
          number: 2,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    // 添加商品弹窗
    addGoods() {
      this.addGoodsPop = true;
    },
    // 关联供应商弹窗
    associatedSupplier() {
      console.log(1);
      this.associatedSupplierpop = true;
    },
    // 添加组合商品弹窗
    addGoodsJoint() {
      this.addGoodsJointPop = true;
    },
    // 添加商品弹窗
    addContains() {
      this.addContainsPop = true;
    },
    // 打印标签弹窗
    brandLabel() {
      this.brandLabelPop = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  .table_button {
    margin-bottom: 10px;
  }
}
// 添加弹窗
.addGoods {
  .addGoods_title {
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .addGoodsTitle_img {
      width: 15%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .addGoodsTitle_size {
      width: 85%;
      height: 100%;
    }
  }
  .addGoodsTitle_content {
    margin-top: 15px;
    // 添加组合商品的包含商品
    .containsGoods {
      p {
        span:nth-of-type(1) {
          color: rgb(51, 51, 51);
          font-weight: 600;
          font-size: 14px;
        }
        span:nth-of-type(2) {
          color: rgb(72, 125, 240);
          padding-left: 10px;
          cursor: pointer;
        }
      }
    }
    .purchase {
      // 采购信息
      .purchasingInformation {
        height: 145px;
        p {
          color: rgb(51, 51, 51);
          font-weight: 600;
          font-size: 14px;
        }
      }
      // 采购规则
      .procurementRules {
        height: 335px;
        p {
          color: rgb(51, 51, 51);
          font-weight: 600;
          font-size: 14px;
        }
        /deep/.el-input-group__append,
        .el-input-group__prepend {
          padding: 0;
        }
      }
      // 供应商
      .supplier {
        span:nth-of-type(1) {
          color: rgb(51, 51, 51);
          font-weight: 600;
          font-size: 14px;
        }
        span:nth-of-type(2) {
          color: rgb(72, 125, 240);
          padding-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
// 打印标签
.brandLabel {
  .operate-section {
    width: 100%;
    height: 60px;
    background: #fafafa;
    border: 1px solid #ddd;
    line-height: 60px;
    span {
      padding: 0 15px;
    }
  }
  .operate-table {
    margin-top: 15px;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>