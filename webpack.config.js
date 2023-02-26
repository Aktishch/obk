const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const path = require('path')

const htmlWebpackPluginDefaults = {

  scriptLoading: 'blocking',
  inject: 'head'

}

const generatePlugins = (templateDir) => {

  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))

  return templateFiles.map(item => {

    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]

    if (extension !== 'html') return null

    if (templateDir == 'src') {

      return new HtmlWebpackPlugin({

        ...htmlWebpackPluginDefaults,
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),

        minify: {

          collapseWhitespace: false

        }

      })

    } else {

      return {

        from: `${templateDir}/${name}.${extension}`,
        to: `dialogs/${name}.${extension}`

      }

    }

  }).filter((item) => item !== null)

}

module.exports = {

  mode: 'production',

  entry: {

    filename: path.resolve(__dirname, 'src/webpack.js')

  },

  resolve: {

    extensions: ['.tsx', '.ts', '.js'],

    alias: {

      '@src': path.resolve(__dirname, 'src/')

    }

  },

  output: {

    path: path.resolve(__dirname, 'dist'),
    filename: 'js/application.js',
    clean: true,

  },

  devtool: 'source-map',

  plugins: [

    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    ...generatePlugins('src'),

    new CopyPlugin({

      patterns: [

        {

          from: 'src/img/',
          to: 'img/'

        },

        ...generatePlugins('src/dialogs')

      ]

    }),

  ],

  module: {

    rules: [

      {

        test: /\.html$/,
        include: path.resolve(__dirname, 'src/include'),
        use: ['raw-loader']

      },

      {

        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']

      },

      {

        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']

      },

      {

        test: /\.m?[jt]s$/,
        exclude: /(node_modules|bower_components)/,

        use: {

          loader: 'babel-loader',

          options: {

            presets: ['@babel/preset-env', '@babel/preset-typescript']

          }

        }

      },

      {

        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',

        generator: {

          filename: 'img/pictures/[name][ext]'

        }

      },

      {

        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',

        generator: {

          filename: 'fonts/[name][ext]'

        }

      }

    ]

  },

  devServer: {

    port: 9000,
    compress: false,
    hot: true,
    historyApiFallback: true,

    static: {

      directory: path.join(__dirname, 'dist')

    }

  }

}