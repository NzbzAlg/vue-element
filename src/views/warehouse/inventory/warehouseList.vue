
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
        style="width: 150px"
        @change="changeSearch"
      >
        <el-option
          v-for="item in warehouseDrop"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-input
        v-model="warehouseName"
        placeholder="搜索仓库名称"
        clearable
        size="medium"
        style="width: 220px; margin-left: 10px"
        @change="changeSearch"
      ></el-input>
      <!-- <el-button type="primary" size="medium" style="margin-left: 10px" @click="search"
        >搜索</el-button
      > -->
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <el-button size="small" type="primary" @click="addWarehouse"
          >添加仓库</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="600"
        size="medium"
        :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
      >
        <el-table-column label="序号" width="70px" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="仓库名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="仓库类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="goods_category"
          label="商品种类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="available_quantity"
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
          <template slot-scope="scope">
            <el-button v-if="scope.row.type == '自建'" size="mini" @click="editWarehouse(scope.row)">详情</el-button>
            <el-button v-if="scope.row.type == 'FBA'" size="mini" @click="editWarehouse(scope.row)" disabled>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加仓库弹窗 -->
    <el-dialog title="添加自建仓库" :visible.sync="addWarehousePop" width="40%" :close-on-click-modal='false'>
      <el-form :model="addWarehouseForm" label-width="90px">
        <el-col :span="24">
          <el-form-item label="仓库名称">
            <el-input
              placeholder="仓库名称"
              v-model="addWarehouseForm.name"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-input
              placeholder="负责人"
              v-model="addWarehouseForm.charge_person"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input
              placeholder="联系电话"
              v-model="addWarehouseForm.contact_number"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址">
            <el-input
              placeholder="地址"
              v-model="addWarehouseForm.warehouse_address"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              placeholder="备注"
              v-model="addWarehouseForm.desc"
              clearable
              :rows="2"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWarehousePop = false">取 消</el-button>
        <el-button type="primary" @click="addWarehouseConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑仓库弹窗 -->
    <el-dialog
      title="编辑自建仓库"
      :visible.sync="editWarehousePop"
      width="40%"
      :close-on-click-modal='false'
    >
      <el-form :model="editWarehouseForm" label-width="90px">
        <el-col :span="24">
          <el-form-item label="仓库名称">
            <el-input
              placeholder="仓库名称"
              v-model="editWarehouseForm.name"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-input
              placeholder="负责人"
              v-model="editWarehouseForm.charge_person"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input
              placeholder="联系电话"
              v-model="editWarehouseForm.contact_number"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址">
            <el-input
              placeholder="地址"
              v-model="editWarehouseForm.warehouse_address"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              placeholder="备注"
              v-model="editWarehouseForm.desc"
              clearable
              :rows="2"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editWarehousePop = false">取 消</el-button>
        <el-button type="primary" @click="editWarehouseConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
export default {
  components: {
    pagination,
  },
  data() {
    return {
      addWarehousePop: false, //添加仓库弹窗
      editWarehousePop: false, //编辑仓库弹窗
      warehouseAttributes: "", //搜索框仓库属性
      //仓库属性下拉
      warehouseDrop: [
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
      // 添加仓库
      addWarehouseForm: {
      },
      // 编辑仓库
      editWarehouseForm: {
      },
      tableData: [], //列表数据
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  mounted() {
    this.getList(); //列表数据
  },
  methods: {
    // 列表数据
    getList() {
      this.$http
        .get(`warehouse/warehouse_list`, {
          params: {
            page: this.page,
            limit: this.limit,
            type:this.warehouseAttributes,
            name:this.warehouseName
          },
        })
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.tableData = res.data.data;
            this.total = res.data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 搜索
    changeSearch(){
      this.page = 1
      this.getList()
    },
    // 添加仓库弹窗
    addWarehouse() {
      this.addWarehousePop = true;
    },
    // 添加仓库确定
    addWarehouseConfirm(){
      let info = {
        name:this.addWarehouseForm.name,
        charge_person:this.addWarehouseForm.charge_person,
        contact_number:this.addWarehouseForm.contact_number,
        warehouse_address:this.addWarehouseForm.warehouse_address,
        desc:this.addWarehouseForm.desc,
      }
      this.$http.post(`warehouse/create_warehouse`,info).then(res=>{
        const{code,data} = res.data
        if(code == 200){
          this.$message.success(res.data.message)
          this.getList()
          this.addWarehousePop = false
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 编辑仓库弹窗
    editWarehouse(row) {
      this.id = row.id
      this.type = row.type
      this.editWarehousePop = true;
      this.$http.get(`warehouse/getwarehouse_detail?id=${this.id}`).then(res=>{
        console.log(res.data)
        const{code,data} = res.data
        if(code == 200){
          this.editWarehouseForm = res.data.data
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 编辑仓库确定
    editWarehouseConfirm(){
      let info = {
        id:this.id,
        name:this.editWarehouseForm.name,
        charge_person:this.editWarehouseForm.charge_person,
        contact_number:this.editWarehouseForm.contact_number,
        warehouse_address:this.editWarehouseForm.warehouse_address,
        desc:this.editWarehouseForm.desc,
      }
      this.$http.post(`warehouse/upwarehouse`,info).then(res=>{
        const{code,data} = res.data
        if(code == 200){
          this.$message.success(res.data.message)
          this.getList()
          this.editWarehousePop = false
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 分页下拉
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 分页右滚
    handleSizeChange(val) {
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