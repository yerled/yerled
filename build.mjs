#!/usr/bin/env zx
/*
 * @Descripttion:
 * @Author: guanglong yuan
 * @Email: yerled@qq.com
 * @Date: 2021-08-25 20:45:55
 * @LastEditors: guanglong yuan
 * @LastEditTime: 2021-08-30 14:41:48
 */

const fs = require('fs');

const output = 'a-dist.zip';

fs.exists(output, async (b) => {
  if (b) {
    await $`rm ${output}`;
  }
  await $`zip -q -r ${output} dist`;
  await $`open .`;
});
