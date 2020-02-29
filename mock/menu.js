
const menus = [
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
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: menus
      }
    }
  },
]
