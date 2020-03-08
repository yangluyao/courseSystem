<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <span class="tool-bar">
      <!-- 主题切换 -->
      <!--<theme-picker style="float:right;" class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>-->
      <!-- 语言切换 -->
      <!-- <lang-selector class="lang-selector"></lang-selector>    -->
    </span>
    <h2 class="title" style="padding-left:22px;" >选课系统登录</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import { mapState } from 'vuex'
import Cookies from "js-cookie"
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"
import { loginInfo,allStudent,allTeacher,allRoom,adminCourse, studentMenu,teacherMenu,superiorTeacherMenu,adminMenu } from  '../utils/allData.js'
export default {
  name: 'Login',
  components:{
    ThemePicker,
    LangSelector
  },
  data() {
    return {
      loading: false,
      loginForm: {
        account: 'admin',
        password: '123456',
        captcha:'',
        src: '',
      },
      fieldRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login() {
      this.loading = true
      let userInfo = {account:this.loginForm.account, password:this.loginForm.password, captcha:this.loginForm.captcha}
      let teacher =JSON.parse(localStorage.getItem('allTeacher'))
      let student =JSON.parse(localStorage.getItem('allStudent'))
     let isLogin = {}
     let haveAccount = false
      if(this.loginForm.account === 'admin'){
        isLogin = {
          loginName: 'admin',
          roleId:'admin'
        }
        haveAccount = true
      }
      else if(this.loginForm.account === 'supTeacher'){
        isLogin = {
          loginName: 'supTeacher',
          roleId:'supTeacher'
        }
        haveAccount = true
      }
      else{
        let loginMoreInfo = {}
        let existLogin =  teacher.some(loginer=>{
          loginMoreInfo = loginer
         return  loginer.teacherName === this.loginForm.account
        })
        if(existLogin){
          isLogin = loginMoreInfo
          haveAccount = true
        }else {
          let studentLogin =  student.some(loginer=>{
            loginMoreInfo = loginer
            return  loginer.studentName === this.loginForm.account
          })
          if(studentLogin){
       /*     isLogin= {
              loginName: this.loginForm.account,roleId:'student',roomId:loginMoreInfo.studentRoomId,roomName:loginMoreInfo.studentRoomName
            }*/
            isLogin = loginMoreInfo
            haveAccount = true
          }else{
            haveAccount = false
          }
        }
      }

      if(haveAccount){
        let pwd=''
        let menu = []
        switch (isLogin.roleId) {
          case 'admin':
            pwd = 'admin'
            menu = adminMenu
            break;
          case 'student':
            pwd = 'student'
            menu=studentMenu
            break;
          case 'teacher':
            pwd = 'teacher'
            menu = teacherMenu
            break;
          case 'supTeacher':
            pwd = 'supTeacher'
            menu =superiorTeacherMenu
            break;
        }
        if(this.loginForm.password === pwd){
          this.loading = false
          this.$store.commit('setUserInfo',isLogin)
          this.$store.commit('setNavTree',menu)
          this.$router.push('/')
        }else{
          this.loading = false
          this.$message({
            message: '密码错误',
            type: 'error'
          })
        }


      }else{
        this.loading = false
        this.$message({
          message: '暂无此账户',
          type: 'error'
        })
      }
    },
    refreshCaptcha: function(){
      this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
    },
    reset() {
      this.$refs.loginForm.resetFields()
    },
    // 切换主题
    onThemeChange: function(themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    },
    // 学生 教师，课程 信息初始化
    initStaticData(){
      let localAllRoom = JSON.parse(localStorage.getItem('allRoom'))
      let localAllStudent = JSON.parse(localStorage.getItem('allStudent'))
      let localAllTeacher = JSON.parse(localStorage.getItem('allTeacher'))
      let localadminCourse = JSON.parse(localStorage.getItem('adminCourse'))
      if( !localAllRoom){
        localStorage.setItem('allRoom',JSON.stringify(allRoom))
      }
      if( !localAllStudent){
        localStorage.setItem('allStudent',JSON.stringify(allStudent))
      }
      if( !localAllTeacher){
        localStorage.setItem('allTeacher',JSON.stringify(allTeacher))
      }
      if( !localadminCourse){
        localStorage.setItem('adminCourse',JSON.stringify(adminCourse))
      }

    }
  },
  mounted() {
    this.initStaticData()


  },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor
    })
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
