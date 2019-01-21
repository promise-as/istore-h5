import { observable,action } from 'mobx'

import pageinitStore from './../../stores/pageinit' // 页面初始化Load

import * as request from './../../library/request/index'

import PhoneToastr from './../../library/components/phone_toastr/index'

// 商品详情
class MdseDetailsStore {
    constructor() {
    }
    @observable mdseDetailsInfo = {
        imgList: [], // banner图片列表
        baseMap: {}, // 基本信息
        advertList: [], // 广告列表
        recommendList: [], // 推荐列表
        commentMap: {// 评论
            commentList: [], // 评论列表
        },
    }

    @action sendMallGoodsGetailReqeust(skuId) { // 获取商品详情
        pageinitStore.decreaseStep('sendMallGoodsGetailReqeust')

        request.sendRequest({
            url: request.map_route_api.API_Mall_Goods_Detail,
            params: {
                skuId: skuId,
            },
            success_function: (resulte) => {
                this.mdseDetailsInfo = resulte.data || {}

                pageinitStore.increaseStep('sendMallGoodsGetailReqeust')
            },
            error_function: (resulte={}) => {
                new PhoneToastr().error(resulte.message)
                pageinitStore.increaseStep('sendMallGoodsGetailReqeust')
            }
        })
    }
}

const stores = {
    pageinitStore,
    mdseDetailsStore: new MdseDetailsStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores