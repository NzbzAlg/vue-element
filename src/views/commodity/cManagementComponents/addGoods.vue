<template>
  <!-- 详情 -->
  <div class="addGoods">
    <el-dialog
      title="添加商品"
      :visible.sync="addGoodsPop"
      @close="$emit('update:addGoodsClose', false)"
      :before-close="handleClose"
      width="40%"
      :close-on-click-modal='false'
    >
      <div class="addGoods">
        <div class="addGoods_title">
          <div class="addGoodsTitle_img">
            <div>
              <input
                v-show="false"
                type="file"
                accept="image/*"
                @change="tirggerFile($event)"
                ref="input"
              />
              <div class="uploadImg" @click="openImg">
                <span v-if="imgUrl == ''">
                  <i
                    class="el-icon-plus"
                    style="font-size: 25px; color: #8c939d"
                  ></i>
                </span>
                <img
                  style="height: 100%; width: 100%"
                  v-if="imgUrl != ''"
                  :src="imgUrl"
                />
                <div class="mark" v-if="imgUrl != ''">
                  <i class="el-icon-check mark_item"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="addGoodsTitle_size">
            <el-form label-width="50px" :model="basicGoodsForm">
              <el-col :span="24">
                <el-form-item label="品名">
                  <el-input
                    placeholder="请输入"
                    v-model="basicGoodsForm.goods_name"
                    clearable
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="SKU">
                  <el-input
                    placeholder="请输入"
                    v-model="basicGoodsForm.goods_sku"
                    clearable
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>
        <div class="addGoodsTitle_content">
          <div class="addContent_title">
            <span
              @click="msg = 1"
              :class="['tabItem', msg == 1 ? 'tabItemActive' : '']"
              >基本</span
            >
            <span
              @click="msg = 2"
              :class="['tabItem', msg == 2 ? 'tabItemActive' : '']"
              >采购</span
            >
            <span
              @click="msg = 3"
              :class="['tabItem', msg == 3 ? 'tabItemActive' : '']"
              >物流</span
            >
          </div>
          <!-- 基本 -->
          <div class="basic" v-show="msg == 1">
            <el-form label-width="80px" :model="basicGoodsForm">
              <el-col :span="12">
                <el-form-item label="型号：">
                  <el-input
                    placeholder="请输入"
                    v-model="basicGoodsForm.goods_model"
                    clearable
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位">
                  <el-input
                    placeholder="请输入"
                    v-model="basicGoodsForm.goods_commodity"
                    clearable
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" :required="true">
                  <el-select
                    v-model="basicGoodsForm.goods_status"
                    placeholder="请选择状态"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in status"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类" :required="true">
                  <el-select
                    v-model="basicGoodsForm.goods_type"
                    placeholder="全部分类"
                    style="width: 100%"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in addBasicClassifyDrop"
                      :key="item.id"
                      :label="item.category_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="品牌" :required="true">
                  <el-select
                    v-model="basicGoodsForm.goods_brand"
                    placeholder="全部品牌"
                    style="width: 100%"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in addBasicBrandDrop"
                      :key="item.id"
                      :label="item.brand_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开发人" :required="true">
                  <el-select
                    v-model="basicGoodsForm.goods_developer"
                    placeholder="全部开发人"
                    style="width: 100%"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in developersDrop"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="商品描述">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入"
                    v-model="basicGoodsForm.desc"
                    clearable
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <!-- 采购 -->
          <div class="purchase" v-show="msg == 2">
            <div class="purchase_item">
              <div class="purchasingInformation">
                <p>采购信息</p>
                <el-form label-width="80px" :model="purchaseForm">
                  <el-col :span="12">
                    <el-form-item label="采购员">
                      <el-input
                        placeholder="请输入"
                        v-model="purchaseForm.purchase_buyer"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="采购交期">
                      <el-input
                        placeholder="请输入"
                        v-model="purchaseForm.purchase_deliverydate"
                        clearable
                      >
                        <template slot="append">天</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="采购成本">
                      <!-- <el-input
                        placeholder="CNY"
                        v-model="purchaseForm.purchase_cost"
                        clearable
                        style="width: 80px"
                      >
                      </el-input> -->
                      <el-input
                        placeholder="请输入"
                        v-model="purchaseForm.purchase_cost"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <div class="procurementRules">
                <p>采购规则</p>
                <el-form label-width="80px" :model="purchaseForm">
                  <el-col :span="24">
                    <el-form-item label="商品材质">
                      <el-input
                        placeholder="请输入"
                        v-model="purchaseForm.goods_material"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="单品规格">
                      <el-input
                        placeholder="长"
                        v-model="purchaseForm.goods_length"
                        clearable
                        style="width: 32%"
                      >
                      </el-input>
                      <el-input
                        placeholder="宽"
                        v-model="purchaseForm.goods_width"
                        clearable
                        style="width: 32%"
                      >
                      </el-input>
                      <el-input
                        placeholder="高"
                        v-model="purchaseForm.goods_height"
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
                        v-model="purchaseForm.goods_netweight"
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
                        v-model="purchaseForm.packing_length"
                        clearable
                        style="width: 32%"
                      >
                      </el-input>
                      <el-input
                        placeholder="宽"
                        v-model="purchaseForm.packing_width"
                        clearable
                        style="width: 32%"
                      >
                      </el-input>
                      <el-input
                        placeholder="高"
                        v-model="purchaseForm.packing_height"
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
                        v-model="purchaseForm.goods_grossweight"
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
                        v-model="purchaseForm.box_length"
                        clearable
                        style="width: 32%"
                      >
                      </el-input>
                      <el-input
                        placeholder="宽"
                        v-model="purchaseForm.box_wight"
                        clearable
                        style="width: 32%"
                      >
                      </el-input>
                      <el-input
                        placeholder="高"
                        v-model="purchaseForm.box_height"
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
                        v-model="purchaseForm.box_weight"
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
                        v-model="purchaseForm.number"
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
                  :data="supplierTable"
                  border
                  style="width: 100%; margin-top: 10px"
                >
                  <el-table-column
                    prop="supplier_name"
                    label="供应商名称"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column label="最小采购量" align="center">
                    <template slot-scope="scope">
                      <el-input
                        size="medium"
                        v-model="scope.row.minimumOrder"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="采购单价(CNY)" align="center">
                    <template slot-scope="scope">
                      <el-input
                        size="medium "
                        v-model="scope.row.CNY"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="采购单价(USD)" align="center">
                    <template slot-scope="scope">
                      <el-input
                        size="medium "
                        v-model="scope.row.SUD"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="采购链接" align="center">
                    <template slot-scope="scope">
                      <el-input
                        size="medium "
                        v-model="scope.row.purchaseLink"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="首选供应商" align="center">
                    <template slot-scope="scope">
                      <div @click="preferredSupplierEvent">
                        <el-checkbox
                          v-model="scope.row.preferredSupplier"
                        ></el-checkbox>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="操作" align="center">
                    <template slot-scope="scope">
                      <span
                        style="color: #66b1ff; cursor: pointer"
                        @click="supplierRemove(scope.$index, scope.row)"
                        >移除</span
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <!-- 物流 -->
          <div class="logistics" v-show="msg == 3">
            <div class="logistics_item">
              <el-form label-width="90px" :model="logisticsForm">
                <el-col :span="12">
                  <el-form-item label="申报单价">
                    <!-- <el-input
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
                    </el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="中文报关名">
                    <el-input
                      placeholder="请输入"
                      v-model="logisticsForm.declaration_cnname"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="英文报关名">
                    <el-input
                      placeholder="请输入"
                      v-model="logisticsForm.declaration_enname"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-table
                  :data="addCountryList"
                  height="350"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    prop="countryname"
                    label="国家"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="默认头程费用(含税)"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.headOf" size="medium">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="HS Code"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input
                        size="medium"
                        v-model="scope.row.hsCode"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="税率" align="center">
                    <template slot-scope="scope">
                      <el-input
                        size="medium"
                        v-model="scope.row.taxRate"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="首选国家" align="center">
                    <template slot-scope="scope">
                      <div @click="preferredCountryEvent">
                        <el-checkbox
                          v-model="scope.row.preferredCountry"
                        ></el-checkbox>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClose">取 消</el-button>
        <el-button type="primary" @click="addGoodsConfirm">确 定</el-button>
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
        v-model="supplierName"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="supplierSearch"
        ></el-button>
      </el-input>
      <el-table
        :data="associatedTable"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSupplierChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="supplier_name" label="供应商名称" align="center">
        </el-table-column>
        <el-table-column prop="supplier_contacts" label="联系人" align="center">
        </el-table-column>
        <el-table-column
          prop="supplier_contactsnumber"
          label="联系电话"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center">
        </el-table-column>
      </el-table>
      <pagination
        :page="page"
        :total="total"
        :limit="limit"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="associatedSupplierpop = false">取 消</el-button>
        <el-button type="primary" @click="associatedSupplierConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/pagination"; // 分页
