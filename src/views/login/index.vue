<template>
  <div class="login">
    <div class="login_content">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            style="width:300px;margin-left:95px;margin-top:70px;"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            style="width:300px;margin-left:95px;margin-top:10px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="margin-left:150px;margin-top:20px;">登录</el-button>
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
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.formRef.validate(val => {
        if (this.form.username === "sun" && this.form.password === "000000") {
          let arr = ['1', '2', '3',"11","12","13"]
          window.sessionStorage.setItem('menulist', JSON.stringify(arr))
          this.$router.push("/home");
          this.$message({
            message: "登陆成功",
            type: "success"
          });
        } else if(this.form.username === "admin" && this.form.password === "000"){
          let arr = ['1', '2', '3',"4","5","11","12","13","14","15"]
          window.sessionStorage.setItem('menulist', JSON.stringify(arr))
          this.$router.push("/home");
          this.$message({
            message: "登陆成功",
            type: "success"
          });
        } else {
          if(this.form.username !=='' && this.form.password !== ''){
            this.$message.error('用户名或密码错误');
          }
        }
      });

      // this.$http.post("sys/user/login",this.form).then(res=>{

      // })
    },
    reset() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, #a94beb, #197bd5, #2c2465);
}
.login .login_content {
  width: 480px;
  height: 320px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -214px 0 0 -240px;
}
.el-input__inner {
  width: 200px;
  height: 50px;
}
</style>