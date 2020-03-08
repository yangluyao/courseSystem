
<template>
  <!--教师角色的 负责维护课程页-->
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input size="small" v-model="filters.name" placeholder="课程名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" @click="filterSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" type="primary" @click="addSelectCourse">新增</el-button>
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
      <el-table-column width="180"
                       label="上课时间">
        <template slot-scope="scope">
          <div v-for="(item,index) in scope.row.courseDetail" :key="index">{{item.dateName + item.sectionName + item.range}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="上课地点">
        <template slot-scope="scope">
          <div v-for="item in scope.row.courseDetail">{{item.place}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="teacherName"
                       label="上课老师">
      </el-table-column>
      <el-table-column
        fixed="right" width="120"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editSelectedCourse(scope.row)">修改</el-button>
          <el-button  type="text" style="color: red;" size="small" @click="deleteSelectedCourse(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pegitation :handleSizeChange="handleSizeChange" style="margin-top: 10px;text-align: right"
                :handleCurrentChange="handleCurrentChange"
                :currentPage="currentPage" :pagesize="pagesize" :total="total">
    </pegitation>
    <!--新增编辑界面-->
    <!--授课老师， 课程类别（选秀，必修），课时，上课时间，限选人数-->
    <el-dialog v-if="dialogVisible" :title="operation?'新增选课':'编辑'" width="60%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size" style="height: 300px;">
        <el-scrollbar style="height: 100%">
        <el-form-item label="课程名"  >
          <el-select v-model="dataForm.courseId" placeholder="请选择课程" @change="getTeacherByCourse"
                     style="width: 100%" :no-data-text="courseExist?'':'暂无课程信息'">
            <el-option
              v-for="item in courseAndTeacher"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="授课老师"  >
            <el-select v-model="dataForm.teacherId" placeholder="请选择教师"
                       style="width: 100%" :no-data-text="teacherExist?'该课程暂无教师':'请先选择课程'">
              <el-option
                v-for="item in teacherList"
                :key="item.teacherId"
                :label="item.teacherName"
                :value="item.teacherId">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="开课院系" prop="name">
          <el-select v-model="dataForm.roomId" placeholder="请选择" style="width: 100%" :no-data-text="roomExist?'':'暂无院系'">
            <el-option
              v-for="item in allRoom"
              :key="item.roomId"
              :label="item.roomName"
              :value="item.roomId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别" >
          <el-select v-model="dataForm.courseType" placeholder="请选择" style="width: 100%">
            <el-option label="选修"  value="1"></el-option>
            <el-option label="必修"  value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="限选人数"  >
          <el-input v-model="dataForm.capacity"  auto-complete="off"></el-input>
        </el-form-item>
          <el-form-item label="学分"  >
            <el-input v-model="dataForm.score"  auto-complete="off"></el-input>
          </el-form-item>
        <el-form-item  >
           <span slot="label">
                <span class="span-box">
                  <span><i class="iconfont iconadd" style="cursor: pointer" @click="addFrequency"></i>上课详情 ：</span>
                </span>
              </span>
          <div v-for="itemCourse in dataForm.courseDetail">
          <el-select v-model="itemCourse.date" placeholder="请选择" style="width: 20%">
            <el-option :label="item.timeName"  :value="item.timeId" v-for="item in timeOption"></el-option>
          </el-select>
          <el-select v-model="itemCourse.section" placeholder="请选择" style="width: 20%">
            <el-option :label="item.sectionName"  :value="item.sectionId" v-for="item in sectionOption"></el-option>
          </el-select>
          <el-input style="width: 30%" v-model="itemCourse.place"  auto-complete="off" placeholder="请输入上课地点"></el-input>
            <el-input v-model="itemCourse.range"  auto-complete="off" style="width: 20%" ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="备注 " prop="remark">
          <el-input v-model="dataForm.remark" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
        </el-scrollbar>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import pegitation from '@/views/Core/pegitation'
  import { allCourseChoosed } from '../../utils/allData'
  import {fuzzyQuery, genID, getNameById} from '../../utils/utils'
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

        allRoom:[],// 院系
        roomExist: false,
        timeOption:[{timeId:'monday',timeName:'周一'},{timeId:'tudesday',timeName:'周二'},{timeId:'thirsday',timeName:'周三'},
          {timeId:'fourthday',timeName:'周四'},{timeId:'friday',timeName:'周五'}],
        sectionOption:[{sectionId:'1',sectionName:'1-2节'},{sectionId:'2',sectionName:'3-4节'},{sectionId:'3',sectionName:'5-6节'},
          {sectionId:'4',sectionName:'7-8节'}],
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        dataFormRules: {
          courseName: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]
        },
        // 新增编辑界面数据
        dataForm: {
          selectedCourseId:'',
          courseName: '',
          courseId: '',
          roomId:'',
          roomName:'',
          courseType: '1',
          score:'',
          teacherId: '', // 老师
          teacherName: '', // 老师
          capacity:'', // 人数
          courseDetail:[
            {date:'',dateName:'', section:'', place:'',range:'1-18周', dateName:'',sectionName:''},
            {date:'',dateName:'', section:'', place:'',range:'1-18周',dateName:'',sectionName:''}
          ],


        },
        courseAndTeacher:[],
        courseExist: true,
        teacherList:[], // 教师信息
        teacherExist: false
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
      addFrequency(){
        let obj ={date:'', section:'', place:'',range:'1-18周',dateName:'',sectionName:''}
        this.dataForm.courseDetail.unshift(obj)
      },
      // 获取所有课程以及课程对应的教师
      getCourseAndTeacher(){
        let courseAndTeacher = JSON.parse(localStorage.getItem('adminCourse'))
        if(courseAndTeacher && courseAndTeacher.length > 0){
          this.courseAndTeacher = courseAndTeacher
          this.courseExist = false
        }else{
          this.courseAndTeacher =  []
          this.courseExist = true
        }
      },
      getTeacherByCourse(){
        this.teacherExist = true
        this.dataForm.teacherId = ''
        let allTeacher = JSON.parse(localStorage.getItem('allTeacher'))
        let teacherInfo =   getNameById(this.dataForm.courseId,'teacherCourse',allTeacher)
        if(teacherInfo && teacherInfo.length > 0){
          this.teacherList = teacherInfo
        }else{
          this.teacherList = []
        }
      },
      // 获取院系
      getRoom(){
        let allRoom =JSON.parse(localStorage.getItem('allRoom'))
        if(allRoom && allRoom.length > 0){
          this.allRoom = allRoom
          this.roomExist = true
        }else{
          this.allRoom = []
          this.roomExist = fasle
        }
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

      // 新增课程
      addSelectCourse() {
        this.dialogVisible = true
        this.operation = true // 标记是新增
        this.dataForm = {
          selectedCourseId: '',
          courseName: '',
          courseId: '',
          roomId: '',
          roomName: '',
          courseType: '1',
          score: '',
          teacherId: '', // 老师
          teacherName: '', // 老师
          capacity: '', // 人数
          courseDetail: [
            {date: '', dateName: '', section: '', place: '', range: '1-18周', dateName: '', sectionName: ''},
            {date: '', dateName: '', section: '', place: '', range: '1-18周', dateName: '', sectionName: ''}
          ],

        }
      },

      // 显示编辑界面
      editSelectedCourse: function (row) {
        this.dialogVisible = true
        this.operation = false
        this.dataForm = Object.assign({}, row)
        this.getTeacherByCourse()
        this.dataForm.teacherId = row.teacherId
      },
      // 编辑
      submitForm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
              this.editLoading = true
              console.log(this.dataForm)
            let allSelectedCourse =JSON.parse(localStorage.getItem('allSelectedCourse'))
              let roomObj = getNameById(this.dataForm.roomId,'roomId',this.allRoom)
              let teacherObj = getNameById(this.dataForm.teacherId,'teacherId',this.teacherList)
              let courseObj = getNameById(this.dataForm.courseId,'courseId',this.courseAndTeacher)
              this.dataForm.courseName  = courseObj[0].courseName
              this.dataForm.teacherName = teacherObj[0].teacherName
              this.dataForm.roomName = roomObj[0].roomName

            let selectedCourse = []
              let obj = {
                selectedCourseId: genID(5),
                courseName: this.dataForm.courseName,
                courseId: this.dataForm.courseId,
                capacity: this.dataForm.capacity,
                score: this.dataForm.score,
                roomId: this.dataForm.roomId,
                roomName: this.dataForm.roomName,
                teacherId: this.dataForm.teacherId,
                teacherName: this.dataForm.teacherName,
                courseType: this.dataForm.courseType, // 1 选修  2 必修
                status:'0',
              }
              if(this.dataForm.courseDetail && this.dataForm.courseDetail.length > 0){
                let detailArr = []
                this.dataForm.courseDetail.forEach(detail=>{
                  if(detail.section && detail.date && detail.place){
                    detail.sectionName = getNameById(detail.section,'sectionId',this.sectionOption)[0].sectionName
                    detail.dateName = getNameById(detail.date,'timeId',this.timeOption)[0].timeName
                    detailArr.push(detail)
                  }
                })
                obj.courseDetail = detailArr
              }
              console.log(obj)
            // })
            // 新增
            // 新增
            if(this.operation){
              let selectCourseArr = []
              obj.selectedCourseId = genID(5)
              if(allSelectedCourse){
                allSelectedCourse.push(obj)
                localStorage.setItem('allSelectedCourse',JSON.stringify(allSelectedCourse))
              }else{
                selectCourseArr.push(obj)
                localStorage.setItem('allSelectedCourse',JSON.stringify(selectCourseArr))
              }
              this.editLoading = false
              this.$message({ message: '新增成功', type: 'success' })
              this.dialogVisible = false
              this.getSelectedCourseList()
            }else{
              //修改
              allSelectedCourse.forEach(item=>{
                if(item.selectedCourseId === this.dataForm.selectedCourseId){
                  item.teacherName = this.dataForm.teacherName
                  item.teacherId = this.dataForm.teacherId
                  item.courseId = this.dataForm.courseId
                  item.courseName = this.dataForm.courseName
                  item.score = this.dataForm.score
                  item.roomId= this.dataForm.roomId
                  item.roomName= this.dataForm.roomName
                  item.courseDetail= this.dataForm.courseDetail
                  item.courseType = this.dataForm.courseType
                  item.capacity = this.dataForm.capacity

                }
              })
              this.editLoading = false
              this.dialogVisible = false
              localStorage.setItem('allSelectedCourse',JSON.stringify(allSelectedCourse))
              this.$message({ message: '修改成功', type: 'success' })
              this.getSelectedCourseList()
            }
          }
        })
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
      deleteSelectedCourse(row){
        this.$confirm(`确认删除${row.courseName}吗？`, '提示', {}).then(() => {
          let allSelectedCourse =JSON.parse(localStorage.getItem('allSelectedCourse'))
          allSelectedCourse.forEach((item,index)=>{
            if(item.selectedCourseId=== row.selectedCourseId){
              allSelectedCourse.splice(index,1)
            }
          })
          localStorage.setItem('allSelectedCourse',JSON.stringify(allSelectedCourse))
          this.$message({ message: '删除成功', type: 'success' })
          this.getSelectedCourseList()
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      }



    },
    mounted() {
      this.getCourseAndTeacher()
      this.getRoom()
      this.getSelectedCourseList()
    }
  }
</script>
<style scoped>

</style>
