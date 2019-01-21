import React, { Component } from "react"
import ReactDOM from "react-dom"
import stores from "../talk_details/stores"
import { Provider,observer,inject } from 'mobx-react'

import * as request from './../../library/request/index'

import I18nProvider from './../../library/components/i18n_provider/index'

import './index.scss'
import * as tools from "../../library/tools"

// 红包分享
@inject('pageinitStore')
@observer
class RedEnvelopeShareWrap extends Component {
    constructor(props) {
        super(props)

        tools.changeDocumentTitleHandle('red_envelope_share', props.pageinitStore.intl.locale)
    }
    render() {
        let lang = tools.conversionLangHandle(this.props.pageinitStore.intl.locale)

        return <div className="redenvelopeshare-wrap">
            <img className="redenvelopeshare-wrap-img" src={
                request.map_route_api.API_GET_GetStaticImage +
                `/share-android${
                    lang === 'cn'? '':'-en'
                    }.jpg`
            } alt=""/>
        </div>
    }
}


ReactDOM.render(<Provider {...stores}>
    <I18nProvider>
            <RedEnvelopeShareWrap/>
    </I18nProvider>
</Provider>,
    document.getElementById('istore-app'))