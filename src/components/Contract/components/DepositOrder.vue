<template>
  <div>
    <el-dialog title="定金订单信息" :visible.sync="show" style="height: 800px" show-close="false" destroy-on-close
               @close="show = false;$emit('closeDig')">
      <el-form :model="form">
        <el-form-item size="mini" label="生效时长" :label-width="formLabelWidth">
          <el-input v-model="form.EffectiveTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="定金状态" :label-width="formLabelWidth">
          <el-input disabled v-model="form.Status" autocomplete="off"></el-input>
        </el-form-item>
        <button type="button" @click="selecthouse">选择房屋</button>
        <el-form-item size="mini" label="房屋" :label-width="formLabelWidth">
          <el-input disabled v-model="form.HouseName" autocomplete="off"></el-input>
        </el-form-item>
        <button type="button" @click="selectuser">选择用户</button>
        <el-form-item size="mini" label="用户" :label-width="formLabelWidth">
          <el-input disabled v-model="form.TenantName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="定金金额" :label-width="formLabelWidth">
          <el-input disabled v-model="form.DepositMoney" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-tag
          @click="show = false;$emit('closeDig')"
          size="medium"
          type="danger"
          style="cursor:pointer"
        >取 消
        </el-tag>
        <el-tag type="primary" @click="addDepositOrder" size="medium" style="cursor:pointer">确 定</el-tag>
      </div>
      <selectHouseId
        @closeDig="dialogFormVisibleHouse=false"
        :dialogFormVisible="dialogFormVisibleHouse"
      ></selectHouseId>
      <selectUserId
        @closeDig="dialogFormVisibleUser=false"
        :dialogFormVisible="dialogFormVisibleUser"
      ></selectUserId>
    </el-dialog>

  </div>
</template>
<script>
    import {createorder} from "@/interfance/GetVersion.js";
    import selectHouseId from "@/components/Contract/components/selectHouseId.vue";
    import selectUserId from "@/components/Contract/components/selectUserId.vue";

    export default {
        props: ["dialogFormVisible"],
        data() {
            return {
                dialogFormVisibleHouse: false,
                dialogFormVisibleUser: false,
                show: false,
                depositobj: {},
                form: {
                    EffectiveTime: '',//生效时长
                    Status: '未支付',//定金状态
                    TenantId: '',//用户
                    HouseId: '',//房屋
                    DepositMoney: '',//定金金额
                    HouseName: '',
                    TenantName: '',
                },
                formLabelWidth: "120px"
            };
        },
        components: {
            selectHouseId,
            selectUserId

        },
        computed: {
            // 合同id
            // contractId() {
            //     return this.$store.state.contid;
            // },
            // 获取房屋id
            changeHouseId() {
                return this.$store.state.houseid;
            },
            // 获取用户id
            changeUserId() {
                return this.$store.state.userid;
            },
        },
        watch: {
            dialogFormVisible(newV, oldV) {
                this.show = newV;
            },
            // 获取房屋id
            changeHouseId: {
                handler(n, o) {
                    console.log(n);
                    this.form.HouseName = n.Name;
                    this.form.HouseId = n.Id;
                    this.form.DepositMoney = n.Price * 0.2;
                }
            },
            // 获取用户id
            changeUserId: {
                handler(n, o) {
                    console.log(n);
                    this.form.TenantName = n.Name;
                    this.form.TenantId = n.Id;
                }
            }
        },
        methods: {
            // 选择房屋
            selecthouse() {
                this.dialogFormVisibleHouse = !this.dialogFormVisibleHouse;
            },
            // 选择用户
            selectuser() {
                this.dialogFormVisibleUser = !this.dialogFormVisibleUser;
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
            //生成定金订单
            addDepositOrder() {
                this.show = false;
                this.$emit("closeDig");

                this.depositobj["EffectiveTime"] = this.form.EffectiveTime;
                this.depositobj["TradeRecordId"] = this.form.TradeRecordId;
                this.depositobj["Status"] = this.form.Status;
                this.depositobj["TenantId"] = this.form.TenantId;
                this.depositobj["HouseId"] = this.form.HouseId;
                this.depositobj["DepositMoney"] = this.form.DepositMoney;

                console.log(this.depositobj);
                createorder(this.depositobj)
                    .then(res => {
                        console.log(res);
                        //定金订单id
                        this.$store.commit("getOrderId", res);

                    })
                    .catch(err => {
                    });
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
