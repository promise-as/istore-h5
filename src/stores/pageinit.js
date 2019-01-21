import { observable, action, computed } from 'mobx'
import * as tools from "../library/tools"

// 页面初始化Load
export class PageinitStore {
    @observable maxstep = []
    @observable curstep = []
    @observable intl = {} // intl语言对象
    @observable i18nMessagesInfo = {} // 当前语言包对象
    // 加载语言包文件
    static getMessages(lang) {
        switch (lang) {
            case 'zh':
                return require('./../library/components/i18n_provider/lang/zh.js')
            default:
                return require('./../library/components/i18n_provider/lang/en.js')
        }
    }
    // 将语言包问对注入PageinitStore对象里
    @action setIntlHandle(intlObj) {
        this.intl = intlObj
    }
    @action setI18nMessagesInfoHandle(lang) {
        this.i18nMessagesInfo = PageinitStore.getMessages(lang)
        tools.setCookies('lang', this.i18nMessagesInfo.default.locale)
    }
    @action decreaseStep(_step) {
        this.curstep.indexOf(_step) > -1 && 
        this.curstep.splice(this.curstep.indexOf(_step), 1)
    }
    @action initState(maxstep, curstep) {
        if (!Array.isArray(maxstep) && !Array.isArray(curstep)) {
            console.log('maxstep及curstep实参不是array类型')
            return null
        }
        this.maxstep = maxstep
        this.curstep = curstep
    }
    @action increaseStep(_step) {
        this.curstep.indexOf(_step) === -1 && this.curstep.push(_step)
    }
    @computed get compare() {
        let maxstep = this.maxstep
        let curstep = this.curstep
        
        return (maxstep.length === curstep.length)
    }
}

export default new PageinitStore()