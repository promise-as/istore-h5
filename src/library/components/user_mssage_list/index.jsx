import React, { Component } from "react"
import PropTypes from 'prop-types'
import { observer,inject } from 'mobx-react'
import { FormattedMessage, } from 'react-intl'

import * as tools from './../../tools/index'

import Nodata from './../nodata/index'

import './index.scss'

// UserMssageList(用户留言列表)
@inject('pageinitStore',)
@observer
export default class UserMssageList extends  Component {
    constructor(props) {
        super(props)

        this.state = {
            msgType: [
                {
                    key: '最新评论',
                    val: 'newMsg',
                },
                {
                    key: '热门评论',
                    val: 'hotMsg',
                },
                {
                    key: '全部评论',
                    val: 'allMsg',
                },
            ],
            actionMsgType: {
                key: '最新评论',
                val: 'newMsg',
            },
            currentMsgData: [],// 当前评论数据
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.actionMsgType.val === 'hotMsg') {
            return {
                currentMsgData: nextProps.hotCommentList,
            }
        }
        if(prevState.actionMsgType.val === 'newMsg') {
            return {
                currentMsgData: nextProps.commentList,
            }
        }
    }
    actionMsgTypeHandle(currentObj) { // 留言切换
        return tools.clickToAppHandle()
        // this.setState({
        //     actionMsgType: currentObj,
        // })
    }
    render() {
        const { formatDate,formatRelative,formatMessage } = this.props.pageinitStore.intl

        return <div className="usermssagelist-wrap">
            <div className="usermssagelist-header">
                {this.state.msgType.map((item, index) => {
                    return <div
                        onClick={(e) => this.actionMsgTypeHandle(item)} 
                        className={"usermssagelist-header-item" +
                        ((item.val === this.state.actionMsgType.val)?" usermssagelist-header-actionitem":"")} 
                        key={index}>
                        <FormattedMessage id={item.key}/>
                    </div>
                })}
            </div>
            <div className="usermssagelist-list">
                {!this.state.currentMsgData.length ? <Nodata/>:null}
                {this.state.currentMsgData.map((item, index) => {
                    return <div className="usermssagelist-list-item" key={index}>
                    <div className="item-containerbase">
                        <div className="item-base">
                            <div className='item-base-left' onClick={tools.clickToAppHandle}>
                                <div className="item-base-img"
                                    style={{backgroundImage: "url("+item.headImgUrl +')'}}
                                ></div>
                                <div className="item-base-info">
                                    <div className="info-name">{item.nickname}</div>
                                    <div className="info-text">
                                        <span>
                                            [{formatMessage({id: '?楼'}, {number: item.floor})}]
                                        </span>
                                        <span>
                                            {formatRelative(
                                                new Date(item.contentTime),
                                            )}
                                            {formatDate(
                                                new Date(item.contentTime),
                                                {
                                                    hour: '2-digit',
                                                    minute: 'numeric',
                                                }
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>   
                            <div 
                                onClick={tools.clickToAppHandle}
                                className={"item-like" + (item.isPraise? " item-likedlike"
                                :" item-notlike")}>
                                <div className="item-like-img"></div>
                                <span className="item-like-num">{item.likeNum}</span>
                            </div>
                        </div>
                        <div className="item-content">
                            {item.content}
                        </div>
                    </div>
                    {item.isOriginal ? <div className="item-containerbase item-subcontainerbase">
                        <div className="item-base">
                            <div className='item-base-left'>
                                <div className="item-base-info" onClick={tools.clickToAppHandle}>
                                    <div className="info-name">{item.original.nickname}</div>
                                    <div className="info-text">
                                        <span>{formatMessage({id: '于'})}</span>
                                        <span>
                                            {formatRelative(
                                                new Date(item.original.contentTime),
                                            )}
                                            {formatDate(
                                                new Date(item.original.contentTime),
                                                {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                }
                                            )}
                                        </span>

                                        <span>{formatMessage({id: '发表在'})}</span>
                                        <FormattedMessage id={"?楼"} values={{number: item.original.floor}}/>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        <div className="item-content">
                            {item.original.content}
                        </div>
                    </div>: null}  
                </div>
                })}
                
            </div>
        </div> 
    }
}
UserMssageList.propTypes = {
    commentList: PropTypes.array, // 热门评论
}
UserMssageList.defaultProp = {
    commentList: [],
}