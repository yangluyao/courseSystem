import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'



// 测试路由
import courseCenter from '@/views/Sys/courseCenter'
import myCourse from '@/views/Sys/myCourse'
import courseSet from '@/views/teacher/courseSet'
import addCourse from '@/views/admin/addCourse'


import teacherManage from "../views/admin/teacherManage";
import roomManage from "../views/admin/roomManage";
import studentManage from "../views/admin/studentManage";
import courseDetail from "../views/ordinaryTeacher/courseDetail";
import myStudent from "../views/ordinaryTeacher/myStudent";
import selectedCourseManage from "../views/teacher/selectedCourseManage";
import shouye from "../views/shouye";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          path: '',
          name: '系统介绍',
          component: shouye,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        },
        // 学生角色
       {
          path:'/myCourse',
          name:'我的课程',
          component:  myCourse,
          meta: {
            icon: 'iconfont iconcheck',
            index: 0
          }
        },{
          path:'/courseCenter',
          name:'选课中心',
          component:courseCenter,
          meta: {
            icon: 'iconfont iconaccount',
            index: 0
          }
        },
        // 教研人员
        {
          path:'/courseSet',
          name:'新建选课',
          component:courseSet,
          meta: {
            icon: 'iconfont iconaccount',
            index: 0
          }
        }, {
          path:'/selectedCourseManage',
          name:'学生选课管理',
          component:selectedCourseManage,
          meta: {
            icon: 'iconfont iconaccount',
            index: 0
          }
        },
        //admin/admin/addCourse
        {
          path: '/admin/addCourse',
          name: '课程管理',
          component: addCourse,
          meta: {
            icon: 'iconfont iconaccount',
            index: 0
          }
        },{
          path: '/admin/teacherManage',
          name: '教师管理',
          component: teacherManage,
          meta: {
            icon: 'iconfont iconaccount',
            index: 0
          }
        },
        {
          path: '/admin/roomManage',
          name: '院系管理',
          component: roomManage,
          meta: {
            icon: 'iconfont iconaccount',
            index: 0
          }
        }, {
          path: '/admin/studentManage',
          name: '学生管理',
          component: studentManage,
          meta: {
            icon: 'iconfont iconaccount',
            index: 0
          }
        },
        // 普通教师
        {
          path: '/ordinary/courseDetail',
          name: '我的课程',
          component: courseDetail,
          meta: {
            icon: 'iconfont iconaccount',
            index: 0
          }
        },
        {
         path: '/ordinary/myStudent',
         name: '我的学生',
         component: myStudent,
          meta: {
          icon: 'iconfont iconaccount',
          index: 0
          }
}
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
  ]
})

export default router
