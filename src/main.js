import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;


// 按需导入element-ui
import "./plugins/element.js";
// 导入wl-ui
import "./plugins/wlui.js";

// 导入需要全局注册的公共ui组件
import "./components/ui/install";

// 导入全局常量 
import global_ from "./global"
Vue.prototype.GLOBAL = global_;

// 导入主工具库lodash
import _ from 'lodash';
Vue.prototype._ = _;

// 导入封装后的本地数据库lowdb类
import wldb from "./db"
Vue.prototype.wldb = wldb;

// 开发环境导入api mock数据
import { mockXHR } from '../mock'
// if(process.env.NODE_ENV == 'development'){
mockXHR();
// }

// 测试proxy
import "./util/proxy";

// 导入鉴权系统
import AUTH from '@/auth'
AUTH();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
