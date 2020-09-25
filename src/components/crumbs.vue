<template>
  <div class="crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{activeName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
    };
  },
  created() {
    this.activeName = window.sessionStorage.getItem("activeName");
  },
};
</script>
<style lang="scss" scoped>
.crumbs{
  margin-bottom: 20px;
}
</style>