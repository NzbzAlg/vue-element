<template>
  <div class="financialRelated">
    <div class="financialRelated_title">
      <p>财务相关设置</p>
      <el-button type="primary" size="small">保存设置</el-button>
    </div>
    <div class="financialRelated_content">
      <p class="title">商品成本与头程成本在退货时的计算</p>
      <!-- FBA -->
      <div class="FBA">
        <span>FBA</span>
        <div class="finance-fba">
          <el-radio-group v-model="fbaRadio" @change="changeFbaRadio">
            <el-radio :label="1" style="margin-top: 25px"
              >产生退货时，<span>不将</span>商品成本作为收入加回到利润计算中</el-radio
            >
            <br />
            <el-radio :label="2" style="margin-top: 25px"
              >产生退货时， 将全部商品成本作为收入加回到利润计算中</el-radio
            >
            <br />
            <el-radio :label="3" style="margin-top: 25px">
              产生退货时， 将部分商品成本作为收入加回到利润计算中
              <p style="margin-left: 30px; margin-top: 10px">
                将商品成本<el-input
                  style="width: 50px"
                  size="mini"
                  :disabled="disabled"
                ></el-input
                >% + 头程物流<el-input
                  style="width: 50px"
                  size="mini"
                  :disabled="disabled"
                ></el-input
                >%作为收入
              </p>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- FBM -->
      <div class="FBM">
        <span>FBM</span>
        <div class="finance-fbm">
          <el-radio-group v-model="fbmRadio" @change="changeFbmRadio">
            <el-radio :label="1" style="margin-top: 25px"
              >产生退货时，<span>不将</span>商品成本作为收入加回到利润计算中</el-radio
            >
            <br />
            <el-radio :label="2" style="margin-top: 25px"
              >产生退货时， 将全部商品成本作为收入加回到利润计算中</el-radio
            >
            <br />
            <el-radio :label="3" style="margin-top: 25px">
              产生退货时， 将部分商品成本作为收入加回到利润计算中
              <p style="margin-left: 30px; margin-top: 10px">
                将商品成本<el-input
                  style="width: 50px"
                  size="mini"
                  :disabled="disabled"
                ></el-input
                >% + 头程物流<el-input
                  style="width: 50px"
                  size="mini"
                  :disabled="disabled"
                ></el-input
                >%作为收入
              </p>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 利润月报 -->
      <div class="monthlyProfits">
        <p class="title">“利润月报>按ASIN”中月仓储费计算</p>
        <el-radio-group v-model="fbmRadio">
          <el-radio :label="1" style="margin-top: 25px;margin-left:15px"
            >按扣除的月份计算（如在四月扣除，则计算在四月）；</el-radio
          >
          <br />
          <el-radio :label="2" style="margin-top: 25px;margin-left:15px"
            >按归属月份计算（如五月扣除的费用，实际属于四月的，则计算在四月）。
          </el-radio>
          <br />
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fbaRadio: 2,
      fbmRadio: 2,
      disabled: false,
    };
  },
  mounted() {
    this.disabled = true;
  },
  methods: {
    changeFbaRadio(e) {
      if (e == 3) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    changeFbmRadio(e) {
      if (e == 3) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.financialRelated {
  .financialRelated_title {
    color: #073b49;
    text-align: left;
    line-height: 25px;
    font-size: 24px;
    padding: 10px 0px 5px;
    display: flex;
    justify-content: space-between;
  }
  .financialRelated_content {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(235, 236, 240, 0.6);
    margin-top: 20px;
    padding: 20px 30px 40px 30px;
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20px;
    }
    .FBA {
      .finance-fba {
        display: inline-block;
        margin-left: 50px;
      }
    }
    .FBM {
      margin-top: 55px;
      margin-bottom: 45px;
      .finance-fbm {
        display: inline-block;
        margin-left: 50px;
      }
    }
    .monthlyProfits {
      margin-top: 45px;
      .title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
