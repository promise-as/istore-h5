/**
 * Revised by PETER on 2018/04/20.
 */

'use strict'

const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const autoprefixer = require('autoprefixer')

const config = require('./../config/index')

// let dir_paths = glob.sync('./src/views/*/index.jsx')
let dir_paths = [
    './src/views/voucher-center/index.jsx',
    './src/views/life-services/index.jsx',
    './src/views/privacy/index.jsx',
    './src/views/shop_gps/index.jsx',
]

console.log(dir_paths)

// prepare webpack config option
let map_path_with_name = {}
let plugin_array = []

// push html plugin into array
dir_paths.map(function (dir_path) {
    let pagename = dir_path.replace(/^.*views\//, '').replace('/index.jsx', '')
    let templateFile = './src/templates/phone.ejs'

    // make entry point map
    map_path_with_name[pagename] = [
        `webpack-hot-middleware/client?reload=true&name=${pagename}&overlay=false&quiet=true`,
        dir_path
    ]

    if (config.pc_html_file_names.indexOf(pagename) >= 0) {
        templateFile = './src/templates/pc.ejs'
    }

    // push html plugin into array
    plugin_array.push(new HtmlWebpackPlugin({
        title: '',
        filename: pagename + '.html',
        template: templateFile,
        inject: true,
        chunks: [pagename],
        hash: true,
        minify: {
            removeComments: true
        }
    }))
})

// dev hot module
// build percent
plugin_array.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EvalSourceMapDevToolPlugin({
        filename: '[name].js.map',
        exclude: ['vendor.js'],
    }),
    new webpack.ProvidePlugin({
        '$': 'jquery'
    }),
    new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
    }),
)

// export webpack config
module.exports = {
    mode: 'development',
    entry: map_path_with_name,

    output: {
        path: path.resolve(__dirname, '../public/development/'),
        publicPath: process.env.HOST || 'http://127.0.0.1/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js|jsx|mjs)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-1', 'react'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-runtime',
                        'syntax-dynamic-import',
                        ["import", { "libraryName": "antd-mobile", "style": "css" }],
                    ],
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: { importLoaders: 1 }},
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                          ident: 'postcss',
                          plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                              browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway
                              ],
                              flexbox: 'no-2009',
                            }),
                          ],
                        },
                      },
                    'sass-loader',
                ],
            },
            {
                test: /\.css/,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.svg/,
                loader: 'svg-url-loader?limit=8192&name=/[path][name].[ext]?[hash]'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192&name=/[path][name].[ext]?[hash]'
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=8192&name=/[path][name].[ext]?[hash]'
            }
        ]
    },

    plugins: plugin_array,

    resolve: {
        extensions: ['.js', '.vue', '.jsx', '.mjs']
    },
}