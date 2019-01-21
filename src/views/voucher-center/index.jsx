import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
    Router,
    Route,
    withRouter,
} from 'react-router-dom'
import Loadable from 'react-loadable'

import history from './../../library/history/index'
import * as tools from './../../library/tools/index'

// 异步渲染封装
const LoadableRechArgeWrap = Loadable({ // 话费充值
    loader: () => import('./recharge/index'),
    loading: () => null,
})
const LoadableFlowRechArgeWrap = Loadable({ // 流量充值
    loader: () => import('./flow-recharge/index'),
    loading: () => null,
})
const LoadablePayBillWrap = Loadable({ // 手机充值账单
    loader: () => import('./pay-bill/index'),
    loading: () => null,
})
const AffirmPaymentWrap = Loadable({ // 确认付款
    loader: () => import('./affirm-payment/index'),
    loading: () => null,
})
const LoadableBillDetailsWrap = Loadable({ // 账单详情
    loader: () => import('./bill-details/index'),
    loading: () => null,
})
const LoadablePaySucceedWrap = Loadable({ // 充值成功
    loader: () => import('./pay-succeed/index'),
    loading: () => null,
})
const LoadableDealingsRecordWrap = Loadable({ // 来往记录
    loader: () => import('./dealings-record/index'),
    loading: () => null,
})
const LoadableLableRemarkWrap = Loadable({ // 标签和备注
    loader: () => import('./label-remark/index'),
    loading: () => null,
})
const LoadableQueryBalanceWrap = Loadable({ // 查询余额
    loader: () => import('./query-balance/index'),
    loading: () => null,
})
const LoadableAddMobileWrap = Loadable({ // 添加号码
    loader: () => import('./add-mobile/index'),
    loading: () => null,
})
const LoadableBusinessOfficeWrap = Loadable({ // 手机营业厅
    loader: () => import('./business-office/index'),
    loading: () => null,
})
const LoadableProtocolWrap = Loadable({ // 手机营业厅服务协议
    loader: () => import('./protocol/index'),
    loading: () => null,
})
const LoadableVerifyPhoneWrap = Loadable({ // 验证手机号
    loader: () => import('./verify-phone/index'),
    loading: () => null,
})
const LoadableSelectPhoneWrap = Loadable({ // 选择手机号码
    loader: () => import('./select-phone/index'),
    loading: () => null,
})

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount(){
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){tools.setGlobalBridge()}
    }

    render() {
        return <div>
                <Route exact path="/" component={LoadableRechArgeWrap}/>
                <Route path="/flow-recharge" component={LoadableFlowRechArgeWrap}/>
                <Route path="/affirm-payment" component={AffirmPaymentWrap}/>
                <Route path="/pay-bill" component={LoadablePayBillWrap}/>
                <Route path="/bill-details" component={LoadableBillDetailsWrap}/>
                <Route path="/pay-succeed" component={LoadablePaySucceedWrap}/>
                <Route path="/dealings-record" component={LoadableDealingsRecordWrap}/>
                <Route path="/label-remark" component={LoadableLableRemarkWrap}/>
                <Route path="/query-balance" component={LoadableQueryBalanceWrap}/>
                <Route path="/add-mobile" component={LoadableAddMobileWrap}/>
                <Route path="/business-office" component={LoadableBusinessOfficeWrap}/>
                <Route path="/protocol" component={LoadableProtocolWrap}/>
                <Route path="/verify-phone" component={LoadableVerifyPhoneWrap}/>
                <Route path="/select-phone" component={LoadableSelectPhoneWrap}/>
        </div>
    }
}

const WithRouterComponent = withRouter(App)

class VoucherCenterWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Router  history={history}>
            <WithRouterComponent/>
        </Router>
    }
}

ReactDOM.render(<VoucherCenterWrap/>,
    document.getElementById('istore-app'))