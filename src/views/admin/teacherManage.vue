
<template>
  <!--系统管理员 ，新增课程-->
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input size="small" v-model="filters.name" placeholder="教师姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" @click="filterSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" type="primary" @click="addCourse">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="teacherList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      class="table-wrapper"
      size="mini"
      border>
      <el-table-column
        prop="teacherName"
        label="教师姓名">
      </el-table-column>
      <el-table-column
        prop="teacherPhone"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="teacherCourseName"
        label="教授课程">
      </el-table-column>
      <el-table-column
        fixed="right" width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editTeacher(scope.row)">修改</el-button>
          <el-button type="text" size="small" style="color: red" @click="deleteTeacher(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pegitation :handleSizeChange="handleSizeChange" style="margin-top: 10px;text-align: right"
                :handleCurrentChange="handleCurrentChange"
                :currentPage="currentPage" :pagesize="pagesize" :total="total">
    </pegitation>
    <!-- </el-col> -->
    <!--新增编辑界面-->
    <!--授课老师， 课程类别（选秀，必修），课时，上课时间，限选人数-->
    <el-dialog v-if="addDiaolg" :title="operation?'新增':'编辑'" width="40%" :visible.sync="addDiaolg" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size" >
        <el-scrollbar style="height: 100%">
        <el-form-item label="教师姓名" >
          <el-input v-model="dataForm.teacherName"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"  >
          <el-input v-model="dataForm.teacherPhone"  auto-complete="off"></el-input>
        </el-form-item>
          <el-form-item label="授课"  >
            <el-select v-model="dataForm.teacherCourse" style="width: 100%">
              <el-option  v-for="courseItem in adminCourse" :key="courseItem.courseId" :value="courseItem.courseId" :label="courseItem.courseName"></el-option>
            </el-select>
          </el-form-item>
        </el-scrollbar>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button :size="size" @click.native="addDiaolg = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="addTeacher" :loading="editLoading">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import pegitation from '@/views/Core/pegitation'
  import { genID , fuzzyQuery} from '../../utils/utils'
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
        adminCourse:[],
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
          teacherId: '',
          teacherName: '',
          teacherPhone:'',
          teacherCourse:'',
          teacherCourseName:'',
        },
        teacherList:[],
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
        let allTeacher =JSON.parse(localStorage.getItem('allTeacher'))
        let onefilt = []
        if(this.filters.name.trim()){
          onefilt = fuzzyQuery(allTeacher,this.filters.name.trim(),'teacherName')
          console.log(onefilt)
        }else{
          onefilt = allTeacher
        }
          this.teacherList = onefilt
      },

      getCourseList(){
        // 获取所有课程， 以供选择
        let adminCourse =JSON.parse(localStorage.getItem('adminCourse'))
        if(adminCourse){
          this.adminCourse = adminCourse
        }else{
          this.adminCourse = []
        }
        // this.total  =  this.adminCourse.length

      },
      // 获取所有教师列表
      getAllTeacher(){
        let allTeacher =JSON.parse(localStorage.getItem('allTeacher'))
        if(allTeacher){
          this.teacherList = allTeacher
        }else{
          this.teacherList = []
        }
        this.total  =  this.teacherList.length
      },
      // 新增课程
      addCourse(){
        this.addDiaolg = true
        this.operation = true // 标记是新增
        this.dataForm={
          roleId:'teacher',
          teacherId:'',
          teacherName:'',
          teacherCourse:'',
          teacherCourseName:'',
          teacherPhone:'',
        }
      },

      // 显示编辑界面
      editTeacher: function (row) {
        this.addDiaolg = true
        this.operation = false
        // 回显数据
        this.dataForm.teacherId = row.teacherId
        this.dataForm.teacherName = row.teacherName
        this.dataForm.teacherCourse = row.teacherCourse
        this.dataForm.teacherCourseName = row.teacherCourseName
        this.dataForm.teacherPhone = row.teacherPhone
        this.dataForm.roleId = row.roleId
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
      addTeacher: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.editLoading = true
            let name =this.getCourseNameById(this.dataForm.teacherCourse)
            this.dataForm.teacherCourseName = name[0].courseName
            let allTeacher =JSON.parse(localStorage.getItem('allTeacher'))
            let obj = {
              teacherName:this.dataForm.teacherName,
              teacherPhone:this.dataForm.teacherPhone,
              teacherCourse:this.dataForm.teacherCourse,
              teacherCourseName:this.dataForm.teacherCourseName,
              roleId:this.dataForm.roleId,
            }
            // 新增
            if(this.operation){
              let teacherArr = []
              obj.teacherId = genID(5)
              if(allTeacher){
                allTeacher.push(obj)
                localStorage.setItem('allTeacher',JSON.stringify(allTeacher))
              }else{
                teacherArr.push(obj)
                localStorage.setItem('allTeacher',JSON.stringify(teacherArr))
              }
              this.editLoading = false
              this.$message({ message: '新增成功', type: 'success' })
              this.addDiaolg = false
              this.getAllTeacher()
            }else{
              //修改
              allTeacher.forEach(item=>{
                if(item.teacherId === this.dataForm.teacherId){
                  item.teacherName = this.dataForm.teacherName
                  item.teacherCourse = this.dataForm.teacherCourse
                  item.teacherCourseName = this.dataForm.teacherCourseName
                  item.teacherPhone = this.dataForm.teacherPhone
                  item.roleId= this.dataForm.roleId
                }
              })
              this.editLoading = false
              this.addDiaolg = false
              localStorage.setItem('allTeacher',JSON.stringify(allTeacher))
              this.$message({ message: '修改成功', type: 'success' })
              this.getAllTeacher()
            }
          }
        })
      },
      deleteTeacher(row){
        this.$confirm(`确认删除${row.teacherName}吗？`, '提示', {}).then(() => {
          let allTeacher =JSON.parse(localStorage.getItem('allTeacher'))
          allTeacher.forEach((item,index)=>{
            if(item.teacherId=== row.teacherId){
              allTeacher.splice(index,1)
            }
          })
          localStorage.setItem('allTeacher',JSON.stringify(allTeacher))
          this.$message({ message: '删除成功', type: 'success' })
          this.getAllTeacher()
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
    })
        }


    },
    mounted() {
      this.getCourseList()
      this.getAllTeacher()
    }
  }
</script>
<style scoped>

</style>
