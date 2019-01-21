import { observable,action } from 'mobx'
import { Modal,Toast } from 'antd-mobile'

import history from "../../../library/history"
import * as tools from './../../../library/tools/index'
import * as request from "../../../library/request"

import pageinitStore from './../../../stores/pageinit'
import PhoneToastr from "../../../library/components/phone_toastr"

const alert = Modal.alert;

// 标签与备注
class LabelRemarkStore {
    @observable rechargeDetail = {} //查询充值明细

    //查询充值明细
    @action sendRechargeDetail(id, type, successCall){
        pageinitStore.decreaseStep('sendRechargeDetail')

        request.sendRequest({
            url: request.map_route_api.API_Recharge_Detail,
            isEncryptionParams: true, //是否加密
            params: { //参数
                id: id,
                type: type
            },
            success_function: (result) => {
                if (!result.data.rechargeDetail.remarksImg) {
                    result.data.rechargeDetail.remarksImg = ''
                }

                this.rechargeDetail = result.data.rechargeDetail
                successCall(this.rechargeDetail)
                pageinitStore.increaseStep('sendRechargeDetail')
            },
            error_function: (result) => {
                new PhoneToastr().error(result.message)
                pageinitStore.increaseStep('sendRechargeDetail')
            }
        })
    }
    // 上传文件
    @action sendRechargeBillUploadImgRequest(params){
        pageinitStore.decreaseStep('sendRechargeBillUploadImgRequest')

        request.sendRequest({
            url: request.map_route_api.API_Recharge_Bill_UploadImg,
            formDataParams: params,
            isFormData: true,
            success_function: (result) => {
                this.rechargeDetail.remarksImg = result.data.remarksImg
                pageinitStore.increaseStep('sendRechargeBillUploadImgRequest')
            },
            error_function: (result) => {
                Toast.fail(result.message || '上传失败', 1)
                pageinitStore.increaseStep('sendRechargeBillUploadImgRequest')
            }
        })
    }

    //修改充值明细(备注，标注，账单分类)
    @action sendUpdateLabelRemark(params) {
        let {labelList, remarks} = params

        let {orderId} = tools.getUrlParam()
        let sendParams = {}
        let filtrateLabelList = labelList.map(item => [item.value]).join('|')
        pageinitStore.decreaseStep('sendLabelRemark')

        sendParams.id = orderId
        if (filtrateLabelList) {
            sendParams.tagging = filtrateLabelList
        }
        if (remarks) {
            sendParams.remarks = remarks
        }
        if (this.rechargeDetail.remarksImg) {
            sendParams.remarksImg = this.rechargeDetail.remarksImg
        }

        //标签
        if (!sendParams.tagging) {
            sendParams.tagging = ' ' //如果标签为空就给空字符串
        }

        request.sendRequest({
            url: request.map_route_api.API_Update_Recharge_Detail,
            isEncryptionParams: true, //是否加密
            params: sendParams,
            success_function: (result) => {
                pageinitStore.increaseStep('sendLabelRemark')
                try {
                    let localMyLabelList = window.localStorage.getItem('myLabelList') || ''
                    if (localMyLabelList) {
                        labelList.map((labelListItem, index) => {
                            localMyLabelList.split('|').map(localMyLabelListItem => {
                                if (labelListItem.value === localMyLabelListItem) {
                                    labelList.splice(index, 1)
                                }
                            })
                        })
                    }
                    let newLocalMyLabelList = localMyLabelList + labelList.map(item => [item.value]).join('|')
                    window.localStorage.setItem('myLabelList', newLocalMyLabelList)
                } catch (e) {
                    console.log(e)
                }

                Toast.success('保存成功', 1)
                setTimeout(()=>{history.go(-1)}, 1000)
            },
            error_function: (result) => {
                Toast.fail(result.message || '保存失败', 1)
                pageinitStore.increaseStep('sendLabelRemark')
            }
        })
    }

    // 不保存修改内容或者继续编辑
    @action isSaveLabelHandle() {
        setTimeout(()=> {
            alert('返回后', '将不保存本次修改内容', [
                {
                    text: '返回',
                    onPress: () => { history.go(-1) }
                },
                {
                    text: '继续编辑',
                    onPress: () => {}
                },
            ])
        }, 200)
    }
}

const stores = {
    pageinitStore,
    labelRemarkStore: new LabelRemarkStore(),
}

// For easier debugging
window._____APP_STATE_____ = stores;

export default stores