
<template>
  <div class="distributor">
    <div class="title">
      <!-- 搜索 -->
      <el-input
        v-model="supplier"
        placeholder="搜索供应商、跟进人名称"
        clearable
        size="medium"
        style="width: 210px"
        @change="changeSearch"
      ></el-input>
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
        <el-button size="small" type="primary" @click="addSupplier"
          >添加供应商</el-button
        >
        <!-- <el-button size="small" @click="importSupplier">导入供应商</el-button> -->
      </div>
      <el-table :data="tableData" border style="width: 100%" height="600">
        <el-table-column
          prop="supplier_name"
          label="供应商"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="supplier_contacts"
          label="联系人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="supplier_contactsnumber"
          label="联系电话"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="supplier_qq"
          label="QQ"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="supplier_followperson"
          label="跟进人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="desc"
          label="备注"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-dropdown split-button size="small" @click="detailList(scope.row)">
              详情
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span>审核</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
            <el-button size="small" @click="detailList(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="供应商详情" :visible.sync="detailListPop" width="40%">
      <div class="supplier">
        <div class="basicInformation">
          <p>基本信息</p>
          <el-form label-width="80px" :model="detailListForm">
            <el-col :span="24">
              <el-form-item label="供应商">
                <el-input v-model="detailListForm.supplier_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="级别">
                <el-select
                  v-model="detailListForm.supplier_level"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in rank"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规模">
                <el-select
                  v-model="detailListForm.supplier_scale"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in scale"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟进人">
                <!-- <el-input v-model="detailListForm.supplier_followperson"></el-input> -->
                <el-select
                  v-model="detailListForm.supplier_followperson"
                  style="width: 100%"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in followPeople"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input v-model="detailListForm.supplier_contacts"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="detailListForm.supplier_contactsnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ">
                <el-input v-model="detailListForm.supplier_qq"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input v-model="detailListForm.supplier_email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传真">
                <el-input v-model="detailListForm.supplier_tax"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址">
                <el-input v-model="detailListForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="detailListForm.desc" :rows="6"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="finance">
          <p>财务</p>
          <el-form label-width="80px" :model="detailListForm">
            <el-col :span="12">
              <el-form-item label="结算方式">
                <el-select
                  v-model="detailListForm.supplier_settlementmethod"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in clearingForm"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付方式">
                <el-select
                  v-model="detailListForm.supplier_paymentmethod"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in modePayment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户名">
                <el-input v-model="detailListForm.supplier_accountname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开支行">
                <el-input v-model="detailListForm.supplier_bank"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="卡号">
                <el-input v-model="detailListForm.supplier_account"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailListPop = false">取 消</el-button>
        <el-button type="primary" @click="detailListConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加供应商 -->
    <el-dialog title="添加供应商" :visible.sync="addSupplierPop" width="40%">
      <div class="supplier">
        <div class="basicInformation">
          <p>基本信息</p>
          <el-form label-width="80px" :model="addSupplierForm">
            <el-col :span="24">
              <el-form-item label="供应商">
                <el-input v-model="addSupplierForm.supplier_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="级别">
                <el-select
                  v-model="addSupplierForm.supplier_level"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in rank"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规模">
                <el-select
                  v-model="addSupplierForm.supplier_scale"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in scale"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跟进人">
                <el-select
                  v-model="addSupplierForm.supplier_followperson"
                  style="width: 100%"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in followPeople"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input v-model="addSupplierForm.supplier_contacts"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="addSupplierForm.supplier_contactsnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ">
                <el-input v-model="addSupplierForm.supplier_qq"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input v-model="addSupplierForm.supplier_email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传真">
                <el-input v-model="addSupplierForm.supplier_tax"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址">
                <el-input v-model="addSupplierForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="addSupplierForm.desc" :rows="6"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="finance">
          <p>财务</p>
          <el-form label-width="80px" :model="addSupplierForm">
            <el-col :span="12">
              <el-form-item label="结算方式">
                <el-select
                  v-model="addSupplierForm.supplier_settlementmethod"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in clearingForm"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付方式">
                <el-select
                  v-model="addSupplierForm.supplier_paymentmethod"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in modePayment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户名">
                <el-input v-model="addSupplierForm.supplier_accountname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开支行">
                <el-input v-model="addSupplierForm.supplier_bank"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="卡号">
                <el-input v-model="addSupplierForm.supplier_account"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSupplierPop = false">取 消</el-button>
        <el-button type="primary" @click="addSupplierConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导入供应商弹窗 -->
    <el-dialog
      title="导入采购商品"
      :visible.sync="importSupplierPop"
      width="30%"
    >
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入供应商</el-button>
          <span style="color: #006eff; padding-left: 24px">下载模板</span>
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
        <el-button @click="importSupplierPop = false">取 消</el-button>
        <el-button type="primary" @click="importSupplierPop = false"
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
      supplier: "", //供应商、跟进人
      detailListPop: false, //详情弹窗
      detailListForm:{},//详情
      // 详情级别
      rank:[
        {
          id:1,
          name:'★'
        },
        {
          id:2,
          name:'★★'
        },
        {
          id:3,
          name:'★★★'
        },
        {
          id:4,
          name:'★★★★'
        },
        {
          id:5,
          name:'★★★★★'
        },
      ],
      // 详情规模
      scale:[
        {
          id:1,
          name:'少于50人'
        },
        {
          id:2,
          name:'50-100人'
        },
        {
          id:3,
          name:'150-500人'
        },
        {
          id:4,
          name:'500-1000人'
        },
        {
          id:5,
          name:'1000人以上'
        },
      ],
      // 跟进人
      followPeople:[],
      // 详情结算方式
      clearingForm:[
        {
          id:1,
          name:'款到发货'
        },
        {
          id:2,
          name:'货到付款'
        },
        {
          id:3,
          name:'分期付款'
        },
        {
          id:4,
          name:'定期月结'
        },
        {
          id:5,
          name:'定期半月结'
        },
        {
          id:6,
          name:'预存'
        },
      ],
      // 详情支付方式
      modePayment:[
        {
          id:1,
          name:'网银转账'
        },
        {
          id:2,
          name:'网上支付'
        }
      ],
      addSupplierPop: false, //添加供应商弹窗
      addSupplierForm:{},//添加供应商
      importSupplierPop: false, //导入供应商弹窗
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
      tableData: [], //列表数据
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 列表
    getList() {
      this.$http
        .get(`supplier/supplier_list`, {
          params: {
            page: this.page,
            limit: this.limit,
            name: this.supplier,
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
    changeSearch() {
      this.page = 1
      this.getList();
    },
    // 编辑弹窗
    detailList(row) {
      this.id = row.id
      this.detailListPop = true;
      this.$http.get(`supplier/get_one_supplier?id=${this.id}`).then(res=>{
        const{code,data} = res.data
        if(code == 200){
          this.detailListForm = res.data.data
          this.followPeople = res.data.data.supplier_followperson_arr
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 编辑确定
    detailListConfirm(){
      let info = {
        id:this.id,
        supplier_name:this.detailListForm.supplier_name,//供应商
        supplier_level:this.detailListForm.supplier_level,//级别
        supplier_scale:this.detailListForm.supplier_scale,//规模
        supplier_followperson:this.detailListForm.supplier_followperson,//跟进人
        supplier_contacts:this.detailListForm.supplier_contacts,//联系人
        supplier_contactsnumber:this.detailListForm.supplier_contactsnumber,//联系电话
        supplier_qq:this.detailListForm.supplier_qq,//QQ
        supplier_email:this.detailListForm.supplier_email,//邮箱
        supplier_tax:this.detailListForm.supplier_tax,//传真
        address:this.detailListForm.address,//地址
        desc:this.detailListForm.desc,//备注
        supplier_settlementmethod:this.detailListForm.supplier_settlementmethod,//结算方式
        supplier_paymentmethod:this.detailListForm.supplier_paymentmethod,//支付方式
        supplier_accountname:this.detailListForm.supplier_accountname,//户名
        supplier_bank:this.detailListForm.supplier_bank,//开支行
        supplier_account:this.detailListForm.supplier_account,//卡号
      }
      this.$http.post(`supplier/new_supplier`,info).then(res=>{
        const{code,data} = res.data
        if(code == 200){
          this.$message.success(res.data.message)
          this.getList()
          this.detailListPop = false
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 添加供应商弹窗
    addSupplier() {
      this.addSupplierPop = true;
      this.$http.get(`user/get_users`).then(res=>{
        const{code,data} = res.data
        if(code == 200){
          this.followPeople = res.data.data
        }else{
          this.$message.error(res.data.message)
        }
      })

    },
    // 添加供应商确定
    addSupplierConfirm(){
      let info = {
        supplier_name:this.addSupplierForm.supplier_name,//供应商
        supplier_level:this.addSupplierForm.supplier_level,//级别
        supplier_scale:this.addSupplierForm.supplier_scale,//规模
        supplier_followperson:this.addSupplierForm.supplier_followperson,//跟进人
        supplier_contacts:this.addSupplierForm.supplier_contacts,//联系人
        supplier_contactsnumber:this.addSupplierForm.supplier_contactsnumber,//联系电话
        supplier_qq:this.addSupplierForm.supplier_qq,//QQ
        supplier_email:this.addSupplierForm.supplier_email,//邮箱
        supplier_tax:this.addSupplierForm.supplier_tax,//传真
        address:this.addSupplierForm.address,//地址
        desc:this.addSupplierForm.desc,//备注
        supplier_settlementmethod:this.addSupplierForm.supplier_settlementmethod,//结算方式
        supplier_paymentmethod:this.addSupplierForm.supplier_paymentmethod,//支付方式
        supplier_accountname:this.addSupplierForm.supplier_accountname,//户名
        supplier_bank:this.addSupplierForm.supplier_bank,//开支行
        supplier_account:this.addSupplierForm.supplier_account,//卡号
      }
      this.$http.post(`supplier/new_supplier`,info).then(res=>{
        const{code,data} = res.data
        if(code == 200){
          this.$message.success(res.data.message)
          this.getList()
          this.addSupplierPop = false
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 导入供应商
    importSupplier() {
      this.importSupplierPop = true;
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
//弹窗
.supplier {
  .basicInformation {
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
  .finance {
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
  .site {
    p {
      color: rgb(51, 51, 51);
      font-weight: 600;
      line-height: 14px;
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
}
// 导入供应商
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
</style>