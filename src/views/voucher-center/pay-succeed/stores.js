import { observable,action } from 'mobx'

import pageinitStore from './../../../stores/pageinit' // 页面初始化Load

import history from './../../../library/history/index'

// 确认付款
class PaySucceedStore {
    constructor() {
    }

    @observable urlParams = {}
    @observable currentPayStatus = 1 // 当前状态
    @observable payStatusList = [
        {
            title: '支付成功',
            info: '该商品由爱士多卖家提供',
            status: 'process',
        },
        {
            title: '努力充值中',
            info: '预计10分钟到账，请关注到账',
            status: '',
        },
        {
            title: '话费到账',
            info: '',
            status: '',
        },
    ]
    @action initObservableHandle(object) {
        this.urlParams = object
        let {pageType} = this.urlParams
        let title = ''
        if (pageType === 'cost') {
            this.payStatusList[2].title = '话费到账'
        }
        if (pageType === 'flow') {
            this.payStatusList[2].title = '流量到账'
        }
    }
    @action gotoPageHandle() {
        let {pageType} = this.urlParams
        if (pageType === 'cost') {
            history.replace('/')
        }
        if (pageType === 'flow') {
            history.replace('/flow-recharge')
        }
    }
}

const stores = {
    pageinitStore,
    paySucceedStore: new PaySucceedStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores