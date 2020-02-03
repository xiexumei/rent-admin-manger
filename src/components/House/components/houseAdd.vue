<template>
  <div class="addhouse">
    <div class="position">
      <div class="address">
        <el-form :model="form" label-position="left">
          <el-col :span="18">
            <el-form-item size="mini" label="城市" :label-width="formLabelWidth">
              <el-input v-model="form.City" autocomplete="off"></el-input>
              <span class="showmap" @click="showMap"><i class="iconfont icon-ziyuan1"></i>打开地图</span>
            </el-form-item>
            <el-form-item size="mini" label="行政区域" :label-width="formLabelWidth">
              <el-input v-model="form.Region" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="地点名" :label-width="formLabelWidth">
              <el-input v-model="form.Place" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="小区名" :label-width="formLabelWidth">
              <el-input v-model="form.Name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="楼层" :label-width="formLabelWidth">
              <el-input v-model="form.Floor" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="basic-message">
        <el-col :span="18">
          <el-form :model="form" label-position="left">
            <el-form-item size="mini" label="房屋面积(平米)" :label-width="formLabelWidth">
              <el-input v-model="form.Area" autocomplete="off" ></el-input>
              <span class="span1">{{msg1}}</span>
            </el-form-item>
            <el-form-item label="房屋类型" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Type" placeholder="请选择房屋类型" style="width: 100%">
                <el-option label="一室一厅" value="一室一厅" size="mini"></el-option>
                <el-option label="两室一厅" value="两室一厅" size="mini"></el-option>
                <el-option label="两室两厅" value="两室两厅" size="mini"></el-option>
                <el-option label="三室一厅" value="三室一厅" size="mini"></el-option>
                <el-option label="三室两厅" value="三室两厅" size="mini"></el-option>
                <el-option label="四室一厅" value="四室一厅" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="mini" label="房屋租金(元)" :label-width="formLabelWidth">
              <el-input v-model="form.Price" autocomplete="off"></el-input>
              <span class="span1">{{msg2}}</span>
            </el-form-item>
            <el-form-item size="mini" label="押金" :label-width="formLabelWidth">
              <el-input v-model="form.PledgeMoney" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="房屋租期" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.DuringTime" placeholder="请选择房屋租期类型" style="width: 100%">
                <el-option label="一个月" value="1" size="mini"></el-option>
                <el-option label="两个月" value="2" size="mini"></el-option>
                <el-option label="三个月" value="3" size="mini"></el-option>
                <el-option label="四个月" value="4" size="mini"></el-option>
                <el-option label="五个月" value="5" size="mini"></el-option>
                <el-option label="六个月" value="6" size="mini"></el-option>
                <el-option label="七个月" value="7" size="mini"></el-option>
                <el-option label="八个月" value="8" size="mini"></el-option>
                <el-option label="九个月" value="9" size="mini"></el-option>
                <el-option label="十个月" value="10" size="mini"></el-option>
                <el-option label="十一个月" value="11" size="mini"></el-option>
                <el-option label="一年" value="12" size="mini"></el-option>
                <el-option label="两年" value="24" size="mini"></el-option>
                <el-option label="三年" value="36" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="房屋状态" :label-width="formLabelWidth" size="mini">
              <el-input v-model="form.Status" autocomplete="off" disabled value="待出租"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </div>
    <div style="height:430px;margin-bottom:10px;  border: 1px dashed #d9d9d9;">
      <div class="basic-setting">
        <el-form :model="form" label-position="left">
          <el-col :span="10">
            <el-form-item label="空调" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Airconditioner" placeholder="有无空调" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="热水器" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Heater" placeholder="有无热水器" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="冰箱" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Refigerator" placeholder="有无冰箱" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="洗衣机" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Washer" placeholder="有无洗衣机" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="床" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Bed" placeholder="有无床" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="衣柜" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Wardrobe" placeholder="有无衣柜" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="wifi" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Wifi" placeholder="有无WiFi" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电视" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Tv" placeholder="有无电视" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="电梯" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.ELevator" placeholder="有无电梯" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="燃气" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.Gasifier" placeholder="有无燃气" style="width: 100%">
                <el-option label="有" value="true" size="mini"></el-option>
                <el-option label="无" value="false" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用电类型" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.ELectricityType" placeholder="请选择用电类型" style="width: 100%">
                <el-option label="民用" value="民用" size="mini"></el-option>
                <el-option label="商用" value="商用" size="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用水类型" :label-width="formLabelWidth" size="mini">
              <el-select v-model="form.WaterType" placeholder="请选择用水类型" style="width: 100%">
                <el-option label="民用" value="民用" size="mini"></el-option>
                <el-option label="商用" value="商用" size="mini"></el-option>
              </el-select>
            </el-form-item>
        
          </el-col>
        </el-form>
      </div>
      <div class="upload">
        <div class="upload-thing">
          <div class="upload-img">
            <img
              style="width:150px; height:180px;margin:0 auto;"
              src="../../../../static/image/girls.jpg"
              alt
            />
            <el-upload
              name="img"
             
              action="http://localhost:8080/updateImg/updateImg"
              multiple
              :on-success="getRes"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将图片拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">请上传jpg图片，且不超过500kb</div>
            </el-upload>
          </div>
          <div class="upload-contract">
            <div>
              <img style="width:150px; height:180px;margin-top:12px;" src="../../../../static/image/man.jpg" alt />
            </div>
            <div>
              <el-tag type="button" @click="getTemplateDialog">获取合同模板</el-tag>
              <el-input v-model="form.ContractName" disabled autocomplete="off" value></el-input>
            </div>
          </div>
        </div>
        <div style="height:76px; border: 1px solid #ccc; line-height:76px;">
          <el-button type="primary" @click="addHouse" size="medium" style="cursor:pointer">确定上传</el-button>
        </div>
      </div>
    </div>
    <mapDialog :dialogFormVisible="isshowMap"></mapDialog>
    <selectContract @closeDig="dialogFormVisible1=false" :dialogFormVisible="dialogFormVisible1"></selectContract>
  </div>
