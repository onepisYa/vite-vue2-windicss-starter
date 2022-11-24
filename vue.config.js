'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

const IconsResolver = require('unplugin-icons/resolver')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // TODO: 不需要 mock 的时候记得注释掉下面
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      /* api 自动导入 */
      require('unplugin-auto-import/webpack')({ /* options */
        imports: [
          /* presets */
          'vue',
          'vue-router',
          '@vueuse/core',
          /* custom */
          {
            /*
            '@vueuse/core': [
              // named imports
              'useMouse', // import { useMouse } from '@vueuse/core',
              'useDark',
              'useToggle',
              // alias
              ['useFetch', 'useMyFetch']// import { useFetch as useMyFetch } from '@vueuse/core',
            ]
            */
            '@vueuse/core': [['default', 'vueuse']]
          },
          {
            axios: [['default', 'axios']]
            /*
            编写格式
            '[package-name]': [
              '[import-names]',
              // alias
              ['[from]', '[alias]'],
              ],
            */
          },
        ],
      }),
      /* 图标自动导入
        图标配置 插件配置
        图标链接
        https://icones.js.org/
        图标安装
        pnpm i -D @iconify/json
        使用示例 i 是前缀 mdi 是图标集名字 后面是图标名字
        mdi:account-box
        <i-mdi-account-box style="font-size: 2em; color: red"/>
      */
      require('unplugin-icons/webpack')({ /* options */ }),
      /* 组件自动导入 */
      require('unplugin-vue-components/webpack')({ /* options */
        resolvers: [
          IconsResolver({
            componentPrefix: 'pis'
            // {prefix}-{collection}-{icon}
          })
        ],
        dts: false,
        dirs: ['src/components', ],
        deep: true
      }),
    ],
    module: {
      /* autoimport vueuse 在 cli 可能遇到问题，配置之后会好。
      https://github.com/vueuse/vueuse/issues/718 解决方案出处
      */
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }]
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // ---------------

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },

  pluginOptions: {
    // see https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts
    windicss: {
    }
  }
}
