export function tplReplace(tpl, obj) {
  return tpl().replace(/{{(.+?)}}/g, (node, key) => {
    return obj[key.trim()];
  });
}

export function trimSpace(str) {
  return str.replace(/\s+/g, '');
}

export function debounce(fn, delay = 500) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

export function getUrlQueryValue(key) {
  const reg = new RegExp('(/?|&)' + key + '=([^&]*)(&|$)', 'i');
  const value = window.location.search.match(reg);
  return value ? decodeURIComponent(value[2]) : null;
}

export function getRandomId(num) {
  let id = '';
  for (let i = 0; i < num; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return Date.now() + id;
}

export function getNowTime() {
  const date = new Date(),
    year = date.getFullYear(),
    month = addZero(date.getMonth() + 1),
    day = addZero(date.getDay()),
    hour = addZero(date.getHours()),
    minute = addZero(date.getMinutes());

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;

  function addZero(num) {
    return num < 10 ? '0' + num : num;
  }
}
