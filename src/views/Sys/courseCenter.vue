<template>
  <!--学生的选课页面-->
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" >
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="课程名"></el-input>
			</el-form-item>
			<el-form-item>
        <el-button size="small"  type="primary" icon="fa fa-search" @click="filterSearch">
          搜索
        </el-button>
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
    <div class="content-wrapper">
      <el-table
                :data="alternativeCourse.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                class="table-wrapper"
                size="mini"
                border>
        <el-table-column
          prop="courseName"
          label="课程名">
        </el-table-column>
        <el-table-column
          prop="capacity"
          label="课容量">
        </el-table-column>

        <el-table-column
          prop="score"
          label="学分">
        </el-table-column>

        <el-table-column prop="roomName" width="180"
                         label="开课单位">
        </el-table-column>
        <el-table-column
                         label="上课时间">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.courseDetail" :key="index">{{item.dateName + item.sectionName + item.range}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上课地点">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.courseDetail" :key="index">{{item.place}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teacherName"
                         label="上课老师">
        </el-table-column>

        <el-table-column
          fixed="right" width="80"
          label="操作"
        >
          <template slot-scope="scope">
            <div>
              <div v-if="judgeExist(scope.row)">
                <el-tag type="success" size="mini">
                  已选
              </el-tag> </div>
              <div v-else>
                <el-button type="text" size="small" v-if="!scope.row.studentInfos || scope.row.studentInfos.length < scope.row.capacity" @click="choosed(scope.row)">选课</el-button>
                <el-tag v-else type="warning" size="mini">
                  已满
                </el-tag>
              </div>
            </div>

          </template>
        </el-table-column>
      </el-table>
      <pegitation :handleSizeChange="handleSizeChange" style="margin-top: 10px;"
                  :handleCurrentChange="handleCurrentChange"
                  :currentPage="currentPage" :pagesize="pagesize" :total="total">
      </pegitation>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import pegitation from "@/views/Core/pegitation"
import { format } from "@/utils/datetime"
import {fuzzyQuery} from "../../utils/utils";

export default {
	components:{
    pegitation
	},
	data() {
		return {
			size: 'small',
			filters: {
				name: '',
        status: '0'
			},
      pagesize:10,
      currentPage:1,
      total:0,

      alternativeCourse:[], // 该角色所在系可以选的课程
      templeteAlternativeCourse:[],// 备用模板
		}
	},
  computed:{
    ...mapState({
      user: state=>state.user.users,
    })
  },

	methods: {
    // 分页操作
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    filterSearch(){

      let onefilt = []
      if(this.filters.name.trim()){
        onefilt = fuzzyQuery(this.templeteAlternativeCourse,this.filters.name.trim(),'courseName')
      }else{
         onefilt = this.templeteAlternativeCourse
      }
      this.alternativeCourse = onefilt
    },

    dataSave(row){
      //选课 1 向该课程加入此学生信息  2 向该学生加入此课程信息
      let allSelectedCourse =JSON.parse(localStorage.getItem('allSelectedCourse'))
      let allStudent =JSON.parse(localStorage.getItem('allStudent'))
      console.log(row)
      // 1 向该课程加入此学生信息
      allSelectedCourse.forEach(course=>{
        if(course.selectedCourseId === row.selectedCourseId){
          if(course.studentInfos){
            course.studentInfos.push(this.user)
          }else{
            let courseArr = []
            courseArr.push(this.user)
            course.studentInfos = courseArr
          }
        }
      })
      localStorage.setItem('allSelectedCourse',JSON.stringify(allSelectedCourse))
      // 2 向该学生加入此课程信息
      allStudent.forEach(stu=>{
        if(stu.studentId === this.user.studentId){
          if(stu.studentInfos){
            stu.studentInfos.push(row)
          }else{
            let studentArr = []
            studentArr.push(row)
            stu.studentInfos = studentArr
          }
        }
      })
      localStorage.setItem('allStudent',JSON.stringify(allStudent))
      this.getAllSelectedCourse()
    },
    judgeExist(val){
     console.log(val)
      let flag
      if(val.studentInfos && val.studentInfos.length > 0){
        flag = val.studentInfos.some(item=>{
          return item.studentId == this.user.studentId
        })
      }else{
        flag = false
      }
      console.log(flag)
      return flag
    },
    // 获取所有课程，根据当前登录用户查找出所在系别，找出该系别提供的选课列表
    getAllSelectedCourse(){
      let allSelectedCourse =JSON.parse(localStorage.getItem('allSelectedCourse'))
      if(this.user.roleId === 'student'){
        let studentRoomId = this.user.studentRoomId
        if(studentRoomId){
         let alternativeCourse = allSelectedCourse.filter(course=>{
            return course.roomId === studentRoomId
          })
          this.alternativeCourse = alternativeCourse
        }else{
          this.alternativeCourse = []
        }
        this.templeteAlternativeCourse = JSON.parse(JSON.stringify(this.alternativeCourse))
        this.total = this.alternativeCourse.length
      }
    },
    //点击选课
    choosed(row){
      this.$confirm(`确认选${row.courseName}课程吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataSave(row)
        this.$message({
          type: 'success',
          message: '选课成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消选课'
        });
      });
    },

	},
	mounted() {
    this.getAllSelectedCourse()
	}
}
</script>

<style scoped>

</style>
