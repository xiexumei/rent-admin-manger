<template>
  <el-dialog title="已收金额" :visible.sync="show">
    <el-form :model="form" >
      <el-form-item size="mini" label="已收金额" :label-width="formLabelWidth">
          <el-input v-model="form.money" autocomplete="off"></el-input>
        </el-form-item>
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
      checkList: [],
      show: false,
      form: {
        money:"",
      },
      formLabelWidth: "120px"
    };
  },
  components:{
    // 获取当前收租信息
    getrow(){
      return this.$store.state.row;
    }
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    },
    // 获取当前受阻信息
    getrow:{
      handler(n,o){
        console.log(n);
      }
    }
  }
};
</script>


