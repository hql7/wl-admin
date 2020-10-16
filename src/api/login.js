import http from "./__http__";

// 登录接口
const loginApi = data =>
  http.post({
    url: "/Api/Login",
    data
  });

export {
  loginApi // 登录接口
};
