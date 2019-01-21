import { observable,action } from 'mobx'
import { Modal } from 'antd-mobile';

import pageinitStore from './../../../stores/pageinit' // 页面初始化Load

import * as tools from './../../../library/tools/index'
import history from './../../../library/history/index'

const alert = Modal.alert;

// 选择手机号码
class SelectPhoneStore {
    constructor() {
    }

}

const stores = {
    pageinitStore,
    selectPhoneStore: new SelectPhoneStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores