/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-07-23 16:50:18
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-07-23 17:09:48
 */

// 将数值转为万，亿，万亿并保留一位小数
export const numberFormat = (value: number | string, fixNum: number = 0): string => {
  if (!value && value !== 0) return '';
  if (typeof value === 'string') {
    // eslint-disable-next-line no-param-reassign
    value = Number(value);
  }
  const param = {} as { value: unknown; unit: unknown };
  const k = 10000;
  const sizes = ['', 'w', '亿', '万亿'];
  let i: number;
  if (value < k) {
    param.value = value.toFixed(fixNum);
    param.unit = '';
  } else {
    // eslint-disable-next-line no-param-reassign
    fixNum = fixNum || 1;
    i = Math.floor(Math.log(value) / Math.log(k));
    // eslint-disable-next-line no-restricted-properties
    param.value = (value / Math.pow(k, i)).toFixed(fixNum);
    param.unit = sizes[i];
  }
  return `${param.value}${param.unit}`;
};

// 验证手机号码
export const validPhone = (str: string) => {
  let succ = false;
  if (str && /^1[^012]\d{9}$/.test(str)) {
    succ = true;
  }
  return succ;
};

export const openBlankWindow = (href: string): void => {
  window.open(href, '_ blank', 'noopener=yes,noreferrer=yes');
};

export function isInViewPort(element: HTMLElement): boolean {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const { top, right, bottom, left } = element.getBoundingClientRect();

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}

// 验证邮箱
export const validEmail = (str: string) => {
  let succ = false;
  if (str && /^\w+@\w+(.[a-z]+){1,}$/.test(str)) {
    succ = true;
  }
  return succ;
};

export const downloadFile = (api: string, filename?: string) => {
  function createObjectURL(object: any) {
    return window.URL
      ? window.URL.createObjectURL(object)
      : window.webkitURL.createObjectURL(object);
  }
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  xhr.open('get', api);
  xhr.setRequestHeader('Authorization', '');
  xhr.responseType = 'blob';
  xhr.onload = function onload() {
    if (xhr.status === 200) {
      const blob = xhr.response;
      const a = document.createElement('a');
      const url = createObjectURL(blob);
      a.href = url;
      if (filename) {
        a.download = filename;
      }
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  xhr.send(formData);
};

// 计算时间差
export const timeDifference = (a: number, b?: number): string => {
  let difference: number;
  if (b) {
    difference = b - a;
  } else {
    difference = a;
  }
  // 计算出相差天数
  const days = Math.floor(difference / (24 * 3600 * 1000));

  // 计算出小时数
  const leave1 = difference % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));

  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);

  if (days) {
    return `${days}天${hours}小时${minutes}分钟`;
  }
  if (hours) {
    return `${hours}小时${minutes}分钟`;
  }
  if (minutes) {
    return `${minutes}分钟${seconds}秒`;
  }
  return `${seconds}秒`;
};
