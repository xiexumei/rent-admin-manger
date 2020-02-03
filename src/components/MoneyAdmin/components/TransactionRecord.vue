<template>
  <div class="block">
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div class="opration">
      <div class="left-opration">
        <el-button type="primary" @click="exportExcel" icon="el-icon-download" size="small">下载全部交易记录</el-button>
      </div>
      <div class="right-opration">
         <el-col :span="7" style="margin-right:4px">
          <el-input v-model="nameorPhone" type="text" placeholder="请输入手机号或用户名"></el-input>
        </el-col>
        <el-col :span="7" style="margin-right:4px">
          <el-date-picker v-model="valueStart" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="7" style="margin-right:4px">
          <el-date-picker v-model="valueEnd" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>

        <el-col :span="1">
          <el-button type="primary" @click="searchTrade" icon="el-icon-search">搜索</el-button>
        </el-col>
      </div>
    </div>
    <div class="roleTable">
      <div class="role-border">
        <div class="transaction-record" id="rebateSetTable">
          <template>
            <el-table
              border
              :data="tradeTable"
              tooltip-effect="dark"
              height="400"
              header-cell-style="background:rgb(234,238,243)"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="用户ID">
                      <span>{{ props.row.Id }}</span>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="交易类型">
                      <span>{{ props.row.PayType }}</span>
                    </el-form-item>
                    <el-form-item label="交易金额">
                      <span>{{ props.row.Money }}</span>
                    </el-form-item>
                    <el-form-item label="房屋名">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="房屋地址">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="序号" type="index" prop="Id"></el-table-column>
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="类型" prop="PayType">
               <template slot-scope="scope">
                <el-button size="mini" type="primary">{{scope.row.PayType}}</el-button>

              </template>
              </el-table-column>
              <el-table-column label="金额" prop="Money"></el-table-column>
              <el-table-column label="时间" prop="TradeTime"></el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
    <div style="width:100%; height:20px; background:#fff">
      <Pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="_getTradeRecordList"
      />
    </div>
  </div>
</template>
<script type="text/javascript">
import Pagination from "@/components/Pagination/Pagination";
import { getTradeRecordList } from "@/api/SingedService";
import Loading from "@/components/Loading";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
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
      showAll: false, //标记数据是否需要完全显示的属性
      activeIndex: "",
      tradeTable: [],
      newtrade: [],
      isLoading: true,
      valueStart: "",
      valueEnd: "",
      nameorPhone:""
    };
  },
  components: {
    Pagination,
    Loading
  },
  created() {
    this._getTradeRecordList().then(res => {
      this.isLoading = false;
    });
  },

  watch: {
    tradeTable: function() {
      console.log(this.tradeTable); //根据日期分成三个数组
      var time = [];
      var newtabledata = this.tradeTable;
      this.tradeTable.forEach((item, index) => {
        var day = item.TradeTime.substring(0, 10);
        time.push(day);
      });
      console.log(time);
      var newtime = this.unique(time); //每天的时间
      console.log(newtime);

      //根据时间分类
      var listbydate = [];
      newtime.forEach((item, index) => {
        var obj = {};
        obj.time = item;
        obj.date = [];
        newtabledata.forEach((item2, index2) => {
          if (item2.TradeTime.substring(0, 10) == item) {
            obj.date.push(item2);
          }
        });
        listbydate.push(obj);
      });

      this.newtrade = listbydate;
    }
  },
  mounted() {
    this.house();
    this.rentRate();
  },

  methods: {
    exportExcel() {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#rebateSetTable")
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
          "交易账单明细表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },



    //获取到所有的交易记录表
    async _getTradeRecordList(start, end, nameorphone) {
      this.tradeTable = [];
      var page = (this.listQuery.page - 1) * this.listQuery.limit;
      var res = await getTradeRecordList(start, end, nameorphone, page, this.listQuery.limit);
      //将获取到的交易记录保存到vuex中
      this.$store.commit("SET_TradeRecordList",res)
      console.log(res);
      var data = res._Items;
      data.forEach((item, index) => {
        var obj = {};
        obj.Id = item.Tenant.Id;
        obj.name = item.Tenant.Name;
        obj.TradeTime = item.TradeTime;
        obj.PayType = item.PayType;
        obj.Money = item.Money;
        obj.house = item.HouseId;

        this.tradeTable.push(obj);
      });
      this.total = res.TotalCount;
      console.log(data);
      return res
    },

    //数组去重
    unique(arr) {
      return Array.from(new Set(arr));
    },

    //搜索
    searchTrade(){
      var start = this.valueStart
      var end = this.valueEnd

      var nameorphone = this.nameorPhone
      var res =  this._getTradeRecordList(start, end, nameorphone)
     console.log(res)


    }
  }
};
</script>
<style type="text/css">
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
}
.right-opration {
  float: right;
}
.roleTable {
  padding: 2%;
  background-color: #fff;
}

.role-border {
  padding: 2%;
  border: 1px solid rgb(209, 209, 209);
}

.pay-or-nopay {
  height: 50%;
  border: 1px solid #000;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-button--primary {
  color: #fff;
  background-color: rgb(24, 159, 146);
  border-color: rgb(24, 159, 146);
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
