/*
 * @Author: onepisYa pis1@qq.com
 * @Date: 2022-08-30 10:32:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-31 13:04:44
 * @FilePath: /vite-vue2-windicss-starter/vite.config.js
 * @Description: 笔记 https://gitee.com/onepisYa/vite_test/blob/master/vite-vue3-js/vite.config.js
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'// 自动导入 组件
import Icons from 'unplugin-icons/vite'// 图标配置
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite' // 自动导入 api

const config = defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },

  build: {
    minify: true,
  },
  plugins: [
    vue(),
    WindiCSS(),
    // 自动导入 组件
    Components({
      resolvers: [
        IconsResolver({
          componentPrefix: 'onepisya',
          // {prefix}-{collection}-{icon}
        }),
      ],
      dts: 'src/components.d.ts',
    }),
    Icons(),
    // 图标配置 插件配置
    // 图标链接
    // https://icones.js.org/
    // 图标安装
    // pnpm i -D @iconify/json
    // 使用示例 i 是前缀 mdi 是图标集名字 后面是图标名字
    // mdi:account-box
    // <i-mdi-account-box style="font-size: 2em; color: red"/>
    AutoImport({
      imports: [
        '@vueuse/core',
        { axios: [['default', 'axios']] },
      ],
      dts: 'src/auto-imports.d.ts',
    },
    ),
  ],

  server: {
    port: 3333,
  },
})

export default config
