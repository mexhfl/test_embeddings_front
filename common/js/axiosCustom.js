import axios from "axios";
import apiConfig from "common/js/api_config";
import {getFrontRootPath} from "common/js/utils";

const SUCCESS_CODE = 0
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: apiConfig.REQUEST_URL,
  timeout: 50000,
});

axiosInstance.interceptors.response.use(function (response) {
  switch (response.data.errno) {
    case SUCCESS_CODE:
      return response.data
    case 302:
      window.location.replace(response.data.message)
      break;
    case 401:
      console.log('未登录处理')
      window.location.replace(`${getFrontRootPath()}index.html#/login/tel`)
      break;
    default:
      console.log('请求异常：', response.data.message)
  }
  return Promise.reject(response)
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance