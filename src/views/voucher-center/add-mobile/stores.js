import { observable,action } from 'mobx'

import pageinitStore from './../../../stores/pageinit'
import * as tools from '../../../library/tools' // 页面初始化Load

// 查询余额
class AddMobileStore {
    @observable phone = null
    constructor() {
        this.phone = tools.getUrlParam('phone')
    }
}

const stores = {
    pageinitStore,
    addMobileStore: new AddMobileStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores