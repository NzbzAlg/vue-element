<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app{
  overflow-x: hidden;
}
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
  padding: 0px 20px !important;
}
// .el-select .el-input {
//   width: 160px !important;
// }
.el-input-group__append .el-button,
.el-input-group__append .el-input,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-input {
  font-size: inherit;
  width: 90px;
}
</style>
