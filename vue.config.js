const { defineConfig } = require('@vue/cli-service')
const {resolve} = require('path')
module.exports = defineConfig({
  //出口
  outputDir:resolve(__dirname,'dist'),
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    open: false, //自动打开浏览器
    // host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
      '/powertool': {
        target: 'http://localhost:8866',//填写你们真实的后台接口
        changOrigin: true,//允许跨域
        // pathRewrite: {
        //     '^/sys': ''//请求的时候使用这个api就可以
        // }
      }
    }
  },
  publicPath: './',

  css: {
    extract: true,
    loaderOptions: {
      sass: {
        // data:`@import "@/css/global.scss";`//sass-loader v7.x
        // prependData:`@import "@/css/global.scss";`//sass-loader v8.x
        additionalData:`@import "@/util/css/global.scss";`//sass-loader v9.x及以上
      }
    }
  },
})