</template>
<script>
import Map from "./map.vue";
import mapDialog from './mapDialog'
import store from "@/store";
import { mapGetters, mapActions } from "vuex";
import {
  getAllTemplates,
  uploadHouse,
  uploadImg
} from "@/interfance/GetVersion.js";
import selectContract from "@/components/House/components/selectContract.vue";
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      maptext:'打开地图',
      index: 1,
      isshowMap:false,
      
      dialogFormVisible1: false,
      fileList: [],
      checkList: [],
      equipmentobj: {},
      imgList: [],
      houseobj: {},
      show: false,
      innerVisible: false,
      msg1: "",
      msg2: "",
      form: {
        Name: "",
        Area: "",
        City: "",
        Region: "",
        Place: "",
        Floor: "",
        ELevator: "true",
        Gasifier: "true",
        address: "",
        PledgeMoney: "",
        Status: "待出租",
        Price: "",
        DuringTime: "",
        Type: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        ELectricityType: "",
        WaterType: "",
        templateIds: "",
        Contractid: "",
        ContractName: "",
        Airconditioner: "true",
        Heater: "true",
        Refigerator: "true",
        Washer: "true",
        Wardrobe: "true",
        Bed: "true",
        Wifi: "true",
        Tv: "true"
      },
      formLabelWidth: "120px"
    };
  },
  components: {
    Map,
    mapDialog,
    selectContract
  },
  computed: {
    getaddress() {
      return store.getters.address;
    },
    //获取经度
    getLat(){
       return store.getters.lat;

    },
    //获取纬度
    getLng(){
       return store.getters.lng;

    },
    // 合同id对象
    contractId() {
      return this.$store.state.contid;
    }
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    },
    getaddress: function() {
      this.form.City = this.getaddress.substring(0, this.getaddress.indexOf('市')+1);
      this.form.Region = this.getaddress.substring(this.getaddress.indexOf('市')+1, this.getaddress.indexOf('区')+1);;
      this.form.Place = this.getaddress;
    },
    // 回传的合同id
    contractId: {
      handler(n, o) {
        this.form.Contractid = n.Id;
        this.form.ContractName = n.Name;
        console.log(this.form.Contractid);
      }
    }
  },
  methods: {
    showMap() {
      this.isshowMap = !this.isshowMap;
      this.$store.commit("isShowMap", this.isshowMap)
    },
    closeTip() {
      this.innerVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 上传图片
    getRes(response, file, fileList) {
      this.imgList.push(response);
      console.log(response);
      var name = "Img" + this.index++;
      this.houseobj[name] = response;
      // console.log(this.houseobj[name]);
    },
    // 添加房屋，调用接口
    addHouse() {
      this.show = false;
      //this.$emit("closeDig");

      // 房屋对象
      this.houseobj["Latitude"] = this.getLng//纬度
      this.houseobj["Longitude"] = this.getLat//经度
      this.houseobj["Name"] = this.form.Name;
      this.houseobj["City"] = this.form.City;
      this.houseobj["Region"] = this.form.Region;
      this.houseobj["Place"] = this.form.Place;
      this.houseobj["Floor"] = this.form.Floor;
      this.houseobj["Area"] = this.form.Area;
      this.houseobj["DuringTime"] = this.form.DuringTime;
      this.houseobj["Type"] = this.form.Type;
      this.houseobj["ELevator"] = this.form.ELevator;
      this.houseobj["Gasifier"] = this.form.Gasifier;
      this.houseobj["ELectricityType"] = this.form.ELectricityType;
      this.houseobj["WaterType"] = this.form.WaterType;
      this.houseobj["Status"] = this.form.Status;
      this.houseobj["Price"] = this.form.Price;
      this.houseobj["PledgeMoney"] = this.form.PledgeMoney;
      // 房屋基础对象
      this.equipmentobj["Airconditioner"] = this.form.Airconditioner;
      this.equipmentobj["Heater"] = this.form.Heater;
      this.equipmentobj["Refigerator"] = this.form.Refigerator;
      this.equipmentobj["Washer"] = this.form.Washer;
      this.equipmentobj["Wardrobe"] = this.form.Wardrobe;
      this.equipmentobj["Bed"] = this.form.Bed;
      this.equipmentobj["Wifi"] = this.form.Wifi;
      this.equipmentobj["Tv"] = this.form.Tv;
    
      // this.houseList.push(this.form.Name,this.form.City,this.form.Region,this.form.Place,this.form.Floor,this.form.Area,this.form.Price,this.form.DuringTime,this.form.Type,this.form.checkList,this.form.ELectricityType,this.form.WaterType,this.form.Status)
      // console.log(this.houseList,this.equipmentList,this.form.Contractid);
      // console.log(this.houseobj);
      console.log(this.houseobj, this.equipmentobj, this.form.Contractid);
      uploadHouse(this.houseobj, this.equipmentobj, this.form.Contractid)
        .then(res => {
          this.form = {}
          console.log(res);
          this.$store.commit("cbhouseId", res);
        })
        .catch(() => {});
    },
    // 获取合同模板
    async getTemplateDialog() {
      this.dialogFormVisible1 = true;
      let res = await getAllTemplates();
      let arr = [];
      for (let i = 0; i < res._Items.length; i++) {
        arr[i] = res._Items[i];
      }
      this.$store.commit("getContractTemId", arr);
    }
  }
};
</script>
<style type="text/css" scoped>
.addhouse {
  background-color: #fff;
  padding: 10px;
  border-right: 0px;
}
.position {
  height: 280px;
  line-height: 280px;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
}
.address {
  box-sizing: border-box;
  display: inline-block;
  padding: 1%;
  width: 50%;
  height: 280px;
  line-height: 280px;
  text-align: left;
  border: 1px dashed #d9d9d9;
}
.basic-message {
  box-sizing: border-box;
  vertical-align: top;
  display: inline-block;
  width: 49%;
  height: 280px;
  padding: 1%;
  border: 1px dashed #d9d9d9;
}
.basic-setting {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  width: 50%;
  height: 430px;
  padding: 1%;
  margin-bottom: 10px;
  border: 1px dashed #d9d9d9;
}

.upload {
  display: inline-block;
  width: 49%;
  border: 1px dashed #d9d9d9;
}

.upload-thing {
  display: inline-block;

  width: 100%;
  height: 350px;
}
.upload-img {
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  height: 350px;
  border: 1px dashed #d9d9d9;
}

.upload-contract {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  width: 48%;
  height: 350px;
  padding: 1%;
  border: 1px dashed #d9d9d9;
}
.showmap{
  display: inline-block;
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: url(../../../../static/image/map.png) no-repeat center center;
}
.container {
  width: 700px;
  height: 400px;
  position: absolute;
  top: 0;
  right: 0;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.span1 {
  color: red;
  font-size: 12px;
}

.el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50px;
  height: 180px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.iconSize{
font-size: 200px;
color: rgb(162,182,217)
}

.el-dialog{
  display: flex;
  flex-direction: column;
  margin:0 !important;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  /*height:600px;*/
  max-height:calc(100% - 30px);
  max-width:calc(100% - 30px);
}
.el-dialog .el-dialog__body{
  flex:1;
  overflow: auto;
}
</style>



