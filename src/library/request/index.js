/**
 * Revised by peter on 2018/04/27.
 */

'use strict'

import   * as config from './../../../config/index'
import * as tools from './../tools/index'

let URL = config.node_api_host
let PORT = config.node_api_port
let ROUTER = config.node_api_router

let map_route_api = {
    /**********************************获取shop服务器时间****************************************/
    API_Common_GetTimestamp: config.node_shop_hot + '/erp/common/getTimestamp',
    /**********************************获取istore服务器时间****************************************/
    API_Common_GetTimestamp_istore: URL + ':' + PORT + ROUTER + '/common/getTimestamp',
    /**********************************获取详情****************************************/
    API_Common_GetGeneralPostDetail: URL + ':' + PORT + ROUTER + '/common/getGeneralPostDetail',
    API_User_Talk_GetTalkDetailById: URL + ':' + PORT + ROUTER + '/user/talk/getTalkDetailById',
    /**********************************获取他人信息****************************************/
    API_User_GetUserPronDetail: URL + ':' + PORT + ROUTER + '/user/getUserPronDetail',
    /**********************************广告****************************************/
    API_Common_GetBannerList: URL + ':' + PORT + ROUTER + '/common/getBannerList',
    /**********************************获取车友会详情****************************************/
    API_Common_GetCarClubDedails: URL + ':' + PORT + ROUTER + '/common/car/getCarClubDedails',
    /**********************************详情内置顶帖子****************************************/
    API_Common_Car_GetCarClubStick: URL + ':' + PORT + ROUTER + '/common/car/getCarClubStick',
    /**********************************详情帖子列表****************************************/
    API_Common_Car_GetCarClubPostList: URL + ':' + PORT + ROUTER + '/common/car/getCarClubPostList',
    /**********************************获取地区详情****************************************/
    API_Common_Car_GetCityCircleDetail: URL + ':' + PORT + ROUTER + '/common/car/getCityCircleDetail',
    /**********************************获取车系圈详情****************************************/
    API_Common_Car_GetCarLineDetail: URL + ':' + PORT + ROUTER + '/common/car/getCarLineDetail',
    /**********************************获取活动帖子详情****************************************/
    API_Post_Activity_GetCarActivityPostDetail: URL + ':' + PORT + ROUTER + '/post/activity/getCarActivityPostDetail',
    /**********************************获取分享红包****************************************/
    API_GET_GetStaticImage: URL + ':' + PORT + ROUTER + '/static/image',
    /**********************************获取门店地址****************************************/
    API_Get_Common_ShopList: config.node_shop_hot + '/erp/common/shopList',
    /**********************************获取商品详情****************************************/
    API_Mall_Goods_Detail: URL + ':' + PORT + ROUTER + '/mall/goods/detail',
    /**********************************获取商品详情富文本****************************************/
    API_Share_Mall_Goods_Detail: URL + ':' + PORT + ROUTER + '/share/mall/goods/detail',
    /**********************************获取特殊声明数据****************************************/
    API_Share_System_Particularly: URL + ':' + PORT + ROUTER + '/share/system/particularly',
    /**********************************发票须知****************************************/
    API_Share_Invoice: URL + ':' + PORT + ROUTER + '/share/invoice',
    /**********************************判断ip国家地区****************************************/
    API_Myip: URL + ':' + PORT + ROUTER + '/myip',
    /**********************************获取下载app链接****************************************/
    API_Common_GetAndroidVersion: URL + ':' + PORT + ROUTER + '/common/getAndroidVersion',
    /**********************************查询话费直充商品****************************************/
    API_Recharge_Mobile: URL + ':' + PORT + ROUTER + '/rechargeMobile/mobileItem',
    /**********************************查询流量直充商品****************************************/
    API_RechargeFlow_FlowItems: URL + ':' + PORT + ROUTER + '/rechargeFlow/flowItems',
    /**********************************话费充值****************************************/
    API_RechargeMobile_MobileRecharge: URL + ':' + PORT + ROUTER + '/rechargeMobile/mobileRecharge',
    /**********************************流量充值****************************************/
    API_RechargeFlow_FlowRecharge: URL + ':' + PORT + ROUTER + '/rechargeFlow/flowRecharge',
    /**********************************获取账单往来记录****************************************/
    API_GET_PayBill: URL + ':' + PORT + ROUTER + '/recharge/bill/getBillRecord',
    /**********************************查询充值明细****************************************/
    API_Recharge_Detail: URL + ':' + PORT + ROUTER + '/recharge/bill/getRechargeDetail',
    /**********************************获取账单分类类型****************************************/
    API_GET_Bill_Type: URL + ':' + PORT + ROUTER + '/recharge/bill/getBillType',
    /**********************************修改充值明细（备注，标注，账单分类）***********************/
    API_Update_Recharge_Detail: URL + ':' + PORT + ROUTER + '/recharge/bill/updateRechargeDetail',
    /*********************************上传文件*****************************************/
    API_Recharge_Bill_UploadImg: URL + ':' + PORT + ROUTER + '/recharge/bill/uploadImg',
    /*********************************关闭充值*****************************************/
    API_RechargeMobile_CloseRecharge: URL + ':' + PORT + ROUTER + '/rechargeMobile/closeRecharge',
}

