<template>
  <!-- 定金账单模块 -->
  <div class="rent">
     <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div class="opration">
      <div class="left-opration">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="exportExcel">导出表格文件</el-button>
      </div>
      <div class="right-opration">
      
      </div>
    </div>
     <div class="roleTable">
      <div class="role-border" id="tradeTablelist">
      <Table :tablelist="tablelist"></Table>
      </div>
     </div>
    <div style="width:100%; height:20px; background:#fff">
     <Pagination :total="total"   :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="_getDepositList"/>
    </div>
  </div>
</template>

<script type="text/javascript">
import FileSaver from "file-saver";
import XLSX from "xlsx";
import{getDepositList} from "@/api/SingedService"
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/Moneyadmin/components/rentTable.vue";
export default {
  data() {
    return {
         //分页
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 0,
        limit: -1
      },
      isLoading:true,
      dialogFormVisible: false, //控制表单是否显示
      options: [{
          value: '选项1',
          label: '已支付'
        }, {
          value: '选项2',
          label: '未支付'
        }, {
          value: '选项3',
          label: '已过期'
        }],
        value: '',
        username:'',
      tablelist: {
        user: "用户",
        name: "房屋名称",
        time: "房屋地址",
       
        paymoney: "支付金额",
        state:  "账单状态",
       
      },
      tableData: [
      ]
    };
  },
  components: {
    Table,
    Pagination,
    Loading
  },
  created(){
    this._getDepositList("","").then(res=>{
      this.isLoading = false
    })

  },
  methods: {
    //下载表格
    exportExcel() {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#tradeTablelist")
      );
      /* get binary string as output */
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "定金订单明细表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    addHouse() {
      this.dialogFormVisible = true;
      console.log(11);
    },
    searchByname(){
      var name = this.username
      console.log(name)
      this._getDepositList(name)
    },
    
     async _getDepositList(status,username){
        var page = (this.listQuery.page-1)*this.listQuery.limit
        var res = await getDepositList(status,username,page,this.listQuery.limit)//0,-1
        console.log(res)
      //  this.tableData=[]
        this.tableData=res
        this.total = res.TotalCount
        this.$store.commit('SET_DepositList',  this.tableData.DepositAndHouseAndTenantList)
      }
    
  }
};
</script>
<style type="text/css" scoped>
.rent {
  position: relative;
}
.position {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
.norent {
  position: absolute;
  top: 50%;
  left: 50%;
}
.roleTable {
  padding: 2%;
  background-color: #fff;
}

.role-border {
  padding: 2%;
  border: 1px solid rgb(209, 209, 209);
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
</style>





