import { observable,action } from 'mobx'
import { Modal } from 'antd-mobile';

import pageinitStore from './../../../stores/pageinit' // 页面初始化Load

import * as tools from './../../../library/tools/index'
import history from './../../../library/history/index'

const alert = Modal.alert;

// 发送验证码
class VerifyPhoneStore {
    @observable phone = 0 // 手机号码
    @observable verifyNumber = 0 // 验证码
    @observable sendVerNumberVisible = true // 发送验证码显示
    @observable currentTime = 60

    constructor() {
        this.sumTime = 60
        this.timeObjet = null //倒计时对象
        this.phone = tools.getUrlParam('phone')
    }
    @action sendSubCheckPhoneRequest(val) {
        history.push(`/business-office/`)
    }
    @action sendVerNumberRequest() {
        if (!this.sendVerNumberVisible) return null
        this.sendVerNumberVisible = false

        this.timeObjet = window.setInterval(() => {
            --this.currentTime
            console.log(this.currentTime)
            if (this.currentTime === 0) {
                window.clearInterval(this.timeObjet)
                this.currentTime = this.sumTime
                this.sendVerNumberVisible = true
            }
        }, 1000)
    }

}

const stores = {
    pageinitStore,
    verifyPhoneStore: new VerifyPhoneStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores