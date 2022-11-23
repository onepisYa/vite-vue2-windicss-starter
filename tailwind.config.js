/*
 * @Author:
 * @Date: 2022-11-23 19:16:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-23 20:02:44
 * @FilePath: /vite-vue2-windicss-starter/tailwind.config.js
 * @Description:
 */
// 具体配置请查看文档 谢谢 https://github.com/windicss/vite-plugin-windicss
module.exports = {
  darkMode: 'class', // or 'media'
  theme: {},
  // 取消 tailwind 的 reset normalize css
  preflight: {
    includeBase: true,
    // 白名单
    safelist: 'button',
    // 黑名单 不添加 tailwind 的初始化样式
    blocklist: 'li svg span div img'
  },
  attributify: { prefix: "pis" },
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
