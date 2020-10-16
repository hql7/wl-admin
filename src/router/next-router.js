// 非菜单鉴权路由
const nextRouter = [
  // 首页
  {
    path: "/index", // 路由路径名
    name: "index", // 命名路由 用于配合菜单简洁跳转
    component: () => import("@/views/index/index.vue") // 路由映射真实视图路径
  }
];

export default nextRouter;
