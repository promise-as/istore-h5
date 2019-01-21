import React, { Component } from "react"
import { Picker, } from 'antd-mobile';
import { Provider,observer,inject } from 'mobx-react'


import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'
import Pageinit from './../../../library/components/pageinit/index' // 页面初始化

import history from './../../../library/history/index'

import * as tools from './../../../library/tools/index'

import stores from "./stores"

import PhoneToastr from './../../../library/components/phone_toastr/index'

import './index.scss'

// 选择类别
@inject('billDetailStore')
@observer
class SelectCategoryWrap extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        const {extra} = this.props

        return <div className="selectcategory-wrap" onClick={this.props.onClick}>
            <div className="billdetail-sort">账单分类</div>
            <div className="billdetail-other">
                {extra.replace(',','-')}
                <div className="billdetail-other-arrows"></div></div>
        </div>
    }
}

// 内容主页
@inject('pageinitStore')
@inject('billDetailStore')
@observer
class BillDetailsWrap extends Component {
    constructor(props) {
        super(props)

        this.labelDom = React.createRef()
    }

    componentWillMount(){
        this.props.pageinitStore.initState(
            ['sendRechargeDetail', 'sendBillType'],
            ['sendRechargeDetail', 'sendBillType'],
        )
        let {orderId, type} = tools.getUrlParam()

        type = (type == '流量充值' ? 1 : 0)

        this.props.billDetailStore.sendRechargeDetail(orderId, type)
        this.props.billDetailStore.sendBillType()
    }

    //查看来往记录
    gotoDealingsRecordPage() {
        const { rechargeDetail } = this.props.billDetailStore
        const operator = rechargeDetail.rechargeObject
        const mobile = rechargeDetail.mobile
        history.push(`/dealings-record?operator=${operator}&mobile=${mobile}`)
    }

    //标签和备注
    gotoLabelRemarkPage() {
        let {orderId, type} = tools.getUrlParam()
        // let {remarks} = this.props.billDetailStore.rechargeDetail //标签
        //跳转到 标签和备注页
        history.push(`/label-remark?orderId=${orderId}`)
    }

    static clickHandle() {
        new PhoneToastr().info(`暂未开放，敬请期待`)
    }

