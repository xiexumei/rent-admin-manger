<template>
  <el-dialog title="查看租金账单详情" :visible.sync="show">
    <el-form :model="form"></el-form>
    <div slot="footer" class="dialog-footer">
      <el-tag @click="show = false;$emit('closeDig')" size="medium" type="danger">取 消</el-tag>
      <el-tag type="primary" @click="show = false;$emit('closeDig')" size="medium">确 定</el-tag>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      checkList: ["选中且禁用", "复选框 A"],
      show: false,
      form: {},
      formLabelWidth: "120px"
    };
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    }
  }
};
</script>
</template>


