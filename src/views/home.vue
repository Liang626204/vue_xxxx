<template>
<div class="home">
  <el-container>
  <el-aside width="auto" >
    <div class="logo">
    </div>
    <el-menu
      default-active="2"
      class="el-menu-admin"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      background-color="#eee"
      text-color="#000"
      active-text-color="#666">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
          <el-menu-item index="1-1"  class="bo" @click="getuserlist">用户列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
      <div class="toggle-btn"  @click="toggle">
          <i class="myicon myicon-menu"></i>
      </div>
      <div class="el-header" style="color:#fff;">
        什么系统
      </div>
      <div class="welcome">
        <i>欢迎您{{username}}</i>
        <el-button type="danger" @click="outlogin">退出</el-button>
      </div>
    </el-header>
    <el-main>
      <transition
      enter-active-class="animated swing"
      leave-active-class="animated swing"
      mode="out-in"
      >
      <router-view/>
      </transition>
    </el-main>
  </el-container>
</el-container>
</div>
</template>
<script>
export default {
  created () {
    this.username = localStorage.getItem('username')
  },
  data () {
    return {
      username: '',
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    getuserlist () {
      this.$router.push({ name: 'userlist' })
    },
    outlogin () {
      localStorage.removeItem('token')
      /* 跳到登录页 */
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss" scoped>
.bo{
  border: 1px solid black
}
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #F9F9F9;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #409EFF;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
</style>
