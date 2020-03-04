<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="开课单位"></el-input>
			</el-form-item>
      <el-form-item>
        <el-select v-model="filters.status" placeholder="请选择">
          <el-option label="已满" value="1"></el-option>
          <el-option label="可选" value="0"></el-option>
        </el-select>
      </el-form-item>
			<el-form-item>
        <el-button size="small"  type="primary" icon="fa fa-search" @click="filterSearch">
          搜索
        </el-button>
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
    <div class="content-wrapper" style="margin-top: 50px" >
      <el-table
                :data="allCourseChoosed.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                class="table-wrapper"
                size="mini"
                border>
        <el-table-column
          prop="courseNumber"
          label="课程号"
          >
        </el-table-column>
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

        <el-table-column prop="danwei" width="180"
                         label="开课单位">
        </el-table-column>
        <el-table-column width="180"
                         label="上课时间">
          <template slot-scope="scope">
            <div v-for="item in scope.row.time">{{item.date + item.section + item.range}}</div>
          </template>
        </el-table-column>
        <el-table-column
                         label="上课地点">
          <template slot-scope="scope">
            <div v-for="item in scope.row.place">{{item}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teacher"
                         label="上课老师">
        </el-table-column>
        <el-table-column prop="className"
                         label="上课班级">
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
                <el-button type="text" size="small" v-if="scope.row.status == '0'" @click="choosed(scope.row)">选课</el-button>
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

import {allCourseChoosed} from '../../utils/allData'

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
      ////////////////
      pagesize:10,
      currentPage:1,
      total:allCourseChoosed.length,
      allCourseChoosed: allCourseChoosed,
      haseCourse: []
		}
	},
  computed:{
    ...mapState({
      user: state=>state.user.users,
    })
  },
  filters: {
    existCourse: function (value) {
       if(this.haseCourse && this.haseCourse.length > 0){
           return this.haseCourse.find(item=>{
             item.courseId = value.courseId
           })
       }else{
         return false
       }
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
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
      let templeteCourseData = JSON.parse(JSON.stringify(allCourseChoosed))
      function fuzzyQuery(list, keyWord) {
        var reg =  new RegExp(keyWord);
        var arr = [];
        for (var i = 0; i < list.length; i++) {
          if (reg.test(list[i])) {
            arr.push(list[i]);
          }
        }
        return arr;
      }
      let onefilt = []
      if(this.filters.name.trim()){
         onefilt = fuzzyQuery(templeteCourseData,this.filters.name.trim())
      }else{
         onefilt = templeteCourseData
      }
      if(onefilt && onefilt.length > 0){
        this.allCourseChoosed =  onefilt.filter(item=>{
          return item.status === this.filters.status
        })
      }else{
        this.allCourseChoosed = []
      }
    },

    dataSave(row){
      let courseSituation =JSON.parse(localStorage.getItem('courseSituation'))
      if(courseSituation){
        courseSituation.forEach(item=>{
          if(item.name === this.user.loginName){
            item.course.push(row)
            console.log(item)
          }else{
            let chosedArr =[]
            chosedArr.push(row)
            var stu = {
              name: this.user.loginName,
              course:chosedArr
            }
            courseSituation.push(stu)
          }
        })
        localStorage.setItem('courseSituation',JSON.stringify(courseSituation))
        this.getHasedCourse()
      }
      else{
        let newobj = [] , newchosedArr =[];
        newchosedArr.push(row)
        newobj.push({
          name: this.user.loginName,
          course:newchosedArr
        })
        localStorage.setItem('courseSituation',JSON.stringify(newobj))
      }
    },
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
    // 获取已选课程
    getHasedCourse(){
      let courseSituation = JSON.parse(localStorage.getItem('courseSituation'))
      if(courseSituation){
        courseSituation.forEach(item=>{
          if(item.name === this.user.loginName){
            this.haseCourse = item.course;
          }
        })
      }

    },
    judgeExist(val){
      let a =''
      if(this.haseCourse && this.haseCourse.length > 0){
       a=   this.haseCourse.find(item=>{
          return item.courseId === val.courseId
        })
      }
      return a
    }

	},
	mounted() {
this.getHasedCourse()
	}
}
</script>

<style scoped>

</style>
