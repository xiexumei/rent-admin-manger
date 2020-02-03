import request from '@/utils/request2.js'

// 获取房屋信息
export function getAllHouse(skip, size) {
  return request({
    url: '/house/getAllHouseInfo',
    method: 'post',
    params: {
      skip: skip,
      size: size
    },
  })
}
//房屋搜索框
export function searchHouse(skip, size,TypeRegionName) {
  return request({
    url: '/house/getFuzzyHouseInfo',
    method: 'post',
    params: {
      skip: skip,
      size: size,
      TypeRegionName:TypeRegionName
    },
  })
}
//用户搜索框
export function searchUser(skip, size,nameIphone) {
  return request({
    url: '/house/getTenantFuzzy',
    method: 'post',
    params: {
      skip: skip,
      size: size,
      nameIphone:nameIphone
    },
  })
}
// 上传房源信息
export function uploadHouse(house, equipment, templateIds) {
  console.log(house);
  return request({
    url: '/uploadhouse/uploadHouseInfo',
    method: 'post',
    params: {
      house,
      equipment,
      templateIds
    },
  })
}
// 查看房屋详情
export function selectHouse(id) {
  return request({
    url: '/selecthouse/getHouseInfoById',
    method: 'post',
    params: {
      id
    },
  })
}
// 上架房屋
export function  Uppershelf(houseId) {
  return request({
    url: '/delecthouse/addHouseInfoStatus',
    method: 'post',
    params: {
      houseId: houseId
    },
  })
}
//下架房屋
export function delectHouse(houseId) {
  return request({
    url: '/delecthouse/deleteHouseInfo',
    method: 'post',
    params: {
      houseId: houseId
    },
  })
}
// 获取合同模板
export function getAllTemplates(skip, size) {
  return request({
    url: '/Templates/getContractTemplate',
    method: 'post',
    params: {
      skip: 0,
      size: -1
    },
  })
}
// 获取签约列表
export function getAllSinge(skip, size) {
  return request({
    url: '/singe/getAppointmentList',
    method: 'post',
    params: {
      skip: skip,
      size: size
    },
  })
}
// 修改预约状态和感受
export function updateAppointmentResult(status, tenantFeel, appointmentId) {
  return request({
    url: '/singe/updateAppointmentResult',
    method: 'post',
    params: {
      status: status,
      tenantFeel: tenantFeel,
      appointmentId: appointmentId
    },
  })
}
// 上传图片
export function uploadImg(img) {
  return request({
    url: '/updateImg/updateImg',
    method: 'post',
    params: {
      img
    },
  })
}
// 签约合同管理获取合同列表
export function contractList(skip, size, contract) {
  return request({
    url: '/getContract/getContractListWithUpdateFileStatus',
    method: 'post',
    params: {
      skip,
      size,
      contract: {}
    },
  })
}
//退房模块获取合同列表
export function checkoutcontractList(skip, size, contract) {
  return request({
    url: '/getContract/getContractListWithUpdateFileStatus',
    method: 'post',
    params: {
      skip,
      size,
      contract: {
        Status:"申请退款中"
      }
    },
  })
}
//拒绝用户退房申请
export function refusecheckout(conttactId) {
  return request({
    url: '/getContract/refuseTerminationContract',
    method: 'post',
    params: {
      skip,
      size,
      contract: {
        Status:"申请退款中"
      }
    },
  })
}
// 下载合同附件
export function downloadContract(contractId) {
  return request({
    url: '/DownloadContract/downloadContractFile',
    method: 'post',
    params: {
      contractId,
    },
    responseType: 'arraybuffer',
  })
}
// 生成合同
export function makecontract(contractInfo) {
  return request({
    url: '/makeContract/createContract',
    method: 'post',
    params: {
      contractInfo,
    },
  })
}
// 上传合同附件
export function upContractCopy(contractId, contractFile) {
  return request({
    url: '/updateContractFile/updateContractFile',
    method: 'post',
    params: {
      contractId,
      contractFile
    },
  })
}
// 获取合同应付款
export function getPayMoneys(contractId) {
  return request({
    url: '/getPayMoney/getPayMoney',
    method: 'post',
    params: {
      contractId: contractId
    },
  })
}
// 确认租期线下支付
export function getPayOk(payableId) {
  return request({
    url: '/payOk/payPayable',
    method: 'post',
    params: {
      payableId
    },
  })
}
// 获取所有租户列表
export function getAllUser(skip,size) {
  return request({
    url: '/payOk/getAllTenant',
    method: 'post',
    params: {
      skip,
      size
    },
  })
}
//生成定金订单
export function createorder(deposit) {
  return request({
    url: '/Generatedepositorder/createDeposit',
    method: 'post',
    params: {
      deposit
    },
  })
}
//查看定金订单列表
export function getOrderList(skip,size) {
  return request({
    url: '/getOrderList/getDepositList',
    method: 'post',
    params: {
      skip,
      size
    },
  })
}
//线下支付定金
export function Offlinepaymentdeposit(deposit) {
  return request({
    url: '/getOrderList/payDeposit',
    method: 'post',
    params: {
      deposit
    },
  })
}
