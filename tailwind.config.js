/*
 * @Author:
 * @Date: 2022-11-23 16:23:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-23 18:27:52
 * @FilePath: /vite-vue2-windicss-starter/tailwind.config.js
 * @Description:
 */
// 具体配置请查看文档 谢谢 https://github.com/windicss/vite-plugin-windicss
module.exports = {
  darkMode: 'class', // or 'media'
  theme: {},
  attributify: {prefix:"pis"},
  variants: {
    // 禁用伪类的变体
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [
    // require('@tailwindcss/forms')
  ]
}
