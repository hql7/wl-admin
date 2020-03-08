/**
 * auth：weilan
 * 异步推入鉴权路由
 */
import router from "@/router/index";
import nextRouter from "@/router/next-router"; // 导入非菜单鉴权路由
import { flattenDeep } from '@/util/array'; // 导入数组操作函数
import store from "@/store";

/**
 * 异步推入鉴权路由
 * @param {*} data 
 */
function addUserRouter(data) {
  // 主视图路由
  let userRouter = {
    path: "/layout",
    name: "layout",
    component: () => import('@/views/layout/index.vue'),
    redirect: '/index',
    children: []
  };
  // 创建路由盒子
  let routerBox = [];
  // 将菜单数据处理为一维函数
  let menu = flattenDeep(data, 'children');
  // 遍历处理路由 
  menu.forEach(item => {
    if (!item.url) return;
    try {
      let routerItem = {
        path: item.url, // 路由路径名
        name: item.id, // 命名路由 用于配合菜单简洁跳转
        meta: {
          purview: item.permissions,
          code: item.code,
        }, // 路由元信息 定义路由时即可携带的参数，可用来管理每个路由的按钮操作权限
        component: () => import(`@/views${item.url}/index.vue`) // 路由映射真实视图路径
      };
      routerBox.push(routerItem);
    } catch (err) {
      item.url = '/err-404'
    }
  });
  // 推入需要异步加载的，非服务端获取的功能性页面
  routerBox.push(...nextRouter);
  store.dispatch('menu/setUserMenuList', menu);
  // 最后创建err视图盒子，解决放在前面路由会直接跳向404问题
  let errorBox = {
    path: "*",
    redirect: "/err-404"
  };
  userRouter.children = routerBox;
  router.addRoutes([userRouter, errorBox]);
}

export default addUserRouter