import { login, logout,getUserInfo} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    unserinfo:{},
    rolesList:[],//所有角色列表
    mangerbyRole:[],//根据不同角色查用户
    allManger:[],
    DepositList:[],
    currentManger:{},
    total:0,//保存分页的总条数
    id: '',
    rolename:[],
    tradeRecordList:{},
    userRentInfo:{}//每个人的交易以及合同详情
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, unserinfo) =>{
      state.unserinfo = unserinfo
    },
    SET_ROLES:(state, roles) => {
      state.roles = roles
    },
    SET_ROLESLIST:(state, rolesList)=>{
      state.rolesList = rolesList
    },
    SET_MANGER_BY_ROLE:(state, mangerbyRole)=>{
      state.mangerbyRole = mangerbyRole
    },
    ALL_MANGERS:(state, allManger)=>{
      state.allManger = allManger
    },
    SET_DepositList:(state, DepositList) => {
      state.DepositList = DepositList
    },
    SET_CURRENTMANGER:(state, currentManger)=>{
      state.currentManger = currentManger
    },

    SET_total:(state, total)=>{
      state.total = total
    },
    SET_id:(state,id)=>{
      state.id = id
    },
    SET_ROLE_NAME:(state, role)=>{
      state.rolename = role
    },
    //交易账单明细
    SET_TradeRecordList:(state, tradeRecordList)=>{
      state.tradeRecordList = tradeRecordList
    },
    //每个人的交易账单以及房屋信息
    SET_userRentInfo:(state, userRentInfo) => {
      state.userRentInfo = userRentInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username

      return new Promise((resolve, reject) => {

        login(username, userInfo.password).then(response => {
          console.log(response)
          setToken(response.token)//存储token到cookie中
          console.log(getToken())
          localStorage.setItem('setRoles',JSON.stringify(response.msg.serviceMenus));
          commit('SET_TOKEN', response.token) //存token
          commit('SET_USERINFO', response.msg)//存用户信息
          commit('SET_id', response.msg.id)
          // commit('SET_ROLES', response.msg.serviceMenus)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

     // 获取用户信息
     GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          console.log(response)
          // const data = response.msg
          commit('SET_ROLES', response.ServiceMenus)
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
        //  console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
