<template>
  <div>
    <!-- 面包屑导航 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">活动管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <!-- 搜索框 -->
      <div style="margin-top: 15px;">
        <el-input
          placeholder="请输入内容"
          v-model="searchval"
          class="input-with-select mt-15 mb-15"
          style="width: 500px;"
          @keyup.enter.native="search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <el-button type="primary" plain  @click="adduser">添加用户</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" border style="width: 100%" type="index">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
            v-model=scope.row.mg_state
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeswitch(scope.row)"
            >
          </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" circle @click="handlecheck(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页导航 -->
    <div>
      <div class="block mt-15">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total= 'this.totallist'
        ></el-pagination>
      </div>
    </div>
    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-position="labelPosition" :rules="rules" ref="formdata">
        <el-form-item label="用户名" :label-width="formLabelWidth"
        prop="username"
        >
          <el-input v-model="form.username" autocomplete="off" hide-required-asterisk = 'true'></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formdata')">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑用户  -->
    <el-dialog title="编辑用户" :visible.sync="userdialogFormVisible">
      <el-form :model="usersform" :label-position="labelPosition" ref="usersformdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="usersform.username" autocomplete="off" hide-required-asterisk = 'true' :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="usersform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="usersform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="userdialog-footer">
        <el-button @click="userdialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click='edituser' >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { userlists, adduserinfo, delsinge, toedieuser, useractive } from '@/api/index.js'
export default {
  data () {
    /* 自定义验证规则 */
    var checkemail = (rule, value, callback) => {
      var emailtype = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (emailtype.test(value)) {
          callback()
        } else {
          callback(new Error('格式不正确'))
        }
      }
    }
    return {
      searchval: '',
      tableData: [],
      /* 总条数 */
      totallist: 0,
      pagesize: 10,
      pagenum: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      /* 编辑用户 */
      userdialogFormVisible: false,
      /*  */
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      /* 编辑用户信息 */
      usersform: {
        username: '',
        email: '',
        mobile: ''
      },
      /* 右对齐 */
      labelPosition: 'right',
      formLabelWidth: '120px',
      /* 添加验证规则 */
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        email: [
          /* 自定验证方法 */
          { validator: checkemail, required: true, trigger: ['blur', 'change'] }
        ],
        mobile: [
          { message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // eslint-disable-next-line no-undef
    this.getlist()
  },
  /* 验证规则 */

  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      userlists({ query: this.searchval, pagenum: this.pagenum, pagesize: this.pagesize }).then(
        res => {
          this.tableData = res.data.data.users
          this.totallist = res.data.data.total
          console.log(res.data.data)
        }
      )
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      userlists({ query: this.searchval, pagenum: this.pagenum, pagesize: this.pagesize }).then(
        res => {
          this.tableData = res.data.data.users
          this.totallist = res.data.data.total
          console.log(res.data.data)
        }
      )
    },
    /* 获取用户数据 */
    getlist () {
      userlists({ query: this.searchval, pagenum: 1, pagesize: 10 }).then(
        res => {
          this.tableData = res.data.data.users
          this.totallist = res.data.data.total
          console.log(res.data.data)
        }
      )
    },
    search () {
      this.getlist()
    },
    /* 添加用户弹窗 */
    adduser () {
      this.dialogFormVisible = true
    },
    // /* 添加用户确认 */
    // toadd () {
    //   this.dialogFormVisible = false
    //   console.log(this.form)
    // },
    /* 提交新增信息 */
    submitForm (formdata) {
      // console.log(this.$refs[formdata])
      this.$refs[formdata].validate((valid) => {
        if (valid) {
          // alert('submit!')
          /* 请求成功操作 */
          this.dialogFormVisible = false
          adduserinfo(this.form)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.getlist()
                this.$message(res.data.meta.msg)
                this.form.username = ''
                this.form.password = ''
                this.form.email = ''
                this.form.mobile = ''
                this.$nextTick(() => {
                  this.$refs.formdata.clearValidate()
                })
              } else {
                this.$message(res.data.meta.msg)
                this.$refs.formdata.clearValidate()
              }
            })
          console.log(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 编辑处理 */
    handleEdit (index, row) {
      console.log(index, row)
      this.userdialogFormVisible = true
      this.usersform.username = row.username
      this.usersform.email = row.email
      this.usersform.mobile = row.mobile
      this.usersform.id = row.id
    },
    handleDelete (index, row) {
      console.log(row.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delsinge(row.id)
          .then(res => {
            console.log(res)
            this.getlist()
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handlecheck (index, row) {
      console.log(index, row)
    },
    /* 提交修改 */
    edituser () {
      console.log(this.usersform.id)
      toedieuser(this.usersform.id, this.usersform)
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.getlist()
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          } else {
            this.$message({
              type: 'info',
              message: res.data.meta.msg
            })
          }
        })
      this.userdialogFormVisible = false
    },
    /* 开关控制 */
    changeswitch (x) {
      console.log(x)
      useractive(x.id, x.mg_state)
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.getlist()
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          } else {
            this.$message({
              type: 'info',
              message: res.data.meta.msg
            })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
