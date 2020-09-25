<template>
  <div class="login">
    <div class="login_content">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            style="width:300px;margin-left:95px;margin-top:70px;"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            style="width:300px;margin-left:95px;margin-top:10px"
            prefix-icon="el-icon-unlock"
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
  methods: {
    // 登录
    onSubmit() {
      this.$refs.formRef.validate((val) => {
        let info = {
          name: this.form.username,
          pwd: this.form.password,
        };
        this.$http.post(`api/login/login`, info).then((res) => {
          const { code, data } = res.data;
          if (code == 200) {
            console.log(res.data.data.token);
            this.$router.push("/home");
            window.sessionStorage.setItem("info",JSON.stringify(res.data.data.userInfo[0])); //存储登录信息
            window.sessionStorage.setItem("token",res.data.data.token); //存储token
            this.$message({
              message: "登陆成功",
              type: "success",
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
        // if (this.form.username === "sun" && this.form.password === "000000") {
        //   // let arr = ['1', '2', '3',"11","12","13"]
        //   let arr = [
        //     //管理中心
        //     1,10,
        //     //分析
        //     2,20,201,21,210,22,220,23,230,
        //     //仓库
        //     3,30,301,302,303,304,31,310,32,321,322,323,324,325,326,33,330,331,332,
        //     //商品
        //     4,41,42,43,44,45,46,47,48,49,411,412,
        //     //采购
        //     5,50,501,51,511,512,513,514,515,52,520,521,522,523,524,525,526,527,528,529,53,530,531,532,533,534,535,536,537,538,54,540,541,542,
        //     //物流
        //     6,61,62,63,64,65,
        //     //订单
        //     7,71,72,73,
        //     //系统
        //     8,81,82,83,84,85,86,87,
        //     //测评
        //     9,,91,911,912,913,914,915,916,92,921,922,923,924,925,926,93,931,95,941,
        //     //新品流程
        //     10,101,1010,1011,1012,102,1020,1021,1022,103,1030,
        //     //财务数据
        //     11,110,1101,1102,1103,1104,1105,1106,111,1111,1112,
        //     //工具类
        //     12,121,122,123,124,125,126
        //     ]
        //   window.sessionStorage.setItem('menulist', JSON.stringify(arr))
        //   this.$router.push("/home");
        //   this.$message({
        //     message: "登陆成功",
        //     type: "success"
        //   });
        // } else if(this.form.username === "admin" && this.form.password === "000"){
        //   let arr = [1]
        //   window.sessionStorage.setItem('menulist', JSON.stringify(arr))
        //   this.$router.push("/home");
        //   this.$message({
        //     message: "登陆成功",
        //     type: "success"
        //   });
        // } else {
        //   if(this.form.username !=='' && this.form.password !== ''){
        //     this.$message.error('用户名或密码错误');
        //   }
        // }
      });

      // this.$http.post("sys/user/login",this.form).then(res=>{

      // })
    },
    // 重置按钮
    reset() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
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