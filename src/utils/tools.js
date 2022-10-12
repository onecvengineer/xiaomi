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
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const value = window.location.search.match(reg);
  return value ? decodeURIComponent(value[2]) : null;
}
