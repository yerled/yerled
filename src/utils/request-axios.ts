/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-07-23 11:44:49
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-07-23 17:41:25
 */
import axios, { Method } from 'axios';
import { message } from 'antd';
import { getToken } from '@/utils/auth';
import { EnumResCode } from './constants';
import { RES } from '@/types/api';
let { REACT_APP_URL, REACT_APP_PATH, NODE_ENV } = process.env;

export const ALL_SELECTION = '-1';

const errorMsg = '网络异常！';
const authFailedEnumResCode = [
  EnumResCode.未携带token,
  EnumResCode.token过期,
  EnumResCode.token无效,
  EnumResCode.未经认证,
  EnumResCode.认证失败,
];
axios.defaults.baseURL = `${REACT_APP_URL}${REACT_APP_PATH}`;
axios.defaults.timeout = 5000;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const request = (url: string, method: Method, params = {}, data = {}, otherConfig: any = {}) => {
  let headers = getHeaders(otherConfig);
  let isDev = NODE_ENV === 'development';
  return new Promise((resolve, reject) => {
    axios
      .request({
        url,
        method,
        data,
        params,
        ...otherConfig,
        headers,
      })
      .then((res) => {
        let { status: httpStatus, data: httpData, statusText: httpStatusText } = res;
        let { status, data, statusText } = httpData as RES<any>;
        if (httpStatus === 200 && httpData && status === EnumResCode.成功) {
          resolve(data);
        } else {
          httpStatusText = statusText || httpStatusText;
          message.error(httpStatusText);
          isDev
            ? reject({ message: 'error: ' + httpStatusText })
            : reject(new Error(httpStatusText));
          if (authFailedEnumResCode.includes(status) && window.location.pathname !== '/login') {
            setTimeout(() => {
              window.location.href = '/login';
            }, 500);
          }
        }
      })
      .catch((error) => {
        let errMsg = (error || {}).message || errorMsg;
        message.error(errMsg);
        isDev ? reject({ message: errMsg }) : reject(new Error(errMsg));
      });
  });
};
const get = (url: string, params = {}, otherConfig = {}) => {
  return request(url, 'get', params, undefined, otherConfig);
};
const post = (url: string, params = {}, otherConfig = {}) => {
  return request(url, 'post', undefined, params, otherConfig);
};

const getHeaders = (otherConfig: any) => {
  let token = getToken();
  let headers = {
    token,
    'Content-Type': 'application/json;charset=UTF-8',
  };
  let otherHeaders = otherConfig.headers;
  if (otherHeaders) {
    headers = Object.assign({}, headers, otherHeaders);
  }
  return headers;
};

export { get, post };
