import request from '@/utils/request2'
import qs from 'qs'
/**
 * 用户登录方法 
 */
export function login(phone, password) {
  return request({
    url: '/userApi/login',
    method: 'post',
    params:{
      phone,
      password
    },
   
   
  })
}


/*测试接口登出 */
export function logout() {
  return request({
    url: '/userApi/logout',
    method: 'post'
  })
  
}

/**
 * 查看自己权限列表
 */
export function getRoleList(){
  return request({
    url:'/admin/getRoleList',
    method: 'post',
    params:{
      size:-1
    }
  })
}


/**
 * deleteManage 删除负责人
 */
 export function deleteManage(id){
   return request({
     url:'/admin/deleteManager',
     method: 'post',
     params:{
       id:id
     }
   })

 }


 /**
  * 创建角色列表
  */

export function  createRole(rolesName){
  return request({
    url:'/admin/createRole',
    method: 'post',
    params:{
      roleName:rolesName
    }
  })
}



export function  deleteRole(roleId){
  return request({
    url:'/admin/deleteRole',
    method: 'post',
    params:{
      roleId:roleId
    }
  })
}

/**
 * 获取负责人列表
 * roleId：11所有负责人 
 */
export function getUserList(skip, size, roleId){
  return request({
    url:'/admin/getUserList',
    method: 'post',
    params:{
      skip: skip,
      size: size,
      roleId:roleId

    }
  })
}

export function allHouseApi() {
  return request({
    url: '/houseApi/getAllHouseInfo',
    method: 'post',
    params: {
      skip:0,
      size:-1
    },
  })
}

/**
 * 添加负责人账号
 */
export function editManger(id,phone,name,password){
  return request({
    url:'/admin/addorUpdateManager',
    method:'post',
    params:{
       oldTenant:JSON.stringify({
       id:id,
       phone,
       name,
       password
       })

    }
  })
}
/**
 * 修改负责人账号
 */
export function addManger(phone,name,password){
  return request({
    url:'/admin/addorUpdateManager',
    method:'post',
    params:{
       oldTenant:JSON.stringify({
       phone,
       name,
       password
       })

    }
  })
}
/**
 * 查看所有用户信息
 */
export function getUserInfo(){
  return request({
    url:'/userApi/getSelfInfo',
    method:'get'
  })
}

/** 
 * 取消负责人所有角色
*/
export function cancelManagerRoles(managerId){
  return request({
    url:'/admin/cancelManagerRoles',
    method: 'post',
    params:{
      managerId:managerId
    }
  })
}

/**
 * 设置角色的权限
 */
export function setRightForRole(roleId, serviceIds){
  return request({
    url:'/admin/setRightForRole',
    method: 'post',
    params:{
      roleId:roleId,
      serviceIds:serviceIds

    }
  })
}

/**
 * 获取可分配服务列表
 */
export function getAllService(){
  return request({
    url:'/admin/getAllService',
    method:'get'
   
  })
}

/**
 * 修改权限接口
 */
export function assignRoletoManager(roleId, managerIds){
  return request({
    url:'/admin/assignRoletoManager',
    method:'post',
    params:{
      roleId:roleId,
      managerIds:managerIds

    }

  })

}

/**
 * 获取可分配服务列表
 */
export function getRentInfo(){
  return request({
    url:'/admin/getRentInfo',
    method:'get'
   
  })
}
// getRentInfo()

/**
 * 房屋信息
 */
export function getHouseInfoCount(){
  return request({
    url:'/admin/getHouseInfoCount',
    method:'get'
   
  })
}

/**
 * 按姓名和手机号搜索负责人
 */
export function searchManager(keyword){
return request({
  url:'/admin/searchManager',
  method:'get',
  params:{
    nameOrPhone:keyword
  }
})

  
}