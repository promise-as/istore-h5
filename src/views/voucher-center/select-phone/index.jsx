import React, {Component} from 'react'
import {Provider, inject, observer} from 'mobx-react'
import Hammer from 'rc-hammerjs'

import I18nProvider from './../../../library/components/i18n_provider/index'
import * as tools from './../../../library/tools/index'

import Header from './../../../library/components/header/index'

import stores from "./stores"
import './index.scss'
import history from '../../../library/history'

// 内容主页
@inject('selectPhoneStore')
@observer
class SelectPhoneConterWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneList: [
                {
                    value: 13312990401,
                    businessOfficeStatus: true,
                    rightStatus: false,
                    selectStatus: true,
                },
                {
                    value: 13312990402,
                    businessOfficeStatus: true,
                    rightStatus: false,
                    selectStatus: false,
                },
                {
                    value: 13312990403,
                    businessOfficeStatus: true,
                    rightStatus: false,
                    selectStatus: false,
                },
                {
                    value: 13312990404,
                    businessOfficeStatus: true,
                    rightStatus: false,
                    selectStatus: false,
                },
                {
                    value: 13312990405,
                    businessOfficeStatus: false,
                    rightStatus: false,
                    selectStatus: false,
                },
            ],
            currentDeletePhone: {},
            outModelVisble: false,
        }
    }
    componentDidMount() {
        window.document.body.style.backgroundColor = '#F0F0F0'
    }
    componentWillUnmount() {
        window.document.body.style.background = 'none'
    }
    onSwipeHandle(event, index) {
        const {deltaX} = event
        if (deltaX > 0) {
            this.state.phoneList[index].rightStatus = false
        }
        if (deltaX < 0) {
            this.state.phoneList[index].rightStatus = true
        }
        this.setState({
            phoneList: this.state.phoneList,
        })
    }
    deletePhoneListHandle(item) {
        this.setState({
            outModelVisble: true,
            currentDeletePhone: item,
        })
    }
    outOperationHandle(type) { // businessOffice 退出营业厅;delete 删除
        this.state.phoneList.map((phoneListItem, index) => {
            if(phoneListItem.value === this.state.currentDeletePhone.value
            && type === 'businessOffice') {
                phoneListItem.businessOfficeStatus = false
            }
            if(phoneListItem.value === this.state.currentDeletePhone.value
                && type === 'delete') {
                this.state.phoneList.splice(index, 1)
            }
        })
        this.setState({
            outModelVisble: false,
            phoneList: this.state.phoneList,
        })
    }
    selectActionPhoneHandle(item) {
        console.log(item.businessOfficeStatus)
        if (!item.businessOfficeStatus) {
            history.push(`/add-mobile?phone=${item.value}`)
            return null
        }
        history.push(`/business-office`)
    }
    onTaoHandle(event) {
        if (event.target.className === 'selectphoneconter-outselect') {
            this.setState({
                outModelVisble: false,
            })
        }
    }
    render() {
        const { phoneList,outModelVisble } = this.state

        return <div className={'selectphoneconter-wrap'}>
            <div className="selectphoneconter-header">
                <Header
                    leftDoms={[
                        <div className="header-left" onClick={()=>history.go(-1)}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">选择手机号码</span>
                    ]}
                />
            </div>
            <div className="selectphoneconter-list">
                {phoneList.map((item, index) => {
                    return <Hammer
                        key={index}
                        onSwipe={(event)=>{this.onSwipeHandle(event, index)}}>
                        <div
                            className={`selectphoneconter-list-item${item.rightStatus ?
                            ' selectphoneconter-list-itemright' :''}`}>
                            <div className="list-item-main"
                                 onClick={()=>this.selectActionPhoneHandle(item)}>
                                <div className="item-main-img"></div>
                                <div className="item-main-info">
                                    {item.businessOfficeStatus ? <div className="info-title">手机营业厅</div> : null}
                                    <div className="info-subtitle">{item.value}</div>
                                </div>
                                {item.selectStatus ? <div className="item-main-status"></div> : null}
                            </div>
                            <div onClick={()=>this.deletePhoneListHandle(item)} className="list-item-delete"></div>
                        </div>
                    </Hammer>
                })}
            </div>
            {outModelVisble ? <Hammer onTap={this.onTaoHandle.bind(this)}>
                <div className="selectphoneconter-outselect">
                    <div className="selectphoneconter-outselect-main">
                        <div className="main-list">
                            {this.state.currentDeletePhone.businessOfficeStatus ? <div className="main-list-item"
                                     onClick={()=>{this.outOperationHandle('businessOffice')}}>
                                仅退出手机营业厅</div> : null}
                            <div className="main-list-item"
                                 onClick={()=>{this.outOperationHandle('delete')}}>删除号码及设置</div>
                        </div>
                    </div>
                </div>
            </Hammer> : null}

        </div>
    }
}

// 话费充值
export default class SelectPhoneWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <SelectPhoneConterWrap/>
            </I18nProvider>
        </Provider>
    }
}

