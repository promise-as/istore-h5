import { observable,action } from 'mobx'

import pageinitStore from './../../stores/pageinit' // 页面初始化Load

// 商品详情
class LifeServicesWrap {
}

const stores = {
    pageinitStore,
    lifeServicesWrap: new LifeServicesWrap(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores