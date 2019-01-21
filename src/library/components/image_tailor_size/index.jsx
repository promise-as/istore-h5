import React, { Component } from "react"
import PropTypes from 'prop-types';

import './index.scss'

// 懒加载图片容器组件
export default class ImageTailorSize extends Component {
    constructor(props) {
        super(props)

        this.imageTailorSizedom = React.createRef()
        this.state = {
            dataSrcReplace: '',
        }
    }
    render() {
        return <div ref={this.imageTailorSizedom} className="imagetailorsizedom-wrap">
            <img className='img-bg lazyload'
                data-sizes="auto"
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                data-src={this.props.dataSrc} alt=""/>
        </div>    
    }
}

ImageTailorSize.propTypes = {
    dataSrc: PropTypes.string,
}
ImageTailorSize.defaultProp = {
    dataSrc: '',
}