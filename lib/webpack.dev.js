const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热加载
  ],
  devServer: { // 热更新配置
    contentBase: './dist',
    hot: true,
  },
  devtool: 'cheap-source-map',
};

module.experts = merge(baseConfig, devConfig);
