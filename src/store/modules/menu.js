import settings from "@/config/settings"

export default {
  namespaced: true,
  state: {
    is_collapse: settings.menu.isCollapse, // 折叠状态
    unique_opened: settings.menu.uniqueOpened, // 手风琴模式
    menu: [], // 菜单数据
    permissions: [], // 按钮权限集合
    menu_list: [], // 菜单一维数组
  },
  mutations: {
    // 推入用户菜单
    ADD_USER_MENU(state, data) {
      state.menu = data;
    },
    // 设置折叠状态
    SET_COLLAPSE_STATUS(state, data) {
      state.is_collapse = data;
    },
    // 设置一维菜单数据
    SET_MENU_LIST(state, data) {
      state.menu_list = data;
    },
    // 设置按钮权限集合
    SET_PERMISSIONS(state, data) {
      state.permissions = data;
    },
  },
  actions: {
    // 推入用户菜单
    setMenu({ commit }, data) {
      commit('ADD_USER_MENU', data)
    },
    // 推入一维菜单数据
    setMenuList({ commit }, data) {
      commit('SET_MENU_LIST', data)
    },
    // 设置折叠状态
    setCollapseStatus({ commit }, data) {
      commit('SET_COLLAPSE_STATUS', data)
    },
    // 设置按钮权限集合
    setPermissions({ commit }, data) {
      commit('SET_PERMISSIONS', data)
    },
  }
}