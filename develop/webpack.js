/* eslint-disable @typescript-eslint/no-var-requires */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'dev.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@types': path.resolve(__dirname, '../src/@types'),
    },
  },
  target: 'async-node',
  devtool: 'inline-source-map',
  entry: path.join(__dirname, '../src/index.ts'),
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin({ quiet: true }),
    new WebpackShellPlugin({
      onBuildEnd: ['yarn start'],
    }),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(3030),
    }),
  ],
  watch: true,
};