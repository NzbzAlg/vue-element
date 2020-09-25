<template>
  <div class="materialsManagement">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-select v-model="value" placeholder="请选择分类查询">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择品牌查询" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择状态查询" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-input placeholder="请输入品名或SKU查询" style="width:210px;margin-left:20px"></el-input>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary">添加辅料</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center"></el-table-column>
        <el-table-column prop="name" label="品名" align="center"></el-table-column>
        <el-table-column prop="address" label="SKU" align="center"></el-table-column>
        <el-table-column prop="address" label="类型" align="center"></el-table-column>
        <el-table-column prop="address" label="分类" align="center"></el-table-column>
        <el-table-column prop="address" label="品牌" align="center"></el-table-column>
        <el-table-column prop="address" label="采购成本(元)" align="center"></el-table-column>
        <el-table-column prop="address" label="交期(天)" align="center"></el-table-column>
        <el-table-column prop="address" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="address" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template>
            <el-button size="mini" type="success" @click="updateProductPop">更新产品</el-button>
            <el-button size="mini" type="warning">产品详情</el-button>
            <el-button size="mini" type="primary">调到商品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 更新产品弹窗 -->
    <el-dialog title="提示" :visible.sync="productUpdate" width="60%">
      <div class="productUpdate_top">
        <div class="pUpdate_img">
          <img
            src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg"
            alt
            style="width:90%;height:90%"
          />
        </div>
        <div class="pUpdate_size">
          <el-input placeholder="请输入内容" v-model="input2" style="width:300px">
            <template slot="prepend">品名</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
            <template slot="prepend">分类</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-top:15px">
            <template slot="prepend">SKU</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
            <template slot="prepend">品牌</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-top:15px">
            <template slot="prepend">状态</template>
          </el-input>
        </div>
      </div>
      <div class="productUpdate_bottom">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="基本" name="first">
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px">
              <template slot="prepend">型号</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
              <template slot="prepend">单位</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
              <template slot="prepend">材质</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-top:15px">
              <template slot="prepend">内箱长</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
              <template slot="prepend">内箱宽</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
              <template slot="prepend">内箱高</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-top:15px">
              <template slot="prepend">外箱长</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
              <template slot="prepend">外箱宽</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
              <template slot="prepend">外箱高</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-top:15px">
              <template slot="prepend">单重量</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
              <template slot="prepend">装箱数</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:300px;margin-left:40px">
              <template slot="prepend">总重量</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:640px;margin-top:15px">
              <template slot="prepend">描述</template>
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="采购" name="second">
            <el-input placeholder="请输入内容" v-model="input2" style="width:460px">
              <template slot="prepend">采购人员</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:460px;margin-left:40px">
              <template slot="prepend">采购期</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:460px;margin-top:15px">
              <template slot="prepend">采购成本</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:460px;margin-left:40px">
              <template slot="prepend">供应商</template>
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="物流" name="third">
            <el-input placeholder="请输入内容" v-model="input2" style="width:460px">
              <template slot="prepend">中文报关名</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="input2" style="width:460px;margin-left:40px">
              <template slot="prepend">英文报关名</template>
            </el-input>
            <el-table :data="tableData" border style="width: 100%;margin-top:15px">
              <el-table-column prop="date" label="站点" align="center"></el-table-column>
              <el-table-column prop="name" label="默认头程费用" align="center"></el-table-column>
              <el-table-column prop="address" label="HS Code" align="center"></el-table-column>
              <el-table-column prop="address" label="税率" align="center"></el-table-column>
              <el-table-column prop="address" label="物流价格" align="center"></el-table-column>
              <el-table-column prop="address" label="物流天数" align="center"></el-table-column>
              <el-table-column prop="address" label="申报单价(美金)" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="销售信息" name="fourth">
            <el-table :data="tableData" border style="width: 100%;">
              <el-table-column prop="date" label="国家" align="center"></el-table-column>
              <el-table-column prop="name" label="售价" align="center"></el-table-column>
              <el-table-column prop="address" label="FBA配送费" align="center"></el-table-column>
              <el-table-column prop="address" label="FBA仓储费" align="center"></el-table-column>
              <el-table-column prop="address" label="利润" align="center"></el-table-column>
              <el-table-column prop="address" label="利润率" align="center"></el-table-column>
              <el-table-column prop="address" label="A SIN" align="center"></el-table-column>
              <el-table-column prop="address" label="店铺" align="center"></el-table-column>
              <el-table-column prop="address" label="耗材" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="备货信息" name="stock">
            <el-table :data="tableData" border style="width: 100%;">
              <el-table-column prop="date" label="国家" align="center"></el-table-column>
              <el-table-column prop="name" label="店铺备货时间" align="center"></el-table-column>
              <el-table-column prop="address" label="厂家备货主管" align="center"></el-table-column>
              <el-table-column prop="address" label="海运时间" align="center"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="productUpdate = false">取 消</el-button>
        <el-button type="primary" @click="productUpdate = false">确 定</el-button>
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
import Crumbs from "@/components/crumbs";
export default {
  components: {
    Crumbs,
  },
  data() {
    return {
      value: "",
      currentPage1: 1,
      productUpdate: false,
      input2: "",
      activeName: "first",
      state: [
        {
          id: 1,
          label: "全部国家",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀6 弄",
        },
      ],
    };
  },
  methods: {
    //   更新产品弹窗
    updateProductPop() {
      this.productUpdate = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  .title_left {
    float: left;
  }
  .title_right {
    float: right;
  }
}
// 更新产品弹窗
.productUpdate_top {
  width: 100%;
  height: 340px;
  //   background: saddlebrown;
  .pUpdate_img {
    width: 30%;
    height: 100%;
    // background: seagreen;
    float: left;
  }
  .pUpdate_size {
    width: 70%;
    height: 100%;
    // background: fuchsia;
    float: left;
  }
}
.productUpdate_bottom {
  width: 100%;
  height: 300px;
  //   background: salmon;
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>