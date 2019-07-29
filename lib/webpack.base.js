const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const glob = require('glob');
const path = require('path');

const projectRoot = process.cwd()

const setMPA = () => { // 多页面打包
  const entry = {};
  const HtmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  Object.keys(entryFiles).forEach((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `./src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: ['commons', pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }));
  });
  return {
    entry,
    HtmlWebpackPlugins,
  };
};
const { entry, HtmlWebpackPlugins } = setMPA();

module.exports = {
  entry, // 入口
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }, // 处理js文件
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }, // 处理css文件
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', { // 处理less文件
          loader: 'postcss-loader',
          options: {
            plugin: () => {
              autoprefixer({ // 属性前置
                browsers: ['last 2 version', '>1%', 'ios 7'],
              });
            },
          },
        }],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [{ // 处理图片资源
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ // 将css文件单独提取出来
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(), // 目录清理
    new FriendlyErrorsWebpackPlugin(), // 构建输出显示优化
    function errorPlugin() { // 错误捕获
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
            console.log('build error') //eslint-disable-line
          process.exit(1);
        }
      });
    },
  ].concat(HtmlWebpackPlugins),
  stats: 'errors-only',
};
