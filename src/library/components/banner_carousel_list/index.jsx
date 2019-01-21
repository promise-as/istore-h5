import React, { Component } from "react"
import PropTypes from 'prop-types'
import Slider from "react-slick" // 轮播插件

import * as tools from './../../tools/index'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './index.scss'

// BannerCarouselList banner轮播图
export default class BannerCarouselListWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            settings: {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
            }
        }
    }
    render() {
        return <div className="bannercarousellist-wrap">
        <Slider {...Object.assign({},this.state.settings, this.props.settings)}>
            {this.props.bannerList.map((item, index) => {
                return <div className="bannercarousellist-itemcontainer" key={index}>
                    <div 
                        onClick={() => {tools.gotoPageHandle(item.linkUrl)}}
                        style={{backgroundImage: `url(${item.image})`}}
                        className="bannercarousellist-item" 
                        key={index}>
                    </div>
                </div> 
                
            })}
        </Slider>
    </div>
    }
}
BannerCarouselListWrap.propTypes = {
    bannerList: PropTypes.array,
    settings: PropTypes.object,
}
BannerCarouselListWrap.defaultProp = {
    bannerList: [],
    settings: {},
}