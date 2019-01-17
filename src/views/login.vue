<template>
  <div class="login">
    <!-- :model='用于保存表单中的数据' -->
    <!--:rules设置校验信息  -->
    <el-form :model="loginForm" :rules="loginRules" class="container" ref="loginname">
      <el-form-item >
        <div class="avatar">
          <img src="../assets/Snipaste_2019-01-16_21-09-37.png" alt>
        </div>
      </el-form-item>
      <el-form-item prop='username' >
        <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key" @keydown.enter.native="handlelogin"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="handlelogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '@/api/index.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handlelogin () {
      console.log('1111')
      this.$refs.loginname.validate(isok => {
        if (isok) {
          // console.log('登录成功')
          login({ username: this.loginForm.username, password: this.loginForm.password })
            .then(res => {
              if (res.data.meta.status === 200) {
                console.log(res)
                /* 储存token值到本地 */
                localStorage.setItem('token', res.data.data.token)
                /* 将用户名存进本地 */
                localStorage.setItem('username', res.data.data.username)
                /* 跳转 */
                this.$router.push({ name: 'home' })
              } else {
                // 弹出错误提示信息，res.data.meta.msg
                this.$message.error(res.data.meta.msg)
              }
            })
        } else {
          alert('请输入信息 ')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
