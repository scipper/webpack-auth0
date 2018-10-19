const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [
  new ForkTsCheckerWebpackPlugin({checkSyntacticErrors: true}),
  new webpack.HashedModuleIdsPlugin({
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 10
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    chunksSortMode: 'dependency'
  })
];

let devServer = {
  contentBase: ['./dist'],
  host: 'localhost',
  port: '3000',
  inline: true,
  compress: true,
  open: true,
  openPage: '',
  stats: {
    assets: false,
    colors: true,
    errors: true,
    errorDetails: true,
    exclude: [/node_modules/],
    hash: true,
    modules: false,
    performance: true,
    reasons: true,
    timings: true,
    warnings: true
  }
};

const optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /node_modules/,
        name: 'vendor',
        chunks: 'all'
      }
    }
  }
};

module.exports = {

  entry: {
    app: './src/index.ts'
  },

  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    pathinfo: true
  },

  mode: "development",

  devtool: 'eval-source-map',

  cache: true,

  devServer,

  resolve: {
    unsafeCache: true,
    extensions: ['.ts', '.js']
  },

  optimization,

  stats: {
    children: false
  },

  module: {

    rules: [{
      test: /\.ts|\.js?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: true
        }
      }]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }],
      exclude: [
        path.resolve(__dirname, 'src/index.html'),
        /node_modules/
      ]
    },
      /**
       * IMPORTANT PART
       */
      {
      test: require.resolve('auth0-js'),
      use: [{
        loader: 'expose-loader',
        options: 'auth0'
      }]
    }]

  },

  plugins: plugins

};
