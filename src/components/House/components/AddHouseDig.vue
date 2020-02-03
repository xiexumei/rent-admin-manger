<template>
  <div>
    <el-dialog title="房源信息" :visible.sync="show" style="height: 800px" show-close="false" destroy-on-close @close="show = false;$emit('closeDig')">
      <el-form :model="form">
        <el-form-item size="mini" label="城市" :label-width="formLabelWidth">
          <el-input v-model="form.City" autocomplete="off"></el-input>
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
        <el-form-item size="mini" label="房屋面积(平米)" :label-width="formLabelWidth">
          <el-input
            v-model="form.Area"
            autocomplete="off"
          ></el-input>
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
          <el-input
            v-model="form.Price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item size="mini" label="押金" :label-width="formLabelWidth">
          <el-input v-model="form.PledgeMoney" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传房屋图片 -->
        <el-form-item size="mini" label="上传房屋图片" :label-width="formLabelWidth">
          <el-upload
            class="img"
            name="img"
            drag
            action="http://localhost:8080/updateImg/updateImg"
            multiple
            :on-success="getRes"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将图片拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg图片，且不超过500kb</div>
          </el-upload>
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

        <el-form-item label="房源设施配置" :label-width="formLabelWidth" size="mini">
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
        </el-form-item>
        <el-form-item size="mini" label="房源配置" :label-width="formLabelWidth">
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
        </el-form-item>
        <el-form-item label="房屋状态" :label-width="formLabelWidth" size="mini">
          <el-input v-model="form.Status" autocomplete="off" disabled value="待出租"></el-input>
        </el-form-item>
        <el-form-item label="获取合同模板id" :label-width="formLabelWidth" size="mini">
          <button type="button" @click="getTemplateDialog">获取合同模板</button>
          <el-input v-model="form.Contractid" disabled autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-tag
          @click="show = false;$emit('closeDig')"
          size="medium"
          type="danger"
          style="cursor:pointer"
        >取 消</el-tag>
        <el-tag type="primary" @click="addHouse" size="medium" style="cursor:pointer">确 定</el-tag>
      </div>
    </el-dialog>
    <selectContract @closeDig="dialogFormVisible1=false" :dialogFormVisible="dialogFormVisible1"></selectContract>
    <!-- <Map class="posmap" v-show="innerVisible" @closeTip="closeTip"></Map> -->
  </div>
</template>
<script>
import Map from "./map.vue";
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
      index: 1,
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
    selectContract
  },
  computed: {
    ...mapGetters(["address"]),
    // 合同id
    contractId() {
      return this.$store.state.contid;
    }
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    },
    address: function() {
      this.form.address = this.address;
    },
    // 回传的合同id
    contractId: {
      handler(n, o) {
        this.form.Contractid = n;
        console.log(this.form.Contractid);
      }
    }
  },
  methods: {
    showMap() {
      this.isshowMap = true;
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
      // console.log(response);
      var name = "Img" + this.index++;
      this.houseobj[name] = response;
      // console.log(this.houseobj[name]);
    },
    // 添加房屋，调用接口
    addHouse() {
      this.show = false;
      this.$emit("closeDig");

      // 房屋对象
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
          console.log(res);
          this.$store.commit("cbhouseId",res);
        })
        .catch(() => {});
    },
    // 获取合同模板
    async getTemplateDialog() {
      this.dialogFormVisible1 = true;
      let res = await getAllTemplates();
      let arr = [];
      for (let i = 0; i < res._Items.length; i++) {
        arr[i] = res._Items[i].Id;
      }
      this.$store.commit("getContractTemId", arr);
    }
  }
};
</script>
<style type="text/css" scoped>
.posmap {
  z-index: 9999;
  margin-left: -100px;
  width: 700px;
  height: 700px;
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
</style>



