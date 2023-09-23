/***
 * 本地存储数据模型
 * {id1:{key1:value1},id2:{key2:value2},}
 * 皮肤数据：config:{skinId:green}
 * @param id
 * @param key
 * @param value
 */
import axios from "axios";

export function saveToLocal(id, key, value) {
  let globalData = window.localStorage.__global__;
  if (!globalData) {
    globalData = {};
    globalData[id] = {};
  } else {
    globalData = JSON.parse(globalData);
    if (!globalData[id]) {
      globalData[id] = {};
    }
  }
  globalData[id][key] = value;
  window.localStorage.__global__ = JSON.stringify(globalData);
};

export function loadFromLocal(id, key, def) {
  let globalData = window.localStorage.__global__;
  if (!globalData) {
    return def;
  }
  globalData = JSON.parse(globalData)[id];
  if (!globalData) {
    return def;
  }
  let ret = globalData[key];
  return ret || def;
};

export function saveToSession(id, key, value) {
  let globalData = window.sessionStorage.__global__;
  if (!globalData) {
    globalData = {};
    globalData[id] = {};
  } else {
    globalData = JSON.parse(globalData);
    if (!globalData[id]) {
      globalData[id] = {};
    }
  }
  globalData[id][key] = value;
  window.sessionStorage.__global__ = JSON.stringify(globalData);
};

export function loadFromSession(id, key, def) {
  let globalData = window.sessionStorage.__global__;
  if (!globalData) {
    return def;
  }
  globalData = JSON.parse(globalData)[id];
  if (!globalData) {
    return def;
  }
  let ret = globalData[key];
  return ret || def;
};

export function setCookie(name, value, day) {
  if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var expires = day * 24 * 60 * 60 * 1000;
    var date = new Date(+new Date() + expires);
    document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
  } else {
    document.cookie = name + "=" + escape(value);
  }
}

export function getCookie(name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};

export function getToken() {
  return getCookie('Authorization')
}

export function removeToken() {
  setCookie('Authorization', ' ', -1)
}

export function saveToken(val) {
  setCookie('Authorization', val, 0)
  axios.defaults.headers.common['Authorization'] = val
}

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var serchText = window.location.href.indexOf('?') !== -1 ? window.location.href.split('?')[1] : ''
  var r = serchText.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
