const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
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
    alias: {
      'react-native$': 'react-native-web',
    },
    
  },
  module: {
    rules: [ {
      test: /\.js?$/,
      exclude: /(node_modules)/,
      use: {
          loader: 'babel-loader',
          options: {
              presets: [ '@babel/preset-env', '@babel/preset-react' ]
          }
      }
      }, 
      {
        test: /\.css$/,
          use: [{
                  loader: 'style-loader'
              },
              {
                  loader: 'css-loader'
              }
          ]
      },
      {
          test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
              loader: 'file-loader'
          }]
      },
      {
        test: /.(sass|scss)$/,
        use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /assets/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: 'assets/'
            }
          }
        ]
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  	open: true,
    historyApiFallback: true,
    /* contentBase: './', */
    hot: true, 
  },
}