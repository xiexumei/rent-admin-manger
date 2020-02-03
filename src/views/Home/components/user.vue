<template>
  <div>
    <el-table
    :data="userData"
      border
      size="mini"
      ref="multipleTable"
      tooltip-effect="dark"
      height="400"
     >
    <el-table-column
      prop="Id"
      label="用户ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Phone"
      label="手机号">
    </el-table-column>
  </el-table>
 <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="_getUserList" />
  </div>
</template>

<script>
  import pagination from '@/components/Pagination/Pagination'
  import {getUserList} from '@/api/user'
  export default {
    components:{
      pagination
    },
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
      user:[],
      userData:[],
      }
    },

    created(){
      this._getUserList()

    },
    watch:{

    },
    methods:{
      //请求用户
      async _getUserList(){
        var res = await getUserList(this.listQuery.page,this.listQuery.limit, 3)
         var user = res.ManagerAndRoles
         this.total = res.TotalCount
         console.log(user)
         var newUser = []
         user.map((item, index)=>{
          var obj = {}
          obj.Id = item.Tenant.Id
          obj.Name = item.Tenant.Name
          obj.Phone = item.Tenant.Phone
          newUser.push(obj)
        })
        this.userData = newUser
      }
    }
  }
</script>
