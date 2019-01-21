import React, { Component } from "react"

import stores from "./stores"
import { Provider,observer,inject } from 'mobx-react'
import { InputItem,ActivityIndicator } from 'antd-mobile'

import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'
import history from './../../../library/history/index'

import './index.scss'
import PhoneToastr from '../../../library/components/phone_toastr'
import * as tools from "../../../library/tools"

// 更多充值
class RechargeConterMoreWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moreList: [
                {
                    img: require('./../../../images/phone-2.png'),
                    title: '充流量',
                    url: '/flow-recharge',
                }
            ]
        }
    }
    render() {
        return <div className="rechargecontermore-wrap">
            <div className="rechargecontermore-info">
                <div className="title" >更多充值</div>
                <div className="all">
                    全部
                    <div className={'all-img'}></div>
                </div>
            </div>
            <div className="rechargecontermore-list">
                {this.state.moreList.map((item, index) => {
                    return <div className="rechargecontermore-list-item" key={index} onClick={()=>history.push(item.url)}>
                        <div className="item-img"
                            style={{backgroundImage: `url(${item.img})`}}
                        ></div>
                        <div className="item-title">{item.title}</div>
                    </div>
                })}
            </div>
        </div>
    }
}

// 充话费
@inject('voucherCenterStore')
@observer
class RechargeConterChargeCallsWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {
            chargeCallsList,
            actionPhoneVisibleError,
        } = this.props.voucherCenterStore

        return <div className="rechargeconterchargecalls-wrap">
            <div className="rechargeconterchargecalls-title">充话费</div>
            <div className={`rechargeconterchargecalls-list${actionPhoneVisibleError.boolean ? ' rechargeconterchargecalls-listdisabled':''}`}>
                {chargeCallsList.map((item, index) => {
                    return <div className="rechargeconterchargecalls-list-item"
                                onClick={()=>this.props.voucherCenterStore.sendRechargeMobileMobileRechargeRequest(item)}
                                key={index}>
                        <div className="item-title">{Math.ceil(item.advicePrice)}元</div>
                        <div className="item-price">售价:{item.advicePrice}</div>
                    </div>
                })}
            </div>
        </div>
    }
}

// 编辑手机号码
@inject('voucherCenterStore')
@observer
class RechargeConterEditAddressWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    async openAddressListHandle() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isiOS){
            await tools.asyncBridgeCallHandler('android openAddressList')
        }else if(isAndroid){
            window.android.openAddressList()
        }
    }
    render() {
        const {
            actionPhone,
            actionPhoneVisibleError,
            actionPhoneVisibleAttr,
            addressBook,
        } = this.props.voucherCenterStore

        return <div className="rechargecontereditaddress-wrap">
            <div className="rechargecontereditaddress-container">
                <div className="rechargecontereditaddress-left">
                    <div className="rechargecontereditaddress-left-input">
                        <InputItem
                            type="phone"
                            clear={true}
                            value={actionPhone}
                            onChange={(val)=>this.props.voucherCenterStore.chanActionPhoneHandle(val)}
                            onBlur={(val)=>this.props.voucherCenterStore.onBlurPhoneHandle(val)}
                            onFocus={()=>this.props.voucherCenterStore.onFocusPhoneHandle()}
                            placeholder="请输入手机号码"/>
                    </div>
                    <div className="rechargecontereditaddress-left-info">
                        {actionPhoneVisibleError.visible ?
                            <span className="info-error">{actionPhoneVisibleError.info}</span>
                            : null}
                        {actionPhoneVisibleAttr.boolean ? <span className="info-attr">{
                            `${actionPhoneVisibleAttr.remarks}${actionPhoneVisibleAttr.attr ?
                                '('+actionPhoneVisibleAttr.attr+')':''}`
                        }</span>
                            : null}
                        {addressBook.historiesVisble
                        &&addressBook.historiesList.length ? <div className="info-list">
                            <div className="info-list-container">
                                {addressBook.historiesList.map((item, index) => {
                                    return <div className="info-list-item"
                                                key={index}
                                                onClick={()=> this.props.voucherCenterStore.manualChanActionPhoneHandle(item.phone)}>
                                        <div className="item-name">{item.phone}</div>
                                        <div className="item-name">{item.label}</div>
                                    </div>
                                })}
                            </div>
                            <div className="info-list-item">
                                <div
                                    className="item-clear"
                                    onClick={()=>this.props.voucherCenterStore.clearHistoriesListHandle()}>清空历史充值号码</div>
                            </div>
                        </div> : null}
                    </div>
                </div>
                {addressBook.iconVisble ? <div onClick={()=>this.openAddressListHandle()} className="rechargecontereditaddress-right"></div> : null}
            </div>
        </div>
    }
}

// 内容主页
@inject('pageinitStore')
@inject('voucherCenterStore')
@observer
class RechargeConterWrap extends Component {
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
            } catch(err) {
                console.log(err)
            }
        }else if(isAndroid){
            window.selectLocalPhoneHandle = this.h5_selectLocalPhoneHandle.bind(this)
        }
    }

    h5_selectLocalPhoneHandle(phone) {
        this.props.voucherCenterStore.manualChanActionPhoneHandle(phone)
    }
    componentDidMount() {
        this.props.voucherCenterStore.initObservableHandle()
    }
    render() {
        return <div className={'rechargeconter-wrap'}>
            <div className="rechargeconter-header">
                <Header
                    leftDoms={[
                        <div className="header-left" onClick={()=>history.go(-1)}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">充值中心</span>
                    ]}
                    rightDoms={[
                        <span className="header-right" onClick={()=>history.push('/pay-bill')}>充值记录</span>
                    ]}
                />
            </div>
            <div className="rechargeconter-editaddress">
                <RechargeConterEditAddressWrap/>
            </div>
            <div className="rechargeconter-info" >
                <a onClick={()=>new PhoneToastr().info(`暂未开放，敬请期待`)}
                   href="javascript:(0)">查询余额</a>
                {/*<Link to="/business-office">查询余额</Link>*/}
            </div>
            <div className="rechargeconter-chargecalls">
                <RechargeConterChargeCallsWrap/>
            </div>
            <div className="rechargeconter-more">
                <RechargeConterMoreWrap/>
            </div>
            <div className="toast-example">
                <ActivityIndicator
                    toast
                    text="稍等片刻~"
                    animating={this.props.voucherCenterStore.toastVisible}
                />
            </div>
            {/*<div className="rechargeconter-footer">*/}
                {/*<div className="rechargeconter-footer-link">*/}
                    {/*<Link to="/business-office">查余额</Link>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    }
}

// 话费充值
export default class RechargeWrap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <RechargeConterWrap/>
            </I18nProvider>
        </Provider>
    }
}


