/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-07-23 14:28:45
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-07-23 16:37:25
 */
export function setToken(token: string) {
  return localStorage.setItem('bomiduo-admin-token', token || '');
}

export function getToken() {
  return localStorage.getItem('bomiduo-admin-token') || '';
}

export function removeToken() {
  return setToken('');
}
