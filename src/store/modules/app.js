export default {
  namespaced: true,
  state: {
    size: 10,  // 分页 页大小
  },
  mutations: {
    // 设置分页大小
    SET_PAGE_SIZE(state, data) {
      state.size = data;
    }
  },
  actions: {
    // 设置分页大小
    setPageSize({ commit }, data) {
      commit('SET_PAGE_SIZE', data)
    }
  }
}
