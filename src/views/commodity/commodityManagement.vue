
<template>
  <div class="commodityManagement">
    <!-- 搜索 -->
    <div class="title">
      <!-- 商品类型 -->
      <!-- <el-select
        v-model="commodityType"
        placeholder="商品类型"
        clearable
        filterable
        size="medium"
        style="width: 150px"
        @change="changeSearch"
      >
        <el-option
          v-for="item in commodityTypeDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select> -->
      <!-- 分类 -->
      <el-select
        v-model="classify"
        placeholder="分类"
        clearable
        filterable
        multiple
        size="medium"
        style="width: 160px"
        @visible-change="multipleSearch($event)"
        @remove-tag="clearChageSearch"
      >
        <el-option
          v-for="item in classifyDrop"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 品牌 -->
      <el-select
        v-model="brand"
        placeholder="品牌"
        clearable
        filterable
        multiple
        size="medium"
        style="width: 160px; margin-left: 10px"
        @visible-change="multipleSearch($event)"
        @remove-tag="clearChageSearch"
      >
        <el-option
          v-for="item in brandDrop"
          :key="item.id"
          :label="item.brand_name"
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
        style="width: 160px; margin-left: 10px"
        @change="changeSearch"
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
        clearable
        @keyup.enter.native="changeSearch"
        @clear="clearChageSearch"
      >
        <el-select
          v-model="multipleDrop"
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
      <!-- <el-button
        type="primary"
        size="medium"
        style="margin-left: 10px"
        @click="grabble"
        >搜索</el-button
      > -->
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <el-button type="primary" size="small" @click="addGoods"
          >添加商品</el-button
        >
        <!-- <el-button size="small" @click="addGoodsJoint">添加组合商品</el-button> -->
        <el-button size="small" @click="exportExcel">导出</el-button>
        <!-- <el-button size="small" style="margin-left: 10px" @click="brandLabel"
          >打印标签</el-button
        > -->
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="620"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="number" label="图片" align="center" width="80">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <el-image
                slot="reference"
                :src="$store.state.url + scope.row.img"
                :alt="$store.state.url + scope.row.img"
                style="width: 50px; height: 50px"
              ></el-image>
              <el-image
                :src="$store.state.url + scope.row.img"
                style="max-height: 200px; max-width: 200px"
              ></el-image>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="品名/SKU"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_name }}</span>
            <br />
            <span>{{ scope.row.goods_sku }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="分类"
          align="center"
        ></el-table-column>
        <el-table-column label="采购成本" align="center" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.purchase_cost != null"
              >￥{{ scope.row.purchase_cost }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="headOf"
          label="默认头程费用"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="supplier_name"
          label="供应商"
          align="center"
          width="210"
        ></el-table-column>
        <el-table-column label="交期" align="center" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.purchase_deliverydate"
              >{{ scope.row.purchase_deliverydate }}天</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="goods_status"
          label="状态"
          align="center"
          width="80"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.goods_status == 1">可售</span>
            <span v-if="scope.row.goods_status == 2">不可售</span>
          </template>
        </el-table-column>
        <el-table-column prop="goods_status" label="类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_combined == 1">普通商品</span>
            <span v-if="scope.row.is_combined == 2">组合商品</span>
          </template>
        </el-table-column>
        <el-table-column prop="SKU" label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-dropdown
              size="small"
              split-button
              trigger="click"
              @click="details(scope.row)"
            >
              详情
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span>删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
            <el-button size="small" @click="details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <!-- 添加商品 -->
    <AddGoods :addGoodsClose.sync="addGoodsClose" ref="addGoodsChild" />
    <!-- 添加组合商品 -->
    <AddGoodsJoint
      :addGoodsJointClose.sync="addGoodsJointClose"
      ref="addGoodsJointChild"
    />
    <!-- 详情 -->
    <Details
      :detailsClose.sync="detailsClose"
      :isCombined.sync="isCombined"
      ref="detailsChild"
    />
    <!-- 分页 -->
    <pagination
      :page="page"
      :total="total"
      :limit="limit"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import pagination from "@/components/pagination"; // 分页
import Details from "./cManagementComponents/details"; // 详情
import AddGoods from "./cManagementComponents/addGoods"; // 添加商品
import AddGoodsJoint from "./cManagementComponents/addGoodsJoint"; // 添加组合商品
export default {
  components: {
    pagination,
    Details,
    AddGoods,
    AddGoodsJoint,
  },
  data() {
    return {
      loading: true,
      addGoodsClose: false, //添加商品弹窗关闭
      detailsClose: false, //详情弹窗关闭
      addGoodsJointClose: false, //添加组合商品弹窗关闭
      addGoodsJointPop: false, //添加组合商品弹窗
      brandLabelPop: false, //打印标签弹窗
      commodityType: "", //商品类型
      // 商品类型下拉
      commodityTypeDrop: [
        {
          id: 1,
          name: "普通商品",
        },
        {
          id: 2,
          name: "组合商品",
        },
      ],
      date: "", //日期
      classify: [], //分类
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
          name: "可售",
        },
        {
          id: 2,
          name: "不可售",
        },
      ],
      searchContent: "", //搜索
      multipleDrop: 1, //多个下拉值
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
      tableData: [], //列表数据
      page: 1,
      limit: 10,
      total: 0,
      id: "",
      isCombined: "",
      imgUrl: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 添加商品弹窗
    addGoods() {
      this.addGoodsClose = true;
      this.$refs.addGoodsChild.addMerchandise();
    },
    // 添加组合商品弹窗
    addGoodsJoint() {
      this.addGoodsJointClose = true;
      this.$refs.addGoodsJointChild.addMultiple();
    },
    // 导出
    exportExcel() {
      this.loading = true;
      this.$http
        .get(`goods/export_goods_excel`, {
          params: {
            page: this.page,
            limit: this.limit,
            is_combined: this.commodityType, //商品类型
            goods_type: JSON.stringify(this.classify), //分类
            goods_brand: JSON.stringify(this.brand), //品牌
            goods_status: this.state, //状态
            goods_sku: this.multipleDrop == 1 ? this.searchContent : "", //SKU
            goods_name: this.multipleDrop == 2 ? this.searchContent : "", //品名
            goods_developer: this.multipleDrop == 3 ? this.searchContent : "", //开发人
            purchase_buyer: this.multipleDrop == 4 ? this.searchContent : "", //采购员
            goods_supplier: this.multipleDrop == 5 ? this.searchContent : "", //供应商
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.loading = false;
            this.uploadUrl = res.data.data;
            window.location.href = "http://" + this.uploadUrl;
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 详情
    details(row) {
      this.$store.commit("Allid/setPrint", {
        //商品管理详情id
        commodityId: row.id,
      });
      this.isCombined = row.is_combined.toString();
      this.detailsClose = true;
      this.$refs.detailsChild.clickTab();
    },
    // 列表数据
    getList() {
      this.$http
        .get(`goods/goods_list`, {
          params: {
            page: this.page,
            limit: this.limit,
            is_combined: this.commodityType, //商品类型
            goods_type: JSON.stringify(this.classify), //分类
            goods_brand: JSON.stringify(this.brand), //品牌
            goods_status: this.state, //状态
            goods_sku: this.multipleDrop == 1 ? this.searchContent : "", //SKU
            goods_name: this.multipleDrop == 2 ? this.searchContent : "", //品名
            goods_developer: this.multipleDrop == 3 ? this.searchContent : "", //开发人
            purchase_buyer: this.multipleDrop == 4 ? this.searchContent : "", //采购员
            goods_supplier: this.multipleDrop == 5 ? this.searchContent : "", //供应商
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.loading = false;
            this.tableData = res.data.data.data;
            this.brandDrop = res.data.data.brand; //品牌
            this.classifyDrop = res.data.data.category; //分类
            this.total = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 搜索
    changeSearch() {
      this.loading = true;
      this.page = 1;
      this.getList();
    },
    // 多选搜索
    multipleSearch(event) {
      if (event == false) {
        this.loading = true;
        this.page = 1;
        this.getList();
      }
    },
    // 清除搜索input
    clearChageSearch() {
      this.loading = true;
      this.getList();
    },
    // 打印标签弹窗
    brandLabel() {
      this.brandLabelPop = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页下拉
    handleCurrentChange(val) {
      this.loading = true;
      this.page = val;
      this.getList();
    },
    // 分页右滚
    handleSizeChange(val) {
      this.loading = true;
      this.limit = val;
      this.page = 1;
      this.getList();
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