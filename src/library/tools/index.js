/**
 * Revised by peter on 2018/04/27.
 */

'use strict'

import Cookies from 'js-cookie'
import moment from 'moment'
import md5 from 'md5'

import * as config from './../../../config/index'
import * as map_config from './../../../config/map'

import Toastr from './../components/phone_toastr/index'

// 页面跳转
export const gotoPageHandle = function (link) {
    if (link) {
        window.location.href = link
    } else {
        window.history.back(-1);
    }
}
// 将语言转成后端指定字符
export const  conversionLangHandle = function (lang) {
    switch (lang) {
        case 'en':
            return 'en'
        case 'zh':
            return 'cn'
        default:
            return 'cn'
    }
}
// 获取浏览器url参数
export const getUrlParam = function (key,url) {
    let local_url = url || document.location.href
    let params_str = local_url.split('?').length > 1 ? local_url.split('?').pop() : ''
    let hash = window.location.hash
    params_str = params_str.replace(hash, '')
    let params_arr = params_str.split('&')
    let params_obj = {}
    for (let param_index = 0; param_index < params_arr.length; param_index++) {
        let param_kv_arr = params_arr[param_index].split('=')
        if (param_kv_arr.length > 1) {
            params_obj[decodeURIComponent(param_kv_arr[0])] = decodeURIComponent(param_kv_arr[1])
        }
    }
    if (!key) {
        return params_obj
    } else {
        return params_obj[key] === undefined ? '' : params_obj[key]
    }
}
// 改变document title
export const changeDocumentTitleHandle = function (pageName, lang) {
    document.title = map_config.map_page_title[lang][pageName]
}
// 获取浏览器语言
export const getClientLang = function getClientLang() {
    let currentLang = navigator.language // 判断除IE外其他浏览器使用语言
    if(!currentLang) { // 判断IE浏览器使用语言
        currentLang = navigator.browserLanguage
    }
    return currentLang
}
// 下载文件
export const downloadFile = function (file) {
    let aLink = document.createElement('a')
    let evt = document.createEvent('HTMLEvents')

    evt.initEvent('click', false, false)
    aLink.download = ''
    aLink.href = file
    aLink.click()
}
// 判断是否是微信浏览器
export const isWeixinBrowser = function() {
    const ua = navigator.userAgent.toLowerCase()
    return /micromessenger/.test(ua)
}
// 下载app文件处理
export const clickToAppHandle = function() {
    let fileUrl = ''
    $.ajax({
        method: 'GET',
        url: config.node_api_host + ':' + config.node_api_port + config.node_api_router + '/common/getAndroidVersion',
        success: function (resulte) {
            let appVersion = resulte.data.appVersion
            let androidLink = appVersion.androidLink
            let iosLink = appVersion.iosLink

            // 判断是否是在ios环境下
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                fileUrl = iosLink
                window.location = fileUrl
            } else {
                fileUrl = androidLink
                if (isWeixinBrowser()) {
                    return new Toastr().info('微信浏览器下请在右上角点击“在浏览器打开”')
                }
                // 判断用户是否在国外
                new Promise((resolve) => {
                    window.fetch(config.node_web_host + '/myip').then((response) => {
                        response.text().then(function(text) {
                            resolve(text)
                        })
                    })
                }).then((data)=> {
                    if (window.Number(data.indexOf('CN')) === -1) {
                        fileUrl = config.googleStore
                    }
                    window.location = fileUrl
                })
            }

        },
        error: function (resulte) {
        }
    })
}
// 添加cookies
export const setCookies = function (...arg) {
    Cookies.set(...arg)
}
// 获取cookies
export const getCookies = function (...arg) {
    return Cookies.get(...arg)
}
// 删除cookies
export const removeCookies = function (...arg) {
    return Cookies.remove(...arg)
}
// 清除所有cookies
export const clearCookies = function () {
    let cookies = Cookies.get()
    for (let i in cookies) Cookies.remove(i)
}
// 获取服务端时间
exports.getServerTimeHandle = function(url) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            method: 'GET',
            url: url,
            success: function (resulte) {
                let resulteJson = {}
                if (typeof resulte === 'string') {
                    resulteJson = JSON.parse(resulte)
                } else {
                    resulteJson = resulte
                }

                let currentTime = new Date().getTime();
                let serverTime = (typeof resulteJson.data === 'object') ?  resulteJson.data.timestamp : resulteJson.data

                let differenceTime = serverTime - currentTime;
                let data = {
                    serverTime,
                    differenceTime,
                }
                resolve(data)
            },
            error: function () {
                reject()
            }
        })
    })

};
// 对请求参数进行加密
exports.encryptionParamsHandle = function(paramsData, divisor) {
    let tmp = [];
    let divisorAlias = divisor || "wcly@alphaidea"
    let data = Object.assign({}, paramsData)

    Object.keys(data).map((item, index) => {
        tmp[index] = item
    });

    tmp.sort()
    let allParameters = ""

    tmp.map((item) => {
        allParameters += item + data[item]
    });

    data.sign = md5(divisorAlias + allParameters).toLocaleUpperCase()
    return data;
}
// 时间格式化
export const momentFormat = function (time, format) {
    return moment(time).format(format)
}
// 时间utc格式化
export const momentFormatUtc = function (utcTime, format) {
	return  moment.utc(utcTime).local().format(format)
}
export const formatMoney = function (num, places) {
    places = !isNaN(places = Math.abs(places)) ? places : 2
    let thousand = ','
    let decimal = '.'
    let number = num
    let negative = number < 0 ? '-' : ''
    let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
    let j = i.length > 3 ? (i.length % 3) : 0
    return negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}
