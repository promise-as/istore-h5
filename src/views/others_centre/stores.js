import { observable,action } from 'mobx'

import pageinitStore from './../../stores/pageinit' // 页面初始化Load

import * as request from './../../library/request/index'

import Toastr from './../../library/components/toastr/index' // 状态码

// 他人主页
class PoseDetailsStore {
    @observable pronDetaiInfo = {}

    // @params   pronId  用户id
    @action sendGetUserPronDetaiReqeust(pronId) { // 获取用户主页详情
        pageinitStore.decreaseStep('sendGetUserPronDetaiReqeust')

        request.sendRequest({
            url: request.map_route_api.API_User_GetUserPronDetail,
            params: {
                pronId: pronId,
            },
            success_function: (resulte) => {
                this.pronDetaiInfo = resulte.data
                // this.resetPostDetailInfoHandle()
                
                pageinitStore.increaseStep('sendGetUserPronDetaiReqeust')
            },
            error_function: (resulte={}) => {
                new Toastr().error(resulte.message)
                pageinitStore.increaseStep('sendGetUserPronDetaiReqeust')
            }
        })
    }
    @action resetPostDetailInfoHandle() { // 对活动详情数据进行重新设置
        let userMap = this.pronDetaiInfo.userMap

        // 用户头像
        if (userMap && userMap.headImgUrl) {
            let userMapHeadImgUrl = userMap.headImgUrl.split('?')[0]
            userMap.headImgUrl = userMapHeadImgUrl + `?x-oss-process=image/resize,w_${60}`
        }
        
    }
}

const stores = {
    pageinitStore,
    poseDetailsStore: new PoseDetailsStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores