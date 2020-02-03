<template>
  <div>
    <el-dialog title="房源信息" :visible.sync="show" style="height: 800px" @close="show = false;
          $emit('closeDig')" destroy-on-close>
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
          <el-input v-model="form  .Floor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="房屋面积(平米)" :label-width="formLabelWidth">
          <el-input
            v-model="form.Area"
            autocomplete="off"
          ></el-input>
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
          <el-input v-model="form.Status" autocomplete="off" value="待出租"></el-input>
        </el-form-item>
<!--        <el-form-item label="获取合同模板id" :label-width="formLabelWidth" size="mini">-->
<!--          <button type="button" @click="getContractid">获取合同模板</button>-->
<!--          <el-input v-model="form.Contractid" disabled autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-tag
          @click="show = false;$emit('closeDig')"
          size="medium"
          type="danger"
          style="cursor:pointer"
        >取 消
        </el-tag>
        <el-tag type="primary" @click="addHouse" size="medium" style="cursor:pointer">确 定</el-tag>
      </div>
    </el-dialog>
    <viewContract @closeDig="dialogFormVisible1=false" :dialogFormVisible="dialogFormVisible1"></viewContract>
  </div>
</template>
<script>
    import Map from "./map.vue";
    import {mapGetters, mapActions} from "vuex";
    import {
        getAllTemplates,
        uploadHouse
    } from "@/interfance/GetVersion.js";
    import viewContract from "@/components/House/components/viewContracts.vue";

    export default {
        props: ["dialogFormVisible"],
        data() {
            return {
                dialogFormVisible1: false,
                fileList: [],
                checkList: [],
                houseobj: {},
                imgList: [],
                equipmentobj: {},
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
                    ELevator: "",
                    Gasifier: "",
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
                    Airconditioner: "",
                    Heater: "",
                    Refigerator: "",
                    Washer: "",
                    Wardrobe: "",
                    Bed: "",
                    Wifi: "",
                    Tv: "",
                    HouseId: ""
                },
                formLabelWidth: "120px"
            };
        },
        components: {
            Map,
            viewContract
        },
        computed: {
            ...mapGetters(["address"]),
            // 获取到的房屋信息
            changeHouse() {
                return this.$store.state.housedate;
            },
            // 合同id
            returncontracttem() {
                return this.$store.state.contidtem;
            }
        },
        watch: {
            dialogFormVisible(newV, oldV) {
                this.show = newV;
            },
            address: function () {
                this.form.address = this.address;
            },

            // 获取到的房屋信息
            changeHouse: {
                handler(n, o) {
                    console.log(n.Equipment);
                    this.equipmentobj = n.Equipment;
                    this.houseobj = n;
                    this.form = n;
                    this.form.HouseId = n.Id;
                    this.form.Airconditioner = n.Equipment.Airconditioner;
                    this.form.Heater = n.Equipment.Heater;
                    this.form.Refigerator = n.Equipment.Refigerator;
                    this.form.Washer = n.Equipment.Washer;
                    this.form.Wardrobe = n.Equipment.Wardrobe;
                    this.form.Bed = n.Equipment.Bed;
                    this.form.Wifi = n.Equipment.Wifi;
                    this.form.Tv = n.Equipment.Tv;
                    if (n.Gasifier == true) {
                        this.form.Gasifier = "有";
                    } else {
                        this.form.Gasifier = "无";
                    }

                    if (n.ELevator == true) {
                        this.form.ELevator = "有";
                    } else {
                        this.form.ELevator = "无";
                    }

                    if (n.Equipment.Airconditioner == true) {
                        this.form.Airconditioner = "有";
                    } else {
                        this.form.Airconditioner = "无";
                    }

                    if (n.Equipment.Heater == true) {
                        this.form.Heater = "有";
                    } else {
                        this.form.Heater = "无";
                    }

                    if (n.Equipment.Refigerator == true) {
                        this.form.Refigerator = "有";
                    } else {
                        this.form.Refigerator = "无";
                    }

                    if (n.Equipment.Washer == true) {
                        this.form.Washer = "有";
                    } else {
                        this.form.Washer = "无";
                    }

                    if (n.Equipment.Wardrobe == true) {
                        this.form.Wardrobe = "有";
                    } else {
                        this.form.Wardrobe = "无";
                    }

                    if (n.Equipment.Bed == true) {
                        this.form.Bed = "有";
                    } else {
                        this.form.Bed = "无";
                    }

                    if (n.Equipment.Wifi == true) {
                        this.form.Wifi = "有";
                    } else {
                        this.form.Wifi = "无";
                    }

                    if (n.Equipment.Tv == true) {
                        this.form.Tv = "有";
                    } else {
                        this.form.Tv = "无";
                    }
                }
            },
            // 回传的合同id
            returncontracttem: {
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
                    .catch(_ => {
                    });
            },
            // 修改房屋，调用接口
            addHouse() {
                this.show = false;
                this.$emit("closeDig");

                if (this.form.Gasifier == "有") {
                    this.form.Gasifier = "true";
                } else {
                    this.form.Gasifier = "false";
                }

                if (this.form.ELevator == "有") {
                    this.form.ELevator = "true";
                } else {
                    this.form.ELevator = "false";
                }

                if (this.form.Airconditioner == "有") {
                    this.form.Airconditioner = "true";
                } else {
                    this.form.Airconditioner = "false";
                }

                if (this.form.Heater == "有") {
                    this.form.Heater = "true";
                } else {
                    this.form.Heater = "false";
                }

                if (this.form.Refigerator == "有") {
                    this.form.Refigerator = "true";
                } else {
                    this.form.Refigerator = "false";
                }

                if (this.form.Washer == "有") {
                    this.form.Washer = "true";
                } else {
                    this.form.Washer = "false";
                }

                if (this.form.Wardrobe == "有") {
                    this.form.Wardrobe = "true";
                } else {
                    this.form.Wardrobe = "false";
                }

                if (this.form.Bed == "有") {
                    this.form.Bed = "true";
                } else {
                    this.form.Bed = "false";
                }

                if (this.form.Wifi == "有") {
                    this.form.Wifi = "true";
                } else {
                    this.form.Wifi = "false";
                }

                if (this.form.Tv == "有") {
                    this.form.Tv = "true";
                } else {
                    this.form.Tv = "false";
                }

                // 房屋对象
                this.houseobj["Id"] = this.form.HouseId;
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
                console.log(this.houseobj.Id);
                console.log(this.houseobj, this.equipmentobj, this.form.Contractid);
                uploadHouse(this.houseobj, this.equipmentobj, this.form.Contractid)
                    .then(res => {
                        console.log(res);
                        //  更新回传id判断
                        this.$store.commit("updatecbhouseId", res);
                    })
                    .catch(() => {
                    });
            },
            // 获取合同模板
            // async getContractid() {
            //     this.dialogFormVisible1 = true;
            //     let res = await getAllTemplates();
            //     let arr = [];
            //     for (let i = 0; i < res._Items.length; i++) {
            //         arr[i] = res._Items[i].id;
            //     }
            //     // console.log(arr);
            //     this.$store.commit("getContractTemIds", arr);
            // }
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

  .showmap {
    z-index: 999;
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



