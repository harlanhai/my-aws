const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 开启 JS 多核压缩
const TerserPlugin = require("terser-webpack-plugin");
// 开启 css 压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    publicPath: '/',
    // 把 loader 编译的文件全部放入 scripts 文件夹中
    filename: 'scripts/[name].bundle.js',
    // 把图片资源放入 images 文件夹中
    assetModuleFilename: 'images/[name].[ext]',
  },
  performance: {
    maxAssetSize: 250000, // 最大资源大小250KB
    maxEntrypointSize: 250000, // 最大入口资源大小250KB
    hints: 'warning', // 超出限制时只给出警告
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "DApp",
      filename: "index.html",
      template: resolve(__dirname, "../src/index-prod.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
  ],
};
