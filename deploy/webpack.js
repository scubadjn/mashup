/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, '../src'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      '@types': path.resolve(__dirname, '../src/@types'),
    },
  },
  output: {
    filename: 'api.min.js',
    path: path.resolve(__dirname, '../dist'),
  },
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000'],
  })],
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(3030),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
