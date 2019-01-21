import { observable,action } from 'mobx'

import pageinitStore from './../../../stores/pageinit' // 页面初始化Load

// 手机营业厅服务协议
class ProtocolStore {}

const stores = {
    pageinitStore,
    protocolStore: new ProtocolStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores