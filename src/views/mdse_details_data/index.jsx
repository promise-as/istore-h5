import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider,observer,inject } from 'mobx-react'

import I18nProvider from './../../library/components/i18n_provider/index'
import pageinitStore from './../../stores/pageinit' // 页面初始化Load
import PhoneToastr from './../../library/components/phone_toastr/index'
import Pageinit from './../../library/components/pageinit/index' // 页面初始化
import Nodata from './../../library/components/nodata/index' // 页面初始化

import * as request from './../../library/request/index'
import * as tools from "../../library/tools"

import './index.scss'

const stores = {
    pageinitStore,
}

// 商品详情-富文本内容
@inject('pageinitStore')
@observer
class MdseDetailsDataWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            innerHTMLState: '',
        }
    }

    componentWillMount() {
        this.goodsId = tools.getUrlParam('goodsId')
        let lang = (tools.getUrlParam('lang').indexOf('en') > -1 ? 'en':'zh')

        this.props.pageinitStore.setI18nMessagesInfoHandle(lang)
        this.props.pageinitStore.initState(
            ['sendShareMallGoodsDetailReqeust',],
            ['sendShareMallGoodsDetailReqeust',],
        )
        this.sendShareMallGoodsDetailReqeust()
    }
    sendShareMallGoodsDetailReqeust() { // 获取商品详情
        this.props.pageinitStore.decreaseStep('sendShareMallGoodsDetailReqeust')

        request.sendRequest({
            url: request.map_route_api.API_Share_Mall_Goods_Detail,
            params: {
                goodsId: this.goodsId,
            },
            success_function: (resulte) => {
                this.setState({
                    innerHTMLState: resulte.data.detail,
                })

                this.props.pageinitStore.increaseStep('sendShareMallGoodsDetailReqeust')
            },
            error_function: (resulte={}) => {
                new PhoneToastr().error(resulte.message)
                this.props.pageinitStore.increaseStep('sendShareMallGoodsDetailReqeust')
            }
        })
    }
    render() {
        return <div className="mdsedetailsdata-wrap">
            {this.state.innerHTMLState?<div className="mdsedetailsdata-info" dangerouslySetInnerHTML={{__html: this.state.innerHTMLState}}>
            </div>:<Nodata/>}
            <Pageinit/>
        </div>
    }
}

ReactDOM.render(<Provider {...stores}>
    <I18nProvider>
        <MdseDetailsDataWrap/>
    </I18nProvider>
</Provider>,document.getElementById('istore-app'))