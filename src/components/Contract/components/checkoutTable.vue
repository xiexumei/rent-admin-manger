<template>
  <div>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="580"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <!-- 租客 -->
      <el-table-column prop="TenantName" :label="tablelist.TenantName" width="80"></el-table-column>
      <!-- 房屋 -->
      <el-table-column prop="HouseName" :label="tablelist.HouseName" width="80"></el-table-column>
      <!-- 交付时间 -->
      <el-table-column prop="StartTime" :label="tablelist.StartTime" width="100"></el-table-column>
      <!-- 违约时间 -->
      <el-table-column prop="BreachTime" :label="tablelist.BreachTime" width="70"></el-table-column>
      <!-- 付款日 -->
      <el-table-column prop="PaymentDay" :label="tablelist.PaymentDay" width="60"></el-table-column>
      <!-- 付款类型 -->
      <el-table-column prop="PayType" :label="tablelist.payType" width="80"></el-table-column>
      <!-- 状态 -->
      <el-table-column prop="Status" :label="tablelist.Status" width="100"></el-table-column>
      <!-- 操作 -->
      <el-table-column prop="caozuo" :label="tablelist.caozuo" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="agree(scope.$index, scope.row)"
            type="danger"
            style="cursor:pointer"
          >同意
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="refuse(scope.$index, scope.row)"
            style="cursor:pointer"
          >拒绝
          </el-button>
          <el-button
            size="mini"
            @click="Payables(scope.$index, scope.row)"
            style="cursor:pointer"
          >应付款项
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {refusecheckout} from "@/interfance/GetVersion.js";

    export default {
        props: ["tablelist", "tableData"],
        data() {
            return {
                multipleSelection: [],
                dialogFormVisible: false, //控制表单是否显示
            };
        },
        components: {},
        methods: {
            //    拒绝用户申请退房
            async refuseCheckoutHouse(id){
                let res = await refusecheckout(id);
                console.log(res)
            },
            refuse(index,row) {
                console.log(row.Contractid);
                this.refuseCheckoutHouse(row.Contractid)
            }
        }
    };
</script>
