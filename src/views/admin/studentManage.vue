
<template>
  <!--系统管理员 学生管理-->
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" >
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input size="small" v-model="filters.name" placeholder="学生姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" @click="filterSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" type="primary" @click="addStudent">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="studentList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
      <el-table-column  allRoom
        prop="studentRoomName"
        label="所属系别">

      </el-table-column>
      <el-table-column
        fixed="right" width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editStudent(scope.row)">修改</el-button>
          <el-button type="text" size="small" style="color: red"  @click="deleteStudent(scope.row)">删除</el-button>
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
        <el-form-item label="学生姓名" >
          <el-input v-model="dataForm.studentName"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"  >
          <el-input v-model="dataForm.studentPhone"  auto-complete="off"></el-input>
        </el-form-item>
          <el-form-item label="所属系别"  >
            <el-select v-model="dataForm.studentRoomId" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in allRoom"
                :key="item.roomId"
                :label="item.roomName"
                :value="item.roomId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-scrollbar>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button :size="size" @click.native="addDiaolg = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="submitStudent" :loading="editLoading">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import pegitation from '@/views/Core/pegitation'
  import { genID , fuzzyQuery, getNameById} from '../../utils/utils'
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
        allRoom:[],
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
          roleId:'student',
          studentId: '',
          studentName: '',
          studentPhone:'',
          studentRoomId:'', // 学生所属院系
          studentRoomName:'',
        },
        studentList:[],
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
        let allStudent =JSON.parse(localStorage.getItem('allStudent'))
        let onefilt = []
        if(this.filters.name.trim()){
          onefilt = fuzzyQuery(allStudent,this.filters.name.trim(),'studentName')
          console.log(onefilt)
        }else{
          onefilt = allStudent
        }
          this.studentList = onefilt
      },

      getRoomList(){
        // 获取所有课程， 以供选择
        let allRoom =JSON.parse(localStorage.getItem('allRoom'))
        if(allRoom){
          this.allRoom = allRoom
        }else{
          this.allRoom = []
        }

      },
      // 获取所有教师列表
      getAllStudent(){
        let allStudent =JSON.parse(localStorage.getItem('allStudent'))
        if(allStudent){
          this.studentList = allStudent
        }else{
          this.studentList = []
        }
        this.total  = this.studentList.length
      },
      // 新增课程
      addStudent(){
        this.addDiaolg = true
        this.operation = true // 标记是新增
        this.dataForm={
          roleId:'student',
          studentId: '',
          studentName: '',
          studentPhone:'',
          studentRoomId:'', // 学生所属院系
          studentRoomName:'',
        }
      },

      // 显示编辑界面
      editStudent: function (row) {
        this.addDiaolg = true
        this.operation = false
        // 回显数据
        this.dataForm.studentId = row.studentId
        this.dataForm.studentName = row.studentName
        this.dataForm.studentPhone = row.studentPhone
        this.dataForm.studentRoomId= row.studentRoomId
        this.dataForm.studentRoomName = row.studentRoomName
        this.dataForm.roleId = row.roleId
      },

      // 确定新增或修改
      submitStudent: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.editLoading = true
            let name =getNameById(this.dataForm.studentRoomId,'roomId',this.allRoom)
            this.dataForm.studentRoomName = name[0].roomName
            let allStudent =JSON.parse(localStorage.getItem('allStudent'))
            let obj = {
              studentName:this.dataForm.studentName,
              studentPhone:this.dataForm.studentPhone,
              studentRoomId:this.dataForm.studentRoomId,
              studentRoomName:this.dataForm.studentRoomName,
              roleId:this.dataForm.roleId,
            }
            // 新增
            if(this.operation){
              let studentArr = []
              obj.studentId = genID(5)
              if(allStudent){
                allStudent.push(obj)
                localStorage.setItem('allStudent',JSON.stringify(allStudent))
              }else{
                studentArr.push(obj)
                localStorage.setItem('allStudent',JSON.stringify(studentArr))
              }
              this.editLoading = false
              this.$message({ message: '新增成功', type: 'success' })
              this.addDiaolg = false
              this.getAllStudent()
            }else{
              //修改
              allStudent.forEach(item=>{
                if(item.studentId === this.dataForm.studentId){
                  item.studentName = this.dataForm.studentName
                  item.studentRoomId = this.dataForm.studentRoomId
                  item.studentRoomName = this.dataForm.studentRoomName
                  item.studentPhone = this.dataForm.studentPhone
                  item.roleId= this.dataForm.roleId
                }
              })
              this.editLoading = false
              this.addDiaolg = false
              localStorage.setItem('allStudent',JSON.stringify(allStudent))
              this.$message({ message: '修改成功', type: 'success' })
              this.getAllStudent()
            }
          }
        })
      },
      deleteStudent(row){
        this.$confirm(`确认删除${row.studentName}吗？`, '提示', {}).then(() => {
          let allStudent =JSON.parse(localStorage.getItem('allStudent'))
          allStudent.forEach((item,index)=>{
            if(item.studentId=== row.studentId){
              allStudent.splice(index,1)
            }
          })
          localStorage.setItem('allStudent',JSON.stringify(allStudent))
          this.$message({ message: '删除成功', type: 'success' })
          this.getAllStudent()
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
    })
        }


    },
    mounted() {
      this.getRoomList()
      this.getAllStudent()
    }
  }
</script>
<style scoped>

</style>
