import Vue from "vue";
import vueRender from "./render"
import { Storage } from "wl-core"

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
Vue.prototype.$_ = _;

// 开发环境导入api mock数据
import '../mock/install'

// 导入封装后的本地数据库lowdb类
/* import wldb from "./db"
Vue.prototype.wldb = wldb; */

const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzM1Njg5NjAwLCJpYXQiOjE1MTYyMzkwMjJ9.OH5WhPuKPoG6fwwEDWi_SLRnu0QQfvx-Rji6fL3cHNU'
const hadToken = Storage.get('token');
if (!hadToken) Storage.set('token', testToken);

// 实例化vue
vueRender()

