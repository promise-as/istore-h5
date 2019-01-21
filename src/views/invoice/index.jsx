import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider,observer,inject } from 'mobx-react'

import I18nProvider from './../../library/components/i18n_provider/index'

import * as tools from "../../library/tools"

import stores from './stores.js'

import './index.scss'

// 发票
@inject('pageinitStore')
@observer
class InvoiceWrap extends Component {
    constructor(props) {
        super(props)

        this.pageinitStore = this.props.pageinitStore
        
        let lang = tools.getUrlParam('lang')
        this.pageinitStore.setI18nMessagesInfoHandle(( lang.indexOf('en') > -1 ? 'en':'zh' ))
    }
    render() {
        let { formatMessage } = this.pageinitStore.intl

        return <div className="invoice-wrap">
            <div className="invoice-block">
                <div className="invoice-block-title">1、{formatMessage({id: '发票说明'})}</div>
                <div className="invoice-block-text">
                    {formatMessage({id: '默认开具电子发票，电子发票是指购买商品后，开具电子方式存储的收付款凭证。开具的电子发票均为真实有效的合法发票，与传统增值税普通发票纸质发票具有同等法律效力，可作为用户维权、保修凭据、单位报销。'})}
                </div>
            </div>
            <div className="invoice-block">
                <div className="invoice-block-title">2、{formatMessage({id: '关于发票抬头'})}</div>
                <div className="invoice-block-text">
                    {formatMessage({id: '发票抬头不能为空，您可填写您的姓名或您的单位名称，国家税务局规定，发票抬头写企业的，请同时填写纳税人识别号或统一社会信用代码，不符合规定的发票，不得作为税收凭据，如您未填写，则默认抬头为收件人姓名。'})}
                </div>
            </div>
            <div className="invoice-block">
                <div className="invoice-block-title">3、{formatMessage({id: '开发票的注意事项'})}</div>
                <div className="invoice-block-text">
                    {formatMessage({id: '发票金额不能高于订单金额，仅开具现金购物金额的发票，不含运费、优惠券抵扣金额等。例如：订单总金额为2000元，优惠券抵扣金额为100元，则发票金额为1900元，0元订单、赠品将不开具发票。'})}
                </div>
            </div>
            <div className="invoice-block">
                <div className="invoice-block-title">4、{formatMessage({id: '关于第三方开发票的注意事项'})}</div>
                <div className="invoice-block-text">
                    {formatMessage({id: '第三方卖家销售的商品/服务的发票由卖家自行出具、提供，发票类型由卖家根据实际商品、服务情况决定。'})}
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<Provider {...stores}>
    <I18nProvider>
        <InvoiceWrap/>
    </I18nProvider>
</Provider>,
    document.getElementById('istore-app'))