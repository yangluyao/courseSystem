
<template>
  <!--教研人员 学生选课管理-->
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" >
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input size="small" v-model="filters.name" placeholder="课程名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" @click="filterSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->

    <el-table
      :data="selectedCourseList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      class="table-wrapper"
      size="mini"
      border>
      <el-table-column width="180"
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
      <el-table-column
        label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.courseType === '1'?'选修':'必修'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roomName"
                       label="开课院系">
      </el-table-column>
      <el-table-column prop="teacherName"
                       label="上课老师">
      </el-table-column>
      <el-table-column label="已选人数">
        <template slot-scope="scope">
          <span>{{scope.row.studentInfos? scope.row.studentInfos.length: '0'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right" width="250"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" :disabled="!scope.row.studentInfos || scope.row.studentInfos.length <=0" size="small" @click="viewStudent(scope.row)">已选学生列表</el-button>
          <el-button type="text" size="small"  @click="addStuToHasCourse(scope.row)">添加学生至该课程</el-button>

        </template>
      </el-table-column>
    </el-table>
    <pegitation :handleSizeChange="handleSizeChange" style="margin-top: 10px;text-align: right"
                :handleCurrentChange="handleCurrentChange"
                :currentPage="currentPage" :pagesize="pagesize" :total="total">
    </pegitation>

    <el-dialog v-if="studentDiaolg" title="学生情况" width="60%" :visible.sync="studentDiaolg" :close-on-click-modal="false">
      <el-table
        :data="studentList"
        class="table-wrapper"
        size="mini"
        border>
        <el-table-column width="180"
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

        <!--<el-table-column
          fixed="right" width="120"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editSelectedCourse(scope.row)">已选学生列表</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <div slot="footer" class="dialog-footer" >
        <el-button :size="size" @click.native="studentDiaolg = false">取消</el-button>
        <!--<el-button :size="size" type="primary" @click.native="submitStudent" :loading="editLoading">确认</el-button>-->
      </div>
    </el-dialog>
    <el-dialog v-if="addStuDialog" title="学生情况" width="60%" :visible.sync="addStuDialog" :close-on-click-modal="false">
      <el-checkbox-group
        v-model="checkedStudent"
        :min="0"
        :max="maxNum">
        <el-checkbox v-for="stu in unHasedStu" :label="stu.studentId" :key="stu.studentId">{{stu.studentName}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer" >
        <el-button :size="size" @click.native="addStuDialog = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="confirmAdd" >确认</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  import pegitation from '@/views/Core/pegitation'
  import {fuzzyQuery, genID, getDiffer, getNameById} from '../../utils/utils'
  export default {
    components:{
      pegitation
    },
    data() {
      return {
        size: 'small',
        filters: {
          name: ''
        },
        pagesize:10,
        currentPage:1,
        total:10,
        selectedCourseList:[],// 所有的选课列表
        studentDiaolg: false,
        studentList:[], // 学生列表

        addStuDialog:false,
        unHasedStu:[],
        checkedStudent:[], // 选中的学生
        maxNum:0,
        checkedCourse:{}


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


      // 获取选课列表
      getSelectedCourseList(){
        let allSelectedCourse =JSON.parse(localStorage.getItem('allSelectedCourse'))
        if(allSelectedCourse){
          this.selectedCourseList = allSelectedCourse
        }else{
          this.selectedCourseList = []
        }
        this.total  =  this.selectedCourseList.length
      },
      filterSearch(){
        let allSelectedCourse =JSON.parse(localStorage.getItem('allSelectedCourse'))
        let onefilt = []
        if(this.filters.name.trim()){
          onefilt = fuzzyQuery(allSelectedCourse,this.filters.name.trim(),'courseName')
          console.log(onefilt)
        }else{
          onefilt = allSelectedCourse
        }
        this.selectedCourseList = onefilt
      },
      // 查看学生列表
      viewStudent(row){
        this.studentDiaolg = true
        console.log(row)
        this.studentList = row.studentInfos
      },
      addStuToHasCourse(row){
        this.checkedCourse = row
        this.checkedStudent = []
        this.addStuDialog =true;
        this.studentList = row.studentInfos
        if(this.studentList){
          console.log(row.capacity)
          console.log(this.studentList.length)
          this.maxNum = Number(row.capacity) -  this.studentList.length
        }else{
          this.maxNum = row.capacity
        }
        console.log(this.maxNum)

        this.studentList = row.studentInfos?row.studentInfos: []
        let allStudent = JSON.parse(localStorage.getItem('allStudent'))
       let resultArr = getDiffer(allStudent,this.studentList,'studentId')
        console.log(resultArr)
        this.unHasedStu = resultArr
      },
      confirmAdd(){
        console.log(this.checkedStudent)
        let checkedStu =[]
        this.checkedStudent.forEach(item=>{
          let arrObj =  getNameById(item, 'studentId',this.unHasedStu)
          checkedStu.push(arrObj[0])
        })
        console.log(checkedStu)
        // let tempCheckedStu = JSON.parse(JSON.stringify(checkedStu))
        // 该学生 添加这门课
        checkedStu.forEach(stu=>{
          if(stu.studentInfos){
            stu.studentInfos.push(this.checkedCourse )
          }else{
            let tempArr = []
            tempArr.push(this.checkedCourse)
            stu.studentInfos = tempArr
          }
        })

        let allStudent = JSON.parse(localStorage.getItem('allStudent'))
         allStudent.forEach(all=>{
          checkedStu.forEach(check=>{
            if(all.studentId === check.studentId){
              console.log(all)
              console.log(check)
              all.studentInfos = check.studentInfos
              // all =  Object.assign({}, check)
            }
          })
        })
        console.log(allStudent)
        localStorage.setItem('allStudent',JSON.stringify(allStudent))

        // 该课程 添加选中的学生
/*        console.log(this.checkedCourse)
        if(this.checkedCourse.studentInfos){
          this.checkedCourse.studentInfos.concat(tempCheckedStu)
        }else{
          this.checkedCourse.studentInfos =tempCheckedStu
        }*/
      }




    },
    mounted() {
      this.getSelectedCourseList()
    }
  }
</script>
<style scoped>

</style>
