import request from "@/utils/request"

/**
 * 检查登录状态
 * @method checkLogin
 */
export function checkLogin(params) {
  return request({
    url: "/api/login/r/get",
    method: "GET",
    params: {
      needManualRedirect: true,
      ...params
    }
  });
}
