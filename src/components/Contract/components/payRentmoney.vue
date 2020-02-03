<template>
  <el-dialog title="合同应付款详情" :visible.sync="show">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="合同" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ContractId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付日期" width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.PaymentDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="租金" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.Money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前期数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.CurrentPeriod }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总期数" width="70">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.AllPeriod }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付类型" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.PaymentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否支付" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isPaid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" :disabled="isdis" @click="pay(scope.$index, scope.row)">支付</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-tag
        @click="show = false;$emit('closeDig');tableData=[]"
        size="medium"
        type="danger"
        style="cursor:pointer"
      >取 消</el-tag>
      <el-tag type="primary" @click="queding" size="medium" style="cursor:pointer">确 定</el-tag>
    </div>
    <!-- <PayMoneyByRent @closeDig="dialogFormVisible1=false" :dialogFormVisible="dialogFormVisible1"></PayMoneyByRent> -->
  </el-dialog>
</template>
<script>
// import PayMoneyByRent from "@/components/Contract/components/PayMoneyByRent.vue";
import { getPayOk } from "@/interfance/GetVersion.js";
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      dialogFormVisible1: false, //控制表单是否显示
      isdis: true,
      tableData: [],
      show: false,
      ContractIds:"",
      form: {},
      formLabelWidth: "120px"
    };
  },
  components: {

  },
  computed: {
    getResDate() {
      return this.$store.state.resDate;
    },
    // 合同id
    getResDateid() {
      return this.$store.state.rowid;
    },
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    },
    // 合同id
    getResDate:{
      handler(n,o){
        console.log(n);
        this.ContractIds = n;
      }
    },
    // 合同收付款信息
    getResDate: {
      handler(n, o) {
        for (let i = 0; i < n.length; i++) {
          if(n[i].isPaid){
            n[i].isPaid="是";
          }else{
            n[i].isPaid="否";
            this.isdis = false;
          }
          let oldDate = n[i].PaymentDate;
          let newDate = new Date(oldDate ).Format("yyyy-MM-dd");
          n[i].PaymentDate = newDate;
          this.tableData.push(n[i]);
        }
      }
    }
  },
  methods: {
    async pay(index, row) {
      // console.log(row);
      this.dialogFormVisible1 = true;
      console.log(row.Id);
      var res = await getPayOk(row.Id);
      console.log(res);
      this.$store.commit("getmoneybyid", res);
      this.tableData = [];
      this.show = false;
      this.$emit('closeDig');
    },
    queding(){
      this.tableData = [];
      this.show = false;
      this.$emit('closeDig');
    }
  }
};
</script>



