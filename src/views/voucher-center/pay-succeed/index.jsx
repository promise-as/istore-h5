import React, { Component } from "react"

import stores from "./stores"
import { Provider,observer,inject } from 'mobx-react'
import { Steps, Checkbox } from 'antd-mobile'

import * as tools from './../../../library/tools/index'

import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'

import history from './../../../library/history/index'

import './index.scss'

const Step = Steps.Step

// 内容主页
@inject('paySucceedStore')
@observer
class PaySucceedConentWrap extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.props.paySucceedStore.initObservableHandle(tools.getUrlParam())
    }
    render() {
        const { payStatusList } = this.props.paySucceedStore

        return <div className={'paysucceedconent-wrap'}>
            <div className="paysucceedconent-header">
                <Header
                    centerDoms={[
                        <span className="header-title">充值成功</span>
                    ]}
                    rightDoms={[
                        <span
                            className="header-right"
                            onClick={() => this.props.paySucceedStore.gotoPageHandle()}>完成</span>
                    ]}
                />
            </div>
            <div className="paysucceedconent-list">
                <Steps>
                    {payStatusList.map((item, index) => {
                        return <Step
                            key={index}
                            // status={item.status}
                            title={item.title}
                            description={item.info} />
                    })}
                </Steps>
            </div>
        </div>
    }
}

// 话费充值
export default class PaySucceedWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <PaySucceedConentWrap/>
            </I18nProvider>
        </Provider>
    }
}

