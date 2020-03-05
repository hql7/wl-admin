import router from '@/router'
import { sessionSet, sessionDel } from "@/util/storage"
export default {
  namespaced: true,
  state: {
    keep_alive: [], // 需要状态保持的页面
    current: "" // 当前active的页面
  },
  mutations: {
    // 设置需要状态保持的页面
    SET_KEEP_ALIVE(state, data) {
      state.keep_alive = data;
      sessionSet('keep_alive', data);
    },
    // 添加一个新的需要状态保持的页面
    ADD_KEEP_ALIVE(state, data) {
      let _had = state.keep_alive.some(i => i.url === data.url);
      if (!_had) {
        state.keep_alive.push(data);
        sessionSet('keep_alive', state.keep_alive);
      }
    },
    // 关闭需要状态保持的页面
    CLOSE_KEEP_ALIVE(state, data) {
      // 当前只有一个页面 清空
      if (state.keep_alive.length === 1) {
        state.keep_alive = [];
        state.current = '/index';
        sessionSet('current', '/index');
        sessionDel('keep_alive');
        router.push('/index');
        return;
      }
      // 当前关闭active页面，页面有多个，取前一个或下一个
      if (data === state.current) {
        for (let i = 0, len = state.keep_alive.length; i < len; i++) {
          if (state.keep_alive[i].url === data) {
            let _next_index = i < len - 1 ? i + 1 : i - 1;
            state.current = state.keep_alive[_next_index].url;
            sessionSet('current', state.current);
            router.push(state.current);
            break;
          }
        }
      }
      state.keep_alive = state.keep_alive.filter(i => i.url !== data);
      sessionSet('keep_alive', state.keep_alive);
    },
    // 关闭右侧需要状态保持的页面
    CLOSE_RIGHT_KEEP_ALIVE(state, data) {
      let _target_index = -1; // 右键编辑的菜单索引
      let _active_index = 0; // 当前的菜单索引
      state.keep_alive.forEach((i, idx) => {
        if (i.url === data) {
          _target_index = idx;
        }
        if (i.url === state.current) {
          _active_index = idx;
        }
      })
      if (_target_index !== -1) {
        state.keep_alive = this._vm._.take(state.keep_alive, [_target_index + 1]);
        if (_target_index < _active_index) {
          state.current = data;
          sessionSet('current', state.current);
          router.push(data);
        }
        sessionSet('keep_alive', state.keep_alive);
      }
    },
    // 关闭左侧需要状态保持的页面
    CLOSE_LEFT_KEEP_ALIVE(state, data) {
      let _target_index = -1; // 右键编辑的菜单索引
      let _active_index = 0; // 当前的菜单索引
      state.keep_alive.forEach((i, idx) => {
        if (i.url === data) {
          _target_index = idx;
        }
        if (i.url === state.current) {
          _active_index = idx;
        }
      })
      if (_target_index !== -1) {
        state.keep_alive = this._vm._.drop(state.keep_alive, [_target_index]);
        if (_active_index < _target_index) {
          state.current = data;
          sessionSet('current', state.current);
          router.push(data);
        }
        sessionSet('keep_alive', state.keep_alive);
      }
    },
    // 关闭其他需要状态保持的页面
    CLOSE_OTHER_KEEP_ALIVE(state, data) {
      state.keep_alive = state.keep_alive.filter(i => i.url === data);
      state.current = data;
      router.push(data);
      sessionSet('keep_alive', state.keep_alive);
      sessionSet('current', state.current);
    },
    // 关闭全部需要状态保持的页面
    CLOSE_ALL_KEEP_ALIVE(state) {
      state.keep_alive = [];
      state.current = '/index';
      sessionSet('current', '/index');
      sessionDel('keep_alive');
      router.push('/index');
    },
    // 设置当前页面active
    SET_CURRENT(state, data) {
      state.current = data;
      sessionSet('current', state.current);
    },
  },
  actions: {
    // 设置是否状态保持
    setKeepPage({ commit }, data) {
      commit('SET_KEEP_ALIVE', data)
    },
    // 添加一个新的需要状态保持的页面
    addKeepPage({ commit }, data) {
      commit('ADD_KEEP_ALIVE', data)
    },
    // 关闭一个状态保持内的页面
    closeKeepPage({ commit }, data) {
      commit('CLOSE_KEEP_ALIVE', data)
    },
    // 关闭右侧状态保持内的页面
    closeRightKeepPage({ commit }, data) {
      commit('CLOSE_RIGHT_KEEP_ALIVE', data)
    },
    // 关闭左侧状态保持内的页面
    closeLeftKeepPage({ commit }, data) {
      commit('CLOSE_LEFT_KEEP_ALIVE', data)
    },
    // 关闭其他状态保持内的页面
    closeOtherKeepPage({ commit }, data) {
      commit('CLOSE_OTHER_KEEP_ALIVE', data)
    },
    // 关闭全部状态保持内的页面
    closeAllKeepPage({ commit }) {
      commit('CLOSE_ALL_KEEP_ALIVE')
    },
    // 设置当前页面active
    setCurrentPage({ commit }, data) {
      commit('SET_CURRENT', data)
    }
  }
}
