<template>
  <el-dialog title="添加合同详情" :visible.sync="show">
    <el-form :model="form">
      <button @click="selecthouse">选择房屋</button>
      <el-form-item size="mini" label="房屋" :label-width="formLabelWidth">
        <el-input disabled v-model="form.HouseName" autocomplete="off"></el-input>
      </el-form-item>
      <button @click="selectuser">选择用户</button>
      <el-form-item size="mini" label="用户" :label-width="formLabelWidth">
        <el-input disabled v-model="form.TenantName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="合同开始时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.StartTime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item size="mini" label="合同结束时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.EndTime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item size="mini" label="违约时长" :label-width="formLabelWidth">
        <el-input
          v-model="form.BreachTime"
          placeholder="请输入1到15"
          autocomplete="off"
          @blur="viewday"
        ></el-input>
        <span class="span1">{{msg2}}</span>
      </el-form-item>
      <el-form-item size="mini" label="付款日" :label-width="formLabelWidth">
        <el-input v-model="form.PaymentDay" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="付款类型" :label-width="formLabelWidth">
        <el-select v-model="form.payType" placeholder="请选择房屋交租类型" style="width: 100%">
          <el-option label="押一付三" value="押一付三" size="mini"></el-option>
          <el-option label="押一付六" value="押一付六" size="mini"></el-option>
          <el-option label="押一付十二" value="押一付十二" size="mini"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-tag
        @click="show = false;$emit('closeDig')"
        size="medium"
        type="danger"
        style="cursor:pointer"
      >取 消</el-tag>
      <el-tag type="primary" @click="addContract" size="medium" style="cursor:pointer">确 定</el-tag>
    </div>
    <selectHouseId
      @closeDig="dialogFormVisibleHouse=false"
      :dialogFormVisible="dialogFormVisibleHouse"
    ></selectHouseId>
    <selectUserId
      @closeDig="dialogFormVisibleUser=false"
      :dialogFormVisible="dialogFormVisibleUser"
    ></selectUserId>
  </el-dialog>
</template>
<script>
import { makecontract } from "@/interfance/GetVersion.js";
import selectHouseId from "@/components/Contract/components/selectHouseId.vue";
import selectUserId from "@/components/Contract/components/selectUserId.vue";
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      dialogFormVisibleHouse: false,
      dialogFormVisibleUser: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      show: false,
      msg1: "",
      msg2: "",
      contractObj: {},
      form: {
          HouseName:'',
        HouseId: "",
          TenantName:'',
        TenantId: "",
        Money: "",
        StartTime: "",
        EndTime: "",
        BreachTime: "",
        PaymentDay: "",
        payType: ""
      },
      formLabelWidth: "120px"
    };
  },
  components: {
    selectHouseId,
    selectUserId
  },
  computed: {
    // 获取房屋id
    changeHouseId() {
      return this.$store.state.houseid;
    },
    // 获取用户id
    changeUserId() {
      return this.$store.state.userid;
    },

  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    },
    // 获取房屋id
    changeHouseId: {
      handler(n, o) {
        // console.log(n);
        this.form.HouseId = n.Id;
        this.form.HouseName = n.Name;
      }
    },
    // 获取用户id
    changeUserId: {
      handler(n, o) {
        // console.log(n);
        this.form.TenantId = n.Id;
        this.form.TenantName = n.Name;
      }
    }
  },
  methods: {
    // 选择房屋
    selecthouse() {
      this.dialogFormVisibleHouse = !this.dialogFormVisibleHouse;
    },
    // 选择用户
    selectuser() {
      this.dialogFormVisibleUser = !this.dialogFormVisibleUser;
    },
    // 添加合同
    addContract() {
      this.show = false;
      this.$emit("closeDig");

      let oldDate1 = this.form.StartTime;
      let newDate1 = new Date(oldDate1).Format("yyyy-MM-dd");
      this.form.StartTime = newDate1;

      let oldDate2 = this.form.EndTime;
      let newDate2 = new Date(oldDate2).Format("yyyy-MM-dd");
      this.form.EndTime = newDate2;

      this.contractObj["HouseId"] = this.form.HouseId;
      this.contractObj["TenantId"] = this.form.TenantId;
      this.contractObj["StartTime"] = this.form.StartTime;
      this.contractObj["EndTime"] = this.form.EndTime;
      this.contractObj["BreachTime"] = this.form.BreachTime;
      this.contractObj["PaymentDay"] = this.form.PaymentDay;
      this.contractObj["payType"] = this.form.payType;
      console.log(this.contractObj);
      makecontract(this.contractObj)
        .then(res => {
          console.log(res);
            this.$store.commit("getcbContractid", res);
        })
        .catch(err => {});
    },
    // 检查房屋月租
    viewmoney() {
      if (this.form.Money < 500) {
        this.msg1 = "建议提高房租";
      } else if (this.form.Money > 3500) {
        this.msg1 = "房租价格过高";
      } else {
        console.log("价格合适");
        this.msg1 = "";
      }
    },
    viewday() {
      if (this.form.BreachTime < 1) {
        this.msg2 = "违约时长过短，建议延长";
      } else if (this.form.BreachTime > 15) {
        this.msg2 = "违约时长过长，建议降低";
      } else {
        console.log("价格合适合适");
        this.msg2 = "";
      }
    }
  }
};
</script>

<style>
.span1 {
  color: red;
  font-size: 12px;
}
</style>

