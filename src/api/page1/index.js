import request from "../../common/utils/request"
export function getBaseData(params) {
  return request({
    url: "http://127.0.0.1:3000/api/address/getProvinces",
    method: "GET",
    params
  });
}