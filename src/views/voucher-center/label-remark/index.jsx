import React, { Component } from "react"
import { Toast } from 'antd-mobile';
import { Provider,observer,inject } from 'mobx-react'


import I18nProvider from './../../../library/components/i18n_provider/index'
import Pageinit from './../../../library/components/pageinit/index' // 页面初始化
import Header from './../../../library/components/header/index'

import stores from "./stores"

import './index.scss'
import * as tools from "../../../library/tools"

// 内容主页
@inject('pageinitStore')
@inject('labelRemarkStore')
@observer
class LabelRemarkWarp extends Component {
    constructor(props) {
        super(props)

        this.labelInputDom = React.createRef()
        this.remarksInputDom = React.createRef()

        this.state = {
            labelList: [], // 标签数组
            myLabelList: [], // 我的标签
            recommendLabelList: [ // 推荐标签
                // { value: '电话充值', status: false, },
            ],
            addLabelIsShow: true, // 当用户添加标签的时候下面隐藏
            imgSrc: '',
        }

        // 修正this指向
        this.addLabelHandle = this.addLabelHandle.bind(this)
    }

    componentWillMount(){
        this.props.pageinitStore.initState(
            [
                'sendRechargeDetail',
                'sendUpdateLabelRemark',
                'sendRechargeBillUploadImgRequest',
            ],
            [
                'sendRechargeDetail',
                'sendUpdateLabelRemark',
                'sendRechargeBillUploadImgRequest',
            ],
        )
        let {orderId,type} = tools.getUrlParam()

        type = (type == '流量充值' ? 1 : 0)

        let {labelList,myLabelList,recommendLabelList} = this.state // 标签数组
        // 获取标签及推荐标签
        this.props.labelRemarkStore.sendRechargeDetail(orderId, type, (rechargeDetail) => {
            // this.remarksInputDom.current.value = rechargeDetail.remarks

            //把标签push到标签数组
            if(rechargeDetail.tagging){
                rechargeDetail.tagging.split('|').map((item, index) => {
                    return (
                        labelList.push({value: item, status: false,})
                    )
                })
                this.setState({
                    labelList
                })
            }
            if(rechargeDetail.recommendTagging){
                rechargeDetail.recommendTagging.split('|').map((item, index) => {
                    return (
                        recommendLabelList.push({value: item, status: false,})
                    )
                })
                this.setState({
                    labelList,
                    recommendLabelList,
                })
            }
        })
        // 获取我的标签
        try {
            let localMyLabelList = window.localStorage.getItem('myLabelList')

            if (localMyLabelList) {
                localMyLabelList.split('|').map((item, index) => {
                    return (
                        myLabelList.push({value: item, status: false,})
                    )
                })
                this.setState({
                    myLabelList,
                })
            }
        } catch(err) {
            console.log(err)
        }
    }

    // 增加标签
    addLabelHandle(){
        let value = this.labelInputDom.current.value.trim()
        let { labelList} = this.state
        // 判断值不为空
        if (!value){
            this.setState({
                addLabelIsShow: true
            })
            return
        }
        if(value.length >= 10){
            Toast.fail('标签小于10个字')
            this.labelInputDom.current.value = ""
            this.setState({
                addLabelIsShow: true
            })
            return
        }
        let isNull = true // labelList没有重复的
        labelList.map((labelListItem) => {
            if (labelListItem.value === value) {
                isNull = false // 重复
            }
        })
        // 不重复就添加
        if (isNull) {
            labelList.push({
                value: value
            })
        } else {
            Toast.fail('重复添加', 1)
        }
        this.setState({
            labelList: this.state.labelList,
        })
        this.labelInputDom.current.value = ""
        this.setState({
            addLabelIsShow: true
        })
    }

    // 鼠标移入
    onFocus(){
        const { addLabelIsShow } = this.state
        this.setState({
            addLabelIsShow: false
        })
    }

    // 点击我的标签
    addMyLabel(item, itemIndex){
        let { labelList, } = this.state
        if (item.status === true) { // 选中情况
            labelList.map((labelListItem, index) => {
                console.log(item.value , labelListItem.value)

                if (item.value === labelListItem.value) {
                    labelList.splice(index, 1)
                }
            })
            item.status = false
        } else { // 没有选中
            let isNull = true // labelList没有重复的
            labelList.map((labelListItem, index) => {
                if (item.value === labelListItem.value) {
                    isNull = false
                }
            })
            item.status = true
            labelList.push(item)
        }
        this.state.myLabelList[itemIndex].status = item.status

        this.setState({
            myLabelList: this.state.myLabelList,
            labelList: labelList,
        })
    }

    // 推荐标签添加
    recommendAddLabel(item, itemIndex){
        let { labelList, } = this.state
        if (item.status === true) { // 选中情况
            labelList.map((labelListItem, index) => {
                // console.log(item.value , labelListItem.value)

                if (item.value === labelListItem.value) {
                    labelList.splice(index, 1)
                }
            })
            item.status = false
        } else { // 没有选中
            let isNull = true // labelList没有重复的
            labelList.map((labelListItem, index) => {
                if (item.value === labelListItem.value) {
                    isNull = false
                }
            })
            item.status = true
            labelList.push(item)
        }
        this.state.recommendLabelList[itemIndex].status = item.status

        this.setState({
            recommendLabelList: this.state.recommendLabelList,
            labelList: labelList,
        })
    }

