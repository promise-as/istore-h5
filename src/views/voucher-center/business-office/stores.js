import { observable,action } from 'mobx'
import { Modal } from 'antd-mobile';

import pageinitStore from './../../../stores/pageinit' // 页面初始化Load

import history from './../../../library/history/index'

const alert = Modal.alert;

// 充值中心
class BusinessOfficeCenterStore {
    @observable pageName = ''// 显示的页面模块
    @observable phone = {
        value: '',
        attr: '中国移动',
    }
    @action initObservableHandle(object) {
        this.pageName = object.pageName
        this.phone.value = '13312990401' || object.phone
    }


}

const stores = {
    pageinitStore,
    businessOfficeCenterStore: new BusinessOfficeCenterStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores