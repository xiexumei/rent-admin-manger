import request from '@/utils/request2.js'

/**
 * 请求下载合同模板
 */
export function downLoad(contractId){
  return request({
    url:'/SingeApi/getContractTemplateFile',
    method: 'post',
    params:{
      contractId:contractId,
    },
    responseType: 'arraybuffer',
  })
}
//合同模板下载





//测试
export function test(depositId){
  return request({
    url:'/test/alipay/gopay',
    method: 'get',
    params:{
      payableId:26,
      depositId:0
    }
  })
}
