import { observable,action } from 'mobx'

import pageinitStore from './../../../stores/pageinit'
import * as request from "../../../library/request"
import PhoneToastr from "../../../library/components/phone_toastr"
import history from "../../../library/history"
import * as tools from "../../../library/tools" // 页面初始化Load

// 充值明细
class BillDetailStore {
    @observable rechargeDetail = {} //充值明细

    @observable actionClassifyVal = [] // 选中分类值
    @observable classifyList = [ // 分类列表
        {
            value: "1",
            label: "消费",
            children: [
                {
                    value: "11",
                    label: "消费-1",
                },
                {
                    value: "12",
                    label: "消费-2",
                },
                {
                    value: "13",
                    label: "消费-3",
                },
            ],
        },
        {
            value: "2",
            label: "理财",
            children: [
                {
                    value: "21",
                    label: "理财-1",
                },
                {
                    value: "22",
                    label: "理财-2",
                },
                {
                    value: "23",
                    label: "理财-3",
                },
            ],
        },
        {
            value: "3",
            label: "其它",
            children: [],
        },
    ]

    //改变账单分类
    @action changeActionClassify(valList) {
        this.actionClassifyVal = valList

        let id = this.rechargeDetail.id //充值账单id
        let billClassify = valList.join('-') //账单分类（消费-通讯物流）

        this.sendUpdateLabelRemark(id, billClassify) //修改充值明细(备注，标注，账单分类)

        let {orderId} = tools.getUrlParam()
        // this.sendUpdateLabelRemark(orderId)
    }

    //查询充值明细
    @action sendRechargeDetail(id, type){
        pageinitStore.decreaseStep('sendRechargeDetail')

        request.sendRequest({
            url: request.map_route_api.API_Recharge_Detail,
            isEncryptionParams: true, //是否加密
            params: { //参数
                id: id,
                type: type,
            },
            success_function: (result) => {
                this.rechargeDetail = result.data.rechargeDetail
                this.actionClassifyVal = this.rechargeDetail.billClassify.split('-')
                pageinitStore.increaseStep('sendRechargeDetail')
            },
            error_function: (result) => {
                new PhoneToastr().error(result.message)
                pageinitStore.increaseStep('sendRechargeDetail')
            }
        })
    }

    //获取账单分类类型
    @action sendBillType(){
        pageinitStore.decreaseStep('sendBillType')
        request.sendRequest({
            url: request.map_route_api.API_GET_Bill_Type,
            isEncryptionParams: true, //是否加密
            params: {},
            success_function: (result) => {
                // 初始化分类列表
                let classifyOriginal = result.data.list

                //初始显示 其他
                this.actionClassifyVal.push(classifyOriginal[classifyOriginal.length - 1].oneType)

                // 分类列表
                this.classifyList = []

                classifyOriginal.map((item, index) => {
                    let classifyListItem = {
                        value: item.oneType,
                        label: item.oneType,
                    }
                    classifyListItem.children = []
                    item.twoType.map((twoTypeItem) => {
                        classifyListItem.children.push({
                            value: twoTypeItem,
                            label: twoTypeItem,
                        })
                    })
                    this.classifyList.push(classifyListItem)
                })

                pageinitStore.increaseStep('sendBillType')
            },
            error_function: (result) => {
                new PhoneToastr().error(result.message)
                pageinitStore.increaseStep('sendBillType')
            }
        })
    }

    //修改充值明细(备注，标注，账单分类)
    @action sendUpdateLabelRemark(orderId, billClassify){
        request.sendRequest({
            url: request.map_route_api.API_Update_Recharge_Detail,
            isEncryptionParams: true, //是否加密
            params: {
                id : orderId,
                billClassify: billClassify
            },
            success_function: (result) => {
            },
            error_function: (result) => {
                new PhoneToastr().error(result.message)
            }
        })
    }

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
    billDetailStore: new BillDetailStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores