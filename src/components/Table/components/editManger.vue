<template>
  <div>
    <el-dialog title="负责人信息" :visible.sync="dialogFormVisibleditManager">
      <el-form :model="form" label-position="left">
        <el-form-item size="mini" label="负责人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="负责人联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" @blur="inspectphone"></el-input>
          <span>{{Ph}}</span>
        </el-form-item>
        <el-form-item v-model="form.pwd" size="mini" label="负责人初始密码" :label-width="formLabelWidth">
          <el-input  v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人性别" :label-width="formLabelWidth" size="mini">
          <el-select v-model="form.sex" placeholder="请选择负责人性别" style="width: 100%">
            <el-option label="男" value="man" size="mini"></el-option>
            <el-option label="女" value="woman" size="mini"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini" type="danger" style="cursor:pointer">取 消</el-button>
        <el-button type="primary" @click="editmanagerOk()" size="mini" style="cursor:pointer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {editManger,getUserList} from '@/api/user'
export default {
  props: ["dialogFormVisibleditManager","currentRow","currentId"],
  data() {
    return {
      Ph: "",
      fileList: [],
       manager:[],
       tableData:[],

      checkList: ["选中且禁用", "复选框 A"],
      show: false,
      innerVisible: false,
      msg1: "",
      msg2: "",
      form: {
        name: "",
        phone: "",
        pwd: "123456",
        sex: "man",
        Ph: ""
      },
      formLabelWidth: "120px"
    };
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
      console.log(newV,oldV)
    },
    "currentRow":function(){
        this.form.name=this.currentRow.name
        this.form.phone=this.currentRow.phone
        this.form.password=this.currentRow.password
    }
  },
  methods: {
   
    async editmanagerOk() {
      var phone =this.form.phone
      var name = this.form.name
      var password= this.form.pwd
      var id = this.currentRow.id
     // editManger(id,phone,name,password)
      var res = await editManger(id,phone,name,password)
      this.show = false
      this.$emit('_thisgetUserList');
      this.handleClose()
      this.$message({
        type:'success',
        message:res

      })
    },

   handleClose() {
      this.$emit("closeDig");
    },
    
    // 检查联系方式
    inspectphone(){
      if (!/^1[34578]\d{9}$/.test(this.form.phone)) {
        this.Ph = "手机号不正确";
      } else {
        this.Ph = "";
      }
    }
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

.el-button--primary {
  color: #fff;
  background-color: rgb(24, 159, 146);
  border-color: rgb(24, 159, 146);
}

</style>



