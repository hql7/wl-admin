/**
 * @name 导入初始化vue
 */
import vueRender from "./core/render";
/**
 * @name 导入路由、菜单初始化
 */
import "@/core/initRouterAndMenu.js";
/**
 * @name 导入依赖加载
 */
import "./core/install";
/**
 * @name 导入本地存储方法
 */
import { Storage } from "wl-core";

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzM1Njg5NjAwLCJpYXQiOjE1MTYyMzkwMjJ9.OH5WhPuKPoG6fwwEDWi_SLRnu0QQfvx-Rji6fL3cHNU";
const hadToken = Storage.get("token");
if (!hadToken) Storage.set("token", testToken);

// 实例化vue
vueRender();
