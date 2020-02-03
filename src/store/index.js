import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import permission from './modules/permissions'
import addhouse from './modules/addhouse'
import user from './modules/user'
import contract from './modules/contract'
import {stat} from 'fs'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 初始化
    totalCount: "",
    pageSize: "",
    contractid: "",
    contractids: "",
    contid: "",
    appointmentid: "",
    housedate: "",
    num: "",
    contractCopyId: "",
    // row:"",
    rowid: "",
    resDate: "",
    houseid: "",
    userid: "",
    contractidscopy: '',
    contractTemId: '',
    contractTemId1: '',
    contidtem: '',
    cbid: '',
    updatecbid: '',
    updatecbidxj: '',
    updatecbidsj: '',
    getcbContractid: '',
    Appointmentid: '',
    // getContractIdCopy:'',
    paymoneybyid: '',
    Appointmentids: '',
    orderId: '',
    positobj: '',//线下支付定金刷新
    getContractIdCopys: '',
    getcontractTemId: '',
    UploadContractdata: '',//上传合同实时刷新
  },
  mutations: {
    // 将变量存放于state中
    // 当前总个数
    getTotalCount(state, count) {
      state.totalCount = count;
    },
    // 获取每页个数
    getPageSize(state, size) {
      state.pageSize = size;
    },
    //上传合同附件获取合同id
    // getContractId(state,contractidscopys){
    //   state.contractidscopy = contractidscopys;
    // },
    //上传副本的时候的合同id
    // getContractIdCopyFile(state,getContractIdCopys){
    //   state.getContractIdCopy = getContractIdCopys;
    // },
    //获取合同模板id
    getContractTemId(state, contractTemIds) {
      state.contractTemId = contractTemIds;
    },
    //更新合同模板id
    getContractTemIds(state, contractTemIds1) {
      state.contractTemId1 = contractTemIds1;
    },
    // 回传合同模板id
    contractId(state, contids) {
      state.contid = contids;
    },
    //更新回传模板id
    returncontracttem(state, contidtems) {
      state.contidtem = contidtems;
    },
    // 获取预约id
    getAppointmentId(state, appointmentId) {
      state.appointmentid = appointmentId;
    },
    //获取房屋信息
    changeHouse(state, housedates) {
      state.housedate = housedates;
    },
    // 刷新页面
    changeMain(state, nums) {
      state.num = nums;
    },
    // 下载合同
    getContractCopyId(state, contractCopyIds) {
      state.contractCopyId = contractCopyIds;
    },
    // 获取收租信息
    // getrow(state,rows){
    //   state.row = rows;
    // },
    // 传递合同id
    getResDateid(state, rowids) {
      state.rowid = rowids;
    },
    // 合同收付款信息
    getResDate(state, resdate) {
      state.resDate = resdate;
    },
    // 获取房屋id
    changeHouseId(state, houseids) {
      state.houseid = houseids;
    },
    // 获取用户id
    changeUserId(state, userids) {
      state.userid = userids;
    },
    //  添加房屋回传id
    cbhouseId(state, cbids) {
      state.cbid = cbids
    },
    //  更新房屋会传ｉｄ
    updatecbhouseId(state, updatecbids) {
      state.updatecbid = updatecbids;
    },
    //  下架
    cbhouseIdxiajia(state, updatecbidsxjs) {
      state.updatecbidxj = updatecbidsxjs;
    },
    //  上架
    cbhouseIdshangjia(state, updatecbidsjs) {
      state.updatecbidsj = updatecbidsjs;
    },
    //  生成合同
    getcbContractid(state, getcbContractids) {
      state.getcbContractid = getcbContractids;
    },
    //  更新预约
    appointmentid(state, appointmentids) {
      state.Appointmentids = appointmentids;
    },
    //  线下支付
    getmoneybyid(state, paymoneybyids) {
      state.paymoneybyid = paymoneybyids;
    },
    //  定金订单id实时刷新
    getOrderId(state, orderids) {
      state.orderId = orderids;
    },
    //  实时刷新线下定金支付
    changedepositobj(state, positobjs) {
      state.positobj = positobjs;
    },
    //上传合同附件实时刷新
    UploadContractRefresh(state,UploadContractdatas){
        state.UploadContractdata = UploadContractdatas;
    }
  },
  actions: {},
  modules: {
    permission,
    addhouse,
    user,
    contract
  },
  getters
})


export default store
