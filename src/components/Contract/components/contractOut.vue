<template>
  <el-dialog title="导出合同详情" :visible.sync="show">
    <el-form :model="form">

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-tag @click="show = false;$emit('closeDig')" size="medium" type="danger" style="cursor:pointer">取 消</el-tag>
      <el-tag type="primary" @click="show = false;$emit('closeDig')" size="medium" style="cursor:pointer">确 定</el-tag>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      show: false,
      form: {},
      formLabelWidth: "120px"
    };
  },
  components: {
    // 下载合同的id
    getContractCopyId() {
      return this.$store.state.contractCopyId;
    },
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    },
    // 下载合同的id
    getContractCopyId: {
      handler(n,o){
        console.log(n);

      }
    }
  }
};
</script>


