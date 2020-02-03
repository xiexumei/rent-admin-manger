<template>
  <!-- 预约管理模块 -->
  <div class="house">
      <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div>
      <Table :tableData="tableData" :tablelist="tablelist"></Table>
    </div>

  </div>
</template>

<script type="text/javascript">
    import Table from "@/components/Contract/components/AppointmentTable.vue";
    import Pagination from "@/components/Pagination/Pagination.vue";
    import {getAllSinge} from "@/interfance/GetVersion.js";
import Loading from "@/components/Loading";
    export default {
        data() {
            return {
              // isLoading:true,//加载动画
                dialogFormVisible: false, //控制表单是否显示
                // 当前页
                currentPage: 1,
                // 每页显示条数
                pagesize: 30,
                // 总记录条数
                totalCount: 0,
                tablelist: {
                    TenantName: "用户姓名",
                    PhoneNum: "用户手机号码",
                    HouseId: "房屋编号",
                    BookTime: "预约时间",
                    Status: "处理状态",
                    TenantFeel: "用户回馈",
                    caozuo: "操作"
                },
                tableData: []
            };
        },
        components: {
            Table,
            Pagination,
             Loading
        },
        created() {
            // 获取预约信息
            this.getTableData(this.currentPage, this.pagesize)
        },
        computed: {
            appointmentid() {
                return this.$store.state.Appointmentids;
            },
        },
        watch: {
            appointmentid: {
                handler(n, o) {
                    console.log(n);
                    this.getTableData(this.currentPage, this.pagesize);
                }
            }
        },
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
            // 获取预约信息
            async getTableData(pageIndex, pageSize) {
                pageIndex = (pageIndex - 1) * pageSize;
                return await getAllSinge(pageIndex, pageSize).then(res => {
                    // 时间转换
                    let oldDate1 = res.BookTime;
                    let newDate1 = new Date(oldDate1).Format("yyyy-MM-dd");
                    item.BookTime = newDate1;
                    // 获取总长度
                    this.totalCount = res._Items.length;
                    // console.log(this.totalCount);
                    this.$store.commit("getTotalCount", this.totalCount);
                    // 为表格赋值数据
                    // console.log(res._Items.length);
                    this.tableData = res._Items.map(item => {
                        return item;
                    });
                    return res._Items.length;
                });
            }
        },
        mounted() {
            // 获取预约信息
            this.getTableData(this.currentPage, this.pagesize);
        }
    };
</script>
<style type="text/css" scoped>
  .house {
    position: relative;
  }

  .position {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .noappointment {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .left-opration {
    margin-bottom: 15px;
    text-align: left;
  }
</style>
