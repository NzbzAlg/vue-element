<template>
  <div class="crossBorderMorning">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="establishmentPapers"
        >创建跨境早报</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="创建人" align="center">
        </el-table-column>
        <el-table-column prop="date" label="日期" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="primary" size="mini" @click="establishmentPapers">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 跨境早报弹窗 -->
    <el-dialog title="创建跨境早报" :visible.sync="establishmentPapersPop" width="50%">
      <editor-bar
        v-model="detail"
        :isClear="isClear"
        @change="change"
      ></editor-bar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="establishmentPapersPop = false">取 消</el-button>
        <el-button type="primary" @click="establishmentPapersPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>  
<script>
import EditorBar from "./components/wangEnduit";
export default {
  components: { EditorBar },
  data() {
    return {
      test: "",
      isClear: false,
      detail: "",
      establishmentPapersPop: false, //跨境早报弹窗
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
    change(val) {
      console.log(val);
    },
    //   创建跨境早报弹窗
    establishmentPapers() {
      this.establishmentPapersPop = true;
    },
  },
};
</script>  

<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
}
</style>