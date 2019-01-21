import { observable,action } from 'mobx'
import { Modal } from 'antd-mobile';

import pageinitStore from './../../../stores/pageinit' // 页面初始化Load

import * as tools from './../../../library/tools/index'
import history from './../../../library/history/index'
import * as request from '../../../library/request'
import PhoneToastr from '../../../library/components/phone_toastr'

const alert = Modal.alert;

// 充值中心
class FlowRechargeStore {
    @observable toastVisible = false
    @observable actionPhone = '' // 选中的手机号码
    @observable actionPhoneVisibleError = { // 选中的手机号码验证错误状态
        visible: false,
        boolean: true, // 验证通过 false，不通过false
        info: '请输入正确的号码',
    }
    @observable actionPhoneVisibleAttr = { // 选中的手机号码验证归属性状态
        boolean: false,
        remarks: '', // 通讯录备注
        info: '',
    }
    @observable addressBook = { // 通讯录
        iconVisble: true,
        historiesVisble: false,
        historiesList: this.historiesList
    }
    @observable actionChargeCalls = {} // 选中流量套餐
    @observable chargeCallsList = [ // 充流量套餐
        {
            type: '100M',
            advicePrice: '10.00',
        },
        {
            type: '300M',
            advicePrice: '20.00',
        },
        {
            type: '500M',
            advicePrice: '30.00',
        },

    ]

