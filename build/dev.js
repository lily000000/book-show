const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
const  theme = require('../antd-theme.js');
module.exports = {
  mode:"development",
  devtool: 'cheap-eval-source-map',
  context:path.resolve(__dirname, '../src'),
  entry:{
    vendor: ['react', 'react-dom', 'react-router','moment', '@antv/f2'],
    app: ['./index.js']
  },
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
          loader: 'babel-loader?cacheDirectory',
          options: {}
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader?{modifyVars:"+JSON.stringify(theme)+"}"
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", //上面的简写方式
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
        use: ['file-loader?name=[name].[ext]']
      },{
        test: /\.ejs$/,
        use: ["ejs-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      hash: false,
      chunksSortMode:"none",
      assets: {
        favicon: '/imgs/favicon.ico',
        config_js: '/conf/conf.dev.js'
      }
    }),
    new webpack.DefinePlugin({__PRODUCTION: JSON.stringify(false)}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([ 
      {from: './public/config',to:"./conf"},
      {from: './public/mock',to:"./mock"},
      {from: './public/assets/libs',to:"./libs"},
      {from: './public/assets/images',to:"./imgs"}
    ]),
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
  devServer: {
    host: '127.0.0.1',
    port: '8989',
    contentBase: buildPath,
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    hot: true,
    inline:true,
    proxy: [{
      path: '/log/api/v2/**',
      target: 'http://log.dev.dtstack.net:81',
      changeOrigin: true
    }]
  },
  externals :{
   'FRONT_CONF': 'FRONT_CONF'
  }
};
