<template>
  <div class="checkout">
    <!--没有退房申请显示-->
    <div class="nocheckout" style="display: none;">
      <span class="iconadd">
        <i class="iconfont icon-tianjia"></i>
      </span>
      <span>暂无用户申请退房</span>
    </div>
    <!--有用户申请退房-->
    <div>
      <Table :tableData="tableData" :tablelist="tablelist"></Table>
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
    <!--    <AddContract-->
    <!--      @closeDig="dialogFormVisible=false;getTableData(currentPage, pagesize)"-->
    <!--      :dialogFormVisible="dialogFormVisible"-->
    <!--    ></AddContract>-->

  </div>
</template>

<script type="text/javascript">
    import Table from "@/components/Contract/components/checkoutTable.vue";
    import {checkoutcontractList} from "@/interfance/GetVersion.js";

    export default {
        data() {
            return {
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
                    caozuo: "操作"
                },
                tableData: []
            };
        },
        components: {
            Table
        },
        created() {
            // 获取预约信息
            this.getTableData(this.currentPage, this.pagesize);
        },
        computed: {},
        watch: {},
        methods: {
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
                return await checkoutcontractList(pageIndex, pageSize).then(res => {
                    console.log(res);
                    // 获取总长度
                    this.totalCount = res.TotalCount;
                    var data = res._Items
                    // 为表格赋值数据
                    data.forEach((item, index) => {
                        let contractobj = {};
                        // console.log(item)
                        contractobj.Contractid = item.Contract.Id;
                        contractobj.HouseId = item.Contract.HouseId;
                        contractobj.HouseName = item.Contract.House.Name;
                        contractobj.TenantId = item.Contract.TenantId;
                        contractobj.TenantName = item.Contract.Tenant.Name;
                        contractobj.ManagerId = item.Contract.ManagerId;
                        contractobj.StartTime = item.Contract.StartTime;
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
  .checkout {
    position: relative;
  }

  .position {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .nocheckout {
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>
