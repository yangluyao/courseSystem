
<template>
  <!--系统管理员 ，新增课程-->
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:55px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input size="small" v-model="filters.name" placeholder="课程名"></el-input>
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
      :data="adminCourse.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      class="table-wrapper"
      size="mini"
      border>
      <el-table-column
        prop="courseName"
        label="课程名">
      </el-table-column>
      <el-table-column
        prop="score"
        label="学分">
      </el-table-column>

      <el-table-column
        fixed="right" width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCourse(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteCourse(scope.row)">删除</el-button>
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
        <el-form-item label="课程名" >
          <el-input v-model="dataForm.courseName"  auto-complete="off"></el-input>
        </el-form-item>
          <el-form-item label="学分"  >
            <el-input v-model="dataForm.score"  auto-complete="off"></el-input>
          </el-form-item>
        </el-scrollbar>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button :size="size" @click.native="addDiaolg = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import pegitation from '@/views/Core/pegitation'
  import { format } from "@/utils/datetime"
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
        belongOptions:[{belongId:'001',belongName:'理学'},{belongId:'002',belongName:'经济系'},
          {belongId:'003',belongName:'哲学'},{belongId:'004',belongName:'法学'},{belongId:'005',belongName:'管理学'}
        ],
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
          courseId: '',
          remark:'',
          courseName: '',
          score:'',
        },
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
        let adminCourse =JSON.parse(localStorage.getItem('adminCourse'))
        let onefilt = []
        if(this.filters.name.trim()){
          onefilt = fuzzyQuery(adminCourse,this.filters.name.trim(),'courseName')
          console.log(onefilt)
        }else{
          onefilt = adminCourse
        }
          this.adminCourse = onefilt
      },

      getCourseList(){
        let adminCourse =JSON.parse(localStorage.getItem('adminCourse'))
        if(adminCourse){
          this.adminCourse = adminCourse
        }else{
          this.adminCourse = []
        }
        this.total  =  this.adminCourse.length

      },
      // 新增课程
      addCourse(){
        this.addDiaolg = true
        this.operation = true // 标记是新增
        this.dataForm={
          courseId:'',
          courseName:''
        }
      },

      // 显示编辑界面
      editCourse: function (row) {
        this.addDiaolg = true
        this.operation = false
        // 回显数据
        this.dataForm.courseName = row.courseName
        this.dataForm.courseId = row.courseId
      },
      // 编辑
      submitForm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.editLoading = true
            let adminCourse =JSON.parse(localStorage.getItem('adminCourse'))
            if(this.operation){
              let courseArr = []
              let obj = {
                courseId: genID(5),
                courseName: this.dataForm.courseName
              }
              if(adminCourse){
                adminCourse.push(obj)
                localStorage.setItem('adminCourse',JSON.stringify(adminCourse))
              }else{
                courseArr.push(obj)
                localStorage.setItem('adminCourse',JSON.stringify(courseArr))
              }
              this.editLoading = false
              this.$message({ message: '新增成功', type: 'success' })
              this.addDiaolg = false
              this.getCourseList()
            }else{
              adminCourse.forEach(item=>{
                if(item.courseId === this.dataForm.courseId){
                  item.courseName = this.dataForm.courseName
                }
              })
              this.editLoading = false
              this.addDiaolg = false
              localStorage.setItem('adminCourse',JSON.stringify(adminCourse))
              this.$message({ message: '修改成功', type: 'success' })
              this.getCourseList()
            }
          }
        })
      },
      deleteCourse(row){
        this.$confirm(`确认删除${row.courseName}吗？`, '提示', {}).then(() => {
          let adminCourse =JSON.parse(localStorage.getItem('adminCourse'))
          adminCourse.forEach((item,index)=>{
            if(item.courseId === row.courseId){
              adminCourse.splice(index,1)
            }
          })
          localStorage.setItem('adminCourse',JSON.stringify(adminCourse))
          this.$message({ message: '删除成功', type: 'success' })
          this.getCourseList()
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
    }
  }
</script>
<style scoped>

</style>
