

export const loginInfo = [
  {
    roleId: '000',
    roleName: '管理员',
    loginName: 'admin',
    pwd:'123456',
    menuArr: [
      {
        menuName: '课程管理',
        menuUrl:'/admin/addCourse' ,
        menuId: '0001',
        icon:''
      },{
        menuName: '院系管理',
        menuUrl:'/admin/roomManage' ,
        menuId: '0002',
        icon:''
      }, {
        menuName: '学生管理',
        menuUrl:'/admin/studentManage' ,
        menuId:'studentManage' ,
        icon:''
      },  {
      menuName: '教师管理',
      menuUrl:'/admin/teacherManage' ,
      menuId: '00033',
     icon:''
}
    ]
  },
 {
    roleId: '111',
    roleName:' 教研人员',
    loginName: 'teacher',
    pwd:'123456',
    menuArr: [
      {
        menuName: '新建选课',
        menuUrl:'/courseSet' ,
        menuId: '1111',
        icon:'iconfont iconxuanxiang'
      },{
        menuName: '学生选课管理',
        menuUrl:'/courseCenter' ,
        menuId:'1112' ,
        icon:'iconfont iconaccount'
      },
    ]
  },
  {
    roleId: '222',
    roleName: '学生',
    loginName: 'student',
    pwd:'123456',
    menuArr: [
      {
        menuName: '选课中心',
        menuUrl:'/courseCenter' ,
        menuId: '2221',
        icon:''
      },{
        menuName: '我的选课',
        menuUrl:'/myCourse' ,
        menuId: '2222',
        icon:''
      }, {
  menuName: '首页',
    menuUrl:'/' ,
    menuId:'111111' ,
    icon:''
}
    ]

},  {
    roleId: '00000',
    roleName: '普通教师',
    loginName: 'oridary teacher',
    pwd:'123456',
    menuArr: [{
        menuName: '课程查看', // 查看自己的课程分配以及选了这门课的学生
        menuUrl:'/courseCenter' ,
        menuId: '2221',
        icon:''
      },{
        menuName: '我的选课',
        menuUrl:'/myCourse' ,
        menuId: '2222',
        icon:''
      },]

  }
]
// 各个角色的菜单
export const adminMenu = [   {
  menuName: '首页',
  menuUrl:'/' ,
  menuId: '014',
  icon:'iconfont iconhome'
},{
  menuName: '课程管理',
  menuUrl:'/admin/addCourse' ,
  menuId: '0001',
  icon:'iconfont iconkecheng'
},{
  menuName: '院系管理',
  menuUrl:'/admin/roomManage' ,
  menuId: '0002',
  icon:'iconfont iconbumenguanli'
}, {
  menuName: '学生管理',
  menuUrl:'/admin/studentManage' ,
  menuId:'0003' ,
  icon:'iconfont iconxuesheng'
},  {
  menuName: '教师管理',
  menuUrl:'/admin/teacherManage' ,
  menuId: '0004',
  icon:'iconfont iconjiaoshi'
}]
export const teacherMenu = [
  {
    menuName: '首页',
    menuUrl:'/' ,
    menuId: '013',
    icon:'iconfont iconhome'
  },{
  menuName: '课程详情', // 查看自己的课程分配以及选了这门课的学生
  menuUrl:'/ordinary/courseDetail' ,
  menuId: '2221',
  icon:'iconfont iconxiangqing'
},{
  menuName: '我的学生',
  menuUrl:'/ordinary/myStudent' ,
  menuId: '2222',
  icon:'iconfont iconwodexiaoxi'
}]
export const studentMenu = [
  {
    menuName: '首页',
    menuUrl:'/' ,
    menuId: '012',
    icon:'iconfont iconhome'
  },{
  menuName: '选课中心',
  menuUrl:'/courseCenter' ,
  menuId: '2221',
  icon:'iconfont iconhuodongzhongxin'
},{
  menuName: '我的选课',
  menuUrl:'/myCourse' ,
  menuId: '2222',
  icon:'iconfont iconwode-'
}]
export const superiorTeacherMenu = [  {
  menuName: '新建选课',
  menuUrl:'/courseSet' ,
  menuId: '1111',
  icon:'iconfont iconxuanxiang'
},{
  menuName: '学生选课管理',
  menuUrl:'/selectedCourseManage' ,
  menuId:'1112' ,
  icon:'iconfont iconaccount'
},]
export const allCourseChoosed = [
  {
    courseId:'000',
    courseNumber: '000',
    courseName: '高等数学',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期一',section:'第7-8节',range:'1-18周'},{date:'星期五',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'111',
    courseNumber: '001',
    courseName: '大学语文',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'222',
    courseNumber: '009',
    courseName: '大学物理',
    capacity: 30,
    status:'1',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'333',
    courseNumber: '001',
    courseName: '大学语文',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'444',
    courseNumber: '001',
    courseName: '大学英余',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼213','4号楼205'],
    teacher:'高原',
    className:'软件工程',
  },
  {
    courseId:'555',
    courseNumber: '001',
    courseName: '大学语文',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'666',
    courseNumber: '001',
    courseName: '大学语文',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'777',
    courseNumber: '001',
    courseName: '大学语文',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'888',
    courseNumber: '001',
    courseName: '大学语文',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'999',
    courseNumber: '001',
    courseName: '大学语文',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },
  {
    courseId:'101010',
    courseNumber: '001',
    courseName: '大学语文',
    capacity: 30,
    status:'0',
    score:2,
    danwei:'计算机科学与技术学院',
    time:[{date:'星期二',section:'第7-8节',range:'1-18周'},{date:'星期四',section:'第7-8节',range:'1-18周'}],
    place:['4号楼203','4号楼205'],
    teacher:'李俊',
    className:'软件工程',
  },

]
export const allRoom =[{"roomId":"1hp26yfeo64g","roomName":"文法系"},{"roomId":"6wj1ncrkwp80","roomName":"计算机与科学"},{"roomId":"6rbdfxn7nts0","roomName":"金融系"},{"roomId":"7063necr17k0","roomName":"化学系"},{"roomId":"7gxhlhpscq00","roomName":"英语系"},{"roomId":"u9ipnqwqzqo","roomName":"土木工程系"},{"roomId":"3vjg9zxdv6s0","roomName":"工商管理系"}]
export const allTeacher =[{"teacherName":"余朗朗","teacherPhone":"18756584857","teacherCourse":"7fyc4yb1uvc0","teacherCourseName":"马克思主义与毛泽东思想","roleId":"teacher","teacherId":"29jtgkjzukkk"},{"teacherName":"李阳","teacherPhone":"18756582312","teacherCourse":"4nzh78b400s0","teacherCourseName":"线性代数1","roleId":"teacher","teacherId":"nd3f9r3wm0w"},{"teacherName":"金坛 ","teacherPhone":"17720112012","teacherCourse":"7fyc4yb1uvc0","teacherCourseName":"马克思主义与毛泽东思想","roleId":"teacher","teacherId":"gvqh423sd48"},{"teacherName":"王玉","teacherPhone":"17730220304","teacherCourse":"pihk7uwc40w","teacherCourseName":"计算机基础","roleId":"teacher","teacherId":"6obcwh7on0g0"},{"teacherName":"姬文","teacherPhone":"18756564857","teacherCourse":"3l8jdks4bwe0","teacherCourseName":"大学英语","roleId":"teacher","teacherId":"d58eqouk57k"},{"teacherName":"杨皈","teacherPhone":"13678909876","teacherCourse":"dhql4l85d8o","teacherCourseName":"散文赏析","roleId":"teacher","teacherId":"4j7nox0uz7u0"},{"teacherName":"唐林","teacherPhone":"13687654343","teacherCourse":"wwxj48sain4","teacherCourseName":"心理健康教育","roleId":"teacher","teacherId":"3htghw3oscq0"},{"teacherName":"吕布","teacherPhone":"17320220389","teacherCourse":"4nu9bxo5lfo0","teacherCourseName":"电影鉴赏","roleId":"teacher","teacherId":"62yneac0d7c0"},{"teacherName":"余生","teacherPhone":"13627890989","teacherCourse":"pihk7uwc40w","teacherCourseName":"计算机基础","roleId":"teacher","teacherId":"4fe3qnmeiia0"}]
export const allStudent = [{"studentName":"王嘉尔","studentPhone":"18767890989","studentRoomId":"7063necr17k0","roleId":"student","studentId":"4e9jblr697k0","studentRoomName":"化学系"},{"studentName":"钟意伦","studentPhone":"17730220304","studentRoomId":"6rbdfxn7nts0","roleId":"student","studentId":"12o74ssmq33k","studentRoomName":"金融系"},{"studentName":"艾伦","studentPhone":"17809080978","studentRoomId":"u9ipnqwqzqo","studentRoomName":"土木工程系","roleId":"student","studentId":"5tbkbbw5tb00"},{"studentName":"林峰","studentPhone":"17720909876","studentRoomId":"3vjg9zxdv6s0","studentRoomName":"工商管理系","roleId":"student","studentId":"3mv4h53hcpa0"},{"studentName":"鞠婧祎","studentPhone":"17720909832","studentRoomId":"7gxhlhpscq00","studentRoomName":"英语系","roleId":"student","studentId":"4u7duw55emw0"},{"studentName":"林翔","studentPhone":"17420909876","studentRoomId":"7gxhlhpscq00","studentRoomName":"英语系","roleId":"student","studentId":"63y3hni8kx00"}]
export const adminCourse = [{"courseId":"4nzh78b400s0","courseName":"线性代数1"},{"courseId":"7fyc4yb1uvc0","courseName":"马克思主义与毛泽东思想"},{"courseId":"pihk7uwc40w","courseName":"计算机基础"},{"courseId":"3l8jdks4bwe0","courseName":"大学英语"},{"courseId":"dhql4l85d8o","courseName":"散文赏析"},{"courseId":"wwxj48sain4","courseName":"心理健康教育"},{"courseId":"3cdm2w75dis0","courseName":"微积分"},{"courseId":"4ep3dvomkzo0","courseName":"离散数学"},{"courseId":"3mr6orkzmg20","courseName":"大学物理"},{"courseId":"4nu9bxo5lfo0","courseName":"电影鉴赏"},{"courseId":"555xhjyv9h00","courseName":"体育"}]
export const allSelectedCourse =[{"selectedCourseId":"1g05y2ehv4c","courseName":"线性代数1","courseId":"4nzh78b400s0","capacity":"5","score":"2","roomId":"6wj1ncrkwp80","roomName":"计算机与科学","teacherId":"nd3f9r3wm0w","teacherName":"李阳","courseType":"1","status":"0","courseDetail":[{"date":"tudesday","dateName":"周二","section":"2","place":"主教303","range":"1-18周","sectionName":"3-4节"},{"date":"friday","dateName":"周五","section":"2","place":"主教101","range":"1-18周","sectionName":"3-4节"}]},{"selectedCourseId":"3yos8czrfj40","courseName":"马克思主义与毛泽东思想","courseId":"7fyc4yb1uvc0","capacity":"6","score":"2","roomId":"6rbdfxn7nts0","roomName":"金融系","teacherId":"29jtgkjzukkk","teacherName":"余朗朗","courseType":"1","status":"0","courseDetail":[{"date":"thirsday","dateName":"周三","section":"2","place":"理西楼","range":"1-18周","sectionName":"3-4节"}],"studentInfos":[{"studentName":"钟意伦","studentPhone":"17730220304","studentRoomId":"6rbdfxn7nts0","roleId":"student","studentId":"12o74ssmq33k","studentRoomName":"金融系"}]},{"selectedCourseId":"4lz3ud19sw40","courseName":"计算机基础","courseId":"pihk7uwc40w","capacity":"8","score":"1","roomId":"6wj1ncrkwp80","roomName":"计算机与科学","teacherId":"6obcwh7on0g0","teacherName":"王玉","courseType":"1","status":"0","courseDetail":[{"date":"friday","dateName":"周五","section":"3","place":"淮园102","range":"1-18周","sectionName":"5-6节"}]},{"selectedCourseId":"2qawru68wz80","courseName":"心理健康教育","courseId":"wwxj48sain4","capacity":"12","score":"1","roomId":"1hp26yfeo64g","roomName":"文法系","teacherId":"3htghw3oscq0","teacherName":"唐林","courseType":"1","status":"0","courseDetail":[{"date":"tudesday","dateName":"周二","section":"4","place":"1109","range":"1-18周","sectionName":"7-8节"}]},{"selectedCourseId":"1e01aq65wjq8","courseName":"电影鉴赏","courseId":"4nu9bxo5lfo0","capacity":"4","score":"1","roomId":"6rbdfxn7nts0","roomName":"金融系","teacherId":"62yneac0d7c0","teacherName":"吕布","courseType":"1","status":"0","courseDetail":[{"date":"friday","dateName":"周五","section":"2","place":"新苑104","range":"1-18周","sectionName":"3-4节"}],"studentInfos":[{"studentName":"钟意伦","studentPhone":"17730220304","studentRoomId":"6rbdfxn7nts0","roleId":"student","studentId":"12o74ssmq33k","studentRoomName":"金融系"}]}]
