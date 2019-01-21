

import React, { Component } from "react"
import PropTypes from 'prop-types';

import * as tools from './../../tools/index'

import './index.scss'

// FileTailorSize 文件容器
class FileTailorSize extends Component {
	constructor(props) {
		super(props)

		this.imageTailorSizedom = React.createRef()
		this.state = {
			containerWidth: '',
		}
	}
	componentDidMount() {
		this.containerWidth = this.imageTailorSizedom.current.offsetWidth
		if (this.props.type === 2) {
            this.containerWidth = this.containerWidth / 2
		}

		this.setState({
			containerWidth: this.containerWidth,
		})
	}
	render() {
        // data-src='url("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")'
		return <div ref={this.imageTailorSizedom} className="filetailorsize-wrap">
				{this.props.headerAuto ? <img src={this.props.dataSrc} alt=""/>
					:<div
                        className='filetailorsize-bg lazyload'
                        onClick={tools.clickToAppHandle}
                        style={{
                            height: `${this.containerWidth}px`,
                            backgroundImage: `url(${this.props.dataSrc})`,
                            backgroundColor: '#e3e3e3',
						}}></div>}
				{this.props.type === 2 ?<div className="filetailorsize-media">
					<i className="filetailorsize-media-play"></i>
				</div>:null}
		</div>
	}
}

FileTailorSize.propTypes = {
	dataSrc: PropTypes.string,
	type: PropTypes.number,
    headerAuto: PropTypes.string, // 图片高度是否为auto
}
FileTailorSize.defaultProp = {
	dataSrc: '',
	type: 1,
    headerAuto: '',
}

export default class FileTailorListWrap extends Component {
	constructor(props) {
		super(props)

		this.state = {
			layoutClass: '',
			headerAuto: '',
		}
	}
	static getDerivedStateFromProps(props) {
		let len = props.fileList.length
		let layoutClass = ''
		let headerAuto = ''

		if (len === 1) {
			layoutClass = 'filetailorlist-wraplayoutone'
			headerAuto = 'auto'
		}
		if (len === 2 || len === 4) {
			layoutClass = 'filetailorlist-wraplayouttwo'
		}
        if (len === 3 || len > 4) {
            layoutClass = 'filetailorlist-wraplayoutthree'
		}
		return {
			layoutClass,
			headerAuto,
		}
	}
	render() {
		if (!this.props.fileList.length) {
			return null
		}

		return <div className={'filetailorlist-wrap ' + this.state.layoutClass} onClick={tools.clickToAppHandle}>
			{this.props.fileList.map((item, index) => {
				return <div
						key={index}
						className='filetailorlist-item'
						>
					<FileTailorSize dataSrc={item.imgUrl} type={item.type} headerAuto={this.state.headerAuto}/>
				</div>
			})}
		</div>
	}
}
FileTailorListWrap.defaultProp = {
	fileList: [],
}