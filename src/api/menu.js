import request from "./_request";

// 1获取菜单数据接口
function getMenuDataApi(data) {
  return request({
    url: "/Api/GetMenusByUserId",
    method: 'post',
    data
  });
}

export {
  getMenuDataApi, // 1获取菜单数据接口
}