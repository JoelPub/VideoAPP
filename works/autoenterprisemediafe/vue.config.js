module.exports = {
  publicPath: "./",
  outputDir: "dists",
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== "production",
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {} else {
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
};

const path = require('path')
const fs = require('fs')
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@client', path.resolve('src'))
      .set('@plugins', path.resolve('plugins'))
  },
  css: {
    loaderOptions: {
      sass: {
        // @/ 是 src/ 的别名
        data: fs.readFileSync(path.resolve(__dirname, `./src/common/styles/variables.scss`), 'utf-8') // 公共变量文件注入
      }
    }
  }
}

