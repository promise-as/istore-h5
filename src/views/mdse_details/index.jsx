import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Slider from 'react-slick'
import { Provider,observer,inject } from 'mobx-react'


import I18nProvider from './../../library/components/i18n_provider/index'
import FileTailorListWrap from './../../library/components/file_tailor_list/index'
import Pageinit from './../../library/components/pageinit/index' // 页面初始化

import * as tools from "./../../library/tools"

import stores from "./stores"

import './index.scss'

//MdseDetailsDataWrap
@inject('pageinitStore')
@inject('mdseDetailsStore')
@observer
class MdseDetailsDataWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            height: 0,
        }

        this.iframeDom = React.createRef()

        this.time = null
    }
    componentDidMount() {
        this.time = window.setInterval(() => {
            this.loadIframeHandle()
        }, 700)
    }
    loadIframeHandle() {
        if (!this.iframeDom.current) return null
        let iframeWin = this.iframeDom.current.contentWindow
        || this.iframeDom.current.contentDocument.parentWindow

        if (iframeWin.document.body) {
            let height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight

            if (this.state.height === height) return null
            this.setState({
                height: height,
            })
        } else {
            this.setState({
                height: 'auto',
            })
        }
    }
    render() {
        let goodsId = this.props.mdseDetailsStore.mdseDetailsInfo.baseMap.goodsId

        return <div className="mdsedetailsdata-wrap" style={{height: this.state.height}}>
            <iframe height={`${this.state.height}px`}
                    ref={this.iframeDom}
                    src={`./mdse_details_data?goodsId=${goodsId}`}
                    frameBorder="0"
                    scrolling="no"></iframe>
        </div>
    }
}
MdseDetailsDataWrap.defaultProps = {
    goodsId: '',
}

