const getters = {
  menu: state => state.menu.menu,
  menu_list: state => state.menu.menu_list,
  size: state => state.app.size,
  token: state => state.app.token,
  is_collapse: state => state.menu.is_collapse,
  keep_alive: state => state.page.keep_alive,
  current: state => state.page.current,
  active: state => state.search.active,
}

export default getters