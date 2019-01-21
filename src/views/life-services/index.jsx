import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider,observer,inject } from 'mobx-react'

import I18nProvider from './../../library/components/i18n_provider/index'

import PhoneToastr from './../../library/components/phone_toastr/index'
import Header from './../../library/components/header/index'

import * as config from './../../../config/index'

import stores from "./stores"

import './index.scss'
import * as tools from "../../library/tools"

// 生活服务
//LifeServicesWrap
@inject('pageinitStore')
@inject('lifeServicesWrap')
@observer
class LifeServicesWrap extends Component {
    constructor(options) {
        super(options)

        this.state = {
            cloneBodyNavsVisifly: false, // 头部apps显示状态
            recentlyApps: [ // 最近使用
                // {
                //     img: require('./../../images/app-22.png'),
                //     title: '多多卡',
                //     link: `http://www.xtechs.pro/user/ddcard`,
                //
                // },
                {
                    img: require('./../../images/app-21.png'),
                    title: '充值中心',
                    link: `${config.node_web_host}/voucher-center#/`,

                },
                // {
                //     img: require('./../../images/app-1.png'),
                //     title: '全国车辆违章',
                // },
                // {
                //     img: require('./../../images/app-2.png'),
                //     title: '酒店门票',
                // },
                // {
                //     img: require('./../../images/app-3.png'),
                //     title: '飞机车票预订',
                // },
                // {
                //     img: require('./../../images/app-4.png'),
                //     title: '加油卡充值',
                // },
                // {
                //     img: require('./../../images/app-5.png'),
                //     title: '生活缴费',
                // },
                // {
                //     img: require('./../../images/app-6.png'),
                //     title: '二手车评估',
                // },
                // {
                //     img: require('./../../images/app-7.png'),
                //     title: '爱心捐赠',
                // },
                // {
                //     img: require('./../../images/app-8.png'),
                //     title: '尾号限行',
                // },
            ],
            actionAppsKeys: '',
            allAppsKeys: [],
            allApps: {
                convenientLife: [ // 便捷生活
                    {
                        img: require('./../../images/app-5.png'),
                        title: '生活缴费',
                    },
                    {
                        img: require('./../../images/app-3.png'),
                        title: '飞机车票预订',
                    },
                    {
                        img: require('./../../images/app-2.png'),
                        title: '酒店门票',
                    },
                    {
                        img: require('./../../images/app-9.png'),
                        title: '礼品卡购买',
                    },
                ],
                serveTopUp: [
                    {
                        img: require('./../../images/app-11.png'),
                        title: '固话宽带充值',
                    },
                    {
                        img: require('./../../images/app-12.png'),
                        title: '公交卡充值',
                    },
                    {
                        img: require('./../../images/app-14.png'),
                        title: '腾讯充值',
                    },
                    {
                        img: require('./../../images/app-15.png'),
                        title: '卡密充值',
                    },
                    {
                        img: require('./../../images/app-20.png'),
                        title: '视频充值',
                    },
                ],
                thecarService: [
                    {
                        img: require('./../../images/app-1.png'),
                        title: '全国车辆违章',
                    },
                    {
                        img: require('./../../images/app-16.png'),
                        title: '违章代缴',
                    },
                    {
                        img: require('./../../images/app-4.png'),
                        title: '加油卡充值',
                    },
                    {
                        img: require('./../../images/app-8.png'),
                        title: '尾号限行',
                    },
                    {
                        img: require('./../../images/app-17.png'),
                        title: '二手车评估',
                    },
                    {
                        img: require('./../../images/app-18.png'),
                        title: '车辆故障码查询',
                    },
                    {
                        img: require('./../../images/app-19.png'),
                        title: '实时停车场',
                    },
                ],
                love: [
                    {
                        img: require('./../../images/app-7.png'),
                        title: '爱心捐赠',
                    },
                ]
            }
        }
    }
    componentWillMount() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
            tools.setGlobalBridge()
        }

        const keyAllApps = Object.keys(this.state.allApps)

        this.setState({
            allAppsKeys: keyAllApps,
            actionAppsKeys: keyAllApps[0],
        })
        this.watchScrollHandle()
    }

    // 退出webView
    async outWebViewHandle () {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isAndroid){ // 是安卓
            window.android.closeWebView()
        }else {
            await tools.asyncBridgeCallHandler('android closeWebView') // 桥接
        }
    }

    // 改变选中key
    changeActionAppKey(key, index) {
        let lifeservicesApps = $('.lifeservices-body-content > .lifeservices-apps')

        if (!$(lifeservicesApps[index]).offset().top) {
            return null
        }
        let scrollTop = $(lifeservicesApps[index]).offset().top;
        $(window).scrollTop(scrollTop - 70);

        this.setState({
            actionAppsKeys: key,
        })
    }
    watchScrollHandle() {
        $(window).scroll(() => {
            let winScrollTop = $(window).scrollTop()
            let lifeservicesBodyNavsDom = $('#lifeservices-body-navs')
            let lifeservicesHeaderDom = $('.lifeservices-header')

            if (lifeservicesBodyNavsDom.offset().top <= (winScrollTop + lifeservicesHeaderDom.height())) {
                this.setState({
                    cloneBodyNavsVisifly: true,
                })
            } else {
                this.setState({
                    cloneBodyNavsVisifly: false,
                })
            }
        })
    }
    static clickHandle(item) {
        if (item.link) {
            window.location.href = item.link
        } else {
            new PhoneToastr().info(`暂未开放，敬请期待`)
        }
    }
    static appTypeAlias(value) {
        switch(value) {
            case 'convenientLife':
                return '便捷生活';
            case 'serveTopUp':
                return '服务充值';
            case 'thecarService':
                return '车行服务';
            case 'love':
                return '爱心公益';
        }
    }
    render() {
        return <div className="lifeservices-wrap">
            {/*<div className="lifeservices-hint">*/}
                {/*<div className="lifeservices-hint-img"></div>*/}
                {/*<div className="lifeservices-hint-info">暂未开放，敬请期待</div>*/}
            {/*</div>*/}
            {/*<div class="lifeservices-header">*/}
                {/*<div class="lifeservices-header-left"  ={()=>window.closeWebView()}>*/}
                    {/*<div class="left-img"></div>*/}
                    {/*<div class="left-text">首页</div>*/}
                {/*</div>*/}
                {/*/!*<div class="lifeservices-header-right" on-click="clickHandle('搜索app')">*!/*/}
                    {/*/!*<div class="header-right-img"></div>*!/*/}
                    {/*/!*<div class="header-right-text">搜索</div>*!/*/}
                {/*/!*</div>*!/*/}
            {/*</div>*/}
            <div className="lifeservices-header">
                <Header
                    leftDoms={[
                        <div className="lifeservices-header-left" onClick={() => this.outWebViewHandle()}>
                            <div className="left-img"></div>
                            <div className="left-text">首页</div>
                        </div>,
                    ]}
                    centerDoms={[
                        <span className="header-title">生活服务</span>
                    ]}
                />
            </div>
            {/*滚动条触发显示   start*/}
            {this.state.cloneBodyNavsVisifly ? <div className="clone-lifeservices">
                <div className="lifeservices-body-navs">
                    {window.Boolean(this.state.allAppsKeys.length) && this.state.allAppsKeys.map((item, index) => {
                        // console.log(this.state.allAppsKeys.length)
                        return <div
                            key={index}
                            className={`navs-item${
                                item === this.state.actionAppsKeys ? ' navs-actionItem':''}`
                            }
                            onClick={() => {this.changeActionAppKey(item, index)}}
                        >
                            {LifeServicesWrap.appTypeAlias(item)}
                        </div>
                    })}

                </div>
            </div>:null}
            {/*滚动条触发显示   end*/}

            <div className="lifeservices-apps lifeservices-firstapps">
                <div className="lifeservices-apps-title">最近使用</div>
                <div className="lifeservices-apps-list">
                    {this.state.recentlyApps.map((item,index) => {
                        return <div
                            key={index}
                            className="apps-list-item"
                            onClick={() => {LifeServicesWrap.clickHandle(item)}}>
                            <div className="list-item-img"
                                 style={{backgroundImage: `url(${item.img})`}}
                            ></div>
                            <div className="list-item-text">{item.title}</div>
                        </div>
                    })}
                </div>
            </div>
            <div className="lifeservices-body">
                <div id="lifeservices-body-navs" className="lifeservices-body-navs">
                    <div className="body-navs-container">
                        {this.state.allAppsKeys.map((item, index) => {
                            return <a
                                key={index}
                                href="javascript:void(0)"
                                className={`navs-item${item === this.state.actionAppsKeys ? ' navs-actionItem':''}`}
                                onClick={() => {this.changeActionAppKey(item, index)}}
                            >
                            {LifeServicesWrap.appTypeAlias(item)}
                            </a>
                        })}
                    </div>
                </div>
                <div className="lifeservices-body-content">
                    {window.Boolean(this.state.allAppsKeys.length) && this.state.allAppsKeys.map((allItem, index) => {
                        return <div key={index} className="lifeservices-apps">
                            <div className="lifeservices-apps-title">{LifeServicesWrap.appTypeAlias(allItem)}</div>
                            <div className="lifeservices-apps-list">
                                {this.state.allApps[allItem].map((appItem,appIndex) => {
                                    return <div key={appIndex} className="apps-list-item"
                                                onClick={() => {LifeServicesWrap.clickHandle(appItem)}}>
                                        <div className="list-item-img"
                                             style={{backgroundImage: `url(${appItem.img})`}}
                                        ></div>
                                        <div className="list-item-text">{appItem.title}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<Provider {...stores}>
    <I18nProvider>
        <LifeServicesWrap/>
    </I18nProvider>
</Provider>,document.getElementById('istore-app'))