const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/Index.js',
    list: './src/js/List.js',
    detail: './src/js/Detail.js',
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
    open: true,
    hot: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugin: ['postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|JPG)$/,
        type: 'asset',
        generator: {
          filename: 'assets/imgs/[contenthash][ext]',
        },
        parser: {
          dataUrlCondition: {
            // 小于 8KB的图片会被Base64 处理
            maxSize: 8 * 1024,
          },
        },
      },
      {
        // 其他资源
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'asset/font/[contenthash][ext]',
        },
      },
      {
        test: /\.tpl$/,
        use: [
          {
            loader: 'ejs-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'list.html',
      template: './src/pages/list.html',
      chunks: ['list'],
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: './src/pages/detail.html',
      chunks: ['detail'],
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  externalsType: 'script',
  externals: {
    jquery: ['https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js', '$', 'jQuery'],
  },
};
