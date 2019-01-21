import React, { Component } from "react"

import stores from "./stores"
import { Provider,observer,inject } from 'mobx-react'
import { InputItem } from 'antd-mobile';

import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'
import history from './../../../library/history/index'

import './index.scss'
import * as tools from '../../../library/tools'

// 添加查询
@inject('pageinitStore')
@inject('businessOfficeCenterStore')
@observer
class BusinessOfficeConterAddSearchWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { phone } = this.props.businessOfficeCenterStore

        return <div className="businessofficeconteraddsearch-wrap">
            <div className="businessofficeconter-main-header">
                <div className="header-logon"></div>
                <div className="header-phone">
                    <div className="header-phone-number">
                        {phone.value}<span className="phone-number-text">({phone.attr})</span>
                    </div>
                    <div className="header-phone-img" onClick={()=>history.push('/select-phone')}></div>
                </div>
            </div>
            <div className="businessofficeconteraddsearch-info" onClick={()=>history.push(`/verify-phone?phone=${phone.value}`)}>
                <div className="info-left">
                    <div className="info-left-title">查询余额与更多服务</div>
                    <div className="info-left-subtitle">首次需要短信验证</div>
                </div>
                <div className="businessofficeconteraddsearch-info-img"></div>
            </div>
        </div>
    }
}

// 手机营业厅
@inject('pageinitStore')
@inject('businessOfficeCenterStore')
@observer
class BusinessOfficeConterCheckBalanceWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { phone } = this.props.businessOfficeCenterStore

        return <div className="businessofficecontercheckbalance-wrap">
            <div className="businessofficeconter-main-header">
                <div className="header-logon"></div>
                <div className="header-phone">
                    <div className="header-phone-number">
                        {phone.value}<span className="phone-number-text">({phone.attr})</span>
                    </div>
                    <div className="header-phone-img" onClick={()=>history.push('/select-phone')}></div>
                </div>
            </div>
            <div className="businessofficecontercheckbalance-info">
                <div className="businessofficecontercheckbalance-info-item">
                    <div className="item-title">话费余额（元）</div>
                    <div className="item-price">99.90元</div>
                    <div className="item-label" onClick={()=>history.push('/')}>充话费</div>
                </div>
                <div className="businessofficecontercheckbalance-info-split"></div>
                <div className="businessofficecontercheckbalance-info-item">
                    <div className="item-title">剩余流量（M）</div>
                    <div className="item-price">999.99 M</div>
                    <div className="item-label" onClick={()=>history.push('/flow-recharge')}>充流量</div>
                </div>
            </div>
        </div>
    }
}

// 内容主页
@inject('pageinitStore')
@inject('businessOfficeCenterStore')
@observer
class BusinessOfficeConterWrap extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const urlParam = tools.getUrlParam()
        this.props.businessOfficeCenterStore.initObservableHandle(urlParam)
    }
    render() {
        const pageName  = this.props.businessOfficeCenterStore.pageName
        console.log(pageName)

        return <div className={'businessofficeconter-wrap'}>
            <div className="businessofficeconter-header">
                <Header
                    leftDoms={[
                        <div className="header-left" onClick={()=>history.go(-1)}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">手机营业厅</span>
                    ]}
                />
            </div>
            <div className="businessofficeconter-main">
                {pageName === 'serach'?<BusinessOfficeConterAddSearchWrap/>
                : <BusinessOfficeConterCheckBalanceWrap/>}
            </div>
            <div className="businessofficeconter-info">
                {pageName === 'serach'?<div className="businessofficeconter-info-serach">
                        <div className="serach-list">
                            <div className="serach-list-item">
                                <div className="serach-list-item-img"></div>
                                <div className="serach-list-item-title">自动充</div>
                            </div>
                        </div>
                    </div>
                    : <div className="businessofficeconter-info-checkbalance">
                        最后更新时间：2018-08-27 11:05
                    </div>}
            </div>
        </div>
    }
}

// 话费充值
export default class BusinessOfficeWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <BusinessOfficeConterWrap/>
            </I18nProvider>
        </Provider>
    }
}

