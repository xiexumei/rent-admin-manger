<template>
  <div>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="120"></el-table-column>
      <!-- 勾选框 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 用户 -->
      <el-table-column prop="user" :label="tablelist.user" width="120">
      </el-table-column>
      <!-- 房屋名称 -->
      <el-table-column prop="name" :label="tablelist.name" width="260"></el-table-column>
      <!-- 缴纳时间 -->
      <el-table-column prop="time" :label="tablelist.time" width="120"></el-table-column>
      <!-- 账单状态 -->
      <el-table-column prop="state" :label="tablelist.state" width="120"></el-table-column>
      <!-- 支付金额 -->
      <el-table-column prop="paymoney" :label="tablelist.paymoney" width="120" show-overflow-tooltip></el-table-column>
      <!-- 操作处理 -->
      <el-table-column prop="caozuo" :label="tablelist.caozuo" show-overflow-tooltip>
        <!-- 删除定金记录按钮 -->
        <el-button type="danger" size="mini" @click="delectEarnestmoney">删除记录</el-button>
        <!-- 查看定金账单详情按钮 -->
        <el-button size="mini" @click="Earnestmoneydetails">租金账单详情</el-button>
      </el-table-column>
    </el-table>
    <Earnestmoneydetails @closeDig="dialogFormVisibleEarnestmoneydetails=false" :dialogFormVisible="dialogFormVisibleEarnestmoneydetails"></Earnestmoneydetails>
      <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
    
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/Pagination";
import Earnestmoneydetails from "@/components/Moneyadmin/components/Earnestmoneydetails.vue";
export default {
  props: ["tablelist", "tableData"],
  data() {
    return {
          //分页
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      multipleSelection: [],
      dialogFormVisibleEarnestmoneydetails: false,
      form: {
        state: "",
        feedback: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  components: {
    Earnestmoneydetails,
    Pagination
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 删除定金记录
    delectEarnestmoney() {
      this.$confirm("确认要删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          // DeleteUser(this.uniqId);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 查看定金账单详情
    Earnestmoneydetails(){
      this.dialogFormVisibleEarnestmoneydetails = !this.dialogFormVisibleEarnestmoneydetails;
    }
  }
};
</script>