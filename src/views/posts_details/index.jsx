import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import { Provider,observer,inject } from 'mobx-react'
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'

import * as tools from './../../library/tools/index'

import * as request from './../../library/request/index'

import stores from './stores'

import Toastr from './../../library/components/toastr/index' // 状态码
import Pageinit from './../../library/components/pageinit/index' // 页面初始化
import Nodata from './../../library/components/nodata/index' // 没有数据状态
// import Header from './../../library/components/header/index' // 头部
import ImageTailorSize from '../../library/components/image_tailor_size/index' // 裁剪图片
import OpenAppFooterWrap from './../../library/components/open_app_footer/index' // 打开app底部
import I18nProvider from './../../library/components/i18n_provider/index'

import UserMssageList from './../../library/components/user_mssage_list/index' // 用户列表

import './index.scss'

// PostsdetailsmainHonor(荣誉记录)
@inject('pageinitStore',)
@observer
class PostsdetailsmainHonor extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let intl = this.props.pageinitStore.intl

        return <div className='postsdetailsmainhonor-wrap'>
            <div className="postsdetailsmainhonor-header">
                <div className="header-block">
                    <div className="header-block-target"></div>
                    <span className="block-info">{intl.formatMessage({id: '荣誉记录'})}</span>
                </div>
            </div>
            <div className="postsdetailsmainhonor-list">
                {this.props.honorList.map((item, index) => {
                    if (item.honorType === 1) { // 帖子推荐到首页
                        return <div className="postsdetailsmainhonor-list-home" key={index}>
                        <div className="home-info">
                            {intl.formatMessage({id: '此贴入选'})}
                            <div className="home-info-jmp">
                                <div className="home-info-jmp-target"></div>
                                <span>{intl.formatMessage({id: '首页'})}</span>
                            </div>
                        </div>
                        <div className="home-harvest">
                            <div className="home-harvest-money">
                                {
                                    intl.formatMessage(
                                        {id: '+?金币',},
                                        {number: item.honorGold,})
                                }
                            </div>
                            <div className="home-harvest-minute">
                                {
                                    intl.formatMessage(
                                        {id: '+?分',},
                                        {number: item.honorIntegral,})
                                }
                            </div>
                        </div>
                    </div>
                    }
                    if (item.honorType === 0) { // 精华帖子
                        return <div className="postsdetailsmainhonor-list-home" key={index}>
                            <div className="home-info">
                                {intl.formatMessage({id: '此贴被设为精华帖'})}
                            </div>
                            <div className="home-harvest">
                                <div className="home-harvest-money">
                                    {
                                        intl.formatMessage(
                                            {id: '+?金币',},
                                            {number: item.honorGold,})
                                    }
                                </div>
                                <div className="home-harvest-minute">
                                    {
                                        intl.formatMessage(
                                            {id: '+?分',},
                                            {number: item.honorIntegral,})
                                    }
                                </div>
                            </div>
                        </div>
                    }
                })}
                {!this.props.honorList.length ? <Nodata/>:null}
            </div>
        </div>    
    }
}
PostsdetailsmainHonor.propTypes = {
    honorList: PropTypes.array,
}
PostsdetailsmainHonor.defaultProp = {
    honorList: [],
}

// PostsdetailsmainTyrantRanking(土豪排名榜)
@inject('pageinitStore',)
@observer
class PostsdetailsmainTyrantRanking extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let rewardMap = this.props.rewardMap || {}
        let tyrantList = rewardMap.tyrantList || []
        let sortList = []
        let gap = 0 // 至少3个，与最小数量相差多少
        const {formatMessage} = this.props.pageinitStore.intl

        if (tyrantList.length >= 1) {
            sortList = tyrantList.sort((a,b) => b.rewardCount - a.rewardCount)
        }
        if (sortList.length < 3) {
            gap = 3 - sortList.length

            for (let i =0; i < gap; i++) {
                sortList.push({
                    nickaName: formatMessage({id: '虚位以待'})
                })
            }
        }

        return <div className='postsdetailsmaintyrantranking-wrap'>
            <div className="postsdetailsmaintyrantranking-header">
                <div className="header-block">
                    <div className="header-block-img"></div>
                    <span className="block-info">{formatMessage({id: '土豪榜'})}</span>
                </div>
            </div>
            <div className="postsdetailsmaintyrantranking-list">
                {sortList.map((item, index) => {
                    return <div
                    className="postsdetailsmaintyrantranking-list-item"
                    onClick={tools.clickToAppHandle}
                    key={index}>
                    <div className="item-img">
                        <div className="item-img-bg">
                            <div
                                className="item-img-bg-logo"
                                style={{backgroundImage: 'url(' + require(`./../../images/tuhaobang-${index + 1}.png`) + ')'}}>
                            </div>
                            <div className="item-imag-bg-headerimg"
                            >
                                <div className="headerimg-target" style={{backgroundImage: `url(${item.headImg})`}}></div>
                                <div
                                    className="headerimg-reward-count"
                                    style={{
                                        backgroundImage:`url(${require(item.rewardCount ? './../../images/get-golg.png' :'./../../images/up-gold.png')})`
                                    }}
                                >
                                    <i className={'count-img'}></i>
                                    {item.rewardCount || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item-name">{item.nickaName}</div>
                </div>
                })}
            </div>
        </div>    
    }
}
PostsdetailsmainTyrantRanking.propTypes = {
    rewardMap: PropTypes.object,
}
PostsdetailsmainTyrantRanking.defaultProp = {
    rewardMap: () => {tyrantList: []},
}

