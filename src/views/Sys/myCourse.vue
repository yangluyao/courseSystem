<template>
  <div class="page-container">
	<!--工具栏-->
<!--	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="用户名"></el-input>
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
	</div>-->
<div style="float:left;padding-top:50px;padding-left:10px;width: 100%;">
    <el-tabs v-model="activeName"  type="border-card"  style="min-height: 400px">
      <el-tab-pane name="plan" label="选课计划">
        <el-row class="data-icons" style="margin-top: 60px;">
          <el-col :span="6">
            <div  class="item">
              <div  class="item-icon" style="color: rgb(63, 161, 255);">
                <i class="iconfont iconplan"></i>
              </div>
              <div class="item-info">
                <span>已选课程门数</span>
                <h3  style="color: rgb(63, 161, 255);">
                  <span >{{haseCourse.length?haseCourse.length : 0}}</span>
                </h3>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div  class="item">
              <div  class="item-icon" style="color: rgb(63, 161, 255);">
                <i class="iconfont iconcheck"></i>
              </div>
              <div class="item-info">
                <span>当前已选学分</span>
                <h3  style="color: rgb(63, 161, 255);">
                  <span>{{currentScore}}</span>
                </h3>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div  class="item">
              <div  class="item-icon" style="color: rgb(63, 161, 255);">
                <i class="iconfont icon-Cancel-File"></i>
              </div>
              <div class="item-info">
                <span>选课学分上线</span>
                <h3  style="color: rgb(63, 161, 255);">
                  <span >20</span>
                </h3>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div  class="item">
              <div  class="item-icon" style="color: rgb(63, 161, 255);">
                <i class="iconfont icon-Cancel-File"></i>
              </div>
              <div class="item-info">
                <span>退选课程数</span>
                <h3  style="color: rgb(63, 161, 255);">
                  <span >{{cancelCourse.length?cancelCourse.length: 0}}门</span>
                </h3>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="hased" label="已选课程">

            <el-table
              :data="haseCourse.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
                  <el-button type="text" size="small" @click="cancelChoose(scope.row)">退选</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pegitation :handleSizeChange="handleSizeChange" style="margin-top: 10px;text-align: right"
                        :handleCurrentChange="handleCurrentChange"
                        :currentPage="currentPage" :pagesize="pagesize" :total="total">
            </pegitation>
          <!--</div>-->
      </el-tab-pane>
      <el-tab-pane label="退选记录" name="backed">
        <el-table
          :data="cancelCourse.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
        </el-table>
        <pegitation :handleSizeChange="handleSizeChange" style="margin-top: 10px;text-align: right"
                    :handleCurrentChange="handleCurrentChange"
                    :currentPage="currentPage" :pagesize="pagesize" :total="total">
        </pegitation>
      </el-tab-pane>
    </el-tabs>
</div>
    <!--表格内容栏-->

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
  computed:{
    ...mapState({
      user: state=>state.user.users,
    })
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
        total:10,
        haseCourse: [],
        activeName: 'plan',
        currentScore: 0,
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
   getInitData(){
     let courseSituation =JSON.parse(localStorage.getItem('courseSituation'))
     if(courseSituation && courseSituation.length > 0){
       courseSituation.forEach(item=>{
         if(item.name  === this.user.loginName){
           this.haseCourse = item.course
           this.cancelCourse = item.cancelCourse
         }else{
           this.haseCourse = []
         }
       })
     }
     this.total = this.haseCourse.length
     // 计算学分
     if(this.haseCourse && this.haseCourse.length >0 ){
       let score = 0
       this.haseCourse.forEach(item=>{
         score+=item.score
       })
       this.currentScore = score
     }
   },
    filterSearch(){
   /*   let templeteCourseData = JSON.parse(JSON.stringify(allCourseChoosed))
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
      }*/
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 退选
    dataCancel(row){
      let courseSituation =JSON.parse(localStorage.getItem('courseSituation'))
      if(courseSituation){
        courseSituation.forEach(item=>{
          if(item.name === this.user.loginName){
            item.course = item.course.filter(function(courseitem) {
              console.log(courseitem)
              return courseitem.courseId != row.courseId
             });
            console.log(item.course)
            if(item.cancelCourse){
              item.cancelCourse.push(row)
            }else{
              let arr =[]
              arr.push(row)
              this.$set(item,'cancelCourse',arr)
            }
            console.log(item)
          }

        })
        localStorage.setItem('courseSituation',JSON.stringify(courseSituation))
        this.getInitData()
      }
    },
    cancelChoose(row){
      this.$confirm(`确认退选${row.courseName}课程吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataCancel(row)
        this.$message({
          type: 'success',
          message: '退选成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退选'
        });
      });
    }
	},
	mounted() {
   this.getInitData()
	}
}
</script>

<style scoped>
  .data-icons .item{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 120px;
    margin: 0 auto;
  }
  .data-icons .item-icon {
    margin-top: 3px;
    margin-right: 8px;
  }
  .data-icons .item-icon i {
    font-size: 46px
  }
  .data-icons .item-info {
    line-height: 25px;
  }

</style>
