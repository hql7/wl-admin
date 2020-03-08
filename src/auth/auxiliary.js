
import { localGet } from "@/util/storage";
import { isAfter } from "@/util/time";
import store from "@/store";

// 导入全局配置项
import global from '@/global/index';

/**
 * 检验jwt是否合格
 * @param {*} context 需要解析的内容
 */
function checkJwtAuthorized(context) {
  if (!context) return false;
  let jwt_split = context.split('.');
  if (jwt_split.length !== 3) return false;
  return jwt_split[1];
}

/**
 * 简单解析jwt有效载荷内容
 * @param {*} context 需要解析的内容
 */
function payloadAtob(context) {
  let jwt_payload = checkJwtAuthorized(context);
  if (!jwt_payload) return null;
  let decodedData = window.atob(jwt_payload);
  return JSON.parse(decodedData);
}

/**
 * 检验jwt是否过期
 * @param {*} context 需要解析的内容
 */
function isLoginExpired(context) {
  let exp = payloadAtob(context).exp;
  return isAfter(new Date(), exp)
  // 比较jwt签发的过期时间与本地时间
}

/**
 * 检验jwt是否到达触发自动更新的时间
 * @param {*} context 需要解析的内容
 */
function shouldUpdateJwt(context) {
  let jwt_payload = checkJwtAuthorized(context);
  if (!jwt_payload) return true;
  // 比较jwt签发的过期时间与本地时间直接的间隔是否小于4小时
}

// 监测浏览器tab页切换立即校验账号
function monitoringVisibilityChange() {
  let project_key = global.project_key;
  window.addEventListener("visibilitychange", () => {
    let local_auth = localGet(project_key);
    let token = store.getters.token;
    if (!document.hidden && local_auth && local_auth != token) {
      store.dispatch('app/setToken', local_auth)
    }
  })
}

// ie浏览器时发出请求前校验账号
function monitoringIeUserIdentity() {
  let project_key = global.project_key;
  let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串  
  let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
  let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE || isEdge || isIE11) {
    let local_auth = localGet(project_key);
    let token = store.getters.token;
    if (local_auth && local_auth != token) {
      store.dispatch('app/setToken', local_auth)
      return false
    }
  }
}

export {
  checkJwtAuthorized, // 检验jwt是否合格
  payloadAtob, // 简单解析jwt有效载荷内容
  isLoginExpired, // 检验jwt是否过期
  shouldUpdateJwt, // 检验是否需要自动更新jwt
  monitoringVisibilityChange, // 监测浏览器tab页切换立即校验账号
  monitoringIeUserIdentity, // ie浏览器时发出请求前校验账号
}