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
@inject('queryBalanceStore')
@observer
class QueryBalanceWarp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            operator: {
                chinanet: '中国电信',
                chinamove: '中国移动',
                Chinaunicom: '中国联通'
            }

        }
    }
    componentDidMount(){}

    render(){
        const { operator } = this.state
        return <div className="querybalance-wrap">
            <div className="querybalance-header">
                <Header
                    leftDoms={[
                        <div className="header-left"></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">手机营业厅</span>
                    ]}
                />
            </div>
            <div className="querybalance-table">
                <div className="table-container">
                    <div className="table-header">
                        {operator.chinamove ? <div className="chian-move"></div>: null}
                    </div>
                    <div className="table-body">
                        <div className="table-body-left">
                            <div className="body-left-phone">13612222222</div>
                            <span className="body-left-operator">({operator.chinamove})</span>
                        </div>
                        <div className="table-body-right"></div>
                    </div>
                    <div className="table-footer">
                        <div className="table-footer-item">
                            <div className="footer-item-top">话费余额（元）</div>
                            <div className="footer-item-middle">99.90元</div>
                            <div className="footer-item-bottom">充话费</div>
                        </div>
                        <div className="table-footer-line"></div>
                        <div className="table-footer-item">
                            <div className="footer-item-top">剩余流量（M）</div>
                            <div className="footer-item-middle">999.9M</div>
                            <div className="footer-item-bottom">充流量</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="querybalance-deadline">
                最后更新时间：2018-08-27 11:05
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
                <QueryBalanceWarp/>
            </I18nProvider>
        </Provider>
    }
}