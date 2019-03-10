const webpack = require('../../../Library/Caches/typescript/2.9/node_modules/@types/webpack');
const HtmlWebpackPlugin = require("../../../Library/Caches/typescript/2.9/node_modules/@types/html-webpack-plugin");
const CopyWebpackPlugin = require('../../../Library/Caches/typescript/2.9/node_modules/@types/copy-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
const MiniCssExtractPlugin = require('../../../Library/Caches/typescript/2.9/node_modules/@types/mini-css-extract-plugin');
const UglifyJsPlugin = require("../../../Library/Caches/typescript/2.9/node_modules/@types/uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("../../../Library/Caches/typescript/2.9/node_modules/@types/optimize-css-assets-webpack-plugin");
const theme = require('../antd-theme.js');
module.exports = {
  mode: "production",
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'moment', '@antv/f2'],
    app: ['./index']
  },
  context:path.resolve(__dirname, '../src'),
  output: {
    path: buildPath,
    publicPath: "/",
    chunkFilename: "js/[name].[hash].js",
    filename: "js/[name].[hash].js",
  },
  module: {
    rules: [{
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader?{modifyVars:" + JSON.stringify(theme) + "}"
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.ejs$/,
        use: ["ejs-loader"]
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        use: ['file-loader?name=fonts/[hash:8].[name].[ext]']
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?[tv]=[\d.]+)*$/,
        use: ['file-loader?limit=8192&name=imgs/[hash:8].[name].[ext]']
      },
      {
        test: /\.(js)$/,
        use: ["strip-loader?strip[]=debug,strip[]=console.log"],
        exclude: /node_modules/
      },
    ]
  },
  performance: { 
    hints: false, 
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      minSize: 30000,
      maxSize: 3000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor'
        },
        // echarts: {
        //   chunks: 'all',
        //   name: 'echarts',
        //   test: /[\\/]echarts[\\/]/,
        // }
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[hash].css"
    }),
    new HtmlWebpackPlugin({
      title: "use plugin",
      filename: 'index.html',
      template: 'index.ejs',
      hash: false,
      chunksSortMode: "none",
      assets: {
        favicon: '/imgs/favicon.ico',
        config_js: '/conf/conf.prod.js'
      }
    }),
    new CopyWebpackPlugin([
      {from: './public/config',to:"./conf"},
      {from: './public/mock',to:"./mock"},
      {from: './public/assets/libs',to:"./libs"},
      {from: './public/assets/imgs',to:"./imgs"}
    ]),
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true)
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      assets: path.resolve(__dirname, '../src/public/assets'),
      components: path.resolve(__dirname, '../src/components/'),
      pages: path.resolve(__dirname, '../src/pages/'),
      utils: path.resolve(__dirname, '../src/utils/'),
      constants: path.resolve(__dirname, '../src/constants/'),
      layout: path.resolve(__dirname, '../src/layout/')
    }
  },
  externals:{
    'FRONT_CONF': 'FRONT_CONF',
    'stompjs':'Stomp',
    'sockjs':'SockJS'
  },
};
