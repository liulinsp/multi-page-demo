/**
 * @file icon 构建相关配置
 * @author liu_lin_sp@126.com
 */

'use strict';

const path = require('path');

module.exports = {

    // 前缀
    prefix: '',

    // 用户自定义的svg文件夹
    svgDir: path.resolve(__dirname, '../src/assets/icon')

    // 项目中使用的fontawesome名
    // icons: [
    //     'envelope'
    // ]
};