    @action chanActionPhoneHandle(val) {
        this.actionPhone = val
        if (!tools.trim(this.actionPhone).length) {
            this.addressBook.historiesVisble = true
        } else {
            this.addressBook.historiesVisble = false
            this.actionPhoneVisibleError.visible = false
        }
        this.actionPhoneVisibleAttr = {
            boolean: false,
            remarks: '',
            attr: '',
        }
        this.actionPhoneVisibleError = {
            visible: false,
            boolean: true,
            info: '请输入正确的号码',
        }
        this.addressBook.iconVisble = false
    }
    @action manualChanActionPhoneHandle(val) {
        this.actionPhone = val
        this.onBlurPhoneHandle(val)
    }
    @action async onBlurPhoneHandle(val) {
        setTimeout(() => {
            this.addressBook.iconVisble = true
        }, 200)
        setTimeout(() => {
            this.addressBook.historiesVisble = false
        }, 30)
        let trimPhone = tools.trim(val)
        // 如果为空
        if (!trimPhone) {
            this.actionPhoneVisibleError.visible = false
            this.actionPhoneVisibleError.boolean = true

            this.actionPhoneVisibleAttr.boolean = false
            return null
        }
        if(!(/^1[34578]\d{9}$/.test(trimPhone))) {
            this.actionPhoneVisibleError.visible = true
            this.actionPhoneVisibleError.boolean = true

            this.actionPhoneVisibleAttr.boolean = false
            return null
        }
        let phoneName = ''

        try {
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isiOS){
                if (JSON.parse(await tools.asyncBridgeCallHandler('android getUserInfo')).phone === trimPhone) {
                    phoneName = '默认号码'
                } else {
                    phoneName = await tools.asyncBridgeCallHandler('android getPhoneInfoHandle',
                        trimPhone.toString())
                }
            }else if(isAndroid){

                if (JSON.parse(window.android.getUserInfo()).phone === trimPhone) {
                    // console.log('window.android.getUserInfo()')
                    phoneName = '默认号码'
                } else {
                    console.log('选择通讯录的号码', trimPhone.toString())
                    phoneName = window.android.getPhoneInfoHandle(trimPhone.toString())
                }
            }
        } catch (e) {
            console.log(e)
        }
        if (!!phoneName) {
            this.actionPhoneVisibleAttr = {
                boolean: true,
                remarks: phoneName ? phoneName: '未知号码',
                attr: '',
            }
        }
        this.sendRechargeFlowFlowItemsRequest(trimPhone)
    }
    @action onFocusPhoneHandle() {
        this.addressBook.iconVisble = false

        this.actionPhoneVisibleAttr.boolean = false

        this.actionPhoneVisibleError.visible = false
        this.actionPhoneVisibleError.boolean = true
        setTimeout(() => {
            if (!tools.trim(this.actionPhone).length) {
                this.addressBook.historiesVisble = true
            } else {
                this.addressBook.historiesVisble = false
            }
        }, 30)
    }
    // 清除历史记录
    @action clearHistoriesListHandle() {
        setTimeout(()=> {
            alert('', '清空历史充值号码', [
                {
                    text: '取消',
                    onPress: () => {

                    }},
                {
                    text: '确认',
                    onPress: () => {
                        localStorage.setItem('historiesList', '')
                        console.log(this)
                        this.addressBook.historiesList = []
                    }
                },
            ])
        }, 200)
    }
    @action actionChargeCallsHandle(item) {
        this.chargeCallsList.map(chargeCallsListItem => {
            chargeCallsListItem.actionStatus = false
            if (chargeCallsListItem.type === item.type) {
                chargeCallsListItem.actionStatus = true
            }
            return chargeCallsListItem
        })

        this.actionChargeCalls = item
    }
    @action sendRechargeFlowFlowItemsRequest(phone) {
        setTimeout(() => {
            this.toastVisible = true
        }, 200)

        request.sendRequest({
            url: request.map_route_api.API_RechargeFlow_FlowItems,
            isEncryptionParams: true,
            params: {
                mobileNo: phone,
            },
            success_function: (resulte) => {
                this.toastVisible = false

                let resulteData = resulte.data
                // 防止清除按钮引发的请求
                if (!tools.trim(this.actionPhone)) {
                    this.actionPhoneVisibleError.visible = false
                    this.actionPhoneVisibleError.boolean = true

                    this.actionPhoneVisibleAttr.boolean = false
                    return null
                }
                // 手机号码不对
                if (!resulteData.province) {
                    this.actionPhoneVisibleError = {
                        visible: true,
                        boolean: true,
                        info: '手机号码格式不对',
                    }
                    this.actionPhoneVisibleAttr = {
                        boolean: false,
                        info: '',
                    }
                    return null
                }
                // 手机验证及手机格式详情对象处理
                this.actionPhoneVisibleError.visible =  false
                this.actionPhoneVisibleError.boolean =  false
                // 手机详情对象处理
                this.actionPhoneVisibleAttr.boolean = true
                this.actionPhoneVisibleAttr.attr = resulteData.province
                if (!this.actionPhoneVisibleAttr.remarks) {
                    this.actionPhoneVisibleAttr.remarks = '未知号码'
                }

                this.chargeCallsList = []
                Object.values(resulteData.items).map((item) => {
                    item.actionStatus = false
                    this.chargeCallsList.push(item)
                })
                this.actionChargeCalls = {}
            },
            error_function: (resulte={}) => {
                this.toastVisible = false

                // 防止清除按钮引发的请求
                if (!tools.trim(this.actionPhone)) {
                    this.actionPhoneVisibleError.visible = false
                    this.actionPhoneVisibleError.boolean = true

                    this.actionPhoneVisibleAttr.boolean = false
                    return null
                }
                this.actionPhoneVisibleError.visible = true
                this.actionPhoneVisibleError.boolean = true

                this.actionPhoneVisibleAttr.boolean = false
                new PhoneToastr().error(resulte.message)
            }
        })
    }
    // 流量充值
    @action sendRechargeFlowFlowRechargeeRequest(chargeCallsListItem) {
        request.sendRequest({
            url: request.map_route_api.API_RechargeFlow_FlowRecharge,
            isEncryptionParams: true,
            params: {
                mobileNo: tools.trim(this.actionPhone),
                itemId: chargeCallsListItem.itemId,
                itemName: chargeCallsListItem.itemName,
                faceName: chargeCallsListItem.faceName,
                price: chargeCallsListItem.advicePrice,
                province: this.actionPhoneVisibleAttr.attr,
                reverseFlag: chargeCallsListItem.reverseFlag,
            },
            success_function: (resulte) => {
                let createOrderRespones = resulte.data
                Object.assign(chargeCallsListItem, createOrderRespones)

                let urlParam = ''
                Object.assign(chargeCallsListItem, {
                    mobileNo: tools.trim(this.actionPhone),
                    pageType: 'flow',
                    phoneRemarks: this.actionPhoneVisibleAttr.remarks || '未知号码',
                })
                Object.keys(chargeCallsListItem).map(item => {
                    urlParam += `${item}=${chargeCallsListItem[item]}&`
                })
                history.push(`/affirm-payment/?${urlParam}`)
            },
            error_function: (resulte={}) => {
                new PhoneToastr().error(resulte.message)
            }
        })
    }

    @action async initObservableHandle() {
        let responseData = ''
        try {
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
                this.actionPhone = JSON.parse(window.android.getUserInfo()).phone
            }else if(isiOS){
                responseData = await tools.asyncBridgeCallHandler('android getUserInfo')
                this.actionPhone = tools.phoneFormat(JSON.parse(responseData).phone)
            }
        } catch (err) {
            // console.log(err)
            this.addressBook.historiesList = []
        }
        // this.actionPhone = tools.phoneFormat(JSON.parse(responseData).phone)
        // console.log('11111111111111', this.actionPhone)
        this.onBlurPhoneHandle(this.actionPhone)
    }
}

const stores = {
    pageinitStore,
    flowRechargeStore: new FlowRechargeStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores