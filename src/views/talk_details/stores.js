import { observable,action } from 'mobx'

import pageinitStore from './../../stores/pageinit' // 页面初始化Load

import * as request from './../../library/request/index'

import Toastr from './../../library/components/toastr/index'

// 微说详情
class TalkDetailsStore {
    @observable talkDetailsInfo = {}

    @action sendUserTalkGetTalkDetailByIdReqeust(talkId) { // 获取微说详情
        pageinitStore.decreaseStep('sendUserTalkGetTalkDetailByIdReqeust')

        request.sendRequest({
            url: request.map_route_api.API_User_Talk_GetTalkDetailById,
            params: {
                talkId: talkId,
            },
            success_function: (resulte) => {
                this.talkDetailsInfo = resulte.data
                // this.resetTalkDetailsInfoHandle()
                
                pageinitStore.increaseStep('sendUserTalkGetTalkDetailByIdReqeust')
            },
            error_function: (resulte={}) => {
                new Toastr().error(resulte.message)
                pageinitStore.increaseStep('sendUserTalkGetTalkDetailByIdReqeust')
            }
        })
    }
    @action resetTalkDetailsInfoHandle() { // 对微说详情数据进行重新设置
        let baseMap = this.talkDetailsInfo.baseMap

        // 用户头像
        if (baseMap && baseMap.headImgUrl) {
            let baseMapHeadImgUrl = baseMap.headImgUrl.split('?')[0]
            baseMap.headImgUrl = baseMapHeadImgUrl + `?x-oss-process=image/resize,w_${50}`
        }
        
    }
}

const stores = {
    pageinitStore,
    talkDetailsStore: new TalkDetailsStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores