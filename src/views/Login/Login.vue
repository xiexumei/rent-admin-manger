<template>
  <div class="login-bg">
    <div>
      <img style="width: 70px; height: 50px;" src="../../../static/image/logo.png"/>
      <span class="logo-title">房屋租赁系统</span>
    </div>
    <div>
      <div class="login-wrap">
        <div class="login-left">
          <div class="login-lunbo"></div>
        </div>
        
       
        <div class="login-content">
          <div class="login-tit">
          LOGIN
          </div>
          <el-form  ref="loginForm" :rules="rules" :model="loginForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username" class="demo">
          <el-input icon="el-icon-phone" placeholder="手机号" v-model="loginForm.username" width="70%"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <div class="lo-btn" @click="handleLogin()">登录</div>
      </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { login,getRoleList } from '@/api/user'
import {mapGetters} from 'vuex'
import {getToken, setToken, removeToken} from '@/utils/auth.js'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }

    return {
      check: true,
      loginForm: {
        username: '',
        password: '',
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },

      rules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }]
      },
      loading: true
    };
  },
  computed:{
    ...mapGetters(['roles'])

  },
  watch:{
    'roles':function(){
      var newroles = []
      this.roles.forEach((item, index)=>{
        newroles.push(item.url)
      })
    }

  },
  methods: {
    async handleLogin() {
      console.log('登录')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //this.$router.push('/index')
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            this.loading = false
             this.$message({
                  type: "success",
                  message: "登录成功!"
                });

          //   localStorage.setItem('ms_username', this.loginForm.username)
           localStorage.setItem('ms_username', this.loginForm.username)
           //  localStorage.setItem('token', res.token)

            this.$router.push('/index')
           

            //登录成功
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })

    }
  }
};
</script>
<style scoped>
.login-bg {
  padding: 20px;
  background-color: rgb(160,170,173);
  overflow: hidden;
  min-height: 100%;
}
.logo-title{
  font-size: 20px;
  font-weight: 700;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(101, 101, 101, 0.2);
}
.login-wrap{
  margin: 0 auto;
  width: 80%;
  height: 600px;
  border: 1px solid #000;
  box-shadow: 10px 10px 5px #888888;
}

.login-left{
  display: inline-block;
  width: 60%;
  height:  600px;
}
.login-lunbo{
  width: 100%;
  height: 99%;
  border: 1px solid #000;
  background: url(../../../static/image/login-bg.jpg) no-repeat center center;
}
.login-content{
  display: inline-block;
  box-sizing: border-box;
  vertical-align:top;
  padding-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
  width: 39%;
  height:  600px;
  border: 1px solid #000;
  background-color: #fff;

}
.login-tit{
  height: 140px;
  font-size: 40px;
}
.lo-btn{
 height: 40px;
 line-height: 40px;
 background-color: #fcb2bf;
}


</style>