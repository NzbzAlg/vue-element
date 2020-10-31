<template>
  <div class="manualCalculation">
    <h1 class="calculation_title">
      VAT手动计算
      <p>
        9月份英镑兑欧元汇率:
        <span>1.1078</span>
      </p>
    </h1>
    <!-- VAT手动计算 -->
    <div class="calculateStore">
      <el-form label-width="100px">
        <el-col :span="4" style="height:50px">
          <el-form-item label="报税国家：">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              style="width: 100%"
              clearable
              size="small"
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="height:50px">
          <el-form-item label="税率：">
            <el-input size="small" style="width: 135px"></el-input>%
          </el-form-item>
        </el-col>
        <el-col :span="16" style="height: 50px"></el-col>
        <el-col :span="4" style="height:50px">
          <el-form-item label="时间周期：">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="20" style="height: 50px"></el-col>
        <el-col :span="4" style="height:50px">
          <el-form-item label="申报规则：">
            <el-radio v-model="radio" label="1">目的国原则</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="20" style="height: 50px"></el-col>
        <el-col :span="24" style="height:50px">
          <el-form-item label="VAT国家：">
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
        <el-col :span="12" style="height:50px">
          <el-form-item label="销售报告：">
            <el-input
              placeholder="请选择文件上传，仅支持csv文件格式"
              size="small"
              style="float: left; width: 300px"
            ></el-input>
            <el-input
              placeholder="选择"
              size="small"
              style="width: 60px; float: left; margin-left: 15px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="height: 50px"></el-col>
        <el-col :span="6">
          <div class="addDeduction">
            <span @click="addDeduction">+添加抵扣项</span>
            <span>(进项税：<b>￡0.00</b></span>
            <span>净成本额：<b>￡5.00</b> )</span>
          </div>
        </el-col>
        <el-col :span="24" style="text-align: center; margin-top: 15px">
          <el-button type="primary" size="small">开始计算</el-button>
          <el-button size="small">重置</el-button>
        </el-col>
      </el-form>
    </div>
    <!-- 历史记录 -->
    <div class="history">
      <p>历史记录</p>
      <div class="history_table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="报税国家" align="center">
          </el-table-column>
          <el-table-column prop="address" label="报税公司" align="center"> </el-table-column>
          <el-table-column prop="address" label="时间周期" align="center"> </el-table-column>
          <el-table-column prop="address" label="税率" align="center"> </el-table-column>
          <el-table-column prop="address" label="创建时间" align="center"> </el-table-column>
          <el-table-column prop="address" label="操作者" align="center"> </el-table-column>
          <el-table-column prop="address" label="状态" align="center"> </el-table-column>
          <el-table-column prop="address" label="申报数据" align="center"> </el-table-column>
          <el-table-column prop="address" label="剔除数据" align="center"> </el-table-column>
          <el-table-column prop="address" label="下载次数" align="center"> </el-table-column>
          <el-table-column prop="address" label="操作" align="center"> </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加抵扣项弹窗 -->
    <el-dialog title="添加抵扣项" :visible.sync="addDeductionPop" width="40%">
      <div class="deduction">
        <div class="deduction_title">
          <el-checkbox v-model="deductionChecked">
            通过进项税，自动计算净成本额</el-checkbox
          >
          <el-button type="primary" size="small" @click="appendDeduction"
            >新增抵扣项</el-button
          >
        </div>
        <vxe-table
          ref="xTable"
          border
          show-all-overflow
          :data.sync="tableData"
          :edit-config="{ key: 'id', trigger: 'manual', mode: 'row' }"
          style="margin-top: 15px"
        >
          <vxe-table-column
            field="name"
            title="名称"
            align="center"
            :edit-render="{ name: 'input' }"
          ></vxe-table-column>
          <vxe-table-column
            field="sex"
            title="日期"
            align="center"
            :edit-render="{ name: 'input' }"
          ></vxe-table-column>
          <vxe-table-column
            field="date"
            title="进项税(£)"
            align="center"
            :edit-render="{ name: 'input' }"
          ></vxe-table-column>
          <vxe-table-column
            field="address"
            title="净成本额(£)"
            align="center"
            :edit-render="{ name: 'input' }"
          ></vxe-table-column>
          <vxe-table-column title="操作" align="center">
            <template v-slot="{ row }">
              <template v-if="$refs.xTable.isActiveByRow(row)">
                <vxe-button @click="saveRowEvent(row)" size="small"
                  >保存</vxe-button
                >
                <vxe-button @click="cancelRowEvent(row)" size="small"
                  >取消</vxe-button
                >
              </template>
              <template v-else>
                <vxe-button @click="editRowEvent(row)" size="small"
                  >编辑</vxe-button
                >
                <vxe-button size="small">删除</vxe-button>
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDeductionPop = false">取 消</el-button>
        <el-button type="primary" @click="addDeductionPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addDeductionPop: false, //添加抵扣项弹窗
      value1: 1,
      radio: "1",
      tableData: [
        {
          id: 1,
          name: "c88/c79",
        },
      ],
      deductionChecked: true,
      form: {
        status: "",
      },
      state: [
        {
          id: 1,
          label: "英国",
        },
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
    };
  },
  methods: {
    // 添加抵扣项弹窗
    addDeduction() {
      this.addDeductionPop = true;
    },
    editRowEvent(row) {
      this.$refs.xTable.setActiveRow(row);
    },
    saveRowEvent(row) {
      console.log("success");
      this.cancelRowEvent();
      console.log(row);
    },
    cancelRowEvent(row) {
      this.$refs.xTable.clearActived();
    },
    // 新增抵扣项
    appendDeduction() {
      var list = {
        name: this.name,
        date: this.date,
        address: this.address,
        sex: this.sex,
      };
      this.tableData.unshift(list);
    },
  },
};
</script>

<style lang="scss" scoped>
.manualCalculation {
  .calculation_title {
    font-size: 24px;
    color: #073b49;
    font-weight: normal;
    display: inline-block;
    margin-bottom: 15px;
    p {
      display: inline-block;
      font-size: 12px;
      color: #073b49;
      font-weight: bold;
      margin-left: 8px;
      span {
        color: #409eff;
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
  // VAT手动计算
  .calculateStore {
    width: 100%;
    height: 370px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 6px #d4d4d4;
    border-radius: 10px;
    padding: 25px 5px;
    box-sizing: border-box;

    // 添加抵扣项
    .addDeduction {
      span:nth-of-type(1) {
        color: #409eff;
        font-size: 12px;
        cursor: pointer;
        text-decoration: underline;
        padding-left: 19px;
      }
      span:nth-of-type(2) {
        display: inline-block;
        margin-left: 30px;
        font-size: 12px;
        color: #333;
      }
      span:nth-of-type(3) {
        display: inline-block;
        margin-left: 30px;
        font-size: 12px;
        color: #333;
      }
    }
  }
  // 历史记录
  .history {
    margin-top: 20px;
    p {
      font-size: 18px;
      color: #073b49;
      font-weight: bold;
      margin-left: 25px;
      margin-bottom: 10px;
    }
    .history_table {
      box-shadow: 0px 0px 6px #d4d4d4;
      // border-radius: 10px;
      // padding: 5px;
      // box-sizing: border-box;
      // background: #fff;
    }
  }
  // 添加抵扣项弹窗
  .deduction {
    .deduction_title {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
}
</style>