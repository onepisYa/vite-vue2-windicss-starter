/*
 * @Author: onepisYa pis1@qq.com
 * @Date: 2022-08-30 09:57:54
 * @LastEditors: onepisYa pis1@qq.com
 * @LastEditTime: 2022-08-30 13:11:37
 * @FilePath: /vite-vue2-windicss-starter/tailwind.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  darkMode: 'class', // or 'media'
  theme: {},
  variants: {
    // 禁用伪类的变体
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
