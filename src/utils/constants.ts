/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-07-23 17:08:17
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-07-23 18:01:50
 */
import type { DateRange } from '@/types/typings';
import moment from 'moment';
import 'moment/locale/zh-cn';

export const All_SELECTION = '-1';

export enum EnumBoolean {
  False,
  True,
}

export enum EnumResCode {
  成功 = 200,
  未携带token = 1001,
  token过期 = 1002,
  token无效 = 1003,
  参数为空 = 2001,
  参数非法 = 2002,
  文件类型错误 = 2003,
  未经认证 = 4001,
  认证失败 = 4002,
  用户不存在 = 4003,
  旧密码错误 = 4004,
  服务器内部错误 = 5001,
  广告已经超过最大限值 = 5002,
}

export const START_TIME_SUFFIX = '00:00:00';
export const END_TIME_SUFFIX = '23:59:59';

export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const PAGE_SIZE_OPTIONS = ['10', '20', '50'];

export const MOMENT_TIME_START = { hour: 0, minute: 0, second: 0, millisecond: 0 };
export const MOMENT_TIME_END = { hour: 23, minute: 59, second: 59, millisecond: 0 };

export const DATE_PICKER_RANGES: Record<string, DateRange> = {
  今日: [moment().set(MOMENT_TIME_START), moment()],
  昨日: [moment().set(MOMENT_TIME_START).add(-1, 'd'), moment().set(MOMENT_TIME_END).add(-1, 'd')],
  本周: [moment().startOf('week'), moment().set(MOMENT_TIME_END)],
  上周: [
    moment().subtract(1, 'week').startOf('week'),
    moment().set(MOMENT_TIME_END).subtract(1, 'week').endOf('week'),
  ],
  本月: [moment().startOf('month'), moment().set(MOMENT_TIME_END)],
  上月: [
    moment().subtract(1, 'month').startOf('month'),
    moment().set(MOMENT_TIME_END).subtract(1, 'month').endOf('month'),
  ],
  近7天: [moment().set(MOMENT_TIME_START).subtract(6, 'd'), moment().set(MOMENT_TIME_END)],
  近30天: [moment().set(MOMENT_TIME_START).subtract(29, 'd'), moment().set(MOMENT_TIME_END)],
};
