
<template>
  <div class="logisticsBill">
    <!-- 搜索 -->
    <div class="title">
      <el-input
        v-model="logisticsMode"
        placeholder="搜索物流方式"
        clearable
        size="medium"
        style="width: 150px"
      ></el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="addLogistics"
            >添加物流方式</el-button
          >
        </p>
      </div>
      <el-table :data="tableData" border style="width: 100%" height="600">
        <el-table-column
          prop="logistics_mode"
          label="物流方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="settlement_method"
          label="结算方式"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.settlement_method == 1">月结账单</span>
            <span v-if="scope.row.settlement_method == 2">入仓现结</span>
            <span v-if="scope.row.settlement_method == 3">半个月结</span>
            <span v-if="scope.row.settlement_method == 4">票结</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="postcode"
          label="邮编"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="volume_parameters"
          label="材积计算参数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="prescription"
          label="时效(天)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="desc"
          label="备注"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="create_man"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="操作" align="center">
          <template slot-scope="scope">
            <el-dropdown
              split-button
              size="small"
              @click="detailList(scope.row)"
            >
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
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="detailListPop" width="40%">
      <el-form label-width="100px" :model="editDetailForm">
        <el-col :span="12">
          <el-form-item label="物流方式" :required="true">
            <el-input
              style="width: 260px"
              v-model="editDetailForm.logistics_mode"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算方式" :required="true">
            <el-select
              v-model="editDetailForm.settlement_method"
              placeholder="请选择"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="item in clearingFormDrop"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计费类型" :required="true">
            <el-select
              v-model="editDetailForm.charge_type"
              placeholder="请选择"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="item in billingTypeDrop"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="材积参数" :required="true">
            <el-input v-model="editDetailForm.volume_parameters"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮编">
            <el-input v-model="editDetailForm.postcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="时效" :required="true">
            <el-input v-model="editDetailForm.prescription"></el-input>
          </el-form-item>
        </el-col>
        <el-col
          v-for="(item, index) in editDetailForm.freight_rules"
          :key="index"
        >
          <el-form-item label="运费规则" :required="true">
            <el-input
              placeholder="请输入"
              style="width: 170px"
              v-model="item.rulesFreightOne"
            >
              <template slot="append">kg</template>
            </el-input>
            -
            <el-input
              placeholder="请输入"
              style="width: 170px"
              v-model="item.rulesFreightTwo"
            >
              <template slot="append">kg</template>
            </el-input>
            <el-input
              placeholder="请输入"
              style="width: 170px; margin-left: 25px"
              v-model="item.rulesFreightThree"
            >
              <template slot="append">CNY/kg</template>
            </el-input>
            <span
              style="padding-left: 25px; color: #006eff; cursor: pointer"
              @click="editRemoveRow(index)"
              >删除</span
            >
          </el-form-item>
        </el-col>
        <span class="newFreightSize" @click="editAddDomain">+新增运费规则</span>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="editDetailForm.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailListPop = false">取 消</el-button>
        <el-button type="primary" @click="detailListConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加物流方式弹窗 -->
    <el-dialog title="添加物流方式" :visible.sync="addLogisticsPop" width="40%">
      <el-form label-width="100px" :model="addLogisticsForm">
        <el-col :span="12">
          <el-form-item label="物流方式" :required="true">
            <el-input
              style="width: 260px"
              v-model="addLogisticsForm.transport"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算方式" :required="true">
            <el-select
              v-model="addLogisticsForm.clearingForm"
              placeholder="请选择"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="item in clearingFormDrop"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计费类型" :required="true">
            <el-select
              v-model="addLogisticsForm.billingType"
              placeholder="请选择"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="item in billingTypeDrop"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="材积参数" :required="true">
            <el-input v-model="addLogisticsForm.volumeParameter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮编">
            <el-input v-model="addLogisticsForm.postcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="时效" :required="true">
            <el-input v-model="addLogisticsForm.aging"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-for="(item, index) in addLogisticsForm.formList" :key="index">
          <el-form-item label="运费规则" :required="true">
            <el-input
              placeholder="请输入"
              style="width: 170px"
              v-model="item.rulesFreightOne"
            >
              <template slot="append">kg</template>
            </el-input>
            -
            <el-input
              placeholder="请输入"
              style="width: 170px"
              v-model="item.rulesFreightTwo"
            >
              <template slot="append">kg</template>
            </el-input>
            <el-input
              placeholder="请输入"
              style="width: 170px; margin-left: 25px"
              v-model="item.rulesFreightThree"
            >
              <template slot="append">CNY/kg</template>
            </el-input>
            <span
              style="padding-left: 25px; color: #006eff; cursor: pointer"
              @click="removeRow(index)"
              >删除</span
            >
          </el-form-item>
        </el-col>
        <span class="newFreightSize" @click="addDomain">+新增运费规则</span>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              v-model="addLogisticsForm.remark"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addLogisticsPop = false">取 消</el-button>
        <el-button type="primary" @click="addLogisticsConfirm">确 定</el-button>
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
      logisticsMode: "", //物流方式
      addLogisticsPop: false, //添加物流方式弹窗
      addLogisticsForm: {
        transport: "", //物流方式
        clearingForm: "", //结算方式
        billingType: "", //计费类型
        volumeParameter: "", //体积参数
        postcode: "", //邮编
        aging: "", //时效
        remark: "", //备注
        formList: [
          {
            rulesFreightOne: "",
            rulesFreightTwo: "",
            rulesFreightThree: "",
          },
        ],
      },
      // 添加物流方式弹窗的结算方式
      clearingFormDrop: [
        {
          id: 1,
          name: "月结账单",
        },
        {
          id: 2,
          name: "入仓现结",
        },
        {
          id: 3,
          name: "半个月结",
        },
        {
          id: 4,
          name: "票结",
        },
      ],
      // 添加物流方式弹窗的计费类型
      billingTypeDrop: [
        {
          id: 1,
          name: "计费重(KG)",
        },
        {
          id: 2,
          name: "体积(CBM)",
        },
      ],
      detailListPop: false, //详情弹窗
      editDetailForm: {
        freight_rules: [
          {
            rulesFreightOne: "",
            rulesFreightTwo: "",
            rulesFreightThree: "",
          },
        ],
      },
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
        .get(`logistics/logistics_mode_list`, {
          params: {
            page: this.page,
            limit: this.limit,
            name: this.name,
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
    // 添加物流方式弹窗
    addLogistics() {
      this.addLogisticsPop = true;
    },
    // 添加物流方式的新增运费规则
    addDomain() {
      this.addLogisticsForm.formList.push({
        rulesFreightOne: "",
        rulesFreightTwo: "",
        rulesFreightThree: "",
      });
    },
    // 添加物流方式的新增运费规则的删除
    removeRow(index) {
      this.addLogisticsForm.formList.splice(index, 1);
    },
    // 添加物流方式确定
    addLogisticsConfirm() {
      let info = {
        logistics_mode: this.addLogisticsForm.transport, //物流方式
        settlement_method: this.addLogisticsForm.clearingForm, //结算方式
        charge_type: this.addLogisticsForm.billingType, //计费类型
        volume_parameters: this.addLogisticsForm.volumeParameter, //体积参数
        postcode: this.addLogisticsForm.postcode, //邮编
        prescription: this.addLogisticsForm.aging, //时效
        freight_rules: this.addLogisticsForm.formList, //运费规则
        desc: this.addLogisticsForm.remark, //备注
      };
      this.$http.post(`logistics/new_logistics_mode`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.getList();
          this.addLogisticsPop = false;
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 详情弹窗
    detailList(row) {
      this.id = row.id;
      this.detailListPop = true;
      this.$http
        .get(`logistics/get_one_logistics_mode?id=${this.id}`)
        .then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            this.editDetailForm = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    // 详情确定
    detailListConfirm() {
      let info = {
        id: this.id,
        logistics_mode: this.editDetailForm.logistics_mode, //物流方式
        settlement_method: this.editDetailForm.settlement_method, //结算方式
        charge_type: this.editDetailForm.charge_type, //计费类型
        volume_parameters: this.editDetailForm.volume_parameters, //体积参数
        postcode: this.editDetailForm.postcode, //邮编
        prescription: this.editDetailForm.prescription, //时效
        freight_rules: this.editDetailForm.freight_rules, //运费规则
        desc: this.editDetailForm.desc, //备注
      };
      this.$http.post(`logistics/new_logistics_mode`, info).then((res) => {
        const { code, data } = res.data;
        if (code == 200) {
          this.getList();
          this.detailListPop = false;
          this.$message.success(res.data.message);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 详情物流方式的新增运费规则
    editAddDomain() {
      this.editDetailForm.freight_rules.push({
        rulesFreightOne: "",
        rulesFreightTwo: "",
        rulesFreightThree: "",
      });
    },
    // 详情物流方式的新增运费规则的删除
    editRemoveRow(index) {
      this.editDetailForm.freight_rules.splice(index, 1);
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
  .tabItem {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
.newFreightSize {
  cursor: pointer;
  color: #006eff;
  display: inline-block;
  margin-left: 30px;
  margin-bottom: 15px;
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>