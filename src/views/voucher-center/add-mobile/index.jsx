import React, { Component } from "react"
import Loadable from 'react-loadable'
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { Provider,observer,inject } from 'mobx-react'


import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'

import history from './../../../library/history/index'

import stores from "./stores"

import './index.scss'

// 内容主页
@inject('pageinitStore')
@inject('addMobileStore')
@observer
class AddMobileWarp extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render(){
        const { phone } = this.props.addMobileStore
        return <div className="addmobile-wrap">
            <div className="addmobile-header">
                <Header
                    leftDoms={[
                        <div className="header-left"></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">选择手机号码</span>
                    ]}
                />
            </div>
            <div className="addmobile-banner">
                <div className="banner-img"></div>
            </div>
            <div className="addmobile-container">
                <input className="container-input" defaultValue={phone} type="text" placeholder="请输入手机号码"/>
                <div className="container-phonebook"></div>
            </div>
            <div className="addmobile-protocol">
                <div className="protocol-content">
                    查看《<span className="protocol-details" onClick={() => history.push(`/protocol/`)}>手机营业厅服务协议</span>》
                </div>
            </div>
            <div className="addmobile-choice">
                <div className="choice-item choice-agree">同意并协议开通</div>
                <div className="choice-item choice-notopen">暂不开通</div>
            </div>
        </div>
    }
}

// 查询余额
export default class RechargeWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <AddMobileWarp/>
            </I18nProvider>
        </Provider>
    }
}