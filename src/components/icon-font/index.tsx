/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-07-23 17:32:00
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-07-23 17:32:03
 */
import React from 'react';

type Props = {
  type: string;
};
const IconFont: React.FC<Props> = (props) => {
  const { type } = props;

  return (
    <svg className="icon-font" aria-hidden="true">
      <use xlinkHref={`#icon-${type}`}></use>
    </svg>
  );
};

export default IconFont;
