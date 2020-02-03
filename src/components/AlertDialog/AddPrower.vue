<template>
  <el-dialog
  title="提示"
  :visible.sync="isshowAddPrower"
  width="30%"
  size="mini"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="isshowAddPrower = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="isshowAddPrower = false">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
  export default {
    props:['isshowAddPrower'],
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>