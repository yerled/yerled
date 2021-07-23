/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-07-23 11:42:15
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-07-23 18:11:37
 */
import React from 'react';
import { Modal, Table, Select } from 'antd';

export type AntdModalProps = React.ComponentProps<typeof Modal>;

export type AntdTableProps = React.ComponentProps<typeof Table>;

export type AntdSelectProps = React.ComponentProps<typeof Select>;

export type AntdOptionsItem = {
  key: React.Key;
  label: string;
  value: string;
};

export type AntdOptionsList = AntdOptionsItem[];

export type AntdOnChange<T> = T['onChange'];
