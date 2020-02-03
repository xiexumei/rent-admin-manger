import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Dashboard'

Vue.use(VueRouter)

export const constantRouterMap = [

  {
    path: '/',
    redirect: '/login',
    name: '首页',
    component: home,
    leaf: true,
    meta: {
      title: 'admin',
      roles: ['common']
    },
    children: [
      {
        path: '/index',
        component: resolve => require(['@/components/Dashboard'], resolve),
        name: '首页',
        iconCls: 'iconfont icon-yemian-copy-copy',
        meta: {
          roles: ['common']
        }
      }
    ]
  },

  {
    path: '/login',
    hidden: true,
    component: resolve => require(['@/views/Login/Login'], resolve),
    meta: {
      title: 'admin',
      roles: ['common']
    }
  },
]




export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


/** */

export const asyncRouterMap = [

  {
    path: '/',
    component: home,
    name: '权限设置',
    iconCls: 'iconfont icon-ziyuan',
    leaf: false,
    meta: {
      roles: ['/AdminServiceSvr']

    },
    children: [

      {
        path: '/setRole',
        component: resolve => require(['@/views/Home/components/setRole.vue'], resolve),
        name: '设置角色权限',
        iconCls: 'el-icon-star-on'
      },
      {
        path: '/mangerlist',
        component: resolve => require(['@/views/Home/components/manger'], resolve),
        name: '负责人列表',
        iconCls: 'el-icon-star-on'
      },



    ]

  },


  /*预约签约管理权限*/
  {
    path: '/',
    component: home,
    name: '预约签约',
    iconCls: 'iconfont icon-yuyue1',
    leaf: false,
    meta: {
      roles: ['/ManagementServiceSvr']
    },
    children: [
      {
        path: '/appointment',
        component: resolve => require(['@/components/Contract/Appointment.vue'], resolve),
        name: '预约处理',
        iconCls: 'el-icon-star-on'
      },
      {
        path: '/signinguser',
        component: resolve => require(['@/components/Contract/SigningUser.vue'], resolve),
        name: '定金处理',
        iconCls: 'el-icon-star-on'
      },

      {
        path: '/contract',
        component: resolve => require(['@/components/Contract/contract.vue'], resolve),
        name: '合同处理',
        iconCls: 'el-icon-star-on'
      },
      {
        path: '/Checkouthouse',
        component: resolve => require(['@/components/Contract/CheckoutHouse.vue'], resolve),
        name: '退房处理',
        iconCls: 'el-icon-star-on'
      },
      {
        path: '/SignUserInfo',
        hidden:true,
        component: resolve => require(['@/components/Contract/signUserInfo.vue'], resolve),
        name: '签约详情',
        iconCls: 'el-icon-star-on'
      },
    ]
  },



  /**房屋管理 */
  {
    path: '/',
    component: home,
    name: '房屋管理',
    iconCls: 'iconfont icon-chazhaofangyuan',
    meta: {
      roles: ['/HouseServiceSvr']
    },
    leaf: false,
    children: [
      {
        path: '/addHouse2',
        component: resolve => require(['@/components/House/components/houseAdd.vue'], resolve),
        name: '上传房源信息',
        iconCls: 'el-icon-star-on'
      },

      {
        path: '/addHouse',
        component: resolve => require(['@/components/House/HouseMng.vue'], resolve),
        name: '房源管理',
        iconCls: 'el-icon-star-on'
      },
     
    ]
  },


  /*账单及合同模板管理权限*/

  {
    path: '/',
    component: home,
    name: '资金管理',
    iconCls: 'iconfont icon-hetongguanli',
    leaf: false,
    meta: {
      roles: ['/SingedServiceSvr']
    },
    children: [
      {
        path: '/Earnestmoney',
        component: resolve => require(['@/components/MoneyAdmin/components/earnestmoney.vue'], resolve),
        name: '定金订单',
        iconCls: 'el-icon-star-on'
      },
      {
        path: '/Transactionrecord',
        component: resolve => require(['@/components/MoneyAdmin/components/TransactionRecord.vue'], resolve),
        name: '交易账单明细',
        iconCls: 'el-icon-star-on'
      },


      {
        path: '/ContractTemplate',
        component: resolve => require(['@/components/MoneyAdmin/components/ContractTemplate.vue'], resolve),
        name: '上传合同模板',
        iconCls: 'el-icon-star-on'
      }
    ]
  },





  /*  {
      path: '/',
      component: home,
      name: '用户管理',
      iconCls: 'iconfont icon-yonghuguanli',
      meta:{
        roles:['/AdminServiceSvr']

      },
      leaf: false,
      children: [
        {
          path: '/mangerlist',
          component: resolve => require(['@/views/Home/components/manger'], resolve),
          name: '负责人列表',
          iconCls: 'el-icon-star-on' },
        {
            path: '/userlist',
            component: resolve => require(['@/views/Home/components/user'], resolve),
            name: '租户列表',
            iconCls: 'el-icon-star-on' }
      ]
    },

    {
      path: '/',
      component: home,
      name: '权限设置',
      iconCls: 'iconfont icon-ziyuan',
      leaf: false,
      meta:{
        roles:['/AdminServiceSvr']

      },
      children: [
        {
          path: '/setRole',
          component: resolve => require(['@/views/Home/components/setRole.vue'], resolve),
          name:'设置角色权限',
          iconCls: 'el-icon-star-on' },

        {
          path: '/setprower',
          component: resolve => require(['@/views/Home/components/Power.vue'], resolve),
          name:'设置负责人权限',
          iconCls: 'el-icon-star-on' },


      ]

    },


    /*预约签约管理权限*/
  /*  {
      path: '/',
      component: home,
      name: '预约签约管理',
      iconCls: 'iconfont icon-yuyue1',
      leaf: false,
      meta:{
        roles:['/ManagementServiceSvr']
      },
      children: [
        {
          path: '/appointment',
          component: resolve => require(['@/components/Contract/Appointment.vue'], resolve),
          name: '预约管理',
          iconCls: 'el-icon-star-on'
        },
        {
          path: '/signinguser',
          component: resolve => require(['@/components/Contract/SigningUser.vue'], resolve),
          name: '已签约用户管理',
          iconCls: 'el-icon-star-on' },

        {
          path: '/contract',
          component: resolve => require(['@/components/Contract/contract.vue'], resolve),
          name: '已签约用户合同管理',
          iconCls: 'el-icon-star-on'
        },

      ]
    },


     /**房屋管理 */
  /*{
    path: '/',
    component: home,
    name: '房屋管理',
    iconCls: 'iconfont icon-chazhaofangyuan',
    meta:{
      roles:['/HouseServiceSvr']
    },
    leaf: false,
    children: [
      {
        path: '/addHouse',
        component: resolve => require(['@/components/House/HouseMng.vue'], resolve),
        name: '上传房源信息',
        iconCls: 'el-icon-star-on'
      },

    ]
  },


  /*账单及合同模板管理权限*/

  /*  {
      path: '/',
      component: home,
      name: '账单及合同模板管理',
      iconCls: 'iconfont icon-hetongguanli',
      leaf: false,
      meta:{
        roles:['/SingedServiceSvr']
      },
      children: [
        {
           path: '/Transactionrecord',
           component: resolve => require(['@/components/MoneyAdmin/components/TransactionRecord.vue'], resolve),
            name: '交易账单明细',
            iconCls: 'el-icon-star-on'
           },
        {
          path: '/Earnestmoney',
          component: resolve => require(['@/components/MoneyAdmin/components/earnestmoney.vue'], resolve),
          name: '租金账单',
          iconCls: 'el-icon-star-on'
        },

        {
          path: '/rateEcharts',
          component:  resolve => require(['@/components/MoneyAdmin/components/ContractTemplate.vue'], resolve),
          name: '上传合同模板',
          iconCls: 'el-icon-star-on'
        }
      ]
    },*/


]






