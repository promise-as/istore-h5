import { observable,action } from 'mobx'

import pageinitStore from './../../../stores/pageinit'
import * as request from "../../../library/request"
import PhoneToastr from './../../../library/components/phone_toastr/index'

// 充值账单
class PayBillStore {
    @observable billRecordList = [] //充值账单列表

    @observable formatBillRecordList = [ //处理过的数据
        {month: '', expenses: '', income: '', billRecordList: [ [], [] ]}
    ]

    // 获取账单往来记录
    @action sendPayBillRequest(){
        pageinitStore.decreaseStep('sendPayBillRequest')

        request.sendRequest({
            url: request.map_route_api.API_GET_PayBill,
            isEncryptionParams: true, //是否加密
            params: {},
            success_function: (result) => {
                this.billRecordList = result.data.list

                this.billRecordList.map((billRecordListItem, index) => {

                })

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
    payBillStore: new PayBillStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores