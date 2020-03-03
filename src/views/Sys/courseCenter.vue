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
<!--	<div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
		<el-form :inline="true" :size="size">
			<el-form-item>
				<el-button-group>
				<el-tooltip content="刷新" placement="top">
					<el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
				</el-tooltip>
				<el-tooltip content="列显示" placement="top">
					<el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>
				</el-tooltip>
				<el-tooltip content="导出" placement="top">
					<el-button icon="fa fa-file-excel-o"></el-button>
				</el-tooltip>
				</el-button-group>
			</el-form-item>
		</el-form>
		&lt;!&ndash;表格显示列界面&ndash;&gt;
		<table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"
			@handleFilterColumns="handleFilterColumns">
		</table-column-filter-dialog>
	</div>-->
	<!--表格内容栏-->
<!--	<kt-table permsEdit="sys:user:edit" permsDelete="sys:user:delete"
		:data="pageResult" :columns="filterColumns"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>-->
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
            <el-button type="text" size="small" v-if="scope.row.status == '0'" @click="choosed(scope.row)">选课</el-button>
            <el-tag v-else type="warning" size="mini">
              已满
            </el-tag>
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
      allCourseChoosed: allCourseChoosed
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
      console.log(row)
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
    }

	},
	mounted() {

	}
}
</script>

<style scoped>

</style>
