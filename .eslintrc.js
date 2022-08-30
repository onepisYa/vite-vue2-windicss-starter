/*
 * @Author:
 * @Date: 2022-08-30 09:57:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-30 17:32:33
 * @FilePath: /vite-vue2-windicss-starter/.eslintrc.js
 * @Description:
 */
module.exports = {
  extends: '@antfu',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
}