export const formatTime = function (time) {
    let ago, curTime, diff, int
    int = parseInt
    curTime = new Date().getTime()
    time = new Date(time).getTime()
    diff = curTime - time
    ago = ''

    if (1000 * 60 > diff) {
        ago = '刚刚'
    } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
        ago = int(diff / (1000 * 60)) + '分钟前'
    } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
        ago = int(diff / (1000 * 60 * 60)) + '小时前'
    } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
        ago = int(diff / (1000 * 60 * 60 * 24)) + '天前'
    } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
        ago = int(diff / (1000 * 60 * 60 * 24 * 30)) + '月前'
    } else {
        ago = int(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + '年前'
    }
    return ago
}
// 去除空格
export const trim = function (val) {
    if (!val) return ''
    return val.toString().replace(/\s+/g,"")
}
// 手机号码格式化,3 4 4形式
export const phoneFormat = function (val) {
    if (!val) return ''
    let formatVal = '';
    (val.toString().split('')).map((item, index) => {
        formatVal += item
        if (index === 2 || index === 6) {
            formatVal += ' '
        }
    })
    return formatVal
}

// 设置桥接对象Bridge
/*export const setGolbelBridge = function(callback) {
    function setupWebViewJavascriptBridge() {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);

        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    setupWebViewJavascriptBridge(istoreBrige => {
        window.istoreBrige = istoreBrige
    })
}*/
// 设置桥接对象Bridge
export const setGlobalBridge = function() {

    setupWebViewJavascriptBridge((istoreBridge)=> {
        window.istoreBridge = istoreBridge
    })

    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        let WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    // setupWebViewJavascriptBridge((istoreBridge)=> {
        // window.istoreBridge = istoreBridge
        // 这是ios/android调用h5方法语法糖
        // istoreBridge.registerHandler('h5_selectLocalPhoneHandle', function(data, responseCallback) {
        //     console.log("JS Echo called with:", data)
        //     responseCallback('来自js消息')
        // })
        // 这是h5调用ios/android方法语法糖
        // 第二个参数有则传没有则不需要定义
        // istoreBridge.callHandler('android getUserInfo', {'key':'value'}, function responseCallback(responseData) {
        //     console.log("JS received response:", responseData)
        // })
    // })
}
// 同步调用Bridge原生方法
export const asyncBridgeCallHandler = function(eventName, data = {}) {
    return new Promise((resolve, reject)=> {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

        // console.log('创建', u, isiOS, isAndroid)

        if(isiOS){
            // console.log('isiOS------')
            window.istoreBridge.callHandler(eventName, data, function responseCallback(responseData) {
                console.log("JS received response:", responseData)
                resolve(responseData)
            })
        }
    })
}

//******************原生提供h5给方法******************//
// 调用以android为前缀，如注册getUserInfo事件则'android getUserInfo'
// window.android = {
//     // 获取用户信息
//     // return object = {
//     //      userId: '',
//     //      phone: '13312990402', 默认充值号码，取账户绑定的手机号码，没有取本机号码
//     //      tokenId: '',
//     // }
//      getUserInfo: function() {
//         return {
//             userId: '1777',
//             phone: '13312990401',
//             tokenId: 'EEE597F32E1FCCF2DB31A3FD321331E4',
//         }
//     },
//     // 打开通讯录
//     // 场景：打开通讯录，选中通讯录需要充值的号码，选中完后回到webView页面执行
//     // h5_selectLocalPhoneHandle方法将信息以实参形式传入
//     openAddressList: function() {
//     },
//     // 获取号码在本地通讯录信息
//     // 传入参数，String = '',手机号码
//     // 返回参数，String = '张三',通讯录备注
//     getPhoneInfoHandle: function() {
//         return '默认号码'
//     },
//     // 支付订单
//     // 传参：
//     //      json: {
//     //          payType,  0:微信 1:支付宝 2,余额支付
//     //          money, 金额
//     //          orderId， 订单id
//     //          tradeType 充值类型
//     //          havePayPassword 是否设置密码
//     //      }
//     // 原生返回:
//     //      json {
//     //              status: 0, // 0 支付成功，1 支付失败
//     //              msg: '', // 支付状态说明
//     //           }
//     payOrderHandle: function ({}, success_function, error_function) {
//     },
//     // 关闭webView
//     // 场景：充值中心webView      全屏模式，回到生活服务首页点击返回则直接退出h5页面(关闭webView)
//     closeWebView: function() {
//
//     }
// }

//******************h5提供给原生方法******************//
// 说明：当从通讯录选中联系人，原生通过selectLocalPhoneHandle函数返回选中信息
// 场景：当用户选中联系人返回webView页面，调用该方法
// 参数：return phone: '13312990402',手机号码
// javascript_selectLocalPhoneHandle = function() {
// }
// 给安卓提供的支付操作完成处理方法
// data {
//     //              status: 0, // 0 支付成功，1 支付失败
//     //              msg: '', // 支付状态说明
//     //           }
// javascript_payResultedHandle = function(data) {
// }
// 场景：用户点击虚拟返回键(屏幕右下角或者右下角按键)
// 给安卓提供的关闭交易的方法
// javascript_chargeMobileCloseHandle = function() {
// }




















