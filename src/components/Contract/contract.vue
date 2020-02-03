<template>
  <div class="contract">
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>

    <!--有合同显示-->
    <div>
      <div class="opration">
        <div class="left-opration">
          <el-tag @click="addContract()" effect="dark" style="cursor:pointer">添加合同</el-tag>
        </div>
      </div>
      <div class="roleTable">
        <div class="role-border">
          <Table :tableData="tableData" :tablelist="tablelist"></Table>
        </div>
      </div>
    </div>
    <div class="rightBottom">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
    <AddContract
      @closeDig="dialogFormVisible=false;getTableData(currentPage, pagesize)"
      :dialogFormVisible="dialogFormVisible"
    ></AddContract>
  </div>
</template>

<script type="text/javascript">
    import Table from "@/components/Contract/components/ContractTable.vue";
    import Pagination from "@/components/Pagination/Pagination.vue";
    import AddContract from "@/components/Contract/components/AddContract.vue";
    import {contractList} from "@/interfance/GetVersion.js";
    import Loading from "@/components/Loading";

    export default {
        data() {
            return {
                isLoading: true,
                dialogFormVisible: false, //控制表单是否显示
                // 当前页
                currentPage: 1,
                // 每页显示条数
                pagesize: 20,
                // 总记录条数
                totalCount: 0,
                tablelist: {
                    HouseId: "房屋id",
                    Contractid: "合同id",
                    HouseName: "房屋名称",
                    TenantId: "租客id",
                    Phone:'电话号码',
                    TenantName: "租客名字",
                    ManagerId: "负责人",
                    ManagerName: "负责人名称",
                    StartTime: "交付时间",
                    EndTime: "到期时间",
                    BreachTime: "违约时间",
                    PaymentDay: "付款日",
                    payType: "付款类型",
                    Status: "状态",
                    Uploaded: "合同附件",
                    caozuo: "操作",
                    detail:"查看详情",
                    topay:"支付"
                },
                tableData: []
            };
        },
        components: {
            Table,
            Pagination,
            AddContract,
            Loading
        },
        created() {
            // 获取预约信息
            this.getTableData(this.currentPage, this.pagesize).then(res => {
                this.isLoading = false;
            });
        },
        computed: {
            getcbContractid() {
                return this.$store.state.getcbContractid;
            },
            getmoneybyid() {
                return this.$store.state.paymoneybyid;
            },
            //    上传合同实时刷新
            UploadContractRefresh() {
                return this.$store.state.UploadContractdata;
            }
        },
        watch: {
            getcbContractid: {
                handler(n, o) {
                    this.getTableData(this.currentPage, this.pagesize);
                }
            },
            getmoneybyid: {
                handler(n, o) {
                    this.getTableData(this.currentPage, this.pagesize);
                }
            },
            //    上传合同实时刷新
            UploadContractRefresh: {
                handler(n, o) {
                    this.getTableData(this.currentPage, this.pagesize);
                }
            }
        },
        methods: {
            //控制页面跳转
            goUserInfo() {
                this.$router.push({
                    path: '/index/userInfo',
                    query: {
                        id: 1
                    }
                })
            },
            addContract() {
                this.dialogFormVisible = true;
                // console.log(22);
            },
            // 每页条数切换
            handleSizeChange(val) {
                this.pagesize = val;
                // 获取预约信息
                this.getTableData(this.currentPage, this.pagesize);
            },
            // 页面切换
            handleCurrentChange(val) {
                this.currentPage = val;
                // 获取预约信息
                this.getTableData(this.currentPage, this.pagesize);
            },
            // 获取预约合同信息
            async getTableData(pageIndex, pageSize) {
                this.tableData = [];
                pageIndex = (pageIndex - 1) * pageSize;
                return await contractList(pageIndex, pageSize).then(res => {
                    console.log(res);
                    // 获取总长度
                    this.totalCount = res.TotalCount;
                    var data = res._Items;
                    // 为表格赋值数据
                    data.forEach((item, index) => {
                        let contractobj = {};
                        // console.log(item)
                        contractobj.Contractid = item.Contract.Id;
                        contractobj.HouseId = item.Contract.HouseId;
                        contractobj.HouseName = item.Contract.House.Name;
                        contractobj.TenantId = item.Contract.TenantId;
                        contractobj.TenantName = item.Contract.Tenant.Name;
                        contractobj.Phone = item.Contract.Tenant.Phone;
                        contractobj.ManagerId = item.Contract.ManagerId;
                        contractobj.StartTime = item.Contract.StartTime;
                        contractobj.EndTime = item.Contract.EndTime;
                        contractobj.BreachTime = item.Contract.BreachTime;
                        contractobj.ManagerId = item.Contract.ManagerId;
                        contractobj.Status = item.Contract.Status;
                        contractobj.PaymentDay = item.Contract.PaymentDay;
                        contractobj.PayType = item.Contract.PayType;
                        contractobj.Uploaded = item.Uploaded;
                        if (item.Uploaded) {
                            contractobj.Uploaded = "有";
                        } else {
                            contractobj.Uploaded = "无";
                        }
                        let oldDate1 = item.Contract.StartTime;
                        let newDate1 = new Date(oldDate1).Format("yyyy-MM-dd");
                        contractobj.StartTime = newDate1;
                        let oldDate2 = item.Contract.EndTime;
                        let newDate2 = new Date(oldDate1).Format("yyyy-MM-dd");
                        contractobj.EndTime = newDate2;
                        // console.log(contractobj)
                        this.tableData.push(contractobj);
                    });
                    return res.TotalCount;
                });
            }
        }
    };
</script>
<style type="text/css" scoped>
  .contract {
    position: relative;
  }


  .opration {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    margin-bottom: 1%;
    padding-left: 2%;
    background-color: #fff;
  }

  .left-opration {
    float: left;
  }

  .right-opration {
    float: right;
  }

  .nocontract {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .roleTable {
    padding: 2%;
    background-color: #fff;
  }

  .role-border {
    padding: 2%;
    border: 1px solid rgb(209, 209, 209);
  }
</style>
