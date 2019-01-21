/**
 * Revised by PETER on 2018/04/20.
 */

'use strict'

/** Server Environment Config **/
let node_custom_env
if (process.env.NODE_CUSTOM_ENV !== 'production' && process.env.NODE_CUSTOM_ENV !== 'staging') {
    node_custom_env = 'development'
} else {
    node_custom_env = process.env.NODE_CUSTOM_ENV
}
exports.node_custom_env = node_custom_env
exports.node_app_name = '爱士多'
exports.pc_html_file_names = ['']

/**
 * Clientweb API Domain Config
 */
if (node_custom_env === 'production') {
    exports.node_api_host = 'http://app.istore8.cn'
    exports.node_api_port = 80
    exports.node_api_router = ''

    exports.node_shop_hot = '//shop.istore8.cn'

    exports.node_oss_path = '//istore-oss-prod.oss-cn-hongkong.aliyuncs.com'
}
else if (node_custom_env === 'staging') {
    exports.node_api_host = 'https://app-test.istore8.cn'
    // exports.node_api_port = 80
    exports.node_api_port = 443
    exports.node_api_router = ''

    exports.node_shop_hot = 'https://shop-test.istore8.cn'

    exports.node_oss_path = '//istore-oss-bucket.oss-cn-hongkong.aliyuncs.com'
}
else {
    // exports.node_api_host = 'http://10.10.20.32'
    // exports.node_api_host = 'http://10.10.20.168'
    exports.node_api_host = '192.168.3.68'
    // exports.node_api_host = 'http://app.test.istore8.cn'
    // exports.node_api_port = 80
    exports.node_api_port = 8081

    exports.node_api_router = ''

    exports.node_shop_hot = '//shop-test.istore8.cn'

    exports.node_oss_path = '//istore-oss-bucket.oss-cn-hongkong.aliyuncs.com'
}

/**
 * Clientweb Hosting Domain Config
 */
if (node_custom_env === 'production') {
    exports.node_web_host = '//h5.istore8.cn'
    exports.node_web_port = process.env.PORT || 80

    exports.androidStore = 'http://img.istore8.cn/upload/app-back/istore.apk';
    exports.iosStore = 'https://itunes.apple.com/cn/app/%E7%88%B1%E5%A3%AB%E5%A4%9A/id1330136767?mt=8'
    exports.googleStore = 'https://play.google.com/store/apps/details?id=com.carsland.asd'

    exports.node_web_file_path = './public/production/'

    // 地图key
    exports.gaode_map_key = '693b3215ae421a6cee02d11f92a9dffa'
} else if (node_custom_env === 'staging') {
    exports.node_web_host = '//h5-test.istore8.cn'
    exports.node_web_port = process.env.PORT || 443

    exports.androidStore = 'http://img.istore8.cn/upload/app-back/istore.apk';
    exports.iosStore = 'https://itunes.apple.com/cn/app/%E7%88%B1%E5%A3%AB%E5%A4%9A/id1330136767?mt=8'
    exports.googleStore = 'https://play.google.com/store/apps/details?id=com.carsland.asd'

    exports.node_web_file_path = './public/staging/'

    // 地图key
    exports.gaode_map_key = '438b86e255e86130ab6eafe5130f0e55'
}
else {
    exports.node_web_host = '//10.10.20.23'
    exports.node_web_port = process.env.PORT || 80

    exports.androidStore = 'http://img.istore8.cn/upload/app-back/istore.apk';
    exports.iosStore = 'https://itunes.apple.com/cn/app/%E7%88%B1%E5%A3%AB%E5%A4%9A/id1330136767?mt=8'
    exports.googleStore = 'https://play.google.com/store/apps/details?id=com.carsland.asd'

    exports.node_web_file_path = './public/staging/'

    // 地图key
    exports.gaode_map_key = '438b86e255e86130ab6eafe5130f0e55'
}



