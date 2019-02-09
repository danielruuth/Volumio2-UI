const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: ['./src/app.js','./src/sass/base.scss',],
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'assets')
  },
  resolve: {
  alias: {
    vue: 'vue/dist/vue.js'
  }
},
plugins: [
  new VueLoaderPlugin()
],
  module:{

      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'css/[name].css',
              }
            },
            {
              loader: 'extract-loader',
              options: {
                name: 'css/[name].css'
              }
            },
            {
                loader: 'css-loader?-url',
            },
            {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [require('autoprefixer')],
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    name: 'css/[name].css'
                }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }
      ]
    },
};
