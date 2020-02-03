<template>
  <div>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="getallManger"
      tooltip-effect="dark"
      height="500"
      style="width: 100%"
      header-cell-style="background:rgb(234,238,243)"
      @current-change="handleChange"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号" fixed></el-table-column>
      <!-- 负责人名字 -->
      <el-table-column prop="name" width="80" label="姓名"></el-table-column>
      <el-table-column prop="password" width="110" label="密码"></el-table-column>
      <!-- 联系方式 -->
      <el-table-column prop="phone" width="120" label="电话"></el-table-column>
      <!-- 已有权限 -->
      <el-table-column prop="roles" label="用户角色">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.roles" :key="index">{{item.RoleName}}</el-tag>
          <br />
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="caozuo" width="340" fixed="right" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑信息</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleEditRoles(scope.$index, scope.row)"
          >编辑角色</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">取消所有角色</el-button>
        </template>
        <!-- <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑信息</el-button>
        <el-button
          size="mini"
          @click="handleEditRoles(scope.$index, scope.row,item)">编辑角色</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">取消所有角色</el-button>
        </template>-->
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="_thisgetUserList"
    />
  
    <editManger
      @closeDig="dialogeditManager"
      :dialogFormVisibleditManager="dialogFormVisibleditManager"
      :currentId="this.currentId"
      :currentRow="currentRow"
      @_thisgetUserList="_thisgetUserList"
    ></editManger>
    <!--编辑用户角色对话框-->
    <editMangerRole
      :dialogFormVisibleditManagerRoles="dialogFormVisibleditManagerRoles"
      @closeDiaLog="closeeditRoleDiaLog"
      :currentId="this.currentId"
      :currentRow="currentRow"
      @_thisgetUserList="_thisgetUserList"
    ></editMangerRole>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/Pagination.vue";
import editManger from "./components/editManger";
import editMangerRole from "./components/editMangerRoles";
import store from "@/store";
import {
  cancelManagerRoles,
  getUserList,
  assignRoletoManager
} from "@/api/user";
export default {
  props: ["tablelist"],
  data() {
    return {
      //分页
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisibleditManager: false, //是否显示编辑基本信息Dialog
      dialogFormVisibleditManagerRoles: false, //是否显示设置角色的dialog
      multipleSelection: [],
      currentSelectNodes: [],
      TotalCount: 0,
      table: [],
      isshowEdit: false,
      currentRow: {},
      currentId: 0 //当前id
    };
  },
  components: {
    Pagination,
    editManger,
    editMangerRole
  },
  computed: {
    getallManger() {
      return store.getters.allManger;
    }
  },
  watch: {},
  created() {
    this._thisgetUserList();
  },
  methods: {
    //编辑角色信息
    handleEditRoles(index, row) {
      //row里面有一个roles字符串
      this.currentRow = row;
      this.currentId = row.id;
      console.log(this.currentRow);
      this.$store.commit("SET_CURRENTMANGER", row);
      this.dialogFormVisibleditManagerRoles = !this
        .dialogFormVisibleditManagerRoles;
    },
    //编辑个人账号和密码信息
    async handleEdit(index, row) {
      console.log(index, row);
      this.$store.commit("SET_CURRENTMANGER", row);
      this.dialogFormVisibleditManager = !this.dialogFormVisibleditManager;

      // var res = await  assignRoletoManager(42,[1,2].toString()) //编辑角色
      //console.log(res)
      this.currentRow = row;
      this.currentId = row.id;
      console.log(row);
    },

    handleChange(currentRow, oldCurrentRow) {
      console.log(currentRow);
    },

    //
    rowClass({ row, rowIndex }) {
      return { "background-color": "raba(185,221,240,0.75)" };
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // 删除负责人
    handleDelete(index, row) {
      var id = row.id;
      this.$confirm("确认要取消负责人所有角色?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(res => {
          // DeleteUser(this.uniqId);
          this._cancelManagerRoles(id);
          //调用获取列表实时刷新
          this._thisgetUserList();
          this.$message({
            type: "success",
            message: "清除角色成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清除"
          });
        });
    },

    handleChange() {},

    //取消负责人角色接口
    async _cancelManagerRoles(id) {
      var res = await cancelManagerRoles(id);
      console.log(res);
    },

    //设置编辑用户角色对话框关闭
    closeeditRoleDiaLog() {
      this.dialogFormVisibleditManagerRoles = false;
    },

    //关闭基本信息dialog
    dialogeditManager(){
      this.dialogFormVisibleditManager = false
    },


    //获取所有用户列表
    //获取用户列表
    async _thisgetUserList() {
      var res = await getUserList(
        this.listQuery.page,
        this.listQuery.limit,
        11
      ); //传1
      console.log(res);
      this.total = res.TotalCount;
      var manager = res.ManagerAndRoles;
      //遍历请求到的数组
      var newtableData = [];
      manager.forEach((item, index) => {
        var obj = {};
        obj.id = item.Tenant.Id;
        obj.name = item.Tenant.Name;
        obj.phone = item.Tenant.Phone;
        obj.password = item.Tenant.Password;
        obj.roles = item.Roles;
        newtableData.push(obj);
      });
      //将所有负责人列表存到vuex中
      this.$store.commit("ALL_MANGERS", newtableData);
    }
  }
};
</script>
<style type="text/css">
.pag-position {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>