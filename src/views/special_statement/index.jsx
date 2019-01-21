import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider,inject } from 'mobx-react'

import * as request from './../../library/request/index'
import * as tools from "../../library/tools"

import pageinitStore from './../../stores/pageinit' // 页面初始化Load

import PhoneToastr from './../../library/components/phone_toastr/index'
import Pageinit from './../../library/components/pageinit/index' // 页面初始化


import './index.scss'

const stores = {
    pageinitStore,
}

// 富文本-特殊声明数据
@inject('pageinitStore')
class SpecialStatementWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            innerHTMLState: '',
        }
    }

    componentWillMount() {
        tools.setCookies('lang', tools.getUrlParam('lang')); 
        this.props.pageinitStore.initState(
            ['sendShareSystemParticularlyReqeust',],
            ['sendShareSystemParticularlyReqeust',],
        )
        this.sendShareSystemParticularlyReqeust()
    }
    sendShareSystemParticularlyReqeust() { // 获取特殊声明数据
        this.props.pageinitStore.decreaseStep('sendShareSystemParticularlyReqeust')
        request.sendRequest({
            url: request.map_route_api.API_Share_System_Particularly,
            success_function: (resulte) => {
                this.setState({
                    innerHTMLState: resulte.data.particularly,
                })

                this.props.pageinitStore.increaseStep('sendShareSystemParticularlyReqeust')
            },
            error_function: (resulte={}) => {
                new PhoneToastr().error(resulte.message)
                this.props.pageinitStore.increaseStep('sendShareSystemParticularlyReqeust')
            }
        })
    }
    render() {
        return <div className="specialstatement-wrap">
            <div className="specialstatement-info" dangerouslySetInnerHTML={{__html: this.state.innerHTMLState}}>
            </div>
            <Pageinit/>
        </div>
    }
}

ReactDOM.render(<Provider {...stores}>
    <SpecialStatementWrap/>
</Provider>,document.getElementById('istore-app'))