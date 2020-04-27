import http from "./__http__"

const getMenuApi = () => http.get({
  url: '/Api/GetMenusByUserId',
})

export {
  getMenuApi, // 1获取菜单数据接口
}