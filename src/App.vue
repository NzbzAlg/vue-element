<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    // 刷新页面事件
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="scss">
.vxe-toolbar{
  height: 30px;
}
// ::-webkit-scrollbar {
//     width: 6px;
//     background-color: #fff;
// }

// ::-webkit-scrollbar-thumb {
//     background-color: #b9b9b9;
//     border-radius: 5px;
// }
#app {
  overflow-x: hidden;
}
// .el-tooltip__popper {
//   font-size: 14px;
//   max-width: 10%;
// }
// .el-tooltip__popper.is-dark {
//   background: #e8bb76;
//   color: #fff;
// }
// .el-table td,
// .el-table th {
//   padding: 8px 0 !important;
// }
.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 100px !important;
}
.el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 330px);
  max-width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
}
.el-dialog__body {
  overflow: auto;
  padding: 0px 20px!important;
}
</style>