// PostsdetailsmaincenterOperation(内容详情操作-'点赞/打赏')
@inject('pageinitStore',)
@observer
class PostsdetailsmaincenterOperation extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {formats, locale} = this.props.pageinitStore.intl

        return <div className='postsdetailsmaincenteroperation-wrap'>
            <div className="postsdetailsmaincenteroperation-item" onClick={tools.clickToAppHandle}>
                <div className="item-img">
                    <div className={'item-img-target'}
                        style={{backgroundImage: `url(${require('./../../images/component/like.png')})`}}
                    ></div>
                </div>
                <div className='item-text'>{this.props.rewardMap.linkAndReward.linkNumCount}</div>
            </div>
            <div className="postsdetailsmaincenteroperation-item" onClick={tools.clickToAppHandle}>
                <div className="item-img">
                    <div className={'item-img-target'}
                         style={{backgroundImage: `url(${require(`./../../images/${locale === 'zh'? '': locale+'/'}component/reward.png`)})`}}
                    ></div>
                </div>
                <div className='item-text'>
                    <FormattedNumber
                        value={this.props.rewardMap.linkAndReward.rewardAllCount}
                        style='currency'
                        currency={formats.money.currency}
                    />
                </div>
            </div>
        </div>  
    }
}
PostsdetailsmaincenterOperation.propTypes = {
    rewardMap: PropTypes.object,
}
PostsdetailsmaincenterOperation.defaultProp = {
    rewardMap: {linkNumCount: {},},
}

// PostsdetailsmaincenterDocList(内容详情列表)
class PostsdetailsmaincenterDocList extends Component {
    constructor(props) {
        super(props)
    }
    // 截取腾讯视频url的vid
    getVideoUrlHandl(url) {
        if(!url) return null

        if (url.indexOf('vid') > -1) {
            try {
                return url.split('vid=')[url.split('vid=').length - 1]
            } catch(err) {
                console.log(err)
            }
        } else {
            try {
                return url.split('/')[url.split('/').length-1].split('.html')[0]
            } catch(err) {
                console.log(err)
                return null
            }
        }
    }
    render () {
        return <div className='postsdetailsmaincenterdoclist-wrap'>
        {this.props.contentList.map((item, index) => {
            if (item.type === 0) {
                return <div className="postsdetailsmaincenterdoclist-text"
                            key={index}
                            dangerouslySetInnerHTML={{__html: item.formatContent}}>
                </div>
            }
            if (item.type === 1) {
                return <div className="postsdetailsmaincenterdoclist-img" 
                key={index}>
                <ImageTailorSize dataSrc={item.imgUrl}/>
                {item.formatContent?<div className="img-title" dangerouslySetInnerHTML={{__html: item.formatContent}}>
                </div>:null}
            </div>
            }
            if (item.type === 2) {
                return <div className="postsdetailsmaincenterdoclist-video" key={index}>
                    <iframe frameBorder="0" width="640" height="498"
                            src={`http://v.qq.com/txp/iframe/player.html?vid=${this.getVideoUrlHandl(item.videoUrl)}`}
                            allowFullScreen></iframe>
                </div>
            }
        })}
    </div>
    }
}
PostsdetailsmaincenterDocList.propTypes = {
    contentList: PropTypes.array,
}
PostsdetailsmaincenterDocList.defaultProp = {
    contentList: [],
}

