const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = (env, options) => {
  const isDev = options.mode === 'development';

  return {
    devtool: isDev ? 'source-map' : false,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devServer: {
      host: 'localhost',
      contentBase: path.resolve(__dirname, 'dist'),
      port: 3000,
      historyApiFallback: true
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.css', '.sass']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.sass$/,
          use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
        },
        {
          test: /.(ttf|eot|woff|woff2)$/,
          use: ['file-loader']
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          use: ['file-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        favicon: path.resolve(__dirname, 'src', 'fav.ico')
      })
    ]
  };
};
