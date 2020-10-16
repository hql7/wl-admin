/**
 * @name 统一注册插件
 */
import Vue from "vue";

// 按需导入element-ui
import "@/plugins/element.js";
// 导入wl-ui
import "@/plugins/wlui.js";
// 导入需要全局注册的公共ui组件
import "@/components/ui/install";

// 导入全局常量
import global_ from "@/global";
Vue.prototype.GLOBAL = global_;

// 导入主工具库lodash
import _ from "lodash";
Vue.prototype.$_ = _;

// 开发环境导入api mock数据
import "../../mock/install";

// 导入封装后的本地数据库lowdb类
import wldb from "@/util/db";
Vue.prototype.wldb = wldb;
