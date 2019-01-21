import React, { Component } from "react"
import ReactDOM from "react-dom"
import {FormattedMessage} from 'react-intl'
import { Provider, } from 'mobx-react'

import I18nProvider from './../../library/components/i18n_provider/index'

import stores from "./stores"
import './index.scss'

class ErrorWrap extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (<div className="error-wrap">
            <div className="error-bg"></div>
            <div className="error-title">
                <FormattedMessage id="Oh，抱歉！" />
            </div>
            <div className="error-subtitle">
                <FormattedMessage id="您访问的页面已经走丢了" />
            </div>
    </div>)
    }
}


ReactDOM.render(<Provider {...stores}>
    <I18nProvider>
        <ErrorWrap/>
    </I18nProvider>
</Provider>,
document.getElementById('istore-app'))


  
