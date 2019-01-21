/**
 * Revised by PETER on 2018/04/20.
 */

'use strict'

require('babel-polyfill')
const glob = require('glob')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')

const server_config = require('../config/index')
const pc_file_names = require('./../config/index')

fs.removeSync(server_config.node_web_file_path)

let dir_paths = glob.sync('./src/views/*/index.jsx')

console.log(dir_paths)

let public_path = server_config.node_web_cdn_www

// prepare webpack config option
let map_path_with_name = {}
let plugin_array = []

// push html plugin into array
dir_paths.map(function (dir_path) {
    let pagename = dir_path.replace(/^.*views\//, '').replace('/index.jsx', '')
    let templateFile = './src/templates/phone.ejs'

    // make entry point map
    map_path_with_name[pagename] = [
        'babel-polyfill',
        dir_path
    ]

    if (Array.of(pc_file_names).indexOf(pagename) >= 0) {
        templateFile = './src/templates/pc.ejs'
    }

    // push html plugin into array
    plugin_array.push(new HtmlWebpackPlugin({
        env: server_config.NODE_CUSTOM_ENV,
        title: '',
        filename: './views/' + pagename + '.html',
        template: templateFile,
        inject: true,
        chunks: [pagename, 'common'],
        minify: {
            removeComments: true
        }
    }))
    
})

// dev hot module
// build percent
plugin_array.push(
    new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
    }),
    new webpack.ProvidePlugin({
        '$': 'jquery'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_CUSTOM_ENV: JSON.stringify(server_config.node_custom_env)
        }
    }),
    new UglifyJsPlugin({
        sourceMap: false,
    }),
    new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[id].css"
    }),
    new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }),
    new webpack.HashedModuleIdsPlugin({
        hashFunction: 'md5',
        hashDigest: 'base64',
        hashDigestLength: 4
    }),
)

module.exports = {
    mode: 'production',
    entry: map_path_with_name,
    output: {
        path: path.resolve(__dirname, `./../${server_config.node_web_file_path}`),
        publicPath: public_path,
        filename: 'js/[name].[chunkhash].js?',
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
                    MiniCssExtractPlugin.loader,
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
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.svg/,
                loader: 'svg-url-loader?limit=8192&name=[path][name].[ext]?[hash]'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192&name=[path][name].[ext]?[hash]'
            },
            {
                test: /\.eot/,
                loader: 'url-loader?limit=100000&minetype=application/vnd.ms-fontobject&name=[path][name].[ext]?[hash]'
            },
            {
                test: /\.ttf/,
                loader: 'url-loader?limit=100000&minetype=application/font-ttf&name=[path][name].[ext]?[hash]'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=100000&minetype=application/font-woff&name=[path][name].[ext]?[hash]'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=100000&minetype=application/font-woff2&name=[path][name].[ext]?[hash]'
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 2
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
    },

    plugins: plugin_array,

    resolve: {
        extensions: ['.js', '.vue', '.jsx', '.mjs']
    },
}