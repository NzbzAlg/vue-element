<template>
  <div class="mainData">
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-select v-model="value" placeholder="请选择国家查询">
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择店铺查询"
          style="margin-left: 20px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入ASIN查询"
          style="width: 210px; margin-left: 20px"
        ></el-input>
        <el-input
          placeholder="请输入品名查询"
          style="width: 210px; margin-left: 20px"
        ></el-input>
        <el-button type="primary" style="margin-left: 20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary" @click="productUpdate"
          >录入主推商品</el-button
        >
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="国家"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="品名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="asin"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="大小类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="评分"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="评价数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="问答数"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template>
            <el-button size="mini" type="success" @click="productUpdate"
              >更新产品</el-button
            >
            <el-button size="mini" type="primary">查看数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 更新产品弹窗 -->
    <el-dialog title="提示" :visible.sync="productUpdatePop" width="40%">
      <el-form :model="form">
        <el-col :span="12">
          <el-form-item label="图片：" label-width="90px">
            <img
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg"
              alt=""
              style="width: 250px; height: 250px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品名：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ASIN：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属国家：" label-width="90px">
            <el-select v-model="value" placeholder="请选择店铺查询" style="width:100%">
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属店铺：" label-width="90px">
            <el-select v-model="value" placeholder="请选择店铺查询" style="width:100%">
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="价格：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="包含的子ASIN：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="productUpdatePop = false">取 消</el-button>
        <el-button type="primary" @click="productUpdatePop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看数据弹窗 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      productUpdatePop: false, //更新产品弹窗
      value: "",
      input2: "",
      form: {
        name: "",
      },
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
          address: "上海市普陀区金沙518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区19 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海516 弄",
        },
      ],
    };
  },
  methods: {
    // 更新产品
    productUpdate() {
      this.productUpdatePop = true;
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
    width: 40%;
    height: 100%;
    // background: seagreen;
    float: left;
  }
  .pUpdate_size {
    height: 100%;
    // background: fuchsia;
    float: left;
  }
}
.productUpdate_bottom {
  width: 100%;
  height: 100px;
}
</style>