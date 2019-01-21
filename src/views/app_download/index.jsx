import React, { Component } from "react"
import ReactDOM from "react-dom"
import stores from "../talk_details/stores"
import { Provider,observer,inject } from 'mobx-react'
import { FormattedMessage, } from 'react-intl'
import config from './../../../config/index'

import I18nProvider from './../../library/components/i18n_provider/index'

import './index.scss'
import * as tools from "../../library/tools"

@inject('pageinitStore')
@observer
class AppDownloadWrap extends Component {
    constructor(props) {
        super(props)

        tools.changeDocumentTitleHandle('app_download', props.pageinitStore.intl.locale)
    }
    render() {
        const {locale} = this.props.pageinitStore.intl

        return <div className="appdownload-wrap">
            <div className="appdownload-bg">
                <div className="appdownload-bg-logo"></div>
            </div>
            <div className="appdownload-main">
                <div className="appdownload-main-title">
                    <FormattedMessage id="推荐使用手机App,请选择下载"/>
                </div>
                <div className="appdownload-main-href">
                    <a href={config.iosStore}>
                        <div className={'main-href-target'}
                             style={{backgroundImage: `url(${require(`./../../images/${locale === 'zh'? '': locale+'/'}component/download_iphone.png`)})`}}
                        ></div>
                    </a>
                </div>
                <div className="appdownload-main-href">
                    <a href={config.androidStore}>
                        <div className={'main-href-target'}
                             style={{backgroundImage: `url(${require(`./../../images/${locale === 'zh'? '': locale+'/'}component/download_android.png`)})`}}
                        ></div>
                    </a>
                </div>
            </div>
            <div className="appdownload-footer">
                <div className="appdownload-footer-info">
                    <FormattedMessage id="爱士多智能无人便利店"/>
                </div>
                <div className="appdownload-footer-info">
                    <FormattedMessage id="版权所有：2017-2018 © 爱士多"/>
                </div>
            </div>
        </div>
    }
}


ReactDOM.render(<Provider {...stores}>
        <I18nProvider>
            <AppDownloadWrap/>
        </I18nProvider>
    </Provider>,
    document.getElementById('istore-app'))