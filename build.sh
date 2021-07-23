###
 # @Descripttion:
 # @Author: guanglong yuan
 # @Email: yerled@qq.com
 # @Date: 2021-05-26 11:00:23
 # @LastEditors: guanglong yuan
 # @LastEditTime: 2021-07-23 18:20:19
###
dist_path="dist"
dist_zip="a-dist.zip"

yarn build

if [ -e $dist_zip ]
then
rm $dist_zip
fi
zip -q -r $dist_zip $dist_path
open .
