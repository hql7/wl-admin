import { render } from "wl-vue"
import App from "./App.vue";
import store from "./store";
import router from "./router";
import nextRoutes from "./router/next-router"
import routeMap from "./router/map-router"
import { getMenuApi } from "./api/menu"

// 声明鉴权需要的参数
const routeOptions = {
  apiFn: getMenuApi
}

// 声明菜单解析为路由所需参数
const menuOptions = {
  mapPathFn: (item) => routeMap(item.url)
}

// 导出手动实例化vue函数
const vueRender = () => render({ root: App, router, store, routeOptions, nextRoutes, menuOptions });

export default vueRender;