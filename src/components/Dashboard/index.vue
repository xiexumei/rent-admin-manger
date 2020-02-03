<template>
  <div class="agentdash">
    <div class="title">
      <div class="spanuser" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
        <h2>用户信息</h2>
        <div>用户名：mysunshine</div>
        <div>权限： 房屋上传、合同管理</div>
      </div>
      <div class="span2" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
        <h2>房源管理</h2>
        <div>房源总数量:200</div>
        <div>已出租: 100</div>
        <div>未出租: 100</div>
        <span class="title-icon">
          <i class="iconfont icon-chazhaofangyuan iconSize"></i>
        </span>
      </div>
      <div class="span3" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
        <h2>预约签约管理</h2>
        <div>合同总数：200</div>
        <div>过期合同：100</div>
        <div>有效合同 :50</div>
        <span class="title-icon">
          <i class="iconfont icon-yuyueguanli iconSize" style="color: #000"></i>
        </span>
      </div>
      <div class="span4" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
        <h2>账单及合同模板管理</h2>
        <div>总交易金额:1000w</div>
        <div>租金账单:100笔</div>
        <div>定金账单:100笔</div>
        <span class="title-icon">
          <i class="iconfont icon-hetongshenpi iconSize"></i>
        </span>
      </div>
    </div>
    <div class="content">
      <div class="echarts">
        <div class="echarts-yield-curve">
          收益情况
          <!-- <button @click="exportClick()">下载</button>
          <button @click="handletest">测试2</button> -->

          <div id="myChart" :style="{width: '500px', height: '400px'}"></div>
        </div>

        <div class="echarts-wrap">
          <div class="echarts-vacancy-rate">
            <div id="house" :style="{width: '290px', height: '270px'}"></div>
          </div>
          <div class="echarts-pay-rate">
            <div id="rent" :style="{width: '290px', height: '270px'}"></div>
          </div>
        </div>
      </div>
      <div class="inform">
        <div class="innform-title">
          <h2>通知</h2>
        </div>
        <div class="inform-apponit">
          <el-badge value="30" class="item" style="z-index: 99">
            <i class="iconfont icon-yuyueyuyuetixing fontSizeicon" style="color: #23a393"></i>
          </el-badge>
          <span>预约提醒</span>
          <div class="inform-content"></div>
        </div>
        <div class="inform-pay">
          <el-badge value="10" class="item" style="z-index: 99">
            <i class="iconfont icon-shouzuguanli fontSizeicon" style="color: #61c0bf"></i>
          </el-badge>
          <span>收租提醒</span>
          <div class="inform-content"></div>
        </div>
        <div class="inform-contract">
          <el-badge value="20" class="item" style="z-index: 99">
            <i class="iconfont icon-OAtubiao-_fuzhi_huabanfuben fontSizeicon"></i>
          </el-badge>
          <span>合同到期提醒</span>
          <div class="inform-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { downLoad, test } from "@/api/download.js";
import { allHouseApi, getRentInfo, getHouseInfoCount } from "@/api/user.js";

export default {
  data() {
    return {
      content: ""
    };
  },

  created() {
    // this.getHouse()
    // this._getUserInfo()
    this.getRentInfo();
  },
  mounted() {
    //收益统计
    // this.shouyi();
    // //房源统计
    // this.house();
    // this.rentRate();
  },

  methods: {
    //获取数量

    async getRentInfo() {
      var data = await getRentInfo();
      console.log(data);
    },

  }
};
</script>
<style type="text/css">
.title > div {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 6px;
  width: 24%;
  height: 130px;
  vertical-align: middle;
  border-radius: 6px;
  text-align: left;
}

.title-icon {
  position: absolute;
  top: 14px;
  right: 20px;
}
.iconSize {
  font-size: 45px;
}

.message {
  margin-top: 10px;
  margin-bottom: 10px;
}

.message span {
  display: inline-block;
  vertical-align: middle;
  height: 270px;
}

.message span.message1 {

  width: 70%;
}

.message span.message2 {

  width: 30%;
  height: 270px;
}

.content {
  width: 100%;
  margin-top: 10px;
  padding: 5px;
}
.content .echarts {
  vertical-align: middle;
  display: inline-block;
  width: 69%;
  height: 650px;

}
.content .inform {
  vertical-align: middle;
  display: inline-block;
  width: 28%;
  height: 650px;

}
.echarts-yield-curve {
  height: 58%;

}
.echarts-wrap {
  height: 42%;

}
.echarts-vacancy-rate {
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  height: 100%;

}
.echarts-pay-rate {
  display: inline-block;
  vertical-align: middle;
  width: 48%;
  height: 100%;

}
.active {
  background: #fae3d9 !important;
}


.inform-apponit,
.inform-pay,
.inform-contract {
  position: relative;
  box-sizing: border-box;
  height: 24%;
  margin-bottom: 5px;
  padding: 8px;
  text-align: left;
}
.inform-content {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 70%;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.fontSizeicon {
  font-size: 30px;
}
</style>
