<template>
  <div class="signuserInfo">
    <div class="block">
      <div>
        <div class="signStatu">
          <span>签约状态</span>
        </div>
        <div class="timeline">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="customer-information">
      <div class="customer">
        <div class="signStatu">
          <span><i class="iconfont icon-yonghuguanli1"></i>租户信息</span>
          <p><i class="iconfont icon-xingming"></i>租户姓名<span>{{this.userRentInfo.Tenant.Name}}</span></p>
          <p><i class="iconfont icon-xingbie"></i>性别<span>{{this.userRentInfo.Tenant.Gender | gender(this.userRentInfo.Tenant.Gender)}}</span></p>
          <p><i class="iconfont icon-shoujihaoma"></i>租户手机号<span>{{this.userRentInfo.Tenant.Phone}}</span></p>
          <p><i class="iconfont icon-zhengjianhaoma"></i>租户证件号<span>{{this.userRentInfo.Tenant.IdCard}}</span></p>
        </div>
      </div>
      <div class="price">
        <div class="signStatu">
          <span><i class="iconfont icon-qian"></i>价格与结算方式</span>
          <p>房租</p>
          <p>定金<p>
          <p>押一付三</p>
          <p>支付方式</p>
        </div>
      </div>
    </div>
    <div class="house">
      <div class="house-detail">
        <div class="signStatu">
          <span><i class="iconfont icon-chazhaofangyuan"></i>房屋信息</span>
        </div>
      </div>
      <div class="contract">
        <div class="signStatu">
          <span><i class="iconfont icon-hetongshenpi"></i>合同信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { getTradeRecordList } from "@/api/SingedService";
export default {
  data() {
    return {
      //交易记录列表
      tradeRecordList: [],
      activities: [
        {
          content: "已签约",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87"
        },
        {
          content: "支付定金",
          timestamp: "2018-04-03 20:46",
          size: "large"
        },
        {
          content: "预约成功",
          timestamp: "2018-04-03 20:46"
        }
      ]
    };
  },

  computed: {
    userRentInfo() {
      return store.state.user.userRentInfo;
    }
  },
  filters:{
    gender(val){
      return  val==0?'男':'女'
    }

  },
  created() {
    this._getTradeRecordList().then((res)=>{
      this.currentUserTade()
    });
    
    console.log(this.userRentInfo)
  },
  watch: {
   
  },
  methods: {
     currentUserTade(){
      console.log(this.userRentInfo.Tenant.Id)
      var rentUser = this.userRentInfo.Tenant.Phone;
      console.log(rentUser)
      var currentUserTadelist = []
      this.tradeRecordList.map((item, index) => {
        // return item.Tenant.Id == rentUser;
        if(item.Tenant.Phone==rentUser){
           currentUserTadelist.push(item)
         }
       
      });
      console.log(currentUserTadelist); //当前用户的交易记录条数
    },
    //获取到所有的交易记录表
    async _getTradeRecordList(start, end, nameorphone) {
      var res = await getTradeRecordList(start, end, nameorphone, 0, -1);
      this.tradeRecordList = res._Items;
      console.log(this.tradeRecordList);
    }
  }
};
</script>
<style scoped>
.signuserInfo {
  height: 90%;
  margin: 0 auto;
  text-align: left;
  background-color: #fff;
  border: 1px solid #eee;
}
.block {
  display: inline-block;
  vertical-align: middle;
  width: 26%;
  height: 90%;
  margin-right: 1%;
  text-align: center;
  border: 1px solid #000;
}
.signStatu {
  box-sizing: border-box;
  height: 36px;
  padding-left: 3%;

  line-height: 36px;
  background-color: rgb(246, 249, 253);
}
.signStatu > span,
.customer > span,
.price > span {
  font-size: 14px;
  font-weight: 700;
}

.customer-information {
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
  width: 40%;
  height: 90%;
  margin-right: 1%;
  border: 1px solid #000;
}
.customer,
.house-detail {
  box-sizing: border-box;
  height: 50%;
  border: 1px solid #000;
}

.price,
.contract {
  height: 50%;
  border: 1px solid #000;
}

.house {
  display: inline-block;
  vertical-align: middle;
  width: 30%;
  height: 90%;
  border: 1px solid #000;
}
p{
  padding-left: 3%;

  border-bottom: 1px solid rgb(233,235,239)
  
}
</style>
