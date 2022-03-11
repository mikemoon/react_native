const path = require('path')
const webpack = require('webpack');
const appDirectory = path.resolve(__dirname, '../');

const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
})

const babelLoaderConfiguration = {
  test: /\.(ts|tsx|js)?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.js'),
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-sdk'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset', 'react-native' , '@babel/preset-react'],
      // presets: ['react-native'],
      // presets: [require.resolve('babel-preset-react-native')],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web',],
      // presets: ['module:metro-react-native-babel-preset'],
      // plugins: [
      //   // needed to support async/await
      //   '@babel/plugin-transform-runtime'
      // ]
    },
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    }
  }
};

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js')
  ], 
  output: {
    filename: 'bundle.web.js',
    //path: path.join(__dirname, '/build'),
    path: path.resolve(appDirectory, 'dist'),
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json', '.web.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
    symlinks: false
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      
      { 
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [HTMLWebpackPluginConfig, new ForkTsCheckerWebpackPlugin(),
    "module-resolver", {
      "alias": {
        "^react-native$": "react-native-web"
      }
    }],
  devServer: {
    host: 'localhost',
    port: port,
  	open: true,
    historyApiFallback: true,
    /* contentBase: './', */
    hot: true,
  },
}