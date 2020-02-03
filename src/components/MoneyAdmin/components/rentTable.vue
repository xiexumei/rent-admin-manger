<template>
  <div>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="depDatas"
      tooltip-effect="dark"
      style="width: 100%"
       header-cell-style="background:rgb(234,238,243)"
      @selection-change="handleSelectionChange"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号"></el-table-column>
      <!-- 勾选框 -->
      <el-table-column type="selection" ></el-table-column>
      <!-- 用户 -->
      <el-table-column prop="user" :label="tablelist.user">
      </el-table-column>
      <!-- 房屋名称 -->
      <el-table-column prop="housename" :label="tablelist.name" ></el-table-column>
      <!-- 缴纳时间 -->
      <el-table-column prop="address" :label="tablelist.time" ></el-table-column>
      
      <!-- 支付金额 -->
      <el-table-column prop="paymoney" :label="tablelist.paymoney"  show-overflow-tooltip></el-table-column>
      <!-- 账单状态 -->
      <el-table-column prop="Status" :label="tablelist.state">
       
      </el-table-column>
    </el-table>
     
  </div>
</template>

<script>

import store from '@/store'
import Rentmoneydetails from "@/components/Moneyadmin/components/rentmoneydetails.vue";
export default {
  props: ["tablelist"],
  data() {
    return {
    
      multipleSelection: [],
      dialogFormVisibleRentmoneydetails: false,
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
      formLabelWidth: "120px",
      depDatas:[]
    };
  },
  components: {
    Rentmoneydetails,
  
  },
  computed:{
    _DepositList(){
      return store.getters.DepositList
    }

  },
  watch:{
     _DepositList:function(){
      console.log(this._DepositList)
      var newTable = this._DepositList
      newTable.forEach((item,index)=>{
        var obj = {}
        obj.user = item.Tenant.Name
        obj.housename = item.House.Name
        obj.address = item.House.City+item.House.Region+item.House.Place
        obj.Status = item.Deposit.Status
        obj.paymoney = item.Deposit.DepositMoney
        this.depDatas.push(obj)
        
      })
      this.total = this.depDatas.length

    }

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
    // 删除租金记录
    delectRentmoney() {
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
    // 查看租金账单详情
    rentmoneydetails(){
      this.dialogFormVisibleRentmoneydetails = !this.dialogFormVisibleRentmoneydetails;
    }
  }
};
</script>