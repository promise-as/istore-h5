import { observable,action } from 'mobx'

import pageinitStore from './../../stores/pageinit' // 页面初始化Load

import * as request from './../../library/request/index'

import * as tools from "../../library/tools"

import PhoneToastr from './../../library/components/phone_toastr/index'

// 分享出去的购物车
class ShopGpsStore {
    constructor() {
    }
    @observable shoppingList = []

    @action setShoppingListItems(shoppingList) {
        this.shoppingList = shoppingList
    }
    @action sendGetShoppingCartReqeust(cartIds) { // 获取购物车
        pageinitStore.decreaseStep('sendGetShoppingCartReqeust')

        request.sendRequest({
            url: 'http://10.10.20.87:8081/mall/cart/share/list',
            method: 'GET',
            params: {
                cartIds: cartIds,
            },
            success_function: (resulte) => {
                this.shoppingList = resulte.data.list || []

                pageinitStore.increaseStep('sendGetShoppingCartReqeust')
            },
            error_function: (resulte={}) => {
                new PhoneToastr().error(resulte.message)
                pageinitStore.increaseStep('sendGetShoppingCartReqeust')
            }
        })
    }
}

const stores = {
    pageinitStore,
    shopgpsstore: new ShopGpsStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores