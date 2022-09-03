// 具体配置请查看文档 谢谢 https://github.com/windicss/vite-plugin-windicss
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
