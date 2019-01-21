/**
 * Revised by PETER on 2018/04/20.
 */

'use strict'

let express = require('express')
let webpack = require('webpack')
let path = require('path')
let favicon = require('serve-favicon')
let wepackHotMiddleware = require('webpack-hot-middleware')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackConfig = require('./webpack_server_dev_config')

let app = express()
let compiler = webpack(webpackConfig)
let hotMiddleware = wepackHotMiddleware(compiler)

let devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    },
})

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

app.use(devMiddleware)

app.use(hotMiddleware)

/** cross host **/
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
})

/** serving static path **/
app.use(express.static(path.resolve(__dirname, '../')))

/** serving page route **/
app.get('*', function (req, res) {
    let pagename = req.path
    let filepath = path.join(compiler.outputPath, pagename + '.html')

    compiler.outputFileSystem.readFile(filepath, function (err, result) {
        if (err) {
            return res.send('page not found')
        }

        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

app.listen(80, function (err) {
    if (err) {
        console.log(err)
    }
})