<template>
  <!-- 定金订单管理模块 -->
  <div class="house">
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <!--没有定金订单显示-->
    <div class="noappointment" style="display: none;">
      <span class="iconadd">
        <i class="iconfont icon-tianjia"></i>
      </span>
      <span>暂无定金订单信息，快去生成吧</span>
    </div>
    <!--有预约显示-->
    <div>
      <div class="opration">
        <div class="left-opration">
          <el-tag @click="addDepositOrder()" effect="dark" style="cursor:pointer">生成定金订单</el-tag>
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
    <AddDepositOrder
      @closeDig="dialogFormVisibleorder=false"
      :dialogFormVisible="dialogFormVisibleorder"
    ></AddDepositOrder>
  </div>
</template>

<script type="text/javascript">
import Table from "@/components/Contract/components/SigningUserTable.vue";
import AddDepositOrder from "@/components/Contract/components/DepositOrder.vue";
import { getOrderList } from "@/interfance/GetVersion.js";
import Loading from "@/components/Loading";
export default {
  data() {
    return {
      isLoading: true,
      dialogFormVisibleorder: false, //控制表单是否显示
      // 当前页
      currentPage: 1,
      // 每页显示条数
      pagesize: 20,
      // 总记录条数
      totalCount: 0,
      tablelist: {
        EffectiveTime: "生效时长(天)",
        Status: "定金状态",
        TenantName: "用户",
        HouseName: "房屋",
        DepositMoney: "定金金额",
        caozuo: "操作",
        detail:"查看详情"
      },
      tableData: []
    };
  },
  components: {
    Table,
    Loading,
    AddDepositOrder
  },
  computed: {
    //  定金订单id
    getOrderId() {
      return this.$store.state.orderId;
    },
    //    线下支付定金刷新
    changedepositobj() {
      return this.$store.state.positobj;
    }
  },
  watch: {
    //  定金订单id
    getOrderId: {
      handler(n, o) {
        if (n) {
          this.getTableData(this.currentPage, this.pagesize);
        }
      }
    },
    //    线下支付定金刷新
    changedepositobj: {
      handler(n, o) {
        if (n) {
          this.getTableData(this.currentPage, this.pagesize);
        }
      }
    }
  },
  methods: {
    // 每页条数切换
    handleSizeChange(val) {
      this.pagesize = val;
      // 获取房屋信息
      this.getTableData(this.currentPage, this.pagesize);
    },
    // 页面切换
    handleCurrentChange(val) {
      this.currentPage = val;
      // 获取房屋信息
      this.getTableData(this.currentPage, this.pagesize);
    },
    addDepositOrder() {
      this.dialogFormVisibleorder = true;
    },
    //获取定金订单列表
    async getTableData(pageIndex, pageSize) {
      pageIndex = (pageIndex - 1) * pageSize;
      return await getOrderList(pageIndex, pageSize).then(res => {
        console.log(res);
        // 获取总长度
        this.totalCount = res.TotalCount;
        // 为表格赋值数据
        this.tableData = res.DepositAndHouseAndTenantList;
         console.log(this.tableData);
        return res.TotalCount;
      });
    }
  },
  mounted() {
    // 获取定金订单信息
    this.getTableData(this.currentPage, this.pagesize).then(res => {
      this.isLoading = false;
    });
  }
};
</script>
<style type="text/css" scoped>
.house {
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

.noappointment {
  position: absolute;
  top: 50%;
  left: 50%;
}

.left-opration {
  margin-bottom: 15px;
  text-align: left;
}

.roleTable {
  padding: 2%;
  background-color: #fff;
}

.role-border {
  padding: 2%;
  border: 1px solid rgb(209, 209, 209);
}

/*.rightBottom {*/
/*  width: 100%;*/
/*  position: absolute;*/
/*  bottom: 58px;*/
/*  height: 30px;*/
/*  line-height: 30px;*/
/*}*/
</style>