// 商品详情默认显示组件
@inject('pageinitStore')
@inject('mdseDetailsStore')
@observer
class MdseDetailsIndexWrap extends Component {
    constructor(props) {
        super(props)

        this.state={
            bannerCurrentNumber: 0,
        }
        tools.changeDocumentTitleHandle('mdse_details', props.pageinitStore.intl.locale)
    }
    changeBannberIndexHandle(oldInde, newIndex) {
        this.setState({
            bannerCurrentNumber: newIndex,
        })
    }
    // 将图片转换成组件需要的格式
    static transitionImagesListHandle(list) {
        return list.map(item => {
            item.imgUrl = item.image

            return item
        })
    }
    // 获取评分长度转成数组
    static getScoreLengHandle(len = 0) {
        let array = []
        for (let i=0; i < len; i++) {
            array.push(i)
        }
        return array
    }
    static gotoMdseDetailsHandle(item) {
        let nationId = tools.getUrlParam('nationId')

        tools.gotoPageHandle(`/mdse_details?skuId=${item.skuId}&nationId=${nationId}`)
    }
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: this.changeBannberIndexHandle.bind(this),
        };
        let  baseMap= this.props.mdseDetailsStore.mdseDetailsInfo.baseMap
        const {formatMessage} = this.props.pageinitStore.intl

        return <div className="mdsedetailsindex-wrap">
            <div className="mdsedetails-banner">
                <div className="mdsedetails-banner-number">
                    {this.state.bannerCurrentNumber + 1}/{this.props.mdseDetailsStore.mdseDetailsInfo.imgList.length + 1}
                </div>
                <Slider {...settings}>
                    {(this.props.mdseDetailsStore.mdseDetailsInfo.imgList).map((item, index) => {
                        return <div
                            className={'mdsedetails-banner-item'} key={index}>
                            <div
                                className="mdsedetails-banner-item-target"
                                style={{backgroundImage: `url(${item.image})`}}
                            ></div>
                        </div>
                    })}
                </Slider>
            </div>
            <div className="mdsedetails-block">
                <div className="mdsedetails-title">
                    <div className="titile-info">{(baseMap.goodsName || '').split(0,30)}</div>
                    <div className="titile-img" onClick={() => {tools.clickToAppHandle()}}></div>
                </div>
                <div className="mdsedetails-subtitle">{baseMap.discountTitle}</div>
                <div className="mdsedetails-base">
                    <div className="mdsedetails-base-info">
                        <div className="info-price">￥{baseMap.price}</div>
                        <div className="info-num">{formatMessage(
                                {id: `已售?份`,},
                                {sellTotal: baseMap.sellTotal ? baseMap.sellTotal : 0},
                            )}</div>
                    </div>
                    <div className="mdsedetails-base-img" style={{backgroundImage: `url(${baseMap.logo})`}}></div>
                </div>
            </div>
            <div className="mdsedetails-promotion" onClick={() => {tools.clickToAppHandle()}}>
                <div className="mdsedetails-promotion-title">
                    {formatMessage(
                        {id: '促销'},
                    )}
                </div>
                <div className="mdsedetails-promotion-info">
                    <div className="info-item">{baseMap.discountTitle}</div>
                </div>
                <div className="mdsedetails-promotion-more"></div>
            </div>
            <div className="mdsedetails-generalize">
                <div className="mdsedetails-generalize-labels">
                    <div className="labels-item">
                        <div className="labels-item-img">
                        </div>
                        <div className="labels-item-info">
                            {formatMessage(
                                {id: '正品保证'},
                            )}
                        </div>
                    </div>
                    <div className="labels-item">
                        <div className="labels-item-img">
                        </div>
                        <div className="labels-item-info">
                            {formatMessage(
                                {id: '无忧退换'},
                            )}
                        </div>
                    </div>
                    <div className="labels-item">
                        <div className="labels-item-img">
                        </div>
                        <div className="labels-item-info">
                            {formatMessage(
                                {id: '闪电发货'},
                            )}
                        </div>
                    </div>
                </div>
                <div className="mdsedetails-generalize-bg">
                    <Slider
                        dots= {false}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {this.props.mdseDetailsStore.mdseDetailsInfo.advertList.map((item, index) => {
                            return <div
                                className={'generalize-bg-item'} key={index}>
                                <div
                                    className="generalize-bg-item-target"
                                    onClick={() => {tools.clickToAppHandle()}}
                                    style={{backgroundImage: `url(${item.image})`}}
                                ></div>
                            </div>
                        })}
                    </Slider>
                </div>
            </div>
            <div className="mdsedetails-msg">
                <div className="mdsedetails-msg-title">
                    <div className="title-info" onClick={() => {tools.clickToAppHandle()}}>
                    {formatMessage(
                        {id: '评价'},
                    )}({
                        this.props.mdseDetailsStore.mdseDetailsInfo.commentMap.commentTotal ? this.props.mdseDetailsStore.mdseDetailsInfo.commentMap.commentTotal : 0
                    })</div>
                    <div className="title-good">
                        {formatMessage(
                            {id: '好评度'},
                        )}
                        <span className={'title-good-num'}>{this.props.mdseDetailsStore.mdseDetailsInfo.commentMap.veryGoodRatio}</span>
                    </div>
                </div>
                <div className="mdsedetails-msg-list">
                    {this.props.mdseDetailsStore.mdseDetailsInfo.commentMap.commentList.map((item, index) => {
                        return <div className="msg-list-item" key={index} onClick={() => {tools.clickToAppHandle()}}>
                            <div className="msg-list-item-title">
                                <div className="title-base">
                                    <div className="title-base-img" style={{backgroundImage: `url(${item.headImgUrl})`}}></div>
                                    <div className="title-base-name">{item.nickname}</div>
                                </div>
                                <div className="title-pingjia">
                                    {MdseDetailsIndexWrap.getScoreLengHandle(item.score).map((scoreItem, index) => {
                                        return <div key={index} className="title-pingjia-item"></div>
                                    })}
                                </div>
                            </div>
                            <div className="msg-list-item-info">
                                <div className="info-text">{item.content}</div>
                                <div className="info-imgs">
                                    <FileTailorListWrap
                                        fileList={MdseDetailsIndexWrap.transitionImagesListHandle(item.imageList)}
                                    />
                                </div>
                            </div>
                        </div>
                    })}
                    <div className="mdsedetails-msg-footer">
                        <div className="footer-main" onClick={() => {tools.clickToAppHandle()}}>
                            {
                                formatMessage({
                                    id: '查看全部评价',
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="mdsedetails-recommend">
                <div className="mdsedetails-recommend-title">
                    <div className="mdsedetails-recommend-title-solid"></div>
                    <div className="mdsedetails-recommend-title-text">
                        {
                            formatMessage({
                                id: '为你推荐',
                            })
                        }
                    </div>
                    <div className="mdsedetails-recommend-title-solid"></div>
                </div>
                <div className="mdsedetails-recommend-list">
                    {this.props.mdseDetailsStore.mdseDetailsInfo.recommendList.map((item, index) => {
                        return <div className="list-item" key={index} onClick={() => {MdseDetailsIndexWrap.gotoMdseDetailsHandle(item)}}>
                            <div
                                className="list-item-image"
                            >
                                <div style={{backgroundImage: `url(${item.image})`}}></div>
                            </div>
                            <div className="list-item-title">{item.goodsName}</div>
                            <div className="list-item-price">￥ <span>{item.price}</span></div>
                        </div>
                    })}

                </div>
            </div>
        </div>
    }
}

// 商品详情
@inject('pageinitStore')
@inject('mdseDetailsStore')
@observer
class MdseDetailsWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            goodsId: '', // 商品id
            navListVisiFly: false,
            pageActionStatus: 'index', // index,details   页面显示状态
        }
    }
    componentWillMount() {
        let goodsId = tools.getUrlParam('skuId')

        this.props.pageinitStore.initState(
            ['sendMallGoodsGetailReqeust',],
            ['sendMallGoodsGetailReqeust',],
        )
        this.setState({
            goodsId: goodsId,
        })
        this.props.mdseDetailsStore.sendMallGoodsGetailReqeust(goodsId)
    }
    toggleNavListVisiFlyHandle() {
        this.setState({
            navListVisiFly: !this.state.navListVisiFly,
        })
    }
    // 改变头部tab选中状态
    changeTabHaderHandle(status) {
        this.setState({
            pageActionStatus: status,
        })
    }
    render() {
        const {formatMessage,locale} = this.props.pageinitStore.intl

        return <div className={`mdsedetails-wrap mdsedetails-wrap${locale}`}>
            <div className="mdsedetails-header">
                <div className="mdsedetails-header-left" onClick={()=> {tools.gotoPageHandle()}}>
                </div>
                <div className="mdsedetails-header-rightMax">
                    <div className="mdsedetails-header-center">
                        <div
                            onClick={()=>{this.changeTabHaderHandle('index')}}
                            className={`center-text${
                                this.state.pageActionStatus === 'index'?' center-textaction':''
                            }`}>{formatMessage({id: '商品'})}</div>
                        <div
                            onClick={()=>{this.changeTabHaderHandle('details')}}
                            className={`center-text${
                                this.state.pageActionStatus === 'details'?' center-textaction':''
                            }`}>{formatMessage({id: '详情'})}</div>
                        <div className="center-text" onClick={() => {tools.clickToAppHandle()}}>
                            {formatMessage({id: '评价'})}
                        </div>
                    </div>
                    <div className="mdsedetails-header-right">
                        <div className="right-img" style={{marginRight: '0.23rem'}}></div>
                        <div className="right-img" onClick={this.toggleNavListVisiFlyHandle.bind(this)}></div>
                        {this.state.navListVisiFly ? <div className="mdsedetails-header-nav">
                            <img className="mdsedetails-header-nav-bg" src={require('./../../images/nav_bg.png')} alt=""/>
                            <div className="nav-item" onClick={() => {tools.clickToAppHandle()}}>
                                <div className="nav-item-img"></div>
                                <div className="nav-item-text">{formatMessage({id: '消息'})}</div>
                            </div>
                            <div className="nav-item" onClick={() => {tools.clickToAppHandle()}}>
                                <div className="nav-item-img"></div>
                                <div className="nav-item-text">{formatMessage({id: '首页'})}</div>
                            </div>
                            <div className="nav-item" onClick={() => {tools.clickToAppHandle()}}>
                                <div className="nav-item-img"></div>
                                <div className="nav-item-text">{formatMessage({id: '搜索'})}</div>
                            </div>
                            <div className="nav-item" onClick={() => {tools.clickToAppHandle()}}>
                                <div className="nav-item-img"></div>
                                <div className="nav-item-text">{formatMessage({id: '我的收藏'})}</div>
                            </div>
                        </div>:null}

                    </div>
                </div>
            </div>
            <div className="mdsedetails-main">
                {this.state.pageActionStatus === 'index' ? <MdseDetailsIndexWrap/>:null}
                {this.state.pageActionStatus === 'details' ? <MdseDetailsDataWrap goodsId={this.state.goodsId}/>:null}
            </div>
            <div className="mdsedetails-footer">
                <div className="mdsedetails-footer-app">
                    <div className="app-item" onClick={() => {tools.clickToAppHandle()}}>
                        <div className="app-item-img"></div>
                        <div className="app-item-info">{formatMessage({id: '店铺'})}</div>
                    </div>
                    <div className="app-item" onClick={() => {tools.clickToAppHandle()}}>
                        <div className="app-item-img"></div>
                        <div className="app-item-info">{formatMessage({id: '卖家'})}</div>
                    </div>
                    <div className="app-item" onClick={() => {tools.clickToAppHandle()}}>
                        <div className="app-item-img"></div>
                        <div className="app-item-info" >{formatMessage({id: '购物车'})}</div>
                    </div>
                </div>
                <div className="mdsedetails-footer-operation" onClick={() => {tools.clickToAppHandle()}}>
                    {formatMessage({id: '加入购物车'})}
                </div>
                <div className="mdsedetails-footer-operation" onClick={() => {tools.clickToAppHandle()}} style={{backgroundColor: '#F0281F'}}>
                    {formatMessage({id: '立即购买'})}
                </div>
            </div>
            <Pageinit/>
        </div>
    }
}



ReactDOM.render(<Provider {...stores}>
        <I18nProvider>
            <MdseDetailsWrap/>
        </I18nProvider>
    </Provider>,document.getElementById('istore-app'))