    // 删除对应的标签
    deleteLabelHandle(item, itemIndex){
        let { myLabelList, recommendLabelList,labelList } = this.state
        labelList.splice(itemIndex, 1)
        myLabelList.map((myLabelListItem, index) => {
            if (window.Boolean(item.status) === true && myLabelListItem.value === item.value) {
                myLabelListItem.status = false
            }
        })
        recommendLabelList.map((recommendLabelListItem, index) => {
            if (window.Boolean(item.status) === true && recommendLabelListItem.value === item.value) {
                recommendLabelListItem.status = false
            }
        })


        this.setState({
            myLabelList: myLabelList,
            labelList: this.state.labelList
        })
    }

    // 读取本地图片
    loadImg(event){
        let file = event.target.files[0]
        const imageFormData = new FormData()
        imageFormData.append('file', file)
        this.props.labelRemarkStore.sendRechargeBillUploadImgRequest(imageFormData)
    }

    // 备注
    sendSaveLabelRequestHandle() {
        this.props.labelRemarkStore.sendUpdateLabelRemark({
            // 标签数组
            labelList: this.state.labelList,
            // 备注
            remarks: this.remarksInputDom.current.value
        })
    }

    render(){
        const { labelList, myLabelList, recommendLabelList, addLabelIsShow } = this.state
        const {rechargeDetail} = this.props.labelRemarkStore

        return <div className='labelremark-wrap'>
            <div className="labelremark-header">
                <Header
                    leftDoms={[
                        <div className="header-left"
                             onClick={()=>this.props.labelRemarkStore.isSaveLabelHandle()}></div>
                    ]}
                    centerDoms={[
                        <span className="header-title">标签和备注</span>
                    ]}
                    rightDoms={[
                        <span className="header-right" onClick={()=>this.sendSaveLabelRequestHandle()}>保存</span>
                    ]}
                />
            </div>
            <div className="labelremark-label">
                <div className="label-add">
                    <div className="label-add-header">
                        <div className="label-add-header-img"></div>
                        <div className="label-add-header-text">标签</div>
                    </div>
                    <div className="label-container">
                        {
                            labelList.map((labelItem, index) => {
                                return (
                                    labelItem.value == " " ? null : <div className="label-complete" key={index}>
                                        {labelItem.value == " " ? null : <div className="lable-complete-text">{labelItem.value}</div> }
                                        {labelItem.value == " " ? null :
                                            < div className = "lable-delete" onClick={() => this.deleteLabelHandle(labelItem,index)}></div>
                                        }
                                    </div>
                                )
                            })
                        }
                        <input ref={this.labelInputDom} onBlur={this.addLabelHandle} onFocus={this.onFocus.bind(this)}
                               className="label-add-input" type="text" placeholder="输入标签" maxLength='28'/>
                    </div>
                </div>
                {
                    addLabelIsShow ? <div className="label-item">
                        <div className="label-item-title">
                            <div className="label-item-title-text">我的标签</div>
                        </div>
                        <div className="label-item-list">
                            {myLabelList.map((item, index) => {
                                return item.value == " " ? null : <div
                                    key={index}
                                    onClick={()=>{this.addMyLabel(item, index)}}
                                    className={`label-item-use${item.status ? ' label-item-useaction':''}`}
                                >{item.value}
                                </div>
                            })}
                        </div>
                    </div> : null
                }
                {
                    addLabelIsShow ? <div className="label-item">
                        <div className="label-item-title">
                            <div className="label-item-title-text">推荐标签</div>
                        </div>
                        {recommendLabelList.map((item, index) => {
                            return <div
                                key={index}
                                onClick={()=>{this.recommendAddLabel(item, index)}}
                                className={`label-item-use${item.status ? ' label-item-useaction':''}`}>
                                {item.value}
                            </div>
                        })}
                    </div> : null
                }
            </div>
            {
                addLabelIsShow ? <div className="labelremark-remark">
                    <div className="remark">
                        <div className="remark-title">
                            <div className="remark-title-img"></div>
                            <div className="remark-title-text">备注</div>
                        </div>
                        <input
                            ref={this.remarksInputDom}
                            className="remark-input"
                            defaultValue={rechargeDetail.remarks ? rechargeDetail.remarks : ''}
                            type="text"
                            placeholder="备注点什么"/>
                    </div>
                    {rechargeDetail.remarksImg ? <img src={rechargeDetail.remarksImg} alt=""/>:<div>
                        <div className="labelremark-addimg" >
                            <div className="addimg-container">
                                <div className="addimg-top"></div>
                                <div className="addimg-bottom">添加一张图片</div>
                            </div>
                        </div>
                        <input className="labelremark-addimg-input" type="file" onChange={(event) => this.loadImg(event)} accept="image/*"/>
                    </div>}
                </div> : null
            }
            <Pageinit/>
        </div>
    }
}

// 话费充值
export default class RechargeWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <Provider {...stores}>
            <I18nProvider>
                <LabelRemarkWarp/>
            </I18nProvider>
        </Provider>
    }
}