import React, {Component} from 'react'
import {Provider, inject, observer} from 'mobx-react'
import { InputItem } from 'antd-mobile'

import I18nProvider from './../../../library/components/i18n_provider/index'
import * as tools from './../../../library/tools/index'

import Header from './../../../library/components/header/index'

import stores from "./stores"
import './index.scss'
import history from '../../../library/history'

// 内容主页
@inject('verifyPhoneStore')
@observer
class VerifyPhoneConterWrap extends Component {
    constructor(props) {
        super(props)
        this.inputPhoneDom = React.createRef()
        this.state = {
            butDisplay: false,
        }
    }
    changeInputHandle(val) {
        let verNumber = tools.trim(val)
        if(verNumber.length) {
            this.setState({
                butDisplay: true,
            })
        } else {
            this.setState({
                butDisplay: false,
            })
        }
    }
    getInputPhoneHandle() {
        let verNumber = tools.trim(this.inputPhoneDom.current.state.value)
        this.props.verifyPhoneStore.sendSubCheckPhoneRequest(verNumber)
    }
    render() {
        const { phone,sendVerNumberVisible,currentTime } = this.props.verifyPhoneStore

        return <div className={'verifyphoneconter-wrap'}>
            <div className="verifyphoneconter-header">
                <Header
                    leftDoms={[
                        <div className="header-left" onClick={()=>history.go(-1)}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">验证手机号</span>
                    ]}
                />
            </div>
            <div className="verifyphoneconter-title">
                请输入<span>{phone}</span>收到的短信校验
            </div>
            <div className="verifyphoneconter-main">
                <div className="verifyphoneconter-main-edit">
                    <div className="edit-info">校验码</div>
                    <div className="edit-input">
                        <InputItem
                            ref={this.inputPhoneDom}
                            clear
                            placeholder="输入短信验证码"
                            onChange={this.changeInputHandle.bind(this)}
                            autoFocus/>
                        {/*<input*/}
                            {/*ref={this.inputPhoneDom}*/}
                            {/*onChange={this.changeInputHandle.bind(this)}*/}
                            {/*type="text"/>*/}
                    </div>
                    <div className="edit-send">
                        {sendVerNumberVisible ? <span className="edit-send-title"
                            onClick={()=>this.props.verifyPhoneStore.sendVerNumberRequest()}>发送验证码</span>
                        : <span className="edit-send-time">{currentTime}s后重发</span>}
                    </div>
                </div>
                <div className="verifyphoneconter-main-sub">
                    <div
                        onClick={this.getInputPhoneHandle.bind(this)}
                        className={`sub-but${this.state.butDisplay ? '':' sub-butdisplay'}`}>确认</div>
                </div>
            </div>
        </div>
    }
}

// 话费充值
export default class VerifyPhoneWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <VerifyPhoneConterWrap/>
            </I18nProvider>
        </Provider>
    }
}

