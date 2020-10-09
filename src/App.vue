<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
// ::-webkit-scrollbar {
//     width: 6px;
//     background-color: #fff;
// }

// ::-webkit-scrollbar-thumb {
//     background-color: #fff;
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
.el-table td,
.el-table th {
  padding: 8px 0 !important;
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
.el-tabs{
  height: 100%;
}
.el-tabs__header{
  border: none!important;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border: none;
}
.el-tabs__item{
    cursor: pointer;
    background-color: #d9d9d9;
    color: #4d4d4d;
    border: 0px;
    padding-left: 15px;
    font-size: 14px;
    box-shadow: 1px 1px 1px 1px #999999;
    margin-left: 10px;
    height: 34px;
    line-height: 34px;
    margin-top: 5px;
    border-radius: 5px;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: none;
}
.el-tabs__nav-scroll{
  height: 50px;
}
.el-tabs__item.is-active{
  background: #303133;
  color: #fff;
}
.el-tabs__item.is-active:before {
    content: ' ';
    width: 8px;
    height: 8px;
    background-color: #00cc00;
    border-radius: 5px;
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }
.el-tabs__item:hover{
  color: #fff;
}
</style>
