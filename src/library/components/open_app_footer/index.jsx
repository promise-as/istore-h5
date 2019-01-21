import React, { Component } from "react"

import { FormattedMessage } from 'react-intl'
import * as tools from '../../tools'

import './index.scss'

// 打开下载app公共底部栏
class OpenAppFooterWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="openappfooter-wrap" onClick={tools.clickToAppHandle}>
            <div className="openappfooter-imgage">
            </div>
            <div className="openappfooter-text">
                <FormattedMessage id={'快来加入，爱士多智能中心'}/>
            </div>
            <div className="openappfooter-button"><FormattedMessage id={'打开'}/></div>
        </div>
    }
}

export default OpenAppFooterWrap