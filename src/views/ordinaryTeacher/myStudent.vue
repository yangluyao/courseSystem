
<template>
  <!--普通教师  我的课程详情-->
  <div class="page-container">
    <!--工具栏-->
    <div style="width: 90%">
      <el-card class="box-card" style="margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span>我的学生</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div>
          <el-table
            :data="hisChoosedCourse.studentInfos"
            class="table-wrapper"
            size="mini"
            border>
            <el-table-column
              prop="studentName"
              label="学生姓名">
            </el-table-column>
            <el-table-column
              prop="studentPhone"
              label="联系方式">
            </el-table-column>
            <el-table-column
              prop="studentRoomName"
              label="所属院系">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>


  </div>
</template>
<script>
  import pegitation from '@/views/Core/pegitation'
  import { genID , fuzzyQuery} from '../../utils/utils'
  import { mapState } from 'vuex'
  export default {
    components:{
      pegitation
    },
    data() {
      return {
        size: 'small',
        haveCourse: true,
        hisChoosedCourse:{}
        /*      filters: {
                name: ''
              },
              pagesize:10,
              currentPage:1,
              total:10,
              operation: false, // true:新增, false:编辑
              addDiaolg: false, // 新增编辑界面是否显示
              editLoading: false,
              dataFormRules: {
                courseName: [
                  { required: true, message: '请输入角色名', trigger: 'blur' }
                ]
              },
              // 新增编辑界面数据
              dataForm: {
                roomId: '',
                roomName: '',
              },
              roomList:[],*/
      }
    },
    computed:{
      ...mapState({
        user: state=>state.user.users,
      })
    },
    methods: {

      // 获取该老师教的这门选课  -》 得到选这门课的学生
      initData(){
        console.log(this.user)
        // let allTeacher = JSON.parse(localStorage.getItem('allStudent'))
        let allSelectedCourse =JSON.parse(localStorage.getItem('allSelectedCourse'))
        if(this.user.teacherCourse){
          let hisChoosedCourse = {}
          // 从所有的选课中找 当前登录用户 教的课程
          let existHisCourse  = allSelectedCourse.some(item=>{
            hisChoosedCourse = item
            return item.courseId ===this.user.teacherCourse && item.teacherId===this.user.teacherId
          })
          if(existHisCourse){
            this.haveCourse =true
            this.hisChoosedCourse = hisChoosedCourse
            console.log(this.hisChoosedCourse)
          }else{
            this.haveCourse = false
            console.log('盖教师暂无选课')
          }

        }else{
          console.log('该老师目前暂无课程')
        }

      }


    },
    mounted() {
      this.initData()
    }
  }
</script>
<style scoped>
  .label{
    color:#a4a6a9;
  }
</style>
