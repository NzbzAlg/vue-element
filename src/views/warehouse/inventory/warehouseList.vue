<template>
  <div class="warehouseList">
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-select v-model="value" placeholder="请选择仓库类型查询">
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入仓库名查询"
          style="width: 210px; margin-left: 20px"
        ></el-input>
        <el-button type="primary" style="margin-left: 20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary" @click="productUpdate"
          >添加仓库</el-button
        >
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="仓库名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="属性"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="商品种类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="可用量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="质检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="待发货/锁定"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="次品量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="出库在途量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="总量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="货值"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template>
            <el-button size="mini" type="success" @click="productUpdate"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 更新产品弹窗 -->
    <el-dialog title="提示" :visible.sync="productUpdatePop" width="40%">
      <el-form :model="form">
        <el-col :span="12">
          <el-form-item label="仓库名称：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" label-width="90px">
            <el-input
              v-model="form.name"
              autocomplete="off"
              type="textarea"
            ></el-input>
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