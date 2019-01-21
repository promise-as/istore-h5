/**
 * Revised by PETER on 2018/04/20.
 */

'use strict'

const webpack = require('webpack')
const webpackConfig = require('./webpack_server_normal_config')

webpack(webpackConfig, function (err, status) {
    if (err) {
        throw err
    }
})