export default {
  namespaced: true,
  state: {
    // 搜索面板激活状态
    active: false,
    // 快捷键
    hotkey: {
      open: "s",
      close: "esc"
    },
    // 所有可以搜索的页面
    pages: []
  },
  mutations: {
    // 切换激活状态
    TOGGLE_ACTIVE_STATUS(state) {
      state.active = !state.active;
    },
    // 设置激活状态
    SET_ACTIVE_STATUS(state, data) {
      state.active = data;
    },
    // 设置快捷键
    SET_HOT_KEY(state, open, close) {
      if (open) {
        state.hotkey.open = open;
      }
      if (close) {
        state.hotkey.close = close;
      }
    }
  },
  actions: {
    // 切换激活状态
    toggleActiveStatus({ commit }) {
      commit("TOGGLE_ACTIVE_STATUS");
    },
    // 设置激活状态
    setActiveStatus({ commit }, data) {
      commit("SET_ACTIVE_STATUS", data);
    },
    // 设置快捷键
    setHotKey({ commit }, open, close) {
      commit("SET_HOT_KEY", open, close);
    }
  }
};
