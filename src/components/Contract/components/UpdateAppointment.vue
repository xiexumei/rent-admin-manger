<template>
  <el-dialog title="预约状态" :visible.sync="show">
    <el-form :model="form">
      <el-form-item label="预约状态" :label-width="formLabelWidth">
        <el-select v-model="form.state" style="width:630px" placeholder="请选择预约状态">
          <el-option label="未看房" value="未看房"></el-option>
          <el-option label="已看房" value="已看房"></el-option>
          <el-option label="已取消" value="已取消"></el-option>
        </el-select>
        <!-- <el-input v-model="form.state" autocomplete="off" type="text" @blur="getstate" placeholder="未看房，已看房，已取消"></el-input> -->
      </el-form-item>
      <el-form-item label="预约回馈" :label-width="formLabelWidth">
        <el-input v-model="form.feedback" autocomplete="off" type="text" @blur="getfeedback"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false;$emit('closeDig')" style="cursor:pointer">取 消</el-button>
      <el-button type="primary" @click="updateState" style="cursor:pointer">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateAppointmentResult } from "@/interfance/GetVersion.js";
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      checkList: [],
      show: false,
      form: {
        state: "",
        feedback: "",
        appointmentids:""
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    // 获取预约id
    getAppointmentId() {
      return this.$store.state.appointmentid;
    },
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    },
    // 获取预约id
    getAppointmentId: {
      handler(n, o) {
        console.log(n);
        this.form.appointmentids = n;
      }
    },
  },
  methods:{
    getfeedback(){
      console.log(this.form.feedback);
    },
    updateState() {
        let res = 1;
      this.show = false;
      this.$emit('closeDig');
      console.log(this.form.state,this.form.feedback);
      updateAppointmentResult(this.form.state,this.form.feedback,this.form.appointmentids);
        this.$store.commit("appointmentid", res.Id);
    }
  }
};
</script>



