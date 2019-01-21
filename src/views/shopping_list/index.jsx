import React, { Component } from "react"
import ReactDOM from "react-dom"
import stores from "./stores"
import { Provider,observer,inject } from 'mobx-react'

import I18nProvider from './../../library/components/i18n_provider/index'

import './index.scss'
import * as tools from "../../library/tools"

// 购物车列表
@inject('pageinitStore')
@inject('shopgpsstore')
@observer
class ShoppingListWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shoppingList: [],
            shoppingTitle: '',
            isAllSelect: false, // 是否全部选择
        }
    }
    componentWillMount() {
        let userName = tools.getUrlParam('userName')
        let cartIds = tools.getUrlParam('cartIds')

        document.title = `${userName}购物清单`
        this.props.pageinitStore.initState(
            ['sendGetShoppingCartReqeust',],
            ['sendGetShoppingCartReqeust',],
        )
        this.props.shopgpsstore.sendGetShoppingCartReqeust(cartIds)
    }
    selectShoppingItem(item, index) {
        let shoppingList = this.props.shopgpsstore.shoppingList.splice('')

        item.actionStatus = !item.actionStatus
        shoppingList[index] = item

        this.props.shopgpsstore.setShoppingListItems(shoppingList)
    }
    allShoppingListItems() {
        let shoppingList = this.props.shopgpsstore.shoppingList.splice('')

        this.setState({
            isAllSelect: !this.state.isAllSelect
        }, () =>{
            if (this.state.isAllSelect) {
                shoppingList.map((item) => {
                    item.actionStatus = true
                })
            } else {
                shoppingList.map((item) => {
                    item.actionStatus = false
                })
            }
            this.props.shopgpsstore.setShoppingListItems(shoppingList)
        })
    }
    render() {

        console.log(this.props.shopgpsstore.shoppingList)

        return <div className="shoppinglist-wrap">
            <div className="shoppinglist-header">
                购物车即可查看促销信息，赶快试试吧！
            </div>
            <div className="shoppinglist-main">
                {this.props.shopgpsstore.shoppingList.map((item, index) => {
                    return <div className="shoppinglist-item" key={index}>
                        <div
                            onClick={() => {this.selectShoppingItem(item, index)}}
                            className={
                                `shoppinglist-item-select${item.actionStatus ? ' select-action': ''}`
                            }>
                        </div>
                        <div
                            className="shoppinglist-item-img"
                            style={{backgroundImage: `url(${item.image})`}}
                        ></div>
                        <div className="shoppinglist-item-info">
                            <div className="item-info-title">{item.goodsName}</div>
                            <div className="item-info-price">￥{item.price}</div>
                        </div>
                    </div>
                })}

            </div>
            <div className="shoppinglist-footer">
                <div className="shoppinglist-footer-left" onClick={() => {this.allShoppingListItems()}}>
                    <div className={`left-icon${this.state.isAllSelect ? ' select-action':''}`}></div>
                    <div className="left-info">全选</div>
                </div>
                <div className="shoppinglist-footer-right" onClick={tools.clickToAppHandle}>我也要买</div>
            </div>
        </div>
    }
}

ReactDOM.render(<Provider {...stores}>
        <I18nProvider>
            <ShoppingListWrap/>
        </I18nProvider>
    </Provider>,document.getElementById('istore-app'))