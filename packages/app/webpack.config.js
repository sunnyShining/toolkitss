const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

const resolvePath = (p) => path.resolve(__dirname, p)

const host = '127.0.0.1'
const port = 3000

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: resolvePath('src/index.ts'),
  output: {
    path: resolvePath('dist'),
    chunkFilename: '[name].chunk.js',
    filename: '[name].bundle.js'
  },
  devServer: {
    host: host,
    port: port,
    open: true,
    hot: true,
    quiet: true,
    overlay: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolvePath('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  'useBuiltIns': 'usage'
                }], '@babel/preset-react']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // happyPackMode: true,
              // typescripts配置文件
              configFile: resolvePath('tsconfig.json'),
              transpileOnly: false,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory(
                    // https://www.npmjs.com/package/ts-import-plugin // antd按需加载
                    { libraryName: 'antd', style: false }
                  )
                ]
              })
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  'useBuiltIns': 'usage'
                }]]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            // if hmr does not work, this is a forceful method.
              reloadAll: true,
              hmr: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            // if hmr does not work, this is a forceful method.
              reloadAll: true,
              hmr: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(svg|ttf|eot)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg|jepg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 50 * 1024,
            outputpath: 'images'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.HotModuleReplacementPlugin(), // hmr
    new webpack.NamedModulesPlugin(),
    new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${port}`],
      },
      onErrors: undefined,
      clearConsole: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'test app',
      template: resolvePath('index.html'),
      filename: resolvePath('dist/index.html'),
      inject: true, // script标签的位置，true/body为在</body>标签前，head为在<head>里，false表示页面不引入js文件
      hash: false, // 是否为引入的js文件添加hash值
      minify:{ // html-webpack-plugin内部集成了html-minifier
        collapseWhitespace:true, // 压缩空格
        removeAttributeQuotes:true, // 移除引号
        removeComments:true, // 移除注释
      },
    })
  ]
}
