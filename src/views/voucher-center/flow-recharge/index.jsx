import React, { Component } from "react"

import stores from "./stores"
import { Provider,observer,inject } from 'mobx-react'
import { InputItem,ActivityIndicator } from 'antd-mobile';

import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'
import history from './../../../library/history/index'

import './index.scss'
import PhoneToastr from '../../../library/components/phone_toastr'
import * as tools from "../../../library/tools"

// 流量套餐
@inject('flowRechargeStore')
@observer
class FlowRechargeConterChargerPackageWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {
            actionChargeCalls,
            actionPhoneVisibleError,
        } = this.props.flowRechargeStore

        if (actionPhoneVisibleError.boolean || !actionChargeCalls.items) {
            return null
        }

        return <div className="flowrechargeconterchargerpackage-wrap">
            <div className="flowrechargeconterchargerpackage-list">
                {actionChargeCalls.items && actionChargeCalls.items.map((item, index) => {
                    return <div className="list-item"
                                onClick={()=>this.props.flowRechargeStore.sendRechargeFlowFlowRechargeeRequest(item)}
                                key={index}>
                        <div className="list-left">
                            <div className="list-left-basic">
                                <div className="basic-title">
                                    <div className="basic-title-price">{item.advicePrice}元</div>
                                    {/*{item.discountInfo && item.discountInfo.length ? <div className="basic-title-discount">特惠</div> : null}*/}
                                </div>
                                <div className="basic-subtitle">
                                    {/*<div className="basic-subtitle-label">{item.label}</div>*/}
                                    <div className="basic-subtitle-info">{item.itemName}</div>
                                </div>
                            </div>
                            {/*<div className="list-left-infos">*/}
                                {/*{item.discountInfo && item.discountInfo.map((item, index) => {*/}
                                    {/*return <span key={index}>{item}</span>*/}
                                {/*})}*/}
                            {/*</div>*/}
                        </div>
                        <div className="list-right">
                            购买
                        </div>
                    </div>
                })}
            </div>
        </div>
    }
}

// 充流量
@inject('flowRechargeStore')
@observer
class FlowRechargeConterChargeCallsWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {
            chargeCallsList,
            actionPhoneVisibleError,
        } = this.props.flowRechargeStore

        return <div className="flowrechargeconterchargecalls-wrap">
            <div className="flowrechargeconterchargecalls-title">充流量</div>
            <div className={`flowrechargeconterchargecalls-list${actionPhoneVisibleError.boolean ? ' flowrechargeconterchargecalls-listdisabled':''}`}>
                {this.props.flowRechargeStore.chargeCallsList.map((item, index) => {
                    return <div className={
                        `flowrechargeconterchargecalls-list-item${item.actionStatus ? ' flowrechargeconterchargecalls-list-itemaction' : ''}`
                    }
                            onClick={()=>this.props.flowRechargeStore.actionChargeCallsHandle(item)}
                            key={index}>
                        <div className="item-title">{item.type}</div>
                        <div className="item-price">{item.advicePrice}元</div>
                    </div>
                })}
            </div>
        </div>
    }
}

