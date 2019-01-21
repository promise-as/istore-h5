import React, { Component } from "react"
import ReactDOM from "react-dom"


class ErrorWrap extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return (<div className="error-wrap">
           505页面
        </div>)
    }
}


ReactDOM.render(<ErrorWrap/>,
    document.getElementById('istore-app'))



