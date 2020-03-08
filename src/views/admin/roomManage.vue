
<template>
  <!--系统管理员 ，院系管理-->
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" >
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input size="small" v-model="filters.name" placeholder="院系"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" @click="filterSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" type="primary" @click="addRoom">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="roomList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      class="table-wrapper"
      size="mini"
      border>
      <el-table-column
        prop="roomName"
        label="院系名称">
      </el-table-column>

      <el-table-column
        fixed="right" width="100"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editRoom(scope.row)">修改</el-button>
          <el-button type="text" size="small" style="color: red" @click="deleteRoom(scope.row)">删除</el-button>
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
        <el-form-item label="院系名称" >
          <el-input v-model="dataForm.roomName"  auto-complete="off"></el-input>
        </el-form-item>
        </el-scrollbar>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button :size="size" @click.native="addDiaolg = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="addConfirm" :loading="editLoading">确认</el-button>
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
        roomList:[],
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
        }


    },
    mounted() {
      // this.getCourseList()
      // this.getAllTeacher()
      this.getAllRoom()
    }
  }
</script>
<style scoped>

</style>
