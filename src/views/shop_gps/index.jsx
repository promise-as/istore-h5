import React, { Component } from "react"
import ReactDOM from "react-dom"
import stores from "./stores"
import { Provider,observer,inject } from 'mobx-react'

import PhoneToastr from './../../library/components/phone_toastr/index'

import I18nProvider from './../../library/components/i18n_provider/index'

import * as config from './../../../config/index'

import './index.scss'
import * as tools from "../../library/tools"

// 门店gps
@inject('pageinitStore')
@inject('shopGpsStore')
@observer
class ShopGpsWrap extends Component {
    constructor(props) {
        super(props)

        this.map // 地图对象
        this.position = {
            lng: 0, // 经度
            lat: 0, // 纬度
        }

        this.markerList = [] // 标准数据

        this.serachInput = React.createRef()

        let lang = ShopGpsWrap.getTransitionLan(tools.getUrlParam('lang') || 'zh')

        props.pageinitStore.setI18nMessagesInfoHandle(( lang.indexOf('zh') >= 0 ? 'zh':'en' ))
    }
    static getTransitionLan(lan) {
        switch (lan) {
            case 'zh-Hans':
                return 'zh'
            default:
                return 'en'
        }
    }
    componentDidMount() {
        // 添加地图
        const gaodeMapsDom = document.createElement('script')
        const headerDom = document.querySelector('head')

        gaodeMapsDom.type = 'text/javascript'
        gaodeMapsDom.src = `https://webapi.amap.com/maps?v=1.4.2&key=${config.gaode_map_key}&plugin=AMap.Geocoder&callback=init`

        window.init = () => {
            this.map = new AMap.Map('container', {
                resizeEnable: true
            })
            this.getUserLocation()
        }
        headerDom.appendChild(gaodeMapsDom)
    }
    // 获取用户地址位置
    getUserLocation() {
        let geolocation

        this.map.plugin('AMap.Geolocation', () => {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            })
            this.map.addControl(geolocation)
            geolocation.getCurrentPosition()
            //解析定位结果
            AMap.event.addListener(geolocation, 'complete', (data) => {
                this.position = {
                    lng: data.position.getLng(),
                    lat: data.position.getLat(),
                }
                this.serachShopListFunc()
            });
            // 定位错误
            AMap.event.addListener(geolocation, 'error', (data) => {
                new PhoneToastr().error('定位失败')
                this.serachShopListFunc()
            })
        });
    }
    // 设置标注
    setLocalMarker() {
        this.map.remove(this.markerList)
        this.markerList = []

        this.props.shopGpsStore.shopGpsList.map(item => {
            this.markerList.push(new AMap.Marker({
                position: new AMap.LngLat(item.lng, item.lat),
                offset: new AMap.Pixel(-10, -10),
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAYAAACe0YppAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3MDE0NzgzYS1mMTdiLWM5NDQtYWJmOC0yOTNjNDk5MzBjYTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUFDOEQ3MTE4Q0Q0MTFFOEFEOENENTI2MUExQTUwNEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUFDOEQ3MTA4Q0Q0MTFFOEFEOENENTI2MUExQTUwNEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTQxNzk3ODMtMGYwMS1iZjRjLTllOTQtZWU5MzM1NWIxN2E5IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MmRlNmViM2ItOGQ2NS00ODRhLTk2ZGMt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', // 添加 Icon 图标 URL
                title: item.shopName
            }))
        })

        this.map.add(this.markerList);
    }
    serachShopListFunc() {
        let json = {}

        if (this.position.lng) {
            json = {
                shopName: this.serachInput.current.value,
                lon: this.position.lng,
                lat: this.position.lat,
            }
        } else {
            json = {
                shopName: this.serachInput.current.value,
            }
        }
        this.props.shopGpsStore.sendCommonShopListReqeust(json, this.setLocalMarker.bind(this))
    }
    // 改变地图视图
    changeMapLngLatHandle(lng, lat) {
        this.map.panTo([lng,lat])
    }
    // 处理本地到店的距离
    getDistanceFiltr(val) {
        if (!val) {
            return `0米`
        }

        if(val <= 1000) {
            return `${val}米`
        } else {
            return `${(val / 1000).toFixed(2)}公里`
        }
    }
    gotoMapApp(lng, lat) {
        window.location.href = `https://uri.amap.com/marker?position=${lat},${lng}`
    }
    render() {
        let lang = this.props.pageinitStore.intl.locale

        return <div className="shopgps-wrap">
            <div className="shopgps-header">
                <div className="shopgps-header-left">
                    取消
                </div>
                <div className="shopgps-header-input">
                    <div className="input-icon"></div>
                    <input type="text" ref={this.serachInput} className={'input-text'}/>
                </div>
                <div className="shopgps-header-right" onClick={this.serachShopListFunc.bind(this)}>搜索</div>
            </div>
            <div className="shopgps-map" id={'container'}>
            </div>
            <div className="shopgps-list">
                {this.props.shopGpsStore.shopGpsList.map((item, index) => {
                    if ([13, 100, 99].indexOf(item.id) > -1) {
                        return null
                    }
                    return <div className="shopgps-list-item" key={index} onClick={() => {this.changeMapLngLatHandle(item.lng,item.lat)}}>
                        <div className="list-item-info">
                            <div className="list-item-info-img" >
                                <div style={{backgroundImage: `url(${config.node_oss_path + item.shopImg})`}}></div>
                            </div>
                            <div className="list-item-info-basic">
                                <div className="basic-title">
                                    <span className={'info'}>{item.shopName}</span>
                                </div>
                                {/*<div className="basic-evaluate">*/}
                                {/*<div className="basic-evaluate-chunk">*/}
                                {/*<div className="chunk-item"></div>*/}
                                {/*<div className="chunk-item"></div>*/}
                                {/*<div className="chunk-item"></div>*/}
                                {/*<div className="chunk-item"></div>*/}
                                {/*<div className="chunk-item"></div>*/}
                                {/*</div>*/}
                                {/*<div className="basic-evaluate-info">*/}
                                {/*<span>4545</span>人去过*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                <div className="basic-lable">
                                    {item.distance?<div className="basic-lable-item">{this.getDistanceFiltr(item.distance)}</div>:null}
                                    <div className="basic-lable-item">智能无人便利店</div>
                                </div>
                                <div className="basic-info">{item.address}</div>
                            </div>
                            <div className="list-item-info-path" onClick={()=> {this.gotoMapApp(item.lng, item.lat)}}>
                                <div className="path-img"></div>
                                <div className="path-title">路线</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }
}

ReactDOM.render(<Provider {...stores}>
        <I18nProvider>
            <ShopGpsWrap/>
        </I18nProvider>
    </Provider>,document.getElementById('istore-app'))