exports.map_route_api = map_route_api

exports.sendRequest = async function ({
                                          method = 'POST',
                                          url = '',
                                          params = {},
                                          formDataParams = {}, // formData形式传参
                                          user_id = '',
                                          token = '',
                                          lang = '',
                                          nationId = '', // 地区id
                                          isEncryptionParams = false, // 参数是否加密
                                          isFormData = false, // formData形式这个为true
                                          divisor = '', // 加密签名
                                          serverTimeUrl = map_route_api.API_Common_GetTimestamp_istore, // 获取服务器时间url
                                          success_function,
                                          error_function,
                                          beforeSend_function,
                                          complete_function,
                                      }) {
    let otherCfg = {}
    if (formDataParams instanceof FormData) {
        otherCfg = {
            processData: false,
            contentType: false
        }
        if (typeof progress_function === 'function') {
            otherCfg['xhr'] = () => {
                let xhr = new window.XMLHttpRequest()
                xhr.timeout = config.server_req_timeout

                //Upload progress
                xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.lengthComputable) {
                        let percentComplete = evt.loaded / evt.total
                        //Do something with upload progress
                        let percentage = Math.floor((percentComplete) * 100)
                        if (typeof progress_function === 'function') {
                            progress_function(percentage, evt)
                        }
                    }
                }, false)

                //Download progress
                xhr.addEventListener('progress', function () {
                }, false)
                return xhr
            }
        }
    }
    // 获取userId及tokenId
    try {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isiOS){
            let {userId, tokenId} = JSON.parse(await tools.asyncBridgeCallHandler('android getUserInfo'))
            params.userId = userId
            params.token = tokenId
        }else if(isAndroid){
            let {userId, tokenId} = JSON.parse(window.android.getUserInfo())
            params.userId = userId
            params.token = tokenId
        }
        // const {userId, tokenId} = JSON.parse(await tools.asyncBridgeCallHandler('android getUserInfo'))

        // params.userId = userId
        // params.token = tokenId
    } catch (e) {
        params.userId = '1777'
        params.token = 'EEE597F32E1FCCF2DB31A3FD321331E4'
    }

    // cookie获取当前语言
    lang = tools.getCookies('lang') ? tools.getCookies('lang') : 'zh'
    nationId = tools.getUrlParam('nationId')
    let timeVersion = tools.getCookies('time_version')

    if (nationId) params.nationId = nationId

    if (lang) {
        params.lang = tools.conversionLangHandle(lang)
    }
    // 时间不存在重新获取
    if (isEncryptionParams && !timeVersion) {
        let {serverTime, differenceTime} = await tools.getServerTimeHandle(serverTimeUrl)
        tools.setCookies('time_version', differenceTime)
        tools.setCookies('server_time', serverTime)
        timeVersion = tools.getCookies('time_version') ? tools.getCookies('time_version') : 0
    }

    // 需要加密,对参数进行加密处理
    if (isEncryptionParams) {
        params['timestamp'] = (new Date().getTime() + window.Number(timeVersion))
        params = tools.encryptionParamsHandle(params, divisor)
    }
    // params转成formData对象
    if (isFormData) {
        Object.keys(params).map(item => {
            formDataParams.append(item, params[item])
        })
        params = formDataParams
    }
    $.ajax(
        //Object.assign 使得请求可扩展, 如需要, 可按照 jquery.ajax API的方式填写 request_config
        Object.assign({
            type: method,
            url: url,
            data: params,
            dataType: 'json',
            beforeSend: function () {
                if (typeof beforeSend_function === 'function') {
                    beforeSend_function()
                }
            },
            complete: function () {
                if (typeof complete_function === 'function') {
                    complete_function()
                }
            },
            success: function (result_data) {
                let status = result_data.code

                //如果该请求无误, 执行请求成功回调
                if (status === 200) {
                    //需要简单处理result_data, 运行导入的 success_function 函数
                    if (typeof success_function === 'function') {
                        success_function(result_data)
                    }
                }
                //如果该请求有误
                else {
                    //需要简单处理result_data, 运行导入的 error_function 函数
                    if (typeof error_function === 'function') {
                        error_function(result_data)
                    }
                }
            },
            error: function () {
                if (typeof error_function === 'function') {
                    error_function()
                }
            }
        }, otherCfg))
}