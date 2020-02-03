const getters = {
  token: state => state.user.token,
  address: state => state.addhouse.address,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  rolename: state => state.user.rolename,
  address: state => state.addhouse.address,
  rolesList: state => state.user.rolesList,
  mangerbyRole: state => state.user.mangerbyRole,
  allManger: state => state.user.allManger,
  DepositList:state => state.user.DepositList,
  total:state => state.user.total,

  //获取经度和纬度
  lng: state => state.addhouse.center[0],
  lat: state => state.addhouse.center[1]

}
export default getters
