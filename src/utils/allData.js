

export const loginInfo = [
  {
    roleId: '000',
    roleName: '管理员',
    loginName: 'admin',
    pwd:'123456',
    menuArr: [
      {
        menuName: '选课中心',
        menuUrl:'/admin/addCourse' ,
        menuId: '0001',
        icon:''
      },{
        menuName: '我的选课',
        menuUrl:'/myCourse' ,
        menuId: '0002',
        icon:''
      }, {
        menuName: '首页',
        menuUrl:'/' ,
        menuId:'111111' ,
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
        menuName: '课程管理',
        menuUrl:'/courseSet' ,
        menuId: '1111',
        icon:'iconfont iconxuanxiang'
      },{
        menuName: '我的选课',
        menuUrl:'/courseCenter' ,
        menuId:'1112' ,
        icon:'iconfont iconaccount'
      },
      {
        menuName: '首页',
        menuUrl:'/' ,
        menuId:'111111' ,
        icon:'iconfont iconhome'
      }
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

}
]
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
