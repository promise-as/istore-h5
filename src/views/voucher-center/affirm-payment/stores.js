import { observable,action } from 'mobx'
import { Toast } from 'antd-mobile'

import pageinitStore from './../../../stores/pageinit' // 页面初始化Load

import * as tools from './../../../library/tools/index'
import * as request from '../../../library/request'
import PhoneToastr from './../../../library/components/phone_toastr/index'
import history from './../../../library/history/index'

// 确认付款
class AffirmPaymentStore {
    constructor() {
        window.javascript_payResultedHandle = this.payResultedHandle.bind(this)
        // 虚拟键返回 交易关闭
        window.javascript_chargeMobileCloseHandle = this.chargeMobileCloseHandle.bind(this)
    }

    @observable orderInfo = { // 订单需要的信息
        mobileNo: '',
        itemId: '',
        itemName: '',
        rechargeAmount: '',
        price: '',
        province: '',
        payType: '',
        pageType: '', // flow 流量充值; cost 话费充值
    }
    @observable payList = []

    @action chanPayListHandle(item) {
        this.payList.map((payListItem) => {
            if (payListItem.id === item.id) {
                payListItem.actionStatus = true
            } else {
                payListItem.actionStatus = false
            }
            return payListItem
        })
    }
    @action initObservableHandle() {
        this.orderInfo = tools.getUrlParam()
        this.payList = [
            {
                icon: require('./../../../images/yuer.png'),
                balance: false,
                name: '余额',
                actionStatus: true,
                id: 2,
            },
            {
                icon: require('./../../../images/zhifubao-1.png'),
                name: '支付宝',
                actionStatus: false,
                id: 1,
            },
            {
                icon: require('./../../../images/weixin.png'),
                name: '微信支付',
                actionStatus: false,
                id: 0,
            },
        ]
        // console.log(this.orderInfo)
    }
    @action subOrderHandle() {
        console.log('点击的 提交 按钮')
        let payType = 1
        this.payList.map(item => {
            if (item.actionStatus) {
                payType = item.id
            }
        })
        this.sendPayOrderHandle(Object.assign(
            this.orderInfo,
            {payType}))
    }
    // 取消充值
    @action sendRechargeMobileCloseRechargeRequest() {
        request.sendRequest({
            url: request.map_route_api.API_RechargeMobile_CloseRecharge,
            isEncryptionParams: true,
            params: {
                outerTid: this.orderInfo.outerTid,
            },
            success_function: (resulte) => {
                history.go(-1)
            },
            error_function: (resulte={}) => {
                new PhoneToastr().error(resulte.message)
                history.go(-1)
            }
        })
    }

    // 取消充值(虚拟键-交易关闭)
    @action chargeMobileCloseHandle() {
        console.log('虚拟键-交易关闭')
        request.sendRequest({
            url: request.map_route_api.API_RechargeMobile_CloseRecharge,
            isEncryptionParams: true,
            params: {
                outerTid: this.orderInfo.outerTid,
            }
            // Android有返回的回调方法
        })
    }

    @action async sendPayOrderHandle(object) {
        console.log('sendPayOrderHandle被调用')
        let params = Object.assign({
            payType: window.String(object.payType), // 支付方式类型
            money: window.String(this.orderInfo.advicePrice), // 金额
            orderId: window.String(object.outerTid), // 订单id
            tradeType: window.String(object.tradeType), // 充值类型
            havePayPassword: object.havePayPassword, // 是否设置密码
        })
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

        if(isAndroid){
            // 调用支付订单
            window.android.payOrderHandle(JSON.stringify(params))
            console.log('Android返回 支付订单 详情')
        } else if(isiOS){
            let responseData = JSON.parse(await tools.asyncBridgeCallHandler(
                'android payOrderHandle',
                JSON.stringify(params),
            ))
            this.payResultedHandle(responseData)
        }
    }
    // 页面跳转
    @action payResultedHandle(data) {
        console.log('支付完 页面的跳转', data)
        if(data.status === 0) { // 成功
            this.paySuccessHandle()
        } else { // 失败
            this.payErrorHandle(data.msg)
        }
    }

    @action paySuccessHandle() {
        console.log('支付成功')
        let isRepetition = false
        let historiesList = JSON.parse(window.localStorage.getItem('historiesList') || '[]')
        historiesList.map(item => {
            if (item.phone === this.orderInfo.mobileNo) {
                isRepetition = true
            } else {
                isRepetition = false
            }
        })
        if (!isRepetition) {
            historiesList.push({
                phone: this.orderInfo.mobileNo,
                label: this.orderInfo.phoneRemarks,
            })
            window.localStorage.setItem('historiesList', JSON.stringify(historiesList))
        }
        Toast.success('充值成功', 1)
        setTimeout(() => {
            history.replace(`/pay-succeed?pageType=${this.orderInfo.pageType}`)
        }, 1000 * 1)
        console.log('支付成功结束')
    }
    @action payErrorHandle(msg) {
        console.log('支付失败')
        Toast.fail(window.String(msg) || '支付失败', 1)
    }
}

const stores = {
    pageinitStore,
    affirmPaymentStore: new AffirmPaymentStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores