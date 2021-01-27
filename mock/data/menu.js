
const menus = [
  {
    id: "3",
    title: 'Ui组件',
    icon: "el-icon-monitor",
    children: [
      {
        id: "3-1",
        title: "Gantt甘特图",
        url: "/ui/gantt"
      },
      {
        id: "3-2",
        title: "文件管理器",
        url: "/ui/explorer"
      },

      {
        id: "3-3",
        title: "BIM三维模型",
        url: "/ui/bim"
      },
      {
        id: "3-4",
        title: "树形穿梭框",
        url: "/ui/transfer"
      },
      {
        id: "3-6",
        title: "树形下拉框",
        url: "/ui/select"
      },
      {
        id: "3-9",
        title: "任务看板",
        url: "/ui/todo"
      },
      {
        id: "3-8",
        title: "工作流流程图",
        url: "/ui/workflow"
      },
      {
        id: "3-5",
        title: "动态表格",
        url: "/ui/table"
      },
      {
        id: "3-7",
        title: "省市县三级联动",
        url: "/ui/ssx"
      },
    ]
  },
  {
    id: "4",
    title: '小功能',
    icon: "el-icon-suitcase",
    children: [
      {
        id: "4-1",
        title: "时差计算",
        url: "/suitcase/time"
      }
    ]
  },
  {
    id: "1",
    title: "旅行计划",
    icon: "el-icon-video-camera",
    module: "tour",
    children: [
      {
        id: "1-1",
        title: "云台之间",
        url: "/tour/cloud"
      },
      {
        id: "1-2",
        title: "天空之镜",
        url: "/tour/sky"
      },
      {
        id: "1-3",
        title: "蓬莱之岛",
        url: "/tour/penle"
      },
      {
        id: "1-4",
        title: "西塘之仙",
        url: "/tour/muslin"
      },
    ] // 菜单数据
  },
  {
    id: "2",
    title: "人生阶梯",
    icon: "el-icon-guide",
    module: "ladder",
    children: [
      {
        id: "2-1",
        title: "毛头少年",
        url: "/ladder/juvenile"
      },
      {
        id: "2-2",
        title: "热烈青春",
        url: "/ladder/may"
      },
    ]
  }
]

export default [
  {
    url: '/Api/GetMenusByUserId',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: menus
      }
    }
  },
]
