<template>
  <div class="attendanceAccounting">
    <div>
      <input
        v-show="false"
        type="file"
        accept="image/*"
        lin
        @change="tirggerFile($event)"
        ref="input"
      />
      <div class="uploadImg" @click="openImg">
        <span v-if="imgUrl == ''">
          <i class="el-icon-plus" style="font-size: 25px; color: #8c939d"></i>
        </span>
        <img
          style="height: 100%; width: 100%"
          v-if="imgUrl != ''"
          :src="imgUrl"
        />
        <div class="mark" v-if="imgUrl != ''">
          <i class="el-icon-check mark_item"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelectFile: false,
      imgUrl: "",
    };
  },
  methods: {
    tirggerFile: function (event) {
      console.log(event);
      let file = event.target.files[0];
      let url = "";
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onload = function (e) {
        url = this.result.substring(this.result.indexOf(",") + 1);
        that.imgUrl = "data:image/png;base64," + url;
        // that.$refs['imgimg'].setAttribute('src','data:image/png;base64,'+url);
      };
    },
    openImg() {
      this.$refs.input.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadImg {
  width: 100px;
  height: 100px;
  border: 1px dashed #8c939d;
  text-align: center;
  line-height: 100px;
  border-radius: 10px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
  }
  .mark {
    position: absolute;
    top: 0px;
    right: 0;
    z-index: 1;
    display: inline-block;
    border: 15px solid #67c23a;
    height: 0;
    width: 0;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-top-right-radius: 10px;
    .mark_item {
      position: absolute;
      top: -15px;
      right: -12px;
      z-index: 2;
      color: #fff;
    }
  }
}
.uploadImg:hover {
  width: 100px;
  height: 100px;
  border: 1px dashed #409eff;
  text-align: center;
  line-height: 100px;
  cursor: pointer;
  border-radius: 10px;
}
</style>