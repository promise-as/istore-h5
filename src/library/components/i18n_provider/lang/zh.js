import appLocaleData from 'react-intl/locale-data/zh'
import messages from './json/zh.json'

const appLocale = {
    locale: 'zh',
    formats: {
        money: {
            currency: 'CNY',
        }
    },
    data: appLocaleData,
}

appLocale.messages = messages

export default appLocale