//配置基础工具
import axios from "axios";
import apiConfig from "common/js/api_config";
import {getQueryString, getToken, saveToken} from "common/js/store";
import 'normalize.css'
import 'common/font/iconfont.css'

axios.defaults.withCredentials = true

//根据url query参数设置token
let tokenURLParam = getQueryString('Authorization')
if (tokenURLParam) {
  saveToken(tokenURLParam)
  window.location.replace(window.location.href.replace(/&token=.+/, ''))
}
let tokenVal = getToken()
if (tokenVal) {
  axios.defaults.headers.common['Authorization'] = tokenVal
}