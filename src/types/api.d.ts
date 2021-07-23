/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-07-23 11:42:51
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-07-23 17:47:39
 */
import { EnumResCode } from '@/utils/constants';

export type RES<T> = {
  code: EnumResCode;
  message: string;
  data: T;
};

export type List<T> = {
  list: T[];
  total: number;
};

export type ListRes<T> = RES<List<T>>;

export type DatePayload = {
  startTime?: string;
  endTime?: string;
};

export type TablePayload = {
  pageSize?: number;
  pageNum?: number;
};

export type RecordItem = {
  id: string;
  createTime: string;
};
