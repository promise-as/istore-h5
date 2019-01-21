import { observable,action } from 'mobx'

import pageinitStore from './../../stores/pageinit' // 页面初始化Load

import * as request from './../../library/request/index'

import PhoneToastr from './../../library/components/phone_toastr/index'

// 门店gps
class ShopGpsStore {
    @observable shopGpsList = []

    @action sendCommonShopListReqeust(params, success_call) { // 获取门店列表
        pageinitStore.decreaseStep('sendCommonShopListReqeust')

        request.sendRequest({
            url: request.map_route_api.API_Get_Common_ShopList,
            params: params,
            method: 'GET',
            isEncryptionParams: true,
            divisor: 'istore@zkzh',
            serverTimeUrl: request.map_route_api.API_Common_GetTimestamp,
            success_function: (resulte) => {
                this.shopGpsList = resulte.data.shopList
                success_call()

                pageinitStore.increaseStep('sendCommonShopListReqeust')
            },
            error_function: (resulte={}) => {
                new PhoneToastr().error(resulte.message)
                pageinitStore.increaseStep('sendCommonShopListReqeust')
            }
        })
    }
}

const stores = {
    pageinitStore,
    shopGpsStore: new ShopGpsStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores