/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-07-23 11:43:09
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-07-23 16:49:34
 */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { history } from 'umi';

export const ALL_SELECTION = '-1';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  600: '服务器成功返回请求的数据。',
  700: '请求失败',
  701: '登录用户名不存在',
  702: '登录密码错误',
  703: '登出失败',
  800: '服务器请求异常',
  801: '用户权限异常',
};

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  // errorHandler, // 默认错误处理
  timeout: 600000,
  credentials: 'include', // 默认请求是否带上cookie
  headers: { Authorization: '' },
  prefix: '',
});

request.interceptors.response.use(async (response, options) => {
  const contentType = response.headers.get('Content-Type'); // 获取Content-Disposition
  const disposition = response.headers.get('Content-Disposition'); // 获取Content-Disposition
  // 需要 Server 暴露出 Headers 的字段，前端才能获取
  // Access-Control-Expose-Headers:Content-Disposition
  if (contentType?.includes('application/vnd.ms-excel')) {
    // 当Content-Disposition中有值的时候进行处理，其他请求的响应则放过
    // 将二进制的数据转为blob对象，这一步是异步的因此使用async/await
    // 处理Content-Disposition，获取header中的文件名
    const tempFileName = `${Date.now().toLocaleString()}.xlsx`;
    return {
      blob: await response.blob(),
      fileName: disposition
        ? decodeURI(disposition!.split(';')[1].split('filename=')[1])
        : tempFileName,
    };
  }

  if (options.responseType === 'blob') {
    return response;
  }

  const responseClone = await response.clone().json();

  if (responseClone.code === 801) {
    if (history.location.pathname !== '/user/login') {
      history.push('/user/login');
    }
    notification.error({ message: responseClone.data || 'token已过期，请重新登录！' });
    // store.clearAll();
    return responseClone.data;
  }
  if (responseClone.code > 600) {
    if (responseClone.code === 900) {
      message.error(responseClone.msg);
    } else if (codeMessage[responseClone.code]) {
      notification.error({
        message: codeMessage[responseClone.code],
        description: responseClone.code.msg,
      });
    }
  }
  return responseClone.data;
});

export default request;
