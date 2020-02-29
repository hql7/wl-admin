
// const port = 6668; // dev port
let styleVariables = require('./src/style/variables.scss.js');

module.exports = {
  // 将资源打包为相对路径
  // publicPath: "././",
  crossorigin: 'anonymous', // htmlWebpackPlugin
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    open: true, // 自动调用默认浏览器打开
    disableHostCheck: true,
    // port,
    overlay: {
      warnings: false,
      errors: true
    },
    /* headers: {
      'Access-Control-Allow-Origin': '*',
    } */
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: Object.keys(styleVariables)
          .map(k => `\$${k.replace('_', '-')}: ${styleVariables[k]};`)
          .join('\n')
      }
    }
  }
};
