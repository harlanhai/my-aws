const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const port = 3003;

module.exports = {
  output: {
    publicPath: '/',
    // 把 loader 编译的文件全部放入 scripts 文件夹中
    filename: 'scripts/[name].bundle.js',
    // 把图片资源放入 images 文件夹中
    assetModuleFilename: 'images/[name].[ext]',
  },
  devServer: {
    historyApiFallback: true,
    static: join(__dirname, '../dist'),
    hot: true,
    port: port,
    // proxy: {
    //   "/": {
    //     target: "http://127.0.0.1:8080",
    //   },
    // },
  },
  devtool: 'source-map',
  plugins: [
    // 指定 development 模板文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './public/favicon.ico',
      template: resolve(__dirname, '../src/index-dev.html'),
    }),
    // 开发环境构建界面优化组件
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You appliction is running here http://localhost:' + port],
        notes: ['构建信息请关注窗口右上角'],
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack Build Error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          icon: join(__dirname, 'icon.png'),
        });
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 6666,
      openAnalyzer: false
    }),
  ],
};
