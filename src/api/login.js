import request from "./_request";

// 登录接口
function loginApi(data) {
  return request({
    url: "/Api/Login",
    method: 'post',
    data
  });
}

export {
  loginApi, // 登录接口
}