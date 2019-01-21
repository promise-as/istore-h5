import React, { Component } from "react"
import PropTypes from 'prop-types'

import './index.scss'

// 头部公共组件
export default class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			compare: true
		}
	}

    render() {
        return (<div className='header-wrap maxwidth'>
			<div className="header-wrap-left">
				{this.props.leftDoms.map((Item, index) => {
					return <div className='left-item' key={index}>
						{Item}
					</div>
				})}
			</div>
			<div className="header-wrap-center">
				{this.props.centerDoms.map((Item, index) => {
					return <div className='center-item' key={index}>
						{Item}
					</div>
				})}
			</div>
			<div className="header-wrap-right">
				{this.props.rightDoms.map((Item, index) => {
					return <div className='right-item' key={index}>
						{Item}
					</div>
				})}
			</div>
    </div>)
    }
}
Header.propTypes = {
	leftDoms: PropTypes.array,
	centerDoms: PropTypes.array,
	rightDoms: PropTypes.array,
}
Header.defaultProps = {
	leftDoms: [],
	centerDoms: [],
	rightDoms: [],
}
