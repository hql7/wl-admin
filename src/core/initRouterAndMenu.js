import store from "../store";
import router from "../router";
import { flattenDeep } from "wl-core";

// 手动设置菜单
const menuData = [
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
      }
    ] // 菜单数据
  }
];

// 储存左侧菜单组件使用的菜单数据
store.dispatch("menu/setMenu", menuData);

// 根据菜单数据生成路由
const asyncRoutes = () => {
  // 一维化路由结构
  const listMenu = flattenDeep(menuData, "children");
  listMenu.forEach(i => {
    if (i.url) {
      const routerItem = {
        path: i.url, // 路由路径名
        meta: {}, // 路由元信息 定义路由时即可携带的参数，可用来管理每个路由的按钮操作权限
        component: () => import(`@/views${i.url}/index.vue`) // 路由映射真实视图路径
      };
      // 添加异步路由
      router.addRoute("layout", routerItem);
    }
  });
};
// 插入路由
asyncRoutes();
