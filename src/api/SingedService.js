/**
 * 账单以及合同模板管理
 */

import request from '@/utils/request2'
/*查看交易记录*/
// export function getTradeRecordList(TenantId, HouseId, contractId){
//   return request({
//     url:'/mangerApi/getTradeRecordList',
//     methods: 'post',
//     params:{
//       tradeRecoed:JSON.stringify({
//         TenantId:TenantId,
//         HouseId:HouseId,
//         contractId:contractId
//       })
//     }
//   })
// }

export function getTradeRecordList(startTime, endTime, nameOrPhone, skip, size){
  return request({
    url:'/mangerApi/getTradeRecordList',
    methods: 'post',
    params:{
      startTime:startTime,
      endTime:endTime,
      nameOrPhone:nameOrPhone,
      skip:skip,
      size:size

 }

  })
}

/**
 * 查看定金
 */
export function getDepositList(status,username,skip, size){
  return request({
    url:'/getDeposApi/getDepositList',
    methods:'get',
    params:{
      
      status:status,
      name:username,
      skip:skip,
      size:size,
    }
  })

}

/**
 * 获取全部合同模板
 */
export function getAllTemplates(){
  return request({
    url:'/mangerApi/getAllTemplates',
    methods:'post',
  })

}

/**
 * 上传文件
 */
export function uploadFile(name, templateFile){
  return request({
    url:'/contract/updateContractTemplate',
    methods:'post',
    params:{
      name:name, 
      templateFile:templateFile

    }
  })
}