export default {
  components: {
    pagination,
  },
  data() {
    return {
      radioDisbale: false,
      check_radio: "",
      msg: 1,
      addGoodsPop: this.addGoodsClose,
      associatedSupplierpop: false, //关联供应商弹窗
      imgUrl: "", //图片路径
      // 基本信息 - 状态
      status: [
        {
          id: 1,
          name: "启用",
        },
        {
          id: 2,
          name: "禁用",
        },
      ],
      // 基本
      basicGoodsForm: {},
      // 采购
      purchaseForm: {},
      // 物流
      logisticsForm: {},
      addBasicBrandDrop: [], //品牌
      addBasicClassifyDrop: [], //分类
      developersDrop: [], //开发人
      addCountryList: [], //国家
      tableData: [],
      nationalLogistics: [], //物流 - 国家列表
      associatedTable: [], //关联供应商列表
      supplierName: "", //关联供应商搜索
      supplierTable: [
        {
          minimumOrder: "0",
          CNY: "0",
          SUD: "0",
          purchaseLink: "0",
          preferredSupplier: false,
        },
      ], //供应商列表
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  props: {
    addGoodsClose: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    addGoodsClose() {
      this.addGoodsPop = this.addGoodsClose;
    },
  },
  methods: {
    tirggerFile: function (e) {
      console.log(e.target.files[0]);
      let file = event.target.files[0];
      this.file = event.target.files[0];
      let url = "";
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onload = function (e) {
        url = this.result.substring(this.result.indexOf(",") + 1);
        that.imgUrl = "data:image/png;base64," + url;
      };
    },
    openImg() {
      this.$refs.input.click();
    },
    // 添加商品弹窗
    addMerchandise() {
      this.$http.get(`goods/new_good_data`).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.addBasicClassifyDrop = res.data.data.category; //分类
          this.addBasicBrandDrop = res.data.data.brand; //品牌
          this.developersDrop = res.data.data.goods_developer; //开发人
          this.addCountryList = res.data.data.country; //国家
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 弹窗确定
    addGoodsConfirm() {
      let info = new FormData();
      info.append("is_combined", 1); //添加商品
      info.append("img", this.file); //图片
      info.append("goods_name", this.basicGoodsForm.goods_name); //品名
      info.append("goods_sku", this.basicGoodsForm.goods_sku); //SKU
      info.append("goods_model", this.basicGoodsForm.goods_model); //型号
      info.append("goods_commodity", this.basicGoodsForm.goods_commodity); //单位
      info.append("goods_status", this.basicGoodsForm.goods_status); //状态
      info.append("goods_type", this.basicGoodsForm.goods_type); //分类
      info.append("goods_brand", this.basicGoodsForm.goods_brand); //品牌
      info.append("goods_developer", this.basicGoodsForm.goods_developer); //开发人
      info.append("desc", this.basicGoodsForm.desc); //描述

      info.append("purchase_buyer", this.purchaseForm.purchase_buyer); //采购员
      info.append(
        "purchase_deliverydate",
        this.purchaseForm.purchase_deliverydate
      ); //采购交期
      info.append("purchase_cost", this.purchaseForm.purchase_cost); //采购成本
      info.append("goods_material", this.purchaseForm.goods_material); //商品材质
      info.append("goods_length", this.purchaseForm.goods_length); //单品规格长
      info.append("goods_width", this.purchaseForm.goods_width); //单品规格宽
      info.append("goods_height", this.purchaseForm.goods_height); //单品规格高
      info.append("goods_netweight", this.purchaseForm.goods_netweight); //单品净重
      info.append("packing_length", this.purchaseForm.packing_length); //包装规则长
      info.append("packing_width", this.purchaseForm.packing_width); //包装规则宽
      info.append("packing_height", this.purchaseForm.packing_height); //包装规则高
      info.append("goods_grossweight", this.purchaseForm.goods_grossweight); //单品毛重
      info.append("box_length", this.purchaseForm.box_length); //箱规长
      info.append("box_wight", this.purchaseForm.box_wight); //箱规宽
      info.append("box_height", this.purchaseForm.box_height); //箱规高
      info.append("box_weight", this.purchaseForm.box_weight); //单箱重量
      info.append("number", this.purchaseForm.number); //单箱数量
      info.append("goods_supplier", JSON.stringify(this.supplierTable)); //供应商

      info.append("declaration_cnname", this.logisticsForm.declaration_cnname); //中文报关名
      info.append("declaration_enname", this.logisticsForm.declaration_enname); //英文报关名
      info.append("logistics_details", JSON.stringify(this.addCountryList)); //国家
      this.$http.post(`goods/update_goods_detail`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.$message.success(res.data.message);
          this.$emit("update:addGoodsClose", false);
          this.$parent.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 关联供应商弹窗
    associatedSupplier() {
      this.associatedSupplierpop = true;
      this.$http
        .get(`goods/get_supplier_list`, {
          params: {
            page: this.page,
            limit: this.limit,
            name: this.supplierName,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.associatedTable = res.data.data;
            this.total = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 关联供应商弹窗搜索
    supplierSearch() {
      this.page = 1;
      this.associatedSupplier();
    },
    // 关联供应商弹窗选择
    handleSupplierChange(val) {
      this.multipleSelection = val;
      this.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        if (this.multipleSelection.indexOf(val[i].id) === -1) {
          this.multipleSelection.push(val[i].id);
        }
      }
    },
    // 关联供应商确定
    associatedSupplierConfirm() {
      this.$http
        .get(`goods/get_one_supplier`, {
          params: {
            id: this.multipleSelection,
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.$message.success(res.data.message);
            this.associatedSupplierpop = false;
            this.supplierTable = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 关联供应商首选按钮
    preferredSupplierEvent(row) {
      this.supplierTable.forEach((item) => {
        if (item.id !== row.id) {
          item.preferredSupplier = false;
        } else {
          item.preferredSupplier = true;
        }
      });
    },
    // 供应商移除
    supplierRemove(index, row) {
      this.supplierTable.splice(index, 1);
    },
    // 首选国家按钮
    preferredCountryEvent(row) {
      this.addCountryList.forEach((item) => {
        if (item.id !== row.id) {
          item.preferredCountry = false;
        } else {
          item.preferredCountry = true;
        }
      });
    },
    // 分页下拉
    handleCurrentChange(val) {
      this.page = val;
      this.associatedSupplier();
    },
    // 分页右滚
    handleSizeChange(val) {
      this.limit = val;
      this.page = 1;
      this.associatedSupplier();
    },
    // 右上角X号
    handleClose(done) {
      this.msg = 1;
      done();
    },
    // 弹窗取消
    cancelClose() {
      this.msg = 1;
      this.addGoodsPop = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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
      .uploadImg {
        width: 100px;
        height: 100px;
        border: 1px dashed #8c939d;
        text-align: center;
        line-height: 100px;
        border-radius: 10px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 10px;
        }
        .mark {
          position: absolute;
          top: 0px;
          right: 0;
          z-index: 1;
          display: inline-block;
          border: 15px solid #67c23a;
          height: 0;
          width: 0;
          border-left-color: transparent;
          border-bottom-color: transparent;
          border-top-right-radius: 10px;
          .mark_item {
            position: absolute;
            top: -15px;
            right: -12px;
            z-index: 2;
            color: #fff;
          }
        }
      }
      .uploadImg:hover {
        width: 100px;
        height: 100px;
        border: 1px dashed #409eff;
        text-align: center;
        line-height: 100px;
        cursor: pointer;
        border-radius: 10px;
      }
    }
    .addGoodsTitle_size {
      width: 85%;
      height: 100%;
    }
  }
  .addGoodsTitle_content {
    position: relative;
    .addContent_title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      border-bottom: 2px solid #e4e7ed;
      .tabItem {
        display: inline-block;
        cursor: pointer;
        margin-left: 30px;
      }
      .tabItemActive {
        display: inline-block;
        color: #409eff;
        border-bottom: 2px solid #409eff;
      }
      .tabItem:nth-of-type(1) {
        margin-left: 0px;
      }
    }
    // 基本
    .basic {
      margin-top: 20px;
    }
    // 采购
    .purchase {
      margin-top: 20px;
      .purchase_item {
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
    // 物流
    .logistics {
      margin-top: 20px;
    }
  }
}
</style>