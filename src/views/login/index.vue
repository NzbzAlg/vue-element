<template>
  <div class="login">
    <div class="login_content">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            style="width: 300px; margin-left: 95px; margin-top: 70px"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            style="width: 300px; margin-left: 95px; margin-top: 10px"
            prefix-icon="el-icon-unlock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            style="margin-left: 150px; margin-top: 20px"
            >登录</el-button
          >
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // 键盘销毁
    window.addEventListener("keydown", this.keyDown);
  },
  methods: {
    // 登录
    onSubmit() {
      this.$refs.formRef.validate((val) => {
        let info = {
          name: this.form.username,
          pwd: this.form.password,
        };
        // this.$http.post(`jeecg-boot/sys/login`, info).then((res) => {
        this.$http.post(`admin/login`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            window.sessionStorage.setItem(
              "info",
              JSON.stringify(res.data.data.userInfo[0])
            ); //存储登录信息
            window.sessionStorage.setItem("token", res.data.data.token); //存储token
            this.$router.push("/dataBoard");
            this.$message({
              message: "登陆成功",
              type: "success",
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    // 键盘回车事件
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.onSubmit();
      }
    },
    // 重置按钮
    reset() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  .login_content {
    width: 480px;
    height: 320px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -214px 0 0 -240px;
  }
}
</style>