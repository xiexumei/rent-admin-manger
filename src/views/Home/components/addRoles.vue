<template>
<!-- 添加权限 -->
  <div>
    <el-dialog title="权限信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item size="mini" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-tag @click="handleClose" size="medium" type="danger" style="cursor:pointer">取 消</el-tag>
        <el-tag type="primary" @click="addDialog" size="medium" style="cursor:pointer">确 定</el-tag>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {createRole,getRoleList} from '@/api/user'
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      show: false,
      form: {
        name: ""
      },
      formLabelWidth: "120px"
    };
  },
  components: {},
  computed: {},
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    }
  },
  methods: {
    addDialog() {
      this.show = false;
      console.log(this.form.name)
      this.addRoles().then(()=>{
        this.$emit('_getRoleList')
        this.form.name=''
      })
      this.handleClose()
    },

    async addRoles(){
      var rolesName = this.form.name
      var res = await createRole(rolesName)
      console.log(res)
    },

     handleClose(){
        this.$emit('closeDig') 
      },

  }

 
};
</script>
<style type="text/css" scoped>
.posmap {
  z-index: 9999;
  margin-left: -100px;
  width: 700px;
  height: 700px;
}
.showmap {
  z-index: 999;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
span {
  color: red;
  font-size: 12px;
}
</style>



