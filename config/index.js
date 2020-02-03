'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const targetIP = 'http://192.168.3.9:7081'
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/userApi": {
        target: `${targetIP}/LoginServiceSvr.assx/`, // 用户 host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/userApi": "" // rewrite path
        },
      },

      "/SingeApi": {
        target: `${targetIP}/SingedServiceSvr.File/`, // 用户 host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/SingeApi": "" // rewrite path
        },


      },


      "/getDeposApi": {
        target: `${targetIP}/SingedServiceSvr.assx/`, // 用户 host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/getDeposApi": "" // rewrite path
        },


      },

      "/test": {
        target: `${targetIP}/`, // 用户 host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/test": "" // rewrite path
        },
      },

      /**管理员操作 */
      "/admin": {
        target: `${targetIP}/AdminServiceSvr.assx`, // 用户 host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/admin": "" // rewrite path
        },
      },

       /**合同模板上传与下载 */
       "/contract": {
        target: `${targetIP}/ManagementServiceSvr.File`, // 用户 host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/contract": "" // rewrite path
        },
      },



      /**所有房屋信息 */
      "/houseApi": {
        target: `${targetIP}/PublicServiceSvr.assx/`,
        changeOrigin: true,
        pathRewrite: {
        "^/houseApi": "" // rewrite path
        }
      },


      "/mangerApi": {
        target: `${targetIP}/ManagementServiceSvr.assx/`,
        changeOrigin: true,
        pathRewrite: {
        "^/mangerApi": "" // rewrite path
        }
      },


      "/house": {
        target: `${targetIP}/AdminServiceSvr.assx/`,
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/house": "" // rewrite path
        }
      },
      // 下架房屋
      "/delecthouse": {
        target: `${targetIP}/HouseServiceSvr.assx/`,
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/delecthouse": "" // rewrite path
        }
      },
      // 上传房屋
      "/uploadhouse": {
        target: `${targetIP}/HouseServiceSvr.assx/`,
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/uploadhouse": "" // rewrite path
        }
      },
      "/Templates": {
        target:`${targetIP}/HouseServiceSvr.assx/`,
        changeOrigin:true,
        pathRewrite: {
          "^/Templates": ""
        }
      },
      // 查看房屋详情
      "/selecthouse": {
        target: `${targetIP}/PublicServiceSvr.assx/`,
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/selecthouse": "" // rewrite path
        }
      },
      // 签约服务
      "/singe": {
        target:`${targetIP}/SingedServiceSvr.assx/`,
        changeOrigin:true,
        pathRewrite: {
          "^/singe": ""
        }
      },
      // 上传图片
      "/updateImg": {
        target:`${targetIP}/img`,
        changeOrigin:true,
        pathRewrite: {
          "^/updateImg": ""
        }
      },
      // 获取合同列表
      "/getContract": {
        target:`${targetIP}/SingedServiceSvr.assx`,
        changeOrigin:true,
        pathRewrite: {
          "^/getContract": ""
        }
      },
      // 生成合同
      "/makeContract": {
        target:`${targetIP}/SingedServiceSvr.assx`,
        changeOrigin:true,
        pathRewrite: {
          "^/makeContract": ""
        }
      },
      // 下载合同附件文本
      "/DownloadContract": {
        target:`${targetIP}/SingedServiceSvr.assx`,
        changeOrigin:true,
        pathRewrite: {
          "^/DownloadContract": ""
        }
      },
      // 上传合同附件
      "/updateContractFile": {
        target:`${targetIP}/SingedServiceSvr.File`,
        changeOrigin:true,
        pathRewrite: {
          "^/updateContractFile": ""
        }
      },
      // 获取合同应付款
      "/getPayMoney": {
        target:`${targetIP}/TenantServiceSvr.assx`,
        changeOrigin:true,
        pathRewrite: {
          "^/getPayMoney": ""
        }
      },
      // 租期线下支付确认
      "/payOk": {
        target:`${targetIP}/SingedServiceSvr.assx`,
        changeOrigin:true,
        pathRewrite: {
          "^/payOk": ""
        }
      },
    //  查看定金订单列表
      "/getOrderList": {
        target:`${targetIP}/SingedServiceSvr.assx`,
        changeOrigin:true,
        pathRewrite: {
          "^/getOrderList": ""
        }
      },
    //  生成定金订单
      "/Generatedepositorder": {
        target:`${targetIP}/SingedServiceSvr.assx`,
        changeOrigin:true,
        pathRewrite: {
          "^/Generatedepositorder": ""
        }
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
