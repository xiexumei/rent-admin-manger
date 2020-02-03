import {getUserList} from '@/api/user'
   //获取用户列表
   export function _thisgetUserList(){
     var res =  getUserList(0,10,11) //传1
     console.log(res)
     var manager = res.ManagerAndRoles
     //遍历请求到的数组
     var newtableData=[] 
     manager.forEach((item, index) => {
       var obj = {}
       obj.id = item.Tenant.Id
       obj.name = item.Tenant.Name
       obj.phone = item.Tenant.Phone
       obj.password = item.Tenant.Password
       obj.roles = item.Roles   
       newtableData.push(obj)
     })
     //将所有负责人列表存到vuex中
     this.$store.commit('ALL_MANGERS',newtableData)
      this.$store.commit('SET_total',res.TotalCount)
    }