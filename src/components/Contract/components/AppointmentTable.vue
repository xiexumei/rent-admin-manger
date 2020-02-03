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
      @selection-change="handleSelectionChange"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="120"></el-table-column>
      <!-- 用户名称 -->
      <el-table-column prop="TenantName" :label="tablelist.TenantName" width="120">
      </el-table-column>
      <!-- 用户手机号码 -->
      <el-table-column prop="PhoneNum" :label="tablelist.PhoneNum" width="120">
      </el-table-column>
      <!-- 房屋名称 -->
      <el-table-column prop="HouseId" :label="tablelist.HouseId" width="120"></el-table-column>
      <!-- 预约时间 -->
      <el-table-column prop="BookTime" :label="tablelist.BookTime" width="120"></el-table-column>
      <!-- 预约状态 -->
      <el-table-column prop="Status" :label="tablelist.Status" width="120"></el-table-column>
      <!-- 预约回馈 -->
      <el-table-column prop="TenantFeel" :label="tablelist.TenantFeel" show-overflow-tooltip></el-table-column>
      <!-- 操作处理 -->
      <el-table-column prop="caozuo" :label="tablelist.caozuo" show-overflow-tooltip>
         <template slot-scope="scope">
        <!-- 更改预约状态和预约回馈按钮 -->
           <el-button
             v-if="scope.row.Status == '已看房' || scope.row.Status == '已取消'"
             type="danger"
             size="mini"
             @click="updateStateandfeedback(scope.$index, scope.row)"
             style="cursor:pointer"
             disabled
           >更新预约状态及回馈</el-button>
           <el-button
             v-else="scope.row.Status == '未看房'"
             type="danger"
             size="mini"
             @click="updateStateandfeedback(scope.$index, scope.row)"
             style="cursor:pointer"
           >更新预约状态及回馈</el-button>
         </template>
      </el-table-column>

    </el-table>
    <UpdateAppointment @closeDig="dialogFormVisibleupdate=false" :dialogFormVisible="dialogFormVisibleupdate"></UpdateAppointment>
<!--    <Pagination></Pagination>-->
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/Pagination";
import UpdateAppointment from "@/components/Contract/components/UpdateAppointment.vue";
export default {
  props: ["tablelist", "tableData"],
  data() {
    return {
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormVisibleupdate: false,
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
    UpdateAppointment,
    // Pagination
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
      // console.log(val[0].Id);

    },
    // 更改预约处理及反馈
    updateStateandfeedback(index,row){
      this.dialogFormVisibleupdate = !this.dialogFormVisibleupdate;
      this.$store.commit("getAppointmentId",row.Id)
    }
  }
};
</script>
