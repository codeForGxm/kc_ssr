import axios from "axios";
import { getHost } from '@common/utils/util'
let needManualRedirect = true;

// NOTE(Haobo): Create the axios root example.
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30 * 1000
});

// Sign in the request interceptors.
service.interceptors.request.use(
  config => {
    if (!config.params) {
      config.params = {}
    }
    config.params.apiVer = 3;
    config.params._kcr = 1
    // TODO: 全局loading

    return config
  },
  error => {
    // Do something with request error
    // for debug
    console.log(error);
    Promise.reject(error);
  }
);

// Sign in the response interceptors.
service.interceptors.response.use(
  response => {
    const res = response.data;
    // TODO: 移除全局loading
    if (res.code !== 1) {
      // TODO: 单页面应用拦截用户通过链接访问没有权限的页面

      // TODO: 提供交互组件，当用户token过期时，根据用户选择来进行清除token
      // errorCode  errorMsg
      // 30003    "密码错误”
      // 30006    "手机号已注册"
      // 30007    "请输入正确验证码",
      // 30009    "该手机号尚未注册",
      // 30010    "请输入合法的手机号",
      // 30013    "昵称已被霸占，换个试试~”
      // 30017    "被踢出"            重新登录
      // 401500   "题库错误 "
      // 40105    "您已评论该课次"
      //

      // 30004    "token格式错误"
      // 30005    "token过期"
      // 30017    "被踢出"
      if ([30004, 30005, 30017].indexOf(res.code) >= 0 && !needManualRedirect) {
        window.location.href = getHost() +  '/account/login?redirecturi=' + encodeURIComponent(window.location.href);
      } else {
        // TODO: 组件提示用户错误信息
      }

      return Promise.reject(response);
    } else {
      return response.data;
    }
  },
  error => {
    // for debug
    console.log("Error:" + error);
    // TODO: 移除全局loading
    return Promise.reject(error);
  }
);

function handle (req) {
  if (req.params && req.params.needManualRedirect) {
    needManualRedirect = req.params.needManualRedirect;
    delete req.params.needManualRedirect;
  } else {
    needManualRedirect = false;
  }

  return service(req);
}

export default handle;
