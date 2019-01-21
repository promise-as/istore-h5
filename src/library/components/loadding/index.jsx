import React, { Component } from "react"
import PropTypes from 'prop-types'

import './index.scss'

// 分页加载状态
export default class Loadding extends Component {
    constructor(props) {
        super(props)
    }
    getLoadingText() {
        if(this.props.loadStatus === 'unload'){
            return '滚动加载更多'
        }
        if(this.props.loadStatus === 'loading'){
            return '加载中 ∙ ∙ ∙'
        }
        if(this.props.loadStatus === 'loaded'){
            return '/ / / 没有了 / / /'
        }
    }
    render() {
        return <div className="loading-wrap">
            {this.getLoadingText()}
        </div>
    }
}
Loadding.propTypes = {
    loadStatus: PropTypes.string,
}
Loadding.defaultProps = {
    loadStatus: 'loaded'
}