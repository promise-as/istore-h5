import React, { Component } from "react"
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import './index.scss'

// 没有数据显示组件
export default class Nodata extends Component {
	constructor(props) {
		super(props)
	}

    render() {
        return (<div className="nodata">
        <div className="nodata-expression">(ㆆᴗㆆ)</div>
        <div className="nodata-title">
            <FormattedMessage id={this.props.title}/>
        </div>
    </div>)
    }
}
Nodata.propTypes = {
	title: PropTypes.string,
}
Nodata.defaultProps = {
	title: '暂无数据',
}

