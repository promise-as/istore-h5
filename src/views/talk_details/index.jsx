import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider,observer,inject } from 'mobx-react'
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'

import * as tools from './../../library/tools/index'

import stores from './stores'

import Pageinit from './../../library/components/pageinit/index' // 页面初始化
import FileTailorListWrap from '../../library/components/file_tailor_list/index' // 裁剪特性图片
import UserMssageList from './../../library/components/user_mssage_list/index' // 用户留言列表
import OpenAppFooterWrap from './../../library/components/open_app_footer/index' // 打开app底部
import I18nProvider from './../../library/components/i18n_provider/index'

import './index.scss'

// TalkDetailsMainMsgWrap (说说评论列表)
@inject('talkDetailsStore')
@observer
class TalkDetailsMainMsgWrap extends Component {
	constructor(props) {
		super(props)
	}
	render() {
	    let commentList = this.props.talkDetailsStore.talkDetailsInfo.commentList || []
		return <div className="talkdetailsmainmsg-wrap">
			<UserMssageList commentList={commentList.splice('')}/>
        </div>
    }
}

// TalkDetailsMainContentInfoOperation(主干内容操作)
@inject('talkDetailsStore')
@observer
class TalkDetailsMainContentInfoOperationWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let linkNumCount = 0
        if (this.props.talkDetailsStore.talkDetailsInfo&&this.props.talkDetailsStore.talkDetailsInfo.rewardMap
        &&this.props.talkDetailsStore.talkDetailsInfo.rewardMap.linkAndReward
        &&this.props.talkDetailsStore.talkDetailsInfo.rewardMap.linkAndReward.linkNumCount) {
            linkNumCount = this.props.talkDetailsStore.talkDetailsInfo.rewardMap.linkAndReward.linkNumCount
        }

        return <div className="talkdetailsmaincontentinfooperation-wrap">
            <div className="talkdetailsmaincontentinfooperation-item" onClick={tools.clickToAppHandle}>
                <div className="item-img"
                    style={{backgroundImage: `url(${require('./../../images/component/like.png')})`}}
                >
                </div>
                <div className='item-text'>{linkNumCount}</div>
            </div>
        </div>
    }
}

// TalkDetailsMainContentInfoWrap(主干内容信息)
@inject('talkDetailsStore')
@observer
class TalkDetailsMainContentInfoWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (!this.props.talkDetailsStore.talkDetailsInfo.contentList) {
            return null
        }
        let contentList = this.props.talkDetailsStore.talkDetailsInfo.contentList
        let baseMap = this.props.talkDetailsStore.talkDetailsInfo.baseMap

        return <div className="talkdetailsmaincontentinfo-wrap">
                <div className="talkdetailsmaincontentinfo-text" dangerouslySetInnerHTML={{__html: baseMap.title.replace(/\n/g, "<br/>")}}>
                </div>
                <div className="talkdetailsmaincontentinfo-list">
	                <FileTailorListWrap
		                fileList={contentList.splice('')}
	                />
                </div>
                {baseMap.position && baseMap.position.address ? <div onClick={tools.clickToAppHandle} className="talkdetailsmaincontentinfo-position">
                    {baseMap.position.address}
                </div>:null}

        </div>
    }
}
// TalkDetailsMainContentWrap(主干内容)
function TalkDetailsMainContentWrap () {
    return <div className="talkdetailsmaincontent-wrap">
        <div className="talkdetailsmaincontent-info">
            <TalkDetailsMainContentInfoWrap/>  
        </div>
        <div className="talkdetailsmaincontentinfo-operation">
            <TalkDetailsMainContentInfoOperationWrap/>
        </div>
    </div>   
}

