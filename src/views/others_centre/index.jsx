/**
 * Revised by peter on 2018/05/04.
 */

'use strict'
import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider,observer,inject } from 'mobx-react'
import { FormattedMessage, FormattedTime, FormattedNumber } from 'react-intl'

import * as tools from './../../library/tools/index'

import Pageinit from './../../library/components/pageinit/index' // 页面初始化
import Header from './../../library/components/header/index' // 头部
import I18nProvider from './../../library/components/i18n_provider/index'
import OpenAppFooterWrap from './../../library/components/open_app_footer/index' // 打开app底部

import './index.scss'

import stores from './stores'

// OtherscentreFunctionWrap 用户展示列表
@inject('pageinitStore',)
@observer
class OtherscentreFunctionWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otherscentrefunctionList: [
                {
                    img: require('./../../images/others_centre/post.png'),
                    key: 'Ta的作品',
                    val: 'works'
                },
                {
                    img: require('./../../images/others_centre/private_message.png'),
                    key: '私信',
                    val: 'private'
                },
                {
                    img: require('./../../images/others_centre/money.png'),
                    key: '打赏',
                    val: 'playTour'
                },
                {
                    img: require('./../../images/others_centre/more.png'),
                    key: '更多',
                    val: 'more'
                },
            ]
        }   
    }
    render() {
        const { formatMessage } = this.props.pageinitStore.intl

        return <div className="otherscentrefunction-wrap">
            {this.state.otherscentrefunctionList.map((item, index) => {
                return <div className="otherscentrefunction-item" key={index} onClick={tools.clickToAppHandle}>
                    <div className="item-content">
                        <div className="item-content-tag"
                            style={{backgroundImage: `url(${item.img})`}}
                        ></div>
                        <span className="item-content-txt">
                            {formatMessage({id: item.key})}
                        </span>
                    </div>
                    <div className={"item-more"}></div>
                </div>
            })}
        </div>
    }
}

@inject('poseDetailsStore')
@observer
// OtherscentreUserWrap 头部用户基本资料
class OtherscentreUserWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let userMap = (this.props.poseDetailsStore.pronDetaiInfo 
                && this.props.poseDetailsStore.pronDetaiInfo.userMap) ? this.props.poseDetailsStore.pronDetaiInfo.userMap : {}
        let userDataMap = (this.props.poseDetailsStore.pronDetaiInfo 
            && this.props.poseDetailsStore.pronDetaiInfo.userDataMap) ? this.props.poseDetailsStore.pronDetaiInfo.userDataMap : {}

        return <div className="otherscentreuser-wrap">
            <div className="otherscentreuser-info">
                <div className="info-user">
                    <div className="user-img" onClick={tools.clickToAppHandle}>
                        <div 
                            style={{backgroundImage: 'url('+userMap.headImgUrl+')'}}
                            className="user-img-containers"> 
                        </div>
                        {Number(userMap.identityType) === 1?<div className="user-img-verify">
                        </div>:null}
                    </div>
                    <div className="user-data">
                        <div className="user-data-name">
                        {userMap.nickname} {userDataMap.level?<span>[{userDataMap.level}]</span>:null}
                        </div>
                        <div className="user-data-external">
                            <div className="external-item">
                                <FormattedMessage id="关注"/>：{userDataMap.myFollows}
                            </div>
                            <span className="external-info">|</span>
                            <div className="external-item">
                                <FormattedMessage id="粉丝"/>: {userDataMap.myFans}
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="info-attention" onClick={tools.clickToAppHandle}>
                    +<FormattedMessage id={userDataMap.isAttention?'已关注':'关注'}/>
                </div>
            </div>
            <div className="otherscentreuser-intro">{userMap.signature}</div>  
        </div>    
    }
}

// ta人主页
@inject('pageinitStore', 'poseDetailsStore')
@observer
class OthersCentreWrap extends Component {
    constructor(props) {
        super(props)

        this.props.pageinitStore.initState(
            ['sendGetUserPronDetaiReqeust',],
            ['sendGetUserPronDetaiReqeust',],
        )

        tools.changeDocumentTitleHandle('others_centre', props.pageinitStore.intl.locale)
    }
    componentWillMount() {
        let pronId = tools.getUrlParam('pronId')
        this.props.poseDetailsStore.sendGetUserPronDetaiReqeust(pronId)
    }
    render() {
        const { formatMessage } = this.props.pageinitStore.intl

        return <div className="otherscentre-wrap">
            <div className="otherscentre-header">
                <Header
                    leftDoms={[
                        <div className="header-img1"
                             onClick={tools.clickToAppHandle}
                             style={{backgroundImage: `url(${require('./../../images/component/nav_left2.png')})`}}>
                        </div>,
                        <span  onClick={tools.clickToAppHandle}>{formatMessage({id: '返回'})}</span>,
                        <span  onClick={tools.clickToAppHandle}>{formatMessage({id: '首页'})}</span>,
                    ]}
                    rightDoms={[
                    <FormattedMessage id="分享"/>,
                        <div className="header-img1"
                             onClick={tools.clickToAppHandle}
                             style={{backgroundImage: `url(${require('./../../images/component/header_share.png')})`}}>
                        </div>,]}
                />  
            </div>
            <div className="otherscentre-user">
                <OtherscentreUserWrap/>
            </div>
            <div className="otherscentre-footer">
                <OpenAppFooterWrap/>
            </div>
            <div className="otherscentre-function">
                <OtherscentreFunctionWrap/>
            </div>
            <Pageinit/>
        </div> 
    }
}

ReactDOM.render(<Provider {...stores}>
    <I18nProvider>
        <OthersCentreWrap/>
    </I18nProvider>
</Provider>, document.getElementById('istore-app'))