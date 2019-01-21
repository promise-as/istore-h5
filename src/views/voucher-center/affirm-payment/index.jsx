import React, { Component } from "react"

import { Provider,observer,inject } from 'mobx-react'
import { Checkbox } from 'antd-mobile';

import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'

import history from './../../../library/history/index'

import stores from "./stores"
import './index.scss'

const CheckboxItem = Checkbox.CheckboxItem

// 提交
@inject('affirmPaymentStore')
@observer
class AffirmPaymentConentSubWrap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'affirmpaymentconentsub-wrap'}
                 onClick={()=>this.props.affirmPaymentStore.subOrderHandle()}>
                提交
            </div>
        )
    }
}

// 支付方式
@inject('affirmPaymentStore')
@observer
class AffirmPaymentConentPayWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {payList} = this.props.affirmPaymentStore

        return <div className="affirmpaymentconentpay-wrap">
            <div className="affirmpaymentconentpay-title">支付方式</div>
            <div className="affirmpaymentconentpay-list">
                {payList.map((item, index) => {
                    return <div className="affirmpaymentconentpay-list-item"
                                onClick={() => this.props.affirmPaymentStore.chanPayListHandle(item)}
                                key={index}>
                        <div className="item-icon" style={{backgroundImage: `url(${item.icon})`}}></div>
                        <div className="item-text">
                            {item.name} {item.balance ? <span>(剩余:￥{item.balance})</span> : null}
                        </div>
                        <div className="item-selete">
                            <CheckboxItem
                                defaultChecked={item.actionStatus}
                                checked={item.actionStatus}
                                >
                            </CheckboxItem>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }
}

// 订单信息
@inject('affirmPaymentStore')
@observer
class AffirmPaymentConentOrderInfoWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { orderInfo } = this.props.affirmPaymentStore

        return <div className="affirmpaymentconentorderinfo-wrap">
            <div className="affirmpaymentconentorderinfo-price">
                ￥{orderInfo.advicePrice}
            </div>
            <div className="affirmpaymentconentorderinfo-info">
                订单信息: <span>{orderInfo.mobileNo}</span>
                {orderInfo.province}
                {orderInfo.itemName}
            </div>
        </div>
    }
}

// 内容主页
@inject('affirmPaymentStore')
@observer
class AffirmPaymentConentWrap extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.props.affirmPaymentStore.initObservableHandle()
    }
    render() {
        return <div className={'affirmpaymentconent-wrap'}>
            <div className="affirmpaymentconent-header">
                <Header
                    leftDoms={[
                        <div className="header-left" onClick={()=>{this.props.affirmPaymentStore.sendRechargeMobileCloseRechargeRequest()}}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">确认付款</span>
                    ]}
                />
            </div>
            <div className="affirmpaymentconent-orderinfo">
                <AffirmPaymentConentOrderInfoWrap/>
            </div>
            <div className="affirmpaymentconent-pay">
                <AffirmPaymentConentPayWrap/>
            </div>
            <div className="affirmpaymentconent-sub">
                <AffirmPaymentConentSubWrap/>
            </div>
        </div>
    }
}

// 话费充值
export default class AffirmPaymentWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <AffirmPaymentConentWrap/>
            </I18nProvider>
        </Provider>
    }
}

