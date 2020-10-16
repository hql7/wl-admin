/**
 * @author weilan
 * @time 2020.04.26
 * @description 将路由映射到真实路径
 */

module.exports = path => () => import(`@/views${path}/index.vue`);
