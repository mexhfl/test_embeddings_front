import axios from "axios";
import apiConfig from "common/js/api_config";
import {v4 as uuidv4} from 'uuid';
import {getQueryString} from "common/js/store";

export function getCursortPosition(dom) {
  let cursorIndex = 0;
  let obj = dom
  if (document.selection) {
    // IE Support
    obj.focus();
    let range = document.selection.createRange();
    range.moveStart('character', -obj.value.length);
    cursorIndex = range.text.length;
  } else if (obj.selectionStart || obj.selectionStart == 0) {
    // another support
    cursorIndex = obj.selectionStart;
  }
  return cursorIndex;
}

export function debounce(func, delay) {
  let timer
  
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function isJSONString(value) {
  try {
    JSON.parse(value)
    return true
  } catch (er) {
    return false;
  }
}

export function getSystemPreURL() {
  let reg = new RegExp(/^(.+)(\/)/)
  return `${window.location.href.split('#')[0].match(reg)[0]}`
}

export function copyAction(succText) {
  let res = document.execCommand("Copy");
  console.log('result:', res)
  this.$successMsg(succText || '复制成功')
}


export function copyActionFull(text, tempContainer) {
  /****
   * text 内容
   * tempContainer 临时容器
   * succText 成功提示
   * @type {boolean}
   */
  
  tempContainer = tempContainer || document.body
  
  let el = document.createElement('input')
  el.value = text
  el.style.position = 'absolute'
  el.style.width = '8px'
  el.style.height = '2px'
  el.style.zIndex = '-99'
  el.style.border = 'none'
  el.style.opacity = '0.1'
  tempContainer.appendChild(el)
  
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Mac);?/i)) {
    //OSX设备
    el.contentEditable = true
    el.readOnly = false
    let range = document.createRange()
    range.selectNodeContents(el)
    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    el.setSelectionRange(0, 999999)
    let ret = document.execCommand('copy')
  } else {
    //其他
    el.select()
  }
  let res = document.execCommand("Copy")
}

export function getFrontRootPath(url) {
  //输出的路径中末尾带/
  if (!url) {
    url = window.location.href
  }
  return url.match(/.+\/(.+\.html)?(.+)#/)[0].match(/.+\//)[0]
}

export function uniqueArrByAttr(arr, val) {
  const res = new Map();
  return arr.filter(item => !res.has(item[val]) && res.set(item[val], 1))
}

export function getApproveJson(str) {
  if (!str) {
    return null
  }
  let originStr = str,
    keyList = ['checkerId', 'checkName', 'checkInfo', 'signNamePath', 'checkType', 'checkDate']
  let dataMap = {}
  keyList.forEach((key) => {
    let reg = new RegExp(`${key}=(.+?)\,`)
    let dimVal = originStr.match(reg)[0]
    if (!dimVal) {
      return
    }
    let arr = dimVal.split('=')
    if (arr[1][arr[1].length - 1] === ',') {
      arr[1] = arr[1].substr(0, arr[1].length - 1)
    }
    dataMap[arr[0]] = arr[1]
  })
  return dataMap
  
}

export function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function removeLoading() {
  if (document.querySelector('#loadingWrapper')) {
    document.querySelector('#loadingWrapper').remove()
  }
}

export function getUUID(len) {
  if (!len) {
    return uuidv4()
  }
  return uuidv4().toString().replace(/\-/g, '').slice(-len)
}

export function dynamicLoading() {
  return {
    css: function (path) {
      if (!path || path.length === 0) {
        throw new Error('argument "path" is required !');
      }
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.href = path;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      head.appendChild(link);
    },
    js: function (path) {
      if (!path || path.length === 0) {
        throw new Error('argument "path" is required !');
      }
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.src = path;
      script.type = 'text/javascript';
      head.appendChild(script);
    }
  }
}

export function commonDownload(reqInfo) {
  //公共的下载方法
  return new Promise((resolve, reject) => {
    axios({
      responseType: 'arraybuffer',
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      ...reqInfo
    }).then(response => {
      var filename = response.headers//下载后文件名
      filename = filename["content-disposition"]
      filename = decodeURI(filename.split(";")[1].split("filename=")[1]);
      var blob = new Blob([response.data], {type: response.headers['content-type']})
      var downloadElement = document.createElement('a');
      var href = URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = filename
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      URL.revokeObjectURL(href); //释放掉blob对象
      resolve();
    }).catch(err => {
      reject(err)
    })
  })
}

export function exportFile(data, fileName) {
  let blob = new Blob([data], {
    type: 'application/octet-stream'
  })
  
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    // Create download link element
    let downloadLink = document.createElement("a");
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(blob);
    // Setting the file name
    downloadLink.download = fileName;
    
    downloadLink.style.display = 'none'
    
    document.body.appendChild(downloadLink);
    
    //triggering the function
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
  }
}

// export function uniqueArrByAttr1(arr, key) {
//   let map = new Map()
//   return arr.filter(item => {
//     if (map.has(item[key])) {
//       return false
//     }
//     map.set(item[key], 1)
//     return true
//   })
// }

export function redirectAdaptWeWorkLink(url) {
  let inQywx = apiConfig.inQywx
  
  function jumpURL(url) {
    window.open(url)
  }
  
  if (url.trim().indexOf('https://open.weixin.qq.com/connect/oauth2/authorize') !== 0 || inQywx) {
    jumpURL(url)
    return
  }
  
  let browserJumpUrl = getQueryString('redirect_uri', url)
  jumpURL(browserJumpUrl)
}

export function mountToWindow(key, value) {
  window[key] = value
}