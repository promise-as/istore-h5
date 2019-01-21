import { observable,action } from 'mobx'

import pageinitStore from './../../../stores/pageinit'
import * as request from "../../../library/request"
import PhoneToastr from "../../../library/components/phone_toastr" // 页面初始化Load

// 来往记录
class DealingsRecordStore {
    @observable billRecordList = [] //来往记录列表

    // 获取账单往来记录
    @action sendPayBillRequest(){
        pageinitStore.decreaseStep('sendPayBillRequest')

        request.sendRequest({
            url: request.map_route_api.API_GET_PayBill,
            isEncryptionParams: true, //是否加密
            params: {},
            success_function: (result) => {
                this.billRecordList = result.data.list
                pageinitStore.increaseStep('sendPayBillRequest')
            },
            error_function: (result) => {
                new PhoneToastr().error(result.message)
                pageinitStore.increaseStep('sendPayBillRequest')
            }
        })
    }
}

const stores = {
    pageinitStore,
    dealingsRecordStore: new DealingsRecordStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores