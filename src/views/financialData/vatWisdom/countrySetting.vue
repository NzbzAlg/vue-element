
<template>
  <div class="countrySetting">
    <!-- 搜索 -->
    <div class="title">
      <el-input
        placeholder="搜索内容"
        v-model="searchContent"
        class="input-with-select"
        style="width: 275px"
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
      <div class="tabItem">
        <el-button type="primary" size="small" @click="declareState"
          >新增报税国家</el-button
        >
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="address" label="国家" align="center">
        </el-table-column>
        <el-table-column prop="address" label="税号" align="center">
        </el-table-column>
        <el-table-column prop="address" label="申报规则" align="center">
        </el-table-column>
        <el-table-column prop="address" label="周期结尾月" align="center">
        </el-table-column>
        <el-table-column prop="address" label="税率" align="center">
        </el-table-column>
        <el-table-column prop="address" label="起止时间" align="center">
        </el-table-column>
        <el-table-column prop="address" label="申报周期" align="center">
        </el-table-column>
        <el-table-column prop="address" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增报税国家弹窗 -->
    <el-dialog title="设置报税国家" :visible.sync="declareStatePop" width="40%">
      <div class="declareState">
        <el-steps :active="active" :align-center="true">
          <el-step title="选择国家"></el-step>
          <el-step title="填写信息"></el-step>
          <el-step title="设置完成"></el-step>
        </el-steps>
        <div v-if="active === 0">
          <el-form style="margin-top: 35px">
            <el-col :span="24">
              <el-form-item label="国家：" label-width="135px">
                <el-checkbox-group v-model="checked">
                  <el-checkbox
                    v-for="item in checkList"
                    :key="item.id"
                    :label="item.id"
                  >
                    <img
                      :src="item.img"
                      alt=""
                      style="width: 18px; height: 14px; vertical-align: middle"
                    />
                    {{ item.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div v-if="active === 1">
          <el-table
            :data="tableData"
            border
            style="width: 100%; margin-top: 25px"
          >
            <el-table-column prop="address" label="国家" align="center">
            </el-table-column>
            <el-table-column prop="address" label="税号" align="center">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.da"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="周期结尾月"
              align="center"
              width="160"
            >
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.value1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 130px"
                  size="small"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="税率" align="center">
              <template>
                <el-input size="small" style="width: 75px"></el-input>%
              </template>
            </el-table-column>
            <el-table-column prop="address" label="申报规则" align="center">
            </el-table-column>
            <el-table-column prop="address" label="申报周期" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div v-if="active === 2">
          <div class="set-complete">
            <img
              src="https://admin.captainbi.com/statics/amzcaptain/img/complete.png"
              alt=""
            />
            <span>您已完成《设置报税国家》的填写，确认后立即生效。</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="declareStatePop = false" v-if="active == 0"
          >取 消</el-button
        >
        <el-button @click="prev" v-if="active == 1 || active == 2"
          >上一步</el-button
        >
        <el-button
          type="primary"
          @click="next"
          v-if="active == 0 || active == 1"
          >下一步</el-button
        >
        <el-button
          type="primary"
          @click="declareStatePop = false"
          v-if="active == 2"
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
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "国家",
        },
        {
          id: 2,
          name: "税号",
        }
      ],
      checked: [],
      checkList: [
        {
          id: 1,
          name: "英国",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/UK.png",
        },
        {
          id: 2,
          name: "德国",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/DE.png",
        },
        {
          id: 3,
          name: "法国",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/FR.png",
        },
        {
          id: 4,
          name: "意大利",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/IT.png",
        },
        {
          id: 5,
          name: "西班牙",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/ES.png",
        },
        {
          id: 6,
          name: "波兰",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/PL.png",
        },
        {
          id: 7,
          name: "希腊",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/GR.png",
        },
        {
          id: 8,
          name: "荷兰",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/NL.png",
        },
        {
          id: 9,
          name: "葡萄牙",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/PT.png",
        },
        {
          id: 10,
          name: "奥地利",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/AT.png",
        },
        {
          id: 11,
          name: "爱尔兰",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/IE.png",
        },
        {
          id: 12,
          name: "捷克共和国",
          img:
            "https://admin.captainbi.com/statics/amzcaptain/img/country/CZ.png",
        },
      ],
      value1: "",
      active: 0,
      declareStatePop: false, //新增报税国家弹窗
      currentPage1: 1,
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
          shipment_name:
            "FBA (3/16/20, 3:43 AM) - 美国3.20海派山海陶瓷杯1836个",
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
    };
  },
  methods: {
    prev() {
      --this.active;
      if (this.active < 0) this.active = 0;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    // 新增报税国家弹窗
    declareState() {
      this.declareStatePop = true;
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
  text-align: center;
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
// 设置报税国家弹窗 - 设置完成
.set-complete {
  width: 68%;
  margin: 0 auto;
  position: relative;
  img {
    vertical-align: middle;
    margin-top: 50px;
  }
  span {
    display: inline-block;
    position: absolute;
    top: 66%;
    left: 32%;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>