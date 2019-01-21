import React, { Component } from "react"
import ReactDOM from "react-dom"
import stores from "./stores"
import { Provider,observer,inject } from 'mobx-react'

import * as request from './../../library/request/index'

import I18nProvider from './../../library/components/i18n_provider/index'

import './index.scss'
import * as tools from "../../library/tools"

@inject('pageinitStore')
@observer
class HelpWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            staticPaths: {
                1: {
                    zh: '/rule/aboutus1.jpg',
                    en: '/rule/aboutus1_en.jpg',
                    title: 'About Us',
                },
                2: {
                    zh: '/rule/opt_post2.jpg',
                    en: '/rule/opt_post2_en.jpg',
                    title: 'How does the article get into the essence',
                },
                3: {
                    zh: '/rule/gold3.jpg',
                    en: '/rule/gold3_en.jpg',
                    title: 'Rules of gold COINS',
                },
                4: {
                    zh: '/rule/integral4.jpg',
                    en: '/rule/integral4_en.jpg',
                    title: 'Integral rules',
                },
                5: {
                    zh: '/rule/sen_post5.jpg',
                    en: '/rule/sen_post5_en.jpg',
                    title: 'Publish an article course',
                },
                6: {
                    zh: '/rule/user_protocol6.jpg',
                    en: '/rule/user_protocol6_en.jpg',
                    title: 'User agreement',
                },
                7: {
                    zh: '/rule/get_out7.jpg',
                    en: '/rule/get_out7_en.jpg',
                    title: 'Illegal instructions',
                },
                8: {
                    zh: '/rule/aboutus1.jpg',
                    en: '/rule/aboutus1_en.jpg',
                    title: 'About Us',
                },
                9: {
                    zh: '/rule/wallet_user_agreement.jpg',
                    en: '/rule/wallet_user_agreement_en.jpg',
                    title: 'Istore wallet user agreement',
                },
                10: {
                    zh: '/rule/wallet_operation_manual.jpg',
                    en: '/rule/wallet_operation_manual_en.jpg',
                    title: 'Wallet operation manual',
                },
                11: {
                    zh: '/red.jpg',
                    en: '/red-en.jpg',
                    title: 'A red envelope rules',
                },
            },
        }

        let lang = HelpWrap.getTransitionLan(tools.getUrlParam('lang'))

        props.pageinitStore.setI18nMessagesInfoHandle(( lang.indexOf('en') > -1 ? 'en':'zh' ))
    }
    static getTransitionLan(lan) {
        switch (lan) {
            case 'zh-Hans':
                return 'zh'
            case 'zh-Hans-CN':
                return 'zh'
            case 'cn':
                return 'zh'
            default:
                return lan
        }
    }

    render() {
        let type = tools.getUrlParam('type')
        let lang = this.props.pageinitStore.intl.locale

        tools.changeDocumentTitleHandle(this.state.staticPaths[type].title, this.props.pageinitStore.intl.locale)

        return <div className="help-wrap">
            <img className="help-wrap-img" src={
                request.map_route_api.API_GET_GetStaticImage + this.state.staticPaths[type][lang]} alt=""/>
        </div>
    }
}


ReactDOM.render(<Provider {...stores}>
    <I18nProvider>
            <HelpWrap/>
    </I18nProvider>
</Provider>,
    document.getElementById('istore-app'))