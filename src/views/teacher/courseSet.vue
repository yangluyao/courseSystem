
<template>
  <!--教师角色的 负责维护课程页-->
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:55px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input size="small" v-model="filters.name" placeholder="课程名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" >搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  size="small" type="primary" @click="addCourse">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
 <!--   <kt-table permsEdit="sys:role:edit" permsDelete="sys:role:delete" :highlightCurrentRow="true" :stripe="false"
              :data="pageResult" :columns="columns" :showBatchDelete="false" @handleCurrentChange="handleRoleSelectChange"
              @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>-->

    <el-table
      :data="allCourse.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
          <el-button type="text" size="small" @click="editCourse(scope.row)">修改</el-button>
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
    <el-dialog v-if="dialogVisible" :title="operation?'新增':'编辑'" width="60%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size" style="height: 300px;">
        <el-scrollbar style="height: 100%">
        <el-form-item label="课程名"  >
          <el-input v-model="dataForm.courseName"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开课院系" prop="name">
          <el-select v-model="dataForm.danwei" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in belongOptions"
              :key="item.belongId"
              :label="item.belongName"
              :value="item.belongId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别" >
          <el-select v-model="dataForm.courseType" placeholder="请选择" style="width: 100%">
            <el-option label="选修"  value="1"></el-option>
            <el-option label="必修"  value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课老师"  >
          <el-input v-model="dataForm.teacher"  auto-complete="off"></el-input>
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
          <el-select v-model="itemCourse.dateName" placeholder="请选择" style="width: 20%">
            <el-option :label="item.timeName"  :value="item.timeId" v-for="item in timeOption"></el-option>
          </el-select>
          <el-select v-model="itemCourse.sectionName" placeholder="请选择" style="width: 20%">
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
  import { format } from "@/utils/datetime"
  import { allCourseChoosed } from '../../utils/allData'
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
        allCourse: allCourseChoosed,
        belongOptions:[{belongId:'001',belongName:'理学'},{belongId:'002',belongName:'经济系'},
          {belongId:'003',belongName:'哲学'},{belongId:'004',belongName:'法学'},{belongId:'005',belongName:'管理学'}
        ],
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
          id: 0,
          remark:'',
          courseName: '',
          danwei: '',
          courseType: '1',
          score:'',
          teacher: '', // 老师
          capacity:'', // 人数
          courseDetail:[
            {date:'', section:'', place:'',range:'1-18周',dateName:'',sectionName:''},
            {date:'', section:'', place:'',range:'1-18周',dateName:'',sectionName:''}
          ],


        },
        selectRole: {},
        menuData: [],
        menuSelections: [],
        menuLoading: false,
        authLoading: false,
        checkAll: false,
        currentRoleMenus: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
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
      // 新增课程
      addCourse(){
        this.dialogVisible = true
        this.operation = true // 标记是新增
      },

      // 显示编辑界面
      editCourse: function (row) {
        this.dialogVisible = true
        this.operation = false
        // this.dataForm = Object.assign({}, params.row)
      },
      // 编辑
      submitForm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              console.log(this.dataForm)
            /*  let params = Object.assign({}, this.dataForm)
              this.$api.role.save(params).then((res) => {
                this.editLoading = false
                if(res.code == 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.findPage(null)
              })*/
 /*             courseId:'000',
                courseNumber: '000',
                courseName: '高等数学',
                capacity: 30,
                status:'0',
                score:2,
                danwei:'计算机科学与技术学院',
                time:[{date:'星期一',section:'第7-8节',range:'1-18周'},{date:'星期五',section:'第7-8节',range:'1-18周'}],
                place:['4号楼203','4号楼205'],
                teacher:'李俊',
                className:'软件工程',*/
            let allCourse = []
              let obj = {
                courseId: this.genID(5),
                courseName: this.dataForm.courseName,
                capacity: this.dataForm.capacity,
                score: this.dataForm.score,
                danwei: this.dataForm.danwei,
                teacher: this.dataForm.teacher,
                status:'0',
              }
              console.log(obj)
            })
          }
        })
      },
      genID(length){
        return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
      },
      // 获取数据
      findTreeData: function () {
        this.menuLoading = true
        this.$api.menu.findMenuTree().then((res) => {
          this.menuData = res.data
          console.log(this.menuData)
          this.menuLoading = false
        })
      },
      // 角色选择改变监听
      handleRoleSelectChange(val) {
        if(val == null || val.val == null) {
          return
        }
        this.selectRole = val.val
        this.$api.role.findRoleMenus({'roleId':val.val.id}).then((res) => {
          this.currentRoleMenus = res.data
          this.$refs.menuTree.setCheckedNodes(res.data)
        })
      },
      // 树节点选择监听
      handleMenuCheckChange(data, check, subCheck) {
        if(check) {
          // 节点选中时同步选中父节点
          let parentId = data.parentId
          this.$refs.menuTree.setChecked(parentId, true, false)
        } else {
          // 节点取消选中时同步取消选中子节点
          if(data.children != null) {
            data.children.forEach(element => {
              this.$refs.menuTree.setChecked(element.id, false, false)
            });
          }
        }
      },
      // 重置选择
      resetSelection() {
        this.checkAll = false
        this.$refs.menuTree.setCheckedNodes(this.currentRoleMenus)
      },
      // 全选操作
      handleCheckAll() {
        if(this.checkAll) {
          let allMenus = []
          this.checkAllMenu(this.menuData, allMenus)
          this.$refs.menuTree.setCheckedNodes(allMenus)
        } else {
          this.$refs.menuTree.setCheckedNodes([])
        }
      },
      // 递归全选
      checkAllMenu(menuData, allMenus) {
        menuData.forEach(menu => {
          allMenus.push(menu)
          if(menu.children) {
            this.checkAllMenu(menu.children, allMenus)
          }
        });
      },

      // 时间格式化
      dateFormat: function (row, column, cellValue, index){
        if(format(row[column.property])=="2018/9/14 12:12:12") return "dasd";
        else return 2;
      }

    },
    mounted() {
    }
  }
</script>
<style scoped>

</style>
