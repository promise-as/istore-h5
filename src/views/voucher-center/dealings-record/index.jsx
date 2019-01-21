import React, { Component } from "react"
import Loadable from 'react-loadable'
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { Provider,observer,inject } from 'mobx-react'

import Pageinit from './../../../library/components/pageinit/index' // 页面初始化
import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'

import history from './../../../library/history/index'

import stores from "./stores"

import './index.scss'
import * as tools from "../../../library/tools"

// 内容主页
@inject('pageinitStore')
@inject('dealingsRecordStore')
@observer
class DealingsRecordWrap extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount(){
        this.props.pageinitStore.initState(
            ['sendPayBillRequest'],
            ['sendPayBillRequest'],
        )
        this.props.dealingsRecordStore.sendPayBillRequest()
    }

    render(){
        //运营商和手机号
        let {operator,mobile} = tools.getUrlParam()
        const {billRecordList} = this.props.dealingsRecordStore
        return <div className='realingrecord-wrap'>
            <div className="realingrecord-container">
                <div className="realingrecord-header">
                    <Header
                        leftDoms={[
                            <div className="header-left" onClick={()=>{history.go(-1)}}></div>
                        ]}
                        centerDoms={[
                            <span className="header-title">
                                {operator}
                                <em className="header-number">{mobile}</em>
                            </span>
                        ]}
                    />
                </div>
                <div className="realingrecord-details">
                    {
                        billRecordList.map((billRecordItem, index) => {
                            return <div className="realingrecord-table" key={index}>
                                <div>
                                    <div className="realingrecord-table-header">
                                        <div className="realingrecord-header-content">
                                            {billRecordItem.month} &nbsp;支出 : {billRecordItem.expenses}
                                        </div>
                                    </div>
                                </div>
                                <div className="realingrecord-table-body">
                                    {
                                        billRecordItem.billRecord.map((item, index) => {
                                            return <div className="realingrecord-item" key={index}>
                                                <div className="realingrecord-item-left">
                                                    <div className="realingrecord-left-pay">充值</div>
                                                    <div className="realingrecord-left-date">
                                                        {tools.momentFormat(item.addTime, 'MM-DD')}
                                                    </div>
                                                </div>
                                                <div className="realingrecord-item-right">
                                                    <div className="realingrecord-right-money">{item.price}</div>
                                                    <div className="realingrecord-right-deal">{item.statusStr}</div>
                                                </div>
                                            </div>
                                        })
                                    }

                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="realingrecord-pay">
                <div className="realingrecord-pay-text" onClick={()=>history.push('/')}>充值</div>
            </div>
            <Pageinit/>
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
                <DealingsRecordWrap/>
            </I18nProvider>
        </Provider>
    }
}