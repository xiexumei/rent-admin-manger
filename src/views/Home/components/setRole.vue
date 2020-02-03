<template>
  <div class="setPrower">
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div class="opration">
      <div class="left-opration">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addRolesList">添加角色</el-button>
      </div>
    </div>

    <div class="roleTable">
      <div class="role-border">
        <table class="myTable">
          <tr class="myTitle">
            <th>角色ID</th>
            <th>角色名</th>
            <th>可分配权限</th>
            <th>操作</th>
          </tr>
          <tr v-for="(currentItem, index) in rolesData" :key="index">
            <td>{{currentItem.Role.Id}}</td>
            <td>{{currentItem.Role.RoleName}}</td>

            <td>
              <el-form class="check">
                <el-checkbox
                  :checked="currentItem.houseMamge.ishouseManger"
                  @change="houseClick(currentItem)"
                >
                  <span class="iconfont icon-icon fontSize"></span>房屋管理
                </el-checkbox>
                <el-checkbox
                  :checked="currentItem.MoneyManger.isMoneyManger"
                  @change="MoneyMangerClick(currentItem)"
                >
                  <span class="iconfont icon-qian1 fontSize"></span>资金管理
                </el-checkbox>
                <el-checkbox
                  :checked="currentItem.Qianyue.isQianyue"
                  @change="QianyueClick(currentItem)"
                >
                  <span class="iconfont icon-dianziqianyue fontSize"></span>签约管理
                </el-checkbox>
              </el-form>
            </td>
            <td>
              <el-button @click="handleSave(currentItem)" size="mini" type="primary">保存</el-button>
              <el-button @click="handledelte(currentItem)" size="mini" type="danger">删除</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <addRoles
      @_getRoleList="_getRoleList"
      @closeDig="closeeditRoleDiaLog"
      :dialogFormVisible="dialogFormVisibleaddDialog"
    ></addRoles>
  </div>
</template>

