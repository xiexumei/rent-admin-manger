<template>
  <el-dialog
    :title="'编辑'+this.currentRow.name+'的角色'"
    :visible.sync="dialogFormVisibleditManagerRoles"
    width="50%"
    :before-close="handleClose"
  >
   
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
      <div class="checkboxs">
        <el-checkbox
          style="display: block; text-align: left; font-size: 30px"
          v-for="(option,index) in rolesOptions"
          :label="option.Role.Id"
          :key="index"
        ><span><i class="iconfont icon-yonghuguanli1"></i></span>&nbsp;&nbsp;{{option.Role.RoleName}}</el-checkbox>
      </div>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="mini">取 消</el-button>
      <el-button type="primary" @click="editMangerRoles" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { assignRoletoManager, getRoleList } from "@/api/user";
import store from "@/store";

export default {
  props: ["dialogFormVisibleditManagerRoles", "currentRow", "currentId"],
  data() {
    return {
      checkAll: false,
      checkedRoles: [], //选中时的数组,用角色表转化
      rolesOptions: [],
      isIndeterminate: true,
      show: true,
      editRoles: ""
    };
  },

  filters: {},
  created() {
    this._getRoleList();
  },
  computed: {
    allRolesList() {
      return store.getters.rolesList;
    }
  },
  
  watch: {
    allRolesList: function() {
      this.rolesOptions = this.allRolesList;
    },
    'currentRow':function(){
      var options = this.currentRow.roles
      options.map((item, index)=>{
        this.checkedRoles.push(item.Id)
      })
      console.log(this.checkedRoles)
    }
  },

  methods: {
   
    handleCheckedCitiesChange(value) {
      //当有一项改变的时候，里面是当前选中的
      //将当前选中的列表保存
      console.log(value)
      this.checkedRoles = value;
      console.log(this.currentRow);
    },
    handleClose() {
      this.$emit("closeDiaLog");
    },
    async editMangerRoles() {
      //点击确定的时候调用改变角色的方法

      var id = this.currentId;
      console.log(id);
      var res = await assignRoletoManager(id, this.checkedRoles.toString());
    //  this._thisgetUserList();
      this.$emit('_thisgetUserList');
    //  this.$emit('_thisgetUserList')
      this.handleClose();
      //获取
    },


    //获取所有角色列表
    async _getRoleList() {
      var res = await getRoleList();
      console.log(res);
      var newlist = res;
      // console.log(this.newlist)
      //
      this.$store.commit("SET_ROLESLIST", newlist.RoleAndServices);
    }
  }
};
</script>
<style type="text/css">
.checkboxs {
  border: 1px solid #eee;
}

.el-button--primary {
  color: #fff;
  background-color: rgb(24, 159, 146);
  border-color: rgb(24, 159, 146);
}

</style>