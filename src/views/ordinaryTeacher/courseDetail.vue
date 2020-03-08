
<template>
  <!--普通教师  我的课程详情-->
  <div class="page-container">
    <!--工具栏-->
<div style="width: 90%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的课程</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <el-row>
          <el-col :span="12"><span class="label">课程名：</span><span>{{hisChoosedCourse.courseName}}</span></el-col>
          <el-col :span="12"><span class="label">课容量：</span><span>{{hisChoosedCourse.capacity}}</span></el-col>
          <el-col :span="12"><span class="label">类型：</span><span>{{hisChoosedCourse.courseType == '1'?'选修':'必修'}}</span></el-col>
          <el-col :span="12"><span class="label">开课院系：</span><span>{{hisChoosedCourse.roomName}}</span></el-col>
          <el-col :span="12"><span class="label">教师：</span><span>{{hisChoosedCourse.teacherName}}</span></el-col>
          <el-col :span="12"><span class="label">学分：</span><span>{{hisChoosedCourse.score}}</span></el-col>
        </el-row>
        <hr>
        <span class="label">上课时间：</span>
        <el-row >
          <el-col :span="24" v-for="time in hisChoosedCourse.courseDetail">
            <div style="margin: auto 20px;">{{time.dateName}}&nbsp;&nbsp;&nbsp;{{time.sectionName}}&nbsp;&nbsp;({{time.range}})
              <div style="display: inline-block;margin: auto 10px">{{time.place}}</div>
            </div>
          </el-col>
        </el-row>
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
/*      // 分页操作
      handleSizeChange(val) {
        this.pagesize = val
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      filterSearch(){
        let allRoom =JSON.parse(localStorage.getItem('allRoom'))
        let onefilt = []
        if(this.filters.name.trim()){
          onefilt = fuzzyQuery(allRoom,this.filters.name.trim(),'roomName')
          console.log(onefilt)
        }else{
          onefilt = allRoom
        }
          this.roomList = onefilt
      },

      // 获取所有教师列表
      getAllRoom(){
        let allRoom =JSON.parse(localStorage.getItem('allRoom'))
        if(allRoom){
          this.roomList = allRoom
        }else{
          this.roomList = []
        }
        this.total  =  this.roomList.length
      },
      // 新增课程
      addRoom(){
        this.addDiaolg = true
        this.operation = true // 标记是新增
        this.dataForm={
          roomId:'',
          roomName:'',
        }
      },

      // 显示编辑界面
      editRoom: function (row) {
        this.addDiaolg = true
        this.operation = false
        // 回显数据
        this.dataForm.roomId = row.roomId
        this.dataForm.roomName = row.roomName
      },

      getCourseNameById(courseId){
        let ARR = this.adminCourse.filter(item=>{
              if(item.courseId === courseId){
                return item
              }
            })
            return ARR
          },
      // 确定新增或修改
      addConfirm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.editLoading = true
            let allRoom =JSON.parse(localStorage.getItem('allRoom') )
            let obj = {
              roomId:this.dataForm.roomId,
              roomName:this.dataForm.roomName,
            }
            // 新增
            if(this.operation){
              let roomArr = []
              obj.roomId = genID(5)
              if(allRoom){
                allRoom.push(obj)
                localStorage.setItem('allRoom',JSON.stringify(allRoom))
              }else{
                roomArr.push(obj)
                localStorage.setItem('allRoom',JSON.stringify(roomArr))
              }
              this.editLoading = false
              this.$message({ message: '新增成功', type: 'success' })
              this.addDiaolg = false
              this.getAllRoom()
            }else{
              //修改
              allRoom.forEach(item=>{
                if(item.roomId === this.dataForm.roomId){
                  item.roomName = this.dataForm.roomName
                }
              })
              this.editLoading = false
              this.addDiaolg = false
              localStorage.setItem('allRoom',JSON.stringify(allRoom))
              this.$message({ message: '修改成功', type: 'success' })
              // this.getAllTeacher()
              this.getAllRoom()
            }
          }
        })
      },
      deleteRoom(row){
        this.$confirm(`确认删除${row.roomName}吗？`, '提示', {}).then(() => {
          let allRoom =JSON.parse(localStorage.getItem('allRoom'))
          allRoom.forEach((item,index)=>{
            if(item.roomId=== row.roomId){
              allRoom.splice(index,1)
            }
          })
          localStorage.setItem('allRoom',JSON.stringify(allRoom))
          this.$message({ message: '删除成功', type: 'success' })
          this.getAllRoom()
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
    })
        }*/

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
