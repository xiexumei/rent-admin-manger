<template>
  <!-- 租金账单模块 -->
  <div class="rent">
    <!--没有账单显示-->
    <div class="norent" style="display: none;">
      <span class="iconadd">
        <i class="iconfont icon-tianjia"></i>
      </span>
      <span>暂无租金账单信息，快去添加吧</span>
    </div>
    <!--有租金账单显示-->
    <div>
      <Table :tableData="tableData" :tablelist="tablelist"></Table>
    </div>
  </div>
</template>

<script type="text/javascript">
import Table from "@/components/Moneyadmin/components/rentTable.vue";
export default {
  data() {
    return {
      dialogFormVisible: false, //控制表单是否显示
      tablelist: {
        user: "用户",
        name: "房屋",
        time: "缴纳时间",
        state:  "账单状态",
        paymoney: "支付金额",
        caozuo: "操作"
      },
      tableData: [
        {
          date: "张三1",
          name: "棕苑二栋三单元五楼十一号",
          time: "2019-12-18",
          state: "已缴纳",
          paymoney: "1600"
        },
        {
          date: "张三1",
          name: "棕苑二栋三单元五楼十一号",
          time: "2019-12-18",
          state: "已缴纳",
          paymoney: "1600"
        },
        {
          date: "张三1",
          name: "棕苑二栋三单元五楼十一号",
          time: "2019-12-18",
          state: "已缴纳",
          paymoney: "1600"
        },
        {
          date: "张三1",
          name: "棕苑二栋三单元五楼十一号",
          time: "2019-12-18",
          state: "已缴纳",
          paymoney: "1600"
        },
        {
          date: "张三1",
          name: "棕苑二栋三单元五楼十一号",
          time: "2019-12-18",
          state: "已缴纳",
          paymoney: "1600"
        },
        {
          date: "张三1",
          name: "棕苑二栋三单元五楼十一号",
          time: "2019-12-18",
          state: "已缴纳",
          paymoney: "1600"
        },
        {
          date: "张三1",
          name: "棕苑二栋三单元五楼十一号",
          time: "2019-12-18",
          state: "已缴纳",
          paymoney: "1600"
        }
      ]
    };
  },
  components: {
    Table
  },
  methods: {
    addHouse() {
      this.dialogFormVisible = true;
      console.log(11);
    }
  }
};
</script>
<style type="text/css">
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
.left-opration {
  margin-bottom: 15px;
  text-align: left;
}
</style>




