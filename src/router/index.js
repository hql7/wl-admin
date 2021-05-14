import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 根路径重定向
  {
    path: "/",
    redirect: {
      name: "layout"
    }
  },
  // 主视图路由
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    children: []
  },
  // 登录视图
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue")
  },
  // 注册视图
  {
    path: "/register",
    name: "register",
    meta: {
      withoutAuth: true // 不进行身份验证
    },
    component: () => import("../views/register/index.vue")
  },
  // 404
  {
    path: "/err-404",
    name: "err404",
    meta: {
      withoutAuth: true
    },
    component: () => import("../views/error/404.vue")
  },
  // 404路由
  {
    path: "*",
    redirect: "err404"
  }
];

const createRouter = () =>
  new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });

const router = createRouter();

// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
