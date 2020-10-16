// const port = 6668; // dev port
let styleVariables = require("./src/style/variables.scss.js");

module.exports = {
  /* crossorigin: 'anonymous', // htmlWebpackPlugin
  devServer: {
    hot: true,
    open: true, // 自动调用默认浏览器打开
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
  }, */
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: Object.keys(styleVariables)
          .map(k => `\$${k.replace("_", "-")}: ${styleVariables[k]};`)
          .join("\n")
      }
    }
  }
};