// 编辑手机号码
@inject('flowRechargeStore')
@observer
class FlowRechargeConterEditAddressWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    async openAddressListHandle() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isiOS){
            await tools.asyncBridgeCallHandler('android openAddressList')
        }else if(isAndroid){
            // console.log('window.android.openAddressList')
            window.android.openAddressList()
        }
    }

    render() {
        const {
            actionPhone,
            actionPhoneVisibleError,
            actionPhoneVisibleAttr,
            addressBook,
        } = this.props.flowRechargeStore

        return <div className="flowrechargecontereditaddress-wrap">
            <div className="flowrechargecontereditaddress-container">
                <div className="flowrechargecontereditaddress-left">
                    <div className="flowrechargecontereditaddress-left-input">
                        <InputItem
                            type="phone"
                            clear={true}
                            value={actionPhone}
                            onChange={(val)=>this.props.flowRechargeStore.chanActionPhoneHandle(val)}
                            onBlur={(val)=>this.props.flowRechargeStore.onBlurPhoneHandle(val)}
                            onFocus={()=>this.props.flowRechargeStore.onFocusPhoneHandle()}
                            placeholder="请输入手机号码"/>
                    </div>
                    <div className="flowrechargecontereditaddress-left-info">
                        {actionPhoneVisibleError.visible ?
                            <span className="info-error">{actionPhoneVisibleError.info}</span>
                            : null}
                        {actionPhoneVisibleAttr.boolean ? <span className="info-attr">{
                                `${actionPhoneVisibleAttr.remarks}${actionPhoneVisibleAttr.attr ?
                                    '('+actionPhoneVisibleAttr.attr+')':''}`
                            }</span>:null}
                        {addressBook.historiesVisble
                        &&addressBook.historiesList.length ? <div className="info-list">
                            <div className="info-list-container">
                                {addressBook.historiesList.map((item, index) => {
                                    return <div className="info-list-item"
                                                key={index}
                                                onClick={()=> this.props.flowRechargeStore.manualChanActionPhoneHandle(item.phone)}>
                                        <div className="item-name">{item.phone}</div>
                                        <div className="item-name">{item.label}</div>
                                    </div>
                                })}
                            </div>
                            <div className="info-list-item">
                                <div
                                    className="item-clear"
                                    onClick={()=>this.props.flowRechargeStore.clearHistoriesListHandle()}>清空历史充值号码</div>
                            </div>
                        </div> : null}
                    </div>
                </div>
                {addressBook.iconVisble ? <div onClick={()=>this.openAddressListHandle()} className="flowrechargecontereditaddress-right"></div> : null}
            </div>
        </div>
    }
}

// 内容主页
@inject('pageinitStore')
@inject('flowRechargeStore')
@observer
class FlowRechargeConterWrap extends Component {
    constructor(props) {
        super(props)

        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isiOS){
            try {
                window.istoreBridge.registerHandler(
                    'javascript selectLocalPhoneHandle', (data, responseCallback) => {
                        this.h5_selectLocalPhoneHandle(
                            data.replace(new RegExp(/(-)/g),'')
                        )
                        responseCallback()
                    })
            } catch (err) {
                console.log(err)
            }

        }else if(isAndroid){
            window.selectLocalPhoneHandle = this.h5_selectLocalPhoneHandle.bind(this)
        }
    }
    h5_selectLocalPhoneHandle(phone) {
        console.log('phone:', phone)
        this.props.flowRechargeStore.manualChanActionPhoneHandle(phone)
    }
    componentWillMount() {
        this.props.flowRechargeStore.initObservableHandle()
    }
    render() {
        return <div className={'flowrechargeconter-wrap'}>
            <div className="flowrechargeconter-header">
                <Header
                    leftDoms={[
                        <div className="header-left" onClick={()=>history.go(-1)}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">充流量</span>
                    ]}
                    rightDoms={[
                        <span className="header-right" onClick={()=>history.push('/pay-bill')}>充值记录</span>
                    ]}
                />
            </div>
            <div className="flowrechargeconter-editaddress">
                <FlowRechargeConterEditAddressWrap/>
            </div>
            <div className="flowrechargeconter-info">
                <a onClick={()=>new PhoneToastr().info(`暂未开放，敬请期待`)}
                   href="javascript:(0)">查询余额</a>
                {/*<Link to="/business-office">查询余额</Link>*/}
            </div>
            <div className="flowrechargeconter-chargecalls">
                <FlowRechargeConterChargeCallsWrap/>
            </div>
            <div className="flowrechargeconter-package">
                <FlowRechargeConterChargerPackageWrap/>
            </div>
            <div className="toast-example">
                <ActivityIndicator
                    toast
                    text="稍等片刻~"
                    animating={this.props.flowRechargeStore.toastVisible}
                />
            </div>
        </div>
    }
}

// 流量充值
export default class FlowRechargeWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <FlowRechargeConterWrap/>
            </I18nProvider>
        </Provider>
    }
}