// PostsdetailsmainCenter(帖子文章内容)
@inject('pageinitStore',)
@observer
class PostsdetailsmainCenter extends Component {
    constructor(props) {
        super(props)
    }
    render () {

        return <div className='postsdetailsmaincenter-wrap'>
        <div className="postsdetailsmaincenter-title">
            {this.props.baseMap.title}
        </div>
        <div className="postsdetailsmaincenter-subtitle">
            <span className="subtitle-info">
                {this.props.baseMap.circleNames}
             </span>
        </div>
        <div className="postsdetailsmaincenter-doc">
            {this.props.contentList.length ? <PostsdetailsmaincenterDocList
            contentList={this.props.contentList}/>
            : null}
            {/*<div className="doc-sub">*/}
                {/*[{*/}
                    {/*this.props.baseMap.releaseTime && formatMessage(*/}
                        {/*{id: '本帖于?·?·修改',},*/}
                        {/*{*/}
                            {/*time: formatRelative(Number(this.props.baseMap.releaseTime)),*/}
                            {/*name: this.props.baseMap.nickname,*/}
                        {/*})*/}
                {/*}]*/}
            {/*</div>*/}
        </div>
        <div className='postsdetailsmaincenter-operation'>
            <PostsdetailsmaincenterOperation rewardMap={this.props.rewardMap}/>   
        </div>    
    </div>
    }
}
PostsdetailsmainCenter.propTypes = {
    baseMap: PropTypes.object,
    contentList: PropTypes.array,
    rewardMap: PropTypes.object,
}
PostsdetailsmainCenter.defaultProp = {
    baseMap: {},
    contentList: [],
    rewardMap: {},
}

// PostsdetailsmainHeader(帖子主干头部)
@inject('pageinitStore',)
@observer
class PostsdetailsmainHeader extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        let { formats,locale,formatMessage } = this.props.pageinitStore.intl

        return <div className='postsdetailsmainheader-wrap'>
        <div className='postsdetailsmainheader-user'>
            <div className='user-base'>
                <div className='user-base-images' 
                    onClick={tools.clickToAppHandle}
                    style={{backgroundImage: 'url(' +this.props.baseMap.headImgUrl + ')'}}>
                </div>
                <div className='user-base-info'>
                    <div className='base-info-text' onClick={tools.clickToAppHandle}>
                        <div className='base-info-name'>{this.props.baseMap.nickname}</div>
                        <img className='base-info-verify' src={require('./../../images/component/verify.png')} alt=''/>
                    </div>
                    <div className='base-info-time'>
                        <FormattedDate
                            value={new Date(this.props.baseMap.releaseTime)}
                            year='numeric'
                            month='long'
                            day='numeric'
                            hour='numeric'
                            minute='numeric'
                        />
                    </div>
                </div>
            </div>
            {this.props.baseMap.isAttention === 0?<div onClick={tools.clickToAppHandle} className='postsdetailsmainheader-concern'>
                    +<FormattedMessage id="关注"/>
                </div>
            :<div onClick={tools.clickToAppHandle} className='postsdetailsmainheader-concern'>
                    <FormattedMessage id="已关注"/>
                </div>}
        </div>
        <div className='postsdetailsmainheader-num'>
            <div className='num-money'>
                <FormattedMessage id="已赏"/>
                <FormattedNumber
                    value={tools.formatMoney(this.props.baseMap.rewardAllCount)}
                    style="currency"
                    currency={formats.money.currency}
                />
            </div>
            <div className="num-browse">
                <span className='num-browse-text'>{formatMessage({id: '浏览'})}</span>
                {this.props.baseMap.lookNum}
            </div>  
        </div>
        <div className="postsdetailsmainheader-recommend">
            {this.props.baseMap.essence > 0 ? <img className='recommend-item'
                                                   src={
                                                       require(`./../../images/${locale === 'zh'? '': locale+'/'}component/set_jing.png`)
                                                   } alt=""/>
                : null}
            {this.props.baseMap.recommend  > 0 ? <img className='recommend-item'
                                                     src={
                                                         require(`./../../images/${locale === 'zh'? '': locale+'/'}component/set_index.png`)
                                                     } alt=""/>
                : null}
        </div>

    </div>
    }
}
PostsdetailsmainHeader.propTypes = {
    baseMap: PropTypes.object,
}
PostsdetailsmainHeader.defaultProp = {
    baseMap: {},
}

