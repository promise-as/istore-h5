import React, { Component } from "react"
import { observer,inject } from 'mobx-react'

import './index.scss'
import * as tools from './../../tools/index'

// UserMssageList(用户留言列表)
@inject('pageinitStore',)
@observer
class MakeCommentsOnWrap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {formatMessage} = this.props.pageinitStore.intl

        return <div className="makecommentsonwrap-wrap maxwidth" onClick={tools.clickToAppHandle}>
            <input type="text" placeholder={formatMessage({id: '发表评论...'})}
                   className="makecommentsonwrap-edit"/>
            <i className="makecommentsonwrap-sub"></i>
        </div>
    }
}
export default MakeCommentsOnWrap

