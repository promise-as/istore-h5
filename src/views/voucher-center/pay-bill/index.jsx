import React, { Component } from "react"
import Loadable from 'react-loadable'
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { Provider,observer,inject } from 'mobx-react'

import Pageinit from './../../../library/components/pageinit/index' // 页面初始化
import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'

import history from './../../../library/history/index'

import * as tools from './../../../library/tools/index'

import stores from "./stores"

import './index.scss'

// 内容主页
@inject('pageinitStore')
@inject('payBillStore')
@observer
class PayBillWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bannerImg: require('./../../../images/payBill-banner.png'),
            listData: [], // 账单列表[{month: '本月', expenses: '', income: ''}]
            // 当前显示月份，fixed固定数据
            actionTitleData: {
                visible: false, // 是否显示
                month: '', // 月份
                expenses: '', // 支出
                income: '', // 收入
            },
        }
        // 头部列表
        this.paybillTableHeaderListDoms = []
        // 当前选中数据索引
        this.actionTitleDataIndex = 0
    }

    componentWillMount(){
        this.props.pageinitStore.initState(
            ['sendPayBillRequest'],
            ['sendPayBillRequest'],
        )
        this.props.payBillStore.sendPayBillRequest()
    }

    componentDidMount(){
        // 监听窗口滚动
        $(window).scroll(this.changeScrollHandle.bind(this))
    }
    componentWillUnmount() {
        $(window).unbind()
    }
    // 滚动处理
    changeScrollHandle() { // 获取头部列表
        this.paybillTableHeaderListDoms = $('.paybill-details .paybill-table-header');
        // 满足的TableHeader
        let actionListData = []
        // 窗口滚动距离顶部的值
        let windowScrollTopVal = $(window).scrollTop()
        // 充值账单列表
        const { billRecordList } = this.props.payBillStore
        // 账单列表
        let {listData} = this.state;
        listData = billRecordList
        this.setState({
            listData
        })

        // console.log(listData)
        this.paybillTableHeaderListDoms.map((index, paybillTableHeaderListDomsItem) => {
            // 获取到顶部距离
            let top = $(paybillTableHeaderListDomsItem).offset().top - 50;

            // 判断头部显示信息
            if(top <= windowScrollTopVal) {
                // 找到对应的TableHeader
                let object = this.state.listData[index]

                object.offsetTop = top
                // 满足的TableHeader
                actionListData.push(object)
            }
        })
        // 将满足条件的dom数据中离顶部距离最大的对象选为固定头部的对象 === actionListData
        if (actionListData.length) {
            let maxObject = actionListData[0]
            actionListData.map((item, index) => {
                // 如果数组里面只有一个对象，直接返回
                if (!actionListData[index + 1]) {
                    this.actionTitleDataIndex = index
                    return null
                }
                if (maxObject.offsetTop < actionListData[index + 1].offsetTop) {
                    this.actionTitleDataIndex = [index + 1]
                }
            })
            this.state.actionTitleData = actionListData[this.actionTitleDataIndex]
            this.state.actionTitleData.visible = true
        } else {
            this.state.actionTitleData.visible = false
        }

        this.setState({
            listData: this.state.listData,
            actionTitleData: this.state.actionTitleData
        })
    }
    //跳转到账单详情
    gotoBillDetailsPage(billRecordItem) {
        history.push(`/bill-details?orderId=${billRecordItem.id}&type=${billRecordItem.typeStr}`)
    }

    render(){
        const {listData, actionTitleData} = this.state
        const { billRecordList } = this.props.payBillStore

        return <div className='paybill-wrap'>
            {/*固定的头部*/}
            {actionTitleData.visible ? <div className="paybill-fixed">
                <div className="paybill-table-header">
                    <h2 className="paybill-table-header-h2">{actionTitleData.month}</h2>
                    <div className="paybill-table-header-profit">
                        <div className="paybill-profit-payout">支出：￥{actionTitleData.expenses}</div>
                        <div className="paybill-profit-income">收入：￥{actionTitleData.income}</div>
                    </div>
                </div>
            </div> : null}
            <div className="paybill-container">
                <div className="paybill-header">
                    <Header
                        leftDoms={[
                            <div className="header-left" onClick={()=>{history.go(-1)}}></div>
                        ]}
                        centerDoms={[
                            <span className="header-title">手机充值账单</span>
                        ]}
                    />
                </div>
                <div className="paybill-banner"
                     style={{backgroundImage: `url(${this.state.bannerImg})`}}>
                </div>
                {/*要实现固定效果*/}
                <div className="paybill-details">
                    {
                        billRecordList.map((billRecordListItem, index) => {
                            return (
                                <div className="paybill-table" key={index}>
                                    <div className="paybill-table-header">
                                        <h2 className="paybill-table-header-h2">{billRecordListItem.month}</h2>
                                        <div className="paybill-table-header-profit">
                                            <div className="paybill-profit-payout">支出：￥{billRecordListItem.expenses}</div>
                                            <div className="paybill-profit-income">收入：￥{billRecordListItem.income}</div>
                                        </div>
                                    </div>
                                    <div className="paybill-table-body">
                                        {
                                            billRecordListItem.billRecord.map((billRecordItem, index) => {
                                                return(
                                                    <div className="paybill-item" key={billRecordItem.id} onClick={()=>{this.gotoBillDetailsPage(billRecordItem)}}>
                                                        <div className="paybill-item-left"></div>
                                                        <div className="paybill-item-middle">
                                                            <div className="paybill-middle-pay">{billRecordItem.typeStr}</div>
                                                            <div className="paybill-middle-type">
                                                                <div className="paybill-middle-typeway">[{billRecordItem.billClassify}]</div>
                                                                {/*常用标签 要判断有没有*/}
                                                                <div className="paybill-labelContainer">
                                                                    {
                                                                        billRecordItem.tagging && billRecordItem.tagging.split('|').map((item, index) => {
                                                                            return item === " " ? null : <div className="paybill-middle-label" key={index}>{item}</div>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="paybill-middle-date">{tools.momentFormat(billRecordItem.addTime, 'MM-DD HH:mm')}</div>
                                                        </div>
                                                        <div className="paybill-item-right">
                                                            {/*billRecordItem.statusStr === '已支付'*/}
                                                            <div className="paybill-right-money">{billRecordItem.statusStr === '充值成功' ? '-' : null}{billRecordItem.price}</div>
                                                            <div className="paybill-right-deal">{billRecordItem.statusStr}</div>
                                                        </div>
                                                    </div>
                                                    )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="paybill-pay">
                <div className="paybill-pay-text" onClick={()=>history.push('/')}>充值</div>
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
                <PayBillWrap/>
            </I18nProvider>
        </Provider>
    }
}