
<template>
  <div class="warehouseList">
    <!-- 搜索 -->
    <div class="title">
      <el-select
        v-model="warehouseAttributes"
        placeholder="仓库属性"
        clearable
        filterable 
        size="medium"
        style="width:150px"
      >
        <el-option
          v-for="item in warehouseDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input
        v-model="warehouseName"
        placeholder="搜索仓库名称"
        clearable
        size="medium"
        style="width: 150px;margin-left:10px"
      ></el-input>
      <el-button type="primary" size="medium" style="margin-left:10px">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <el-button size="small" type="primary" @click="addWarehouse"
          >添加仓库</el-button
        >
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="number"
          label="仓库名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="属性"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="商品种类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="可用量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待发货量/锁定量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="次品量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="总量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="货值"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="库存成本"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="操作" align="center">
          <template>
            <el-button size="mini" @click="editWarehouse">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加仓库弹窗 -->
    <el-dialog title="添加自建仓库" :visible.sync="addWarehousePop" width="40%">
      <el-form :model="form" label-width="90px">
        <el-col :span="24">
          <el-form-item label="仓库名称">
            <el-input placeholder="仓库名称" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-input placeholder="负责人" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input placeholder="联系电话" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址">
            <el-input placeholder="地址" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              placeholder="备注"
              v-model="form.name"
              clearable
              :rows="2"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWarehousePop = false">取 消</el-button>
        <el-button type="primary" @click="addWarehousePop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑仓库弹窗 -->
    <el-dialog
      title="编辑自建仓库"
      :visible.sync="editWarehousePop"
      width="40%"
    >
      <el-form :model="form" label-width="90px">
        <el-col :span="24">
          <el-form-item label="仓库名称">
            <el-input placeholder="仓库名称" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-input placeholder="负责人" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input placeholder="联系电话" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址">
            <el-input placeholder="地址" v-model="form.name" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              placeholder="备注"
              v-model="form.name"
              clearable
              :rows="2"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editWarehousePop = false">取 消</el-button>
        <el-button type="primary" @click="editWarehousePop = false"
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
      addWarehousePop: false, //添加仓库弹窗
      editWarehousePop: false, //编辑仓库弹窗
      warehouseAttributes: "", //搜索框仓库属性
      warehouseDrop: [
        //仓库属性下拉
        {
          id: 1,
          name: "自建",
        },
        {
          id: 2,
          name: "FBA",
        },
      ],
      warehouseName: "", //仓库名称
      currentPage1: 1,
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
  methods: {
    // 添加仓库弹窗
    addWarehouse() {
      this.addWarehousePop = true;
    },
    // 编辑仓库弹窗
    editWarehouse() {
      this.editWarehousePop = true;
    },
    // 列表详情
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
.listDetails {
  .listDetails_title {
    font-size: 15px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
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
  .listDetails_content {
    height: 330px;
    p {
      font-size: 15px;
      font-weight: bold;
      color: #000;
    }
  }
  .listDetails_table {
    p {
      font-size: 15px;
      font-weight: bold;
      color: #000;
      margin-bottom: 15px;
    }
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>