
import React, { Component } from 'react'
import { observer,inject } from 'mobx-react'
import {addLocaleData, IntlProvider, injectIntl} from 'react-intl'
import PropTypes from 'prop-types'

import * as tools from './../../tools/index'

import zhCN from './lang/zh'
import enUS from './lang/en'

addLocaleData([...zhCN.data, ...enUS.data]) // 添加语言环境

// 手动控制显示语言
// en zh
// let currentLan = 'zh'
// let clientLan = currentLan || tools.getClientLang()

// 获取客户端语言
let clientLan = ( (tools.getClientLang()).indexOf('zh') >= 0 ? 'zh' : 'en' )

@inject('pageinitStore',)
@observer
class ChildreWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    static getDerivedStateFromProps(props) {
        // 将intl对象注入到store
        if (props.intl) {
            props.pageinitStore.setIntlHandle(props.intl)
        }
        return {}
    }
    render() {
        return <div>
            {this.props.refDom}
        </div>
    }
}
ChildreWrap.propTypes = {
    refDom: PropTypes.element,
    intl: PropTypes.object,
}

const InjectIntlChildreWrap = injectIntl(ChildreWrap)

@inject('pageinitStore',)
@observer
class I18nProviderWrap extends Component {
    constructor(props) {
        super(props)

        props.pageinitStore.setI18nMessagesInfoHandle(clientLan)
    }
    componentWillMount() {
        // Intl 不支持则异步加载intl包对象
        if (!window.Intl) {
            window.Intl = {}
            require.ensure([
                'intl',
            ], (require) => {
                window.Intl = require('intl')
            })
        }
    }
    componentDidCatch(error, info) {
        console.log(error, info)
    }
    render() {
        let {i18nMessagesInfo} = this.props.pageinitStore

        return <IntlProvider
                locale={i18nMessagesInfo.default.locale} // 当前语言
                formats={i18nMessagesInfo.default.formats} // 语言格式化配置
                messages={i18nMessagesInfo.default.messages} // 语言包语言数据
                >
            <InjectIntlChildreWrap refDom={this.props.children}/>
        </IntlProvider>
    }
}

export default I18nProviderWrap