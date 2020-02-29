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
  // 登录视图
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/login/index.vue')
  },
  // 主视图
  {
    path: "/layout",
    name: "layout",
    component: () => import('@/views/layout/index.vue'),
    redirect: '/index',
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import('@/views/index/index.vue'),
      },
      {
        path: "/tour/cloud",
        name: "tour-cloud",
        component: () => import('@/views/tour/cloud/index.vue'),
      },
      {
        path: "/tour/sky",
        name: "tour-sky",
        component: () => import('@/views/tour/sky/index.vue'),
      },
      {
        path: "/tour/penle",
        name: "tour-penle",
        component: () => import('@/views/tour/penle/index.vue'),
      },
      {
        path: "/ladder/juvenile",
        name: "ladder-juvenile",
        component: () => import('@/views/ladder/juvenile/index.vue'),
      },
      {
        path: "/ladder/may",
        name: "ladder-may",
        component: () => import('@/views/ladder/may/index.vue'),
      },
    ]
  }
];

const createRouter = () => new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;
