import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  // 根路径重定向
  {
    path: "/",
    redirect: {
      name: "login"
    }
  },
  // 登录视图
  {
    path: "/login",
    name: "login",
    component: () => import('../views/login/index.vue')
  },
  // 注册视图
  {
    path: "/register",
    name: "register",
    meta: {
      withoutAuth: true, // 不进行身份验证
    },
    component: () => import('../views/register/index.vue')
  },
  // 404
  {
    path: "/err-404",
    name: "err404",
    meta: {
      withoutAuth: true
    },
    component: () => import('../views/error/404.vue')
  },
  // 403
  {
    path: "/err-403",
    name: "err403",
    meta: {
      withoutAuth: true
    },
    component: () => import('../views/error/403.vue')
  },
]

const createRouter = () => new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const router = createRouter();

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;
