import { observable,action } from 'mobx'

import pageinitStore from './../../../stores/pageinit' // 页面初始化Load

// 查询余额
class QueryBalanceStore {
}

const stores = {
    pageinitStore,
    queryBalanceStore: new QueryBalanceStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores