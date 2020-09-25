<template>
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40, 50, 60, 80, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="page"
      :page-size="limit"
      :total="total"
      >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "pagination",
    data() {
      return {
        page: 1
      }
    },
    props: {
      // 避免直接改变prop属性
      // 'page': {
      //   required: false,
      //   default: 1
      // },
      'total': {
        required: false,
        default: 0
      },
      'limit': {
        required: false,
        default: 10
      }
    },
    watch: {
      page(val) {
        // 改变这个值并不会触发 handleCurrentChange
        if (typeof val === "number") {
          this.page = val;
        }
      },
    },
    methods: {
      // 当前页变化
      handleCurrentChange(val) {
        this.$emit("handleCurrentChange", val);
      },
      // size变化
      handleSizeChange(val) {
        this.page = 1;
        this.$emit('handleSizeChange', val);
      },
    }
  }
</script>

<style scoped>
.paging {
  margin-top: 20px;
  float: right;
}
</style>