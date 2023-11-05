const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  // 这个是用于打包时不生成map文件的配置，map文件可以查看加密后的打包js文件哪里报错
  // productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: ' http://gmall-h5-api.atguigu.cn',
        ws: true,//是否代理websockets
        changeOrigin: true,//是否跨域
        // pathRewrite:{'^/api':''}//路径重写
      }
    }
  },
  //引入element plus
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }

})