// TalkDetailsMainHeaderWrap(主干头部)
@inject('talkDetailsStore')
@observer
class TalkDetailsMainHeaderWrap extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        if (!this.props.talkDetailsStore.talkDetailsInfo.baseMap) {
            return null
        }
        let baseMap = this.props.talkDetailsStore.talkDetailsInfo.baseMap

        return <div className='talkdetailsmainheader-wrap'>
        <div className='talkdetailsmainheader-user'>
            <div className='user-base-images'
                onClick={tools.clickToAppHandle}
                style={{backgroundImage: 'url(' +baseMap.headImgUrl + ')'}}>
            </div>
            <div className='user-base-info'>
                <div className='base-info-text' onClick={tools.clickToAppHandle}>
                    <div className='base-info-name'>{baseMap.nickname}</div>
                    {baseMap.identityType ? <img className='base-info-verify' src={require('./../../images/component/verify.png')} alt=''/>: null}
                </div>
                <div className='base-info-time'>
                    <FormattedDate
                        value={new Date(baseMap.releaseTime)}
                        year='numeric'
                        month='long'
                        day='numeric'
                        hour='numeric'
                        minute='numeric'
                    />
                </div>
            </div>
        </div>
        {baseMap.isAttention === 0?<div onClick={tools.clickToAppHandle} className='talkdetailsmainheader-concern'>
                +<FormattedMessage id="关注"/>
            </div>
        :<div onClick={tools.clickToAppHandle} className='talkdetailsmainheader-concern'>
                <FormattedMessage id="已关注"/>
            </div>}
    </div>
    }
}

// TalkDetailsMainWrap(主干)
class TalkDetailsMainWrap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="talkdetailsmain-wrap">
            <div className="talkdetailsmain-header">
                <TalkDetailsMainHeaderWrap/>
            </div>
            <div className="talkdetailsmain-center">
                <TalkDetailsMainContentWrap/>
            </div>
	        <div className="talkdetailsmain-msg">
		        <TalkDetailsMainMsgWrap/>
	        </div>
        </div>
    }
}

// TalkDetailsWrap 微说详情
@inject('pageinitStore', 'talkDetailsStore')
@observer
class TalkDetailsWrap extends Component {
    constructor(props) {
        super(props)

        this.props.pageinitStore.initState(
            ['sendUserTalkGetTalkDetailByIdReqeust',],
            ['sendUserTalkGetTalkDetailByIdReqeust',],
        )
        tools.changeDocumentTitleHandle('talk_details', props.pageinitStore.intl.locale)
    }
    componentWillMount() {
        let talkId = tools.getUrlParam('talkId')
        this.props.talkDetailsStore.sendUserTalkGetTalkDetailByIdReqeust(talkId)
    }
    render() {
        return (<div className="talkdetails">
        {/*<div className="talkdetails-header">*/}
            {/*<Header*/}
                {/*leftDoms={[*/}
                    {/*<div className="header-img1"*/}
                         {/*onClick={tools.clickToAppHandle}*/}
                         {/*style={{backgroundImage: `url(${require('./../../images/component/nav_left2.png')})`}}>*/}
                    {/*</div>*/}
                {/*]}*/}
                {/*centerDoms={[<FormattedMessage id="微说详情"/>,]}*/}
                {/*rightDoms={[*/}
                    {/*<div className="header-img1"*/}
                         {/*onClick={tools.clickToAppHandle}*/}
                         {/*style={{backgroundImage: `url(${require('./../../images/component/collect.png')})`}}>*/}
                    {/*</div>,*/}
                    {/*<div className="header-img1"*/}
                         {/*onClick={tools.clickToAppHandle}*/}
                         {/*style={{backgroundImage: `url(${require('./../../images/component/more.png')})`}}>*/}
                    {/*</div>,]}*/}
            {/*/>  */}
        {/*</div>*/}
        {/*<div className="talkdetails-make">*/}
            {/*<MakeCommentsOnWrap/>*/}
        {/*</div>*/}
        <div className="talkdetails-main">
            <TalkDetailsMainWrap/>   
        </div>
        <div className="talkdetails-footer">
            <OpenAppFooterWrap/>
        </div>
        <Pageinit/>
    </div>)

    }
}

ReactDOM.render(<Provider {...stores}>
    <I18nProvider>
        <TalkDetailsWrap/>
    </I18nProvider>
</Provider>,
    document.getElementById('istore-app'))