import React, { Component } from "react"
import Loadable from 'react-loadable'
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { Provider,observer,inject } from 'mobx-react'


import I18nProvider from './../../../library/components/i18n_provider/index'
import Header from './../../../library/components/header/index'

import history from './../../../library/history/index'

import stores from "./stores"

import './index.scss'

// 内容主页
@inject('pageinitStore')
@inject('protocolStore')
@observer
class ProtocolWarp extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render(){
        return <div className="protocol-wrap">
            <div className="protocol-header">
                <Header
                    leftDoms={[
                        <div className="header-left" onClick={()=>{history.go(-1)}}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">手机营业厅服务协议</span>
                    ]}
                />
            </div>
            <div className="protocol-banner">手机营业厅服务协议</div>
            <div className="protocol-table">
                <div className="table-item">
                    <h3 className="item-h3">第一条 总则</h3>
                    <p>《手机营业厅服务协议》（以下简称“本协议”）由支付宝（中国）网络技术有限公司（以下简称“支付宝”或“本公司”）与您所订立的有效合约。您通过点击确认本协议或以其他方式选择接受本协议，即表示您已与支付宝达成协议并同意接受本协议的全部约定内容。
                        在接受本协议之前，请您仔细阅读本协议的全部内容（特别是以粗体下划线标注的内容 ）。如您不同意接受本协议的任意内容，或者无法准确理解相关条款含义的，请不要进行后续操作。如果您对本协议的条款有疑问的，请通过支付宝客服渠道进行询问，支付宝将向您解释条款内容。
                        您同意，本公司有权随时对本协议内容进行单方面的变更，并以在www.alipay.com网站公告的方式提前予以公布，无需另行单独通知您；若您在本协议内容公告变更生效后继续使用本服务的，表示您已充分阅读、理解并接受变更后的协议内容，也将遵循变更后的协议内容使用本服务；若您不同意变更后的协议内容，您应在变更生效前停止使用本服务。
                        手机营业厅服务：指您通过支付宝钱包签约开通该服务后，您可以查询您的话费余额、套餐用量等详细信息，也可以通过手机营业厅进行话费、流量等充值服务。
                    </p>
                </div>
                <div className="table-item">
                    <h3 className="item-h3">第二条 用户的权利义务</h3>
                    <p>
                        （一）您可以通过支付宝钱包开通本服务，具体开通的规则以页面提示为准。您确认在使用本服务的意思表示出自其真实意愿；同时您对使用本服务过程中发出的指令的真实性及有效性承担全部责任，该指令不可变更或撤销。您承诺，支付宝依照您的指令进行操作的一切风险均由您承担。
                        （二）为使您更方便地管理您的手机号相关信息，您开通本服务后，即授权支付宝可向对应的运营商查询您的手机余额、账单、套餐使用情况等信息，并向您进行展示。
                        （三）您承诺开通本服务的手机号为本人合法持有的手机号，不得使用他人手机号开通本服务，否则因此产生的投诉或纠纷，均由您承担相应的责任。给支付宝造成损失的，您需承担相应的赔偿责任。
                        （四）您可以通过本服务进行手机号话费、流量等充值，具体以页面提示为准，您理解，支付宝仅提供支付环节的服务，因充值服务产生的争议或纠纷由您与充值服务提供商协商解决，支付宝不介入处理。
                        （五）您对本服务如有疑问、建议或意见时，可拨打支付宝客服电话：95188（海外用户拨打：+86 571 95188）或登录支付宝网站进行咨询和投诉。
                    </p>
                </div>
                <div className="table-item">
                    <h3 className="item-h3">第三条 支付宝的权利、义务</h3>
                    <p>
                        （一）支付宝有义务在技术上确保自身系统的安全、有效、正常运行，保证您正常使用本服务。
                        （二）支付宝有义务保障您的信息安全，并按照隐私权规则保护您的个人信息。
                        （三）除本协议另有规定外，支付宝在提前邮件通知您或在网站公告的情况下，可以单方面终止向您提供本服务，并不承担任何赔偿责任。支付宝在终止提供本服务后，若发现您之前存在违法或违反本协议目的的使用行为，给支付宝造成损失的，则支付宝仍可据此要求您承担相应赔偿责任并保留通过司法途径予以解决的权利。
                        （四）支付宝负责向您提供本服务相关咨询服务，并在支付宝网站公布功能介绍、使用规则等内容。
                    </p>
                </div>
                <div className="table-item">
                    <h3 className="item-h3">第四条、法律适用及争议解决</h3>
                    <p>
                        您同意，本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，没有相关法律规定的，参照通用国际商业惯例和（或）行业惯例。因本协议产生之争议，均应依照中华人民共和国法律予以处理，并由被告住所地人民法院管辖 。
                        本协议部分内容被有管辖权的法院认定为违法或无效的，不因此影响其他内容的效力。
                        本协议属于《支付宝服务协议》不可分割的一部分，本协议与《支付宝服务协议》的约定不一致的，以本协议为准；本协议未约定事宜，均以支付宝不时公布的《支付宝服务协议》及相关附属规则为补充。
                    </p>
                </div>
            </div>
        </div>
    }
}

// 查询余额
export default class RechargeWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <ProtocolWarp/>
            </I18nProvider>
        </Provider>
    }
}