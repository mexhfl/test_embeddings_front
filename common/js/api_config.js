let currUrl = window.location.href;
let sUserAgent = navigator.userAgent.toLowerCase();
let isMobi = /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)
const debugHostList = [
  '192.168.1.208',
  '192.168.1.206',
  '192.168.1.201'
]
let isDebug = new RegExp(`.\/\/(${debugHostList.join('|')})`).test(currUrl);

//全局请求地址
let REQUEST_URL = isDebug ? 'http://127.0.0.1:3000' : '';

//状态码
const STATUS_ERR = "0";
const STATUS_OK = "1";
const SUCCESS_CODE = 0


//结果处理
const resultHandle = async (resultData, cb, errCb) => {
  switch (resultData.data.errno) {
    case SUCCESS_CODE:
      cb(resultData.data)
      break;
    case 302:
      window.location.replace(resultData.data.message)
      break;
    case 401:
      console.log('未登录处理')
    default:
      console.log('请求异常：', resultData.data.message)
      if (errCb) {
        errCb(resultData.data)
      }
  }
}

export default {
  REQUEST_URL,
  isDebug,
  isMobi,
  resultHandle,
  STATUS_ERR,
  STATUS_OK,
  SUCCESS_CODE,
};

