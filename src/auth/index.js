// 权限设置
import router from "@/router";
import store from "@/store";
import { getMenuDataApi } from "@/api/menu"; // 导入获取用户菜单接口
import { localGet, localDel } from "@/util/storage"; // 导入存储函数
import { isLoginExpired, monitoringVisibilityChange } from './auxiliary'; // 导入jwt过期校验函数,监测浏览器tab页切换立即校验账号函数
import addUserRouter from './add-routes'; // 导入异步插入路由函数
import global from '@/global/index';

const project_key = global.project_key;
// 登记全局路由守卫
function registerRouteGuard() {
  router.beforeEach((to, from, next) => {
    // 检查是否存在登录状态
    let local_auth = localGet(project_key, true);
    // 存在登陆状态
    if (local_auth && local_auth != 'undefined') {
      // 第一次打开页面token过期进入登陆页
      if (isLoginExpired(local_auth)) {
        store.dispatch('app/setToken', '')
        localDel(project_key);
        next({
          path: "/login"
        });
        return;
      }
      // 没过期自动登录
      store.dispatch('app/setToken', local_auth)
      // 判断当前用户是否已拉取权限菜单
      if (store.getters.menu.length === 0) {
        getMenuDataApi()
          .then(({ data }) => {
            let _menu = data.data || [];
            // 异步退入路由
            addUserRouter(_menu);
            // 整理菜单数据
            store.dispatch('menu/setUserMenu', _menu)
            next({ ...to, replace: true });
          })
          .catch();
      } else {
        // 存在登录状态时跳过登录步骤
        if (to.path == "/login") {
          next({
            name: "index"
          });
        } else {
          next();
        }
      }
    } else {
      // 无登录状态时重定向至登录 或可进入无需登录状态路径
      if (to.path == "/login" || !to.meta.authentication) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    }
  });
}
// 登录及权限状态管理
function AUTH() {
  monitoringVisibilityChange();
  registerRouteGuard();
}

export default AUTH