// @Description: 笔记 https://gitee.com/onepisYa/vite_test/blob/master/vite-vue3-js/vite.config.js
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'// 自动导入 组件
import Icons from 'unplugin-icons/vite'// 图标配置
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite' // 自动导入 api
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 区分生产环境以及开发环境
if (process.env.NODE_ENV === 'development') {
  console.log(`${new Date().toLocaleString()} - [ENV] :`, process.env.NODE_ENV)
}
else if (process.env.NODE_ENV === 'production') { // 生产环境
  console.log(`${new Date().toLocaleString()} - [ENV] :`, process.env.NODE_ENV)
}

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
    // svgIcon
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      /**
       * 自定义插入位置
       * @default: body-last
       */
      inject: 'body-last' | 'body-first',
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ],

  server: {
    port: 3333,
  },
})

export default config
