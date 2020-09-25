<template>
  <div class="batchMapUpload">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="addFolder">添加文件夹</el-button>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="文件夹名" align="center" width="200"></el-table-column>
        <el-table-column prop="name" label="图片" align="center"></el-table-column>
        <el-table-column prop="address" label="首图路径" align="center" width="250"></el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template>
            <el-button type="success" size="mini">上传附件</el-button>
            <el-button type="danger" size="mini">删除文件夹</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加文件夹弹窗 -->
    <el-dialog title="添加文件夹" :visible.sync="addFolderPop" width="30%">
      <el-form :model="form">
        <el-form-item label="文件夹名称：" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFolderPop = false">取 消</el-button>
        <el-button type="primary" @click="addFolderPop = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addFolderPop: false, //添加文件夹弹窗
      form:{
          name:''
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    //   添加文件夹弹窗
    addFolder() {
      this.addFolderPop = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
}
</style>