// PostsdetailsMain(帖子主干)
class PostsdetailsMain extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="postsdetailsmain-wrap">
            <div className="postsdetailsmain-header">
                {this.props.postDetailInfo.baseMap ? 
                    <PostsdetailsmainHeader
                        baseMap={this.props.postDetailInfo.baseMap}
                />: null} 
            </div>
            <div className="postsdetailsmain-center">
                {this.props.postDetailInfo.baseMap ?
                    <PostsdetailsmainCenter
                        baseMap={this.props.postDetailInfo.baseMap}
                        contentList={this.props.postDetailInfo.contentList}
                        rewardMap={this.props.postDetailInfo.rewardMap}
                    />:null}
            </div>
            <div className='postsdetailsmain-ranking'>
                <PostsdetailsmainTyrantRanking
                    rewardMap={this.props.postDetailInfo.rewardMap || {}}
                    />
            </div>  
            <div className="postsdetailsmain-honor">
                {this.props.postDetailInfo.rewardMap&&this.props.postDetailInfo.rewardMap.honorList
                ?<PostsdetailsmainHonor
                    honorList={this.props.postDetailInfo.rewardMap.honorList}
                    />:null}
            </div>  
            <div className="postsdetailsmain-msg">
                {this.props.postDetailInfo.hotCommentList
                    ?<UserMssageList
                        commentList={this.props.postDetailInfo.commentList}
                        />:null}
            </div>
        </div>
    }
}
PostsdetailsMain.propTypes = {
    postDetailInfo: PropTypes.object,
}
PostsdetailsMain.defaultProp = {
    postDetailInfo: {baseMap: {}, rewardMap: {}},
}

// PostsDetails 帖子详情
@inject('pageinitStore')
@observer
class PostsDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            postDetailInfo: {},
        }

        this.props.pageinitStore.initState(
            ['sendGetGeneralPostDetailReqeust',],
            ['sendGetGeneralPostDetailReqeust',],
        )
        tools.changeDocumentTitleHandle('posts_details', props.pageinitStore.intl.locale)
    }
    componentWillMount() {
        this.sendGetGeneralPostDetailReqeust()
    }

    sendGetGeneralPostDetailReqeust() {
        this.props.pageinitStore.decreaseStep('sendGetGeneralPostDetailReqeust')

        let postId = tools.getUrlParam('postId')

        request.sendRequest({
            url: request.map_route_api.API_Common_GetGeneralPostDetail,
            params: {
                postId: postId,
            },
            success_function: (resulte) => {
                let data = resulte.data
                if (data.rewardMap && data.rewardMap.honorList) {
                    data.rewardMap.honorList.sort((a, b) => {
                        return b.honorType - a.honorType
                    })
                }
                this.setState({
                    postDetailInfo: data,
                })
                // this.resetPostDetailInfoHandle()
                
                this.props.pageinitStore.increaseStep('sendGetGeneralPostDetailReqeust')
            },
            error_function: (resulte={}) => {
                new Toastr().error(resulte.message)
                this.props.pageinitStore.increaseStep('sendGetGeneralPostDetailReqeust')
            }
        })
    }
    resetPostDetailInfoHandle() {
        let baseMap = this.state.postDetailInfo.baseMap

        // 用户头像
        if (baseMap && baseMap.headImgUrl) {
            let baseMapHeadImgUrl = baseMap.headImgUrl.split('?')[0]
            baseMap.headImgUrl = baseMapHeadImgUrl + `?x-oss-process=image/resize,w_${100}`
        }

        this.setState({
            postDetailInfo: this.state.postDetailInfo,
        })
        
    }
    render() {
        return (<div className="postsdetails">
            {/*<div className="postsdetails-header">*/}
                {/*<Header*/}
                    {/*leftDoms={[*/}
                        {/*<div className="header-img1"*/}
                             {/*onClick={tools.clickToAppHandle}*/}
                             {/*style={{backgroundImage: `url(${require('./../../images/component/nav_left2.png')})`}}>*/}
                        {/*</div>*/}
                    {/*]}*/}
                    {/*centerDoms={[<FormattedMessage id="帖子详情"/>,]}*/}
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
            <div className="postsdetails-main">
                 <PostsdetailsMain
                    postDetailInfo={this.state.postDetailInfo}
                 />    
            </div>
            <div className="postsdetails-footer">
                <OpenAppFooterWrap/>
            </div>
            {/*<div className="postsdetails-submitmsg">*/}
                {/*<MakeCommentsOnWrap/>*/}
            {/*</div>*/}
            <Pageinit/>
        </div>)
    }
}


ReactDOM.render(<Provider {...stores}>
        <I18nProvider>
            <PostsDetails/>
        </I18nProvider>
</Provider>,
document.getElementById('istore-app'))
  
