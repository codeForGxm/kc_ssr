import request from "../../common/utils/request"
export function getBaseData(params) {
  return request({
    url: "/api/address/getProvinces",
    method: "GET",
    params
  });
}