    render() {
        const { rechargeDetail,classifyList,actionClassifyVal } = this.props.billDetailStore

        return <div className="billdetail-wrap">
            <div className="billdetail-header">
                <Header
                    leftDoms={[
                        <div className="header-left" onClick={()=>{history.go(-1)}}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">账单详情</span>
                    ]}
                />
            </div>
            <div className="billdetail-logo">
                {
                    RegExp("移动").test(rechargeDetail.explainStr) ?
                        <div className="billdetail-logo-left billdetail-china-mobile"></div> : null
                }
                {
                    RegExp("联通").test(rechargeDetail.explainStr) ?
                        <div className="billdetail-logo-left billdetail-china-unicom"></div> : null
                }
                {
                    RegExp("电信").test(rechargeDetail.explainStr) ?
                        <div className="billdetail-logo-left billdetail-chinanet"></div> : null
                }

                <div className="billdetail-logo-right">{rechargeDetail.rechargeObject}</div>
            </div>
            <div className="billdetail-price">{rechargeDetail.price}</div>
            <div className="billdetail-dealclose">{rechargeDetail.statusStr}</div>

            <div className="billdetail-table">
                <div className="billdetail-item">
                    <div className="billdetail-item-left">付款方式</div>
                    <div className="billdetail-item-right">{rechargeDetail.payTypeStr}</div>
                </div>
                <div className="billdetail-item">
                    <div className="billdetail-item-left billdetail-explain">充值说明</div>
                    <div className="billdetail-item-right">
                        <a className="billdetail-item-phonenumber">{rechargeDetail.mobile}</a>&nbsp;
                        {rechargeDetail.explainStr && rechargeDetail.explainStr.slice(12)}
                    </div>
                </div>
                <div className="billdetail-item">
                    <div className="billdetail-item-left">充值号码</div>
                    <div className="billdetail-item-right">
                        <a className="billdetail-item-phonenumber">{rechargeDetail.mobile}</a>
                    </div>
                </div>
                <div className="billdetail-item">
                    <div className="billdetail-item-left">充值面额</div>
                    <div className="billdetail-item-right">{rechargeDetail.price}元</div>
                </div>
                <div className="billdetail-item">
                    <div className="billdetail-item-left">交易对象</div>
                    <div className="billdetail-item-right">{rechargeDetail.rechargeObject}</div>
                </div>
                <div className="billdetail-item-class">
                    <Picker
                        data={classifyList}
                        cols={2}
                        okText={'完成'}
                        dismissText={'取消'}
                        value={actionClassifyVal}
                        className={'billdetails-select-picker'}
                        onChange={v => this.props.billDetailStore.changeActionClassify(v)}>
                        <SelectCategoryWrap/>
                    </Picker>
                </div>
            </div>
            <div className="billdetail-line"></div>

            <div className="billdetail-table">
                <div className="billdetail-item">
                    <div className="billdetail-item-left">创建时间</div>
                    <div className="billdetail-item-right">{tools.momentFormat(rechargeDetail.addTime, 'YYYY-MM-DD HH:SS')}</div>
                </div>
                <div className="billdetail-item">
                    <div className="billdetail-item-left">订单号</div>
                    <div className="billdetail-item-right">{rechargeDetail.itemId}</div>
                </div>
                <div className="billdetail-item">
                    <div className="billdetail-item-left billdetail-maxwidth">商户订单号</div>
                    <div className="billdetail-item-right">{rechargeDetail.outerTid}</div>
                </div>
            </div>

            <div className="billdetail-blank"></div>

            <div className="billdetail-table">
                <div className="billdetail-item billdetail-item-add" onClick={()=> {this.gotoLabelRemarkPage()}}>
                    <div className="billdetail-label-remark" >
                        {rechargeDetail.tagging ? '标签' : '标签和备注'}
                    </div>
                    <div
                        className="billdetail-item-labelcontainer">
                        <div className="item-right-label" ref={this.labelDom}>
                            {/*<div className="item-right-text">nijni</div>*/}
                            {rechargeDetail.tagging && rechargeDetail.tagging != ' '?
                                rechargeDetail.tagging.split('|').map((item, index) => {
                                    return (
                                        item == " " ? null : <div className="item-right-text" key={index}>{item}</div>
                                    )
                                })
                                : <div className="item-right-label-add">添加</div>}
                        </div>
                        <div className="right-label-arrows" id='label-arrows'></div>
                    </div>
                </div>
                <div className="billdetail-line"></div>
                {rechargeDetail.tagging ?
                    <div className="billdetail-item billdetail-remark" onClick={()=> {this.gotoLabelRemarkPage()}}>
                        <div className="billdetail-remark-left">备注</div>
                        <div className="billdetail-remark-right">
                            <div className="remark-right-text">{rechargeDetail.remarks}</div>
                            <div className="remark-right-arrows"></div>
                        </div>
                    </div> : null
                }


                <div className="billdetail-item billdetail-recordContainer" onClick={()=> {this.gotoDealingsRecordPage()}}>
                    <div className="billdetail-see-record billdetail-maxwidth">查看来往记录</div>
                    <div className="billdetail-record">
                        <div className="billdetail-record-arrows"></div>
                    </div>
                </div>
            </div>

            <div className="billdetail-blank"></div>

            <div className="billdetail-table">
                <div className="billdetail-item" onClick={() => BillDetailsWrap.clickHandle()}>
                    <div className="billdetail-query-left billdetail-maxwidth">对此订单有疑问</div>
                    <div className="billdetail-query-right">
                        <div className="billdetail-query-right-arrows"></div>
                    </div>
                </div>
            </div>

            <div className="billdetail-footer">
                <div className="billdetail-footer-content">
                    话费一般30分钟内到账，月初为充值高峰期，会有延迟到账情况，
                    若过久未到账，可点击“对此账单有疑问”咨询订单情况。
                </div>
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
                <BillDetailsWrap/>
            </I18nProvider>
        </Provider>
    }
}

