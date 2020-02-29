const getters = {
  menu: state => state.menu.menu,
  size: state => state.app.size,
  is_collapse: state => state.menu.is_collapse,
  keep_alive: state => state.page.keep_alive,
  current: state => state.page.current,
  active: state => state.search.active,
}

export default getters