<template>
  <!--  定金订单管理-->
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

      <!-- 用户 -->
      <el-table-column label="用户" width="100" prop="Tenant">
        <template slot-scope="scope">{{ scope.row.Tenant.Name }}</template>
      </el-table-column>
      <!-- 房屋 -->
      <el-table-column label="房屋" width="100" prop="House">
        <template slot-scope="scope">{{ scope.row.House.Name }}</template>
      </el-table-column>

      <!-- 定金金额 -->
      <el-table-column label="定金金额" width="100" prop="Deposit">
        <template slot-scope="scope">{{ scope.row.Deposit.DepositMoney }}</template>
      </el-table-column>

      <!-- 定金状态 -->
      <el-table-column label="定金状态" width="100" prop="Deposit">
        <template slot-scope="scope">{{ scope.row.Deposit.Status }}</template>
      </el-table-column>
      <!-- 生效时长 -->
      <el-table-column label="定金生效时长(天)" width="160" prop="Deposit">
        <template slot-scope="scope">{{ scope.row.Deposit.EffectiveTime }}</template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column prop="address" :label="tablelist.caozuo" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.Deposit.Status == '已支付' || scope.row.Deposit.Status == '已过期'" size="mini"
                     @click="OfflinePaymentDeposit(scope.$index, scope.row)" disabled style="cursor:pointer">线下支付
          </el-button>
          <el-button v-if="scope.row.Deposit.Status == '未支付'" size="mini"
                     @click="OfflinePaymentDeposit(scope.$index, scope.row)" style="cursor:pointer">线下支付
          </el-button>

          <el-dialog title="线下支付定金" :visible.sync="dialogVisible">
            <el-form :model="form">
              <el-form-item size="mini" label="生效时长(天)" :label-width="formLabelWidth">
                <el-input v-model="form.EffectiveTime" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item size="mini" label="房屋" :label-width="formLabelWidth">
                <el-input v-model="form.HouseName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item size="mini" label="用户" :label-width="formLabelWidth">
                <el-input v-model="form.TenantName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item size="mini" label="应付定金" :label-width="formLabelWidth">
                <el-input v-model="form.DepositMoney" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-tag
                @click="dialogVisible = false"
                size="medium"
                type="danger"
                style="cursor:pointer"
              >取 消</el-tag>
              <el-tag
                type="primary"
                @click="Paymentdeposit"
                size="medium"
                style="cursor:pointer"
              >确 定</el-tag>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column prop="address" :label="tablelist.detail" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag @click="goUserInfo(scope.row)">查看详情</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import viewgenerate from "@/components/Contract/components/viewgenerate.vue";
// import generateOrder from "@/components/Contract/components/generateOrder.vue";
// import Pagination from "@/components/Pagination/Pagination";
import { Offlinepaymentdeposit } from "@/interfance/GetVersion.js";

export default {
  props: ["tablelist", "tableData"],
  data() {
    return {
      multipleSelection: [],
      dialogVisible: false,
      depositobj: {},
      // dialogFormVisibleviewgenerate: false,
      // dialogFormVisiblegenerateOrder: false
      form: {
        EffectiveTime: "",
        HouseName: "",
        HouseId: "",
        TenantName: "",
        TenantId: "",
        DepositMoney: ""
      },
      formLabelWidth: "120px"
    };
  },
  components: {
    // viewgenerate,
    // generateOrder,
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
    },
    // 线下支付定金
    OfflinePaymentDeposit(index, row) {
      // console.log(111111)
      this.depositobj = row.Deposit;
      console.log(this.depositobj);
      this.dialogVisible = true;
      // console.log(row.Deposit.DepositMoney);
      this.form.EffectiveTime = row.Deposit.EffectiveTime;
      this.form.HouseName = row.House.Name;
      this.form.HouseId = row.House.Id;
      this.form.TenantName = row.Tenant.Name;
      this.form.TenantId = row.Tenant.Id;
      this.form.DepositMoney = row.Deposit.DepositMoney;
    },
    //  支付定金
    async Paymentdeposit() {
      this.dialogVisible = false;
      // console.log(this.depositobj);
      let res = await Offlinepaymentdeposit(this.depositobj);
      this.$store.commit("changedepositobj", res);
    }
  }
};
</script>
