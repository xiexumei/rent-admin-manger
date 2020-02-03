<template>
  <!-- 负责人用户列表 -->
  <div class="manger">
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div class="opration">
      <div class="left-opration">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addManager">添加负责人</el-button>
      </div>
      <div class="right-opration">
        <el-col :span="10" style="margin-right:4px">
          <el-select v-model="value" placeholder="请选择类型" @change="changeStatus">
            <el-option
              v-for="item in rolename"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10" style="margin-right:4px">
          <el-input placeholder="输入负责人姓名或手机号" suffix-icon="el-icon-user" v-model="username"></el-input>
        </el-col>
      
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="SearchManger">搜索</el-button>
        </el-col>
      </div>
    </div>

    <div class="roleTable">
      <div class="role-border">
        <Table></Table>
      </div>
    </div>
    <addManager
      @closeDig="dialogFormVisibleaddManager=false"
      :dialogFormVisible="dialogFormVisibleaddManager"
    ></addManager>
  </div>
</template>

<script type="text/javascript">
import Loading from '@/components/Loading'
import store from "@/store";
import { getUserList, deleteManage, searchManager } from "@/api/user";
import Table from "@/components/Table/Table.vue";
import addManager from "@/views/Home/components/addManager.vue";
export default {
  data() {
    return {
      dialogFormVisibleaddManager: false,
      TotalCount: 0, //当前一共多少条
      tablelist: {
        id: "负责人ID",
        name: "负责人名字",
        phone: "联系方式",
        ServiceMenus: "用户权限",
        caozuo: "操作"
      },
      item: "", //当前选中的id
      username: "",
    
      value: "",
      options: [],
      isLoading:true
    };
  },

  components: {
    Table,
    addManager,
    Loading
  },
  created() {
    //获取到所有的负责人
    this._thisgetUserList(11).then((res)=>{
      this.isLoading = false 
    });
    this._getRoleList();
  },
  computed: {
    rolename() {
      var options = [];
      var obj1 = {};
      (obj1.value = 11), (obj1.label = "所有");
      options.push(obj1);
      store.getters.rolename.map((item, index) => {
        var obj = {};
        obj.value = item.Role.Id;
        obj.label = item.Role.RoleName;
        options.push(obj);
      });
      return options;
    }
  },
  watch: {},
  methods: {
    addManager() {
      this.dialogFormVisibleaddManager = !this.dialogFormVisibleaddManager;
      console.log(21312);
    },

    //获取用户列表
    async _thisgetUserList(id) {
      var res = await getUserList(0, 10, id); //传11所有，
      console.log(res);
      var data = [];
      this.TotalCount = res.TotalCount;
      var manager = res.ManagerAndRoles;
      //遍历请求到的数组

      manager.forEach((item, index) => {
        var obj = {};
        obj.id = item.Tenant.Id;
        obj.name = item.Tenant.Name;
        obj.phone = item.Tenant.Phone;
        obj.password = item.Tenant.Password;
        obj.roles = item.Roles;

        data.push(obj);
      });

      //将所有负责人列表存到vuex中
      this.$store.commit("ALL_MANGERS", data);
      this.$store.commit("SET_total", this.TotalCount);
    },

    //获取所有角色列表
    async _getRoleList() {
      var res = await getRoleList();
      console.log(res);
    },
    //点击时切换
    changeStatus(item) {
      console.log(item);
      this._thisgetUserList(item);
    },

    //按用户名和手机号搜索
    async SearchManger() {
      var keyword = this.username ;

      var res = await searchManager(keyword);
      console.log(res);
      var data = [];
      this.TotalCount = res.TotalCount;
      var manager = res.ManagerAndRoles;
      //遍历请求到的数组

      manager.forEach((item, index) => {
        var obj = {};
        obj.id = item.Tenant.Id;
        obj.name = item.Tenant.Name;
        obj.phone = item.Tenant.Phone;
        obj.password = item.Tenant.Password;
        obj.roles = item.Roles;

        data.push(obj);
      });

      //将所有负责人列表存到vuex中
      this.$store.commit("ALL_MANGERS", data);
      this.$store.commit("SET_total", this.TotalCount);
    }
  }
};
</script>
<style type="text/css" scoped>
.user {
  overflow: hidden;
}
.position {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
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
  padding-right: 2%;
  background-color: #fff;
}
.left-opration {
  float: left;
  text-align: left;
}
.right-opration {
  float: right;

  text-align: right;
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
</style>