<script>
import store from "@/store";
import Loading from "@/components/Loading";
import addRoles from "./addRoles.vue";
import {
  setRightForRole,
  getAllService,
  getRoleList,
  deleteRole
} from "@/api/user";
export default {
  components: {
    addRoles,
    Loading
  },
  data() {
    return {
      dialogFormVisibleaddDialog: false,
      checkedcurrent: [],
      serviceOptions: [],
      rolesData: [],
      data: [],
      rolelist: [],
      message: "",
      isLoading: true
    };
  },
  filters: {
    serviceName(val) {
      console.log(val); //0,1,2,3每一项
      if (val.Url == "/HouseServiceSvr") {
        name = "房屋管理";
      }
      if (val.Url == "/ManagementServiceSvr") {
        name = "资金及合同模板管理";
      }
      if (val.Url == "/SingedServiceSvr") {
        name = "预约签约管理";
      }

      return name;
    }
  },
  created() {
    this._getAllService();
    this._getRoleList().then(res => {
      this.isLoading = false;
    });
    //this.newRoles()
  },
  computed: {},
  watch: {
    rolelist: function() {
      this.newRoles();
    }
  },

  methods: {
    //当前勾选的发生变化的时候
    handleCheckedCitiesChange(val) {
      console.log(val);
    },
    houseClick(currentItem) {
      currentItem.houseMamge.ishouseManger = !currentItem.houseMamge
        .ishouseManger;
      console.log(currentItem.houseMamge.ishouseManger);
    },

    MoneyMangerClick(currentItem) {
      currentItem.MoneyManger.isMoneyManger = !currentItem.MoneyManger
        .isMoneyManger;
    },

    QianyueClick(currentItem) {
      currentItem.Qianyue.isQianyue = !currentItem.Qianyue.isQianyue;
    },
    addRolesList() {
      this.dialogFormVisibleaddDialog = !this.dialogFormVisibleaddDialog;
    },

    // 保存角色更改
    handleSave(currentItem) {
      //  var id = row.id
      this.$confirm("确认要修改当前角色权限?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(res => {
          if (currentItem.houseMamge.ishouseManger == true) {
            this.serviceOptions.push(1);
          }
          if (currentItem.MoneyManger.isMoneyManger == true) {
            this.serviceOptions.push(2);
          }
          if (currentItem.Qianyue.isQianyue == true) {
            this.serviceOptions.push(3);
          }
          this._setRightForRole(currentItem.Role.Id, this.serviceOptions);
          this.$message({
            type: "success",
            message: "保存更改成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清除"
          });
        });
    },

    // 删除负责人
    handledelte(currentItem) {
      //  var id = row.id
      this.$confirm("确认要删除当前角色权限?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(res => {
          this._deleteRole(currentItem.Role.Id).then(resl => {
            console.log(resl);
            this._getRoleList();
            this.$message({
              type: "success",
              message: resl
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除角色
    async _deleteRole(id) {
      var res = await deleteRole(id);
      return res;
    },

    //更改角色权限
    async _setRightForRole(id) {
      var servicelist = [1, 2, 3];
      var res = await setRightForRole(id, servicelist.toString());
    },

    //获取可分配服务
    async _getAllService() {
      var res = await getAllService();
      this.allservice = res;
      console.log(res);
    },

    //设置编辑用户角色对话框关闭
    closeeditRoleDiaLog() {
      this.dialogFormVisibleaddDialog = false;
    },

    //获取所有角色列表
    async _getRoleList() {
      var res = await getRoleList();
      console.log(res);
      this.rolelist = res.RoleAndServices;
      console.log(this.rolelist);
      this.$store.commit("SET_ROLESLIST", res.RoleAndServices);
    },

    //处理角色函数
    newRoles() {
      console.log(this.getRoleList);
      //  this.data = this.getRoleList;
      var newData = [];
      this.rolelist.map((item, index) => {
        var obj = {};
        obj.Role = item.Role;
        obj.houseMamge = {};
        obj.MoneyManger = {};
        obj.Qianyue = {};
        obj.houseMamge.ishouseMange = false;
        obj.houseMamge.Id = 1;
        obj.MoneyManger.isMoneyManger = false;
        obj.MoneyManger.Id = 2;
        obj.Qianyue.isQianyue = false;
        obj.Qianyue.Id = 3;
        item.Services.map((item2, index2) => {
          if (item2.Id == 1) {
            obj.houseMamge.ishouseMange = true;
          } else if (item2.Id == 2) {
            obj.MoneyManger.isMoneyManger = true;
          } else if (item2.Id == 3) {
            obj.Qianyue.isQianyue = true;
          }
        });
        newData.push(obj);
      });
      this.rolesData = newData;

      //将当前格式化的角色名字存到vuex中
      this.$store.commit("SET_ROLE_NAME", newData);
    }
  }
};
</script>
 
<style scoped>
.setPrower {
}
.myTable {
  margin: 0 auto;
  height: 400px;
  width: 100%;
  color: rgb(112, 112, 112);
}

.myTitle {
  background-color: rgb(234, 238, 243);
}

tr:hover {
  /* background: #edffcf; */
}

th {
  font-size: 16px;
  font-weight: bold;
  height: 40px;
}
tr {
  height: 40px;
}

td {
  font-size: 14px;
}

th,
td {
  border: solid 1px rgb(223, 223, 223);
  text-align: center;
}

.opration {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  margin-bottom: 1%;
  padding-left: 2%;
  background-color: #fff;
}
.left-opration {
  float: left;
}
.right-opration {
  float: right;
}

.fontSize {
  font-size: 20px;
}
/* */

/**选中时 */
.el-checkbox {
  color: #5d5b6a;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  -webkit-user-select: none;
}
/**check-box选中 */
.check .el-checkbox__input.is-checked + .el-checkbox__label {
  color: red;
}
.check .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: red;
  border-color: red;
}
.check .el-checkbox__inner:hover {
  border-color: red;
}
.check .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: red;
}

.el-button--primary {
  color: #fff;
  background-color: rgb(24, 159, 146);
  border-color: rgb(24, 159, 146);
}

.roleTable {
  padding: 2%;
  background-color: #fff;
}

.role-border {
  padding: 2%;
  border: 1px solid rgb(209, 209, 209);
}

.save {
  padding: 4px;
  border-radius: 6px;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>