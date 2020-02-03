<template>
  <div>
    <el-dialog title="合同模板信息" :visible.sync="show" @close="closeDialog()">
      <el-form :model="form" class="form">
        <div
          class="contractBox"
          v-for="item in contractId"
          :key="item"
          @click="viewpictures($event,item)"
        >{{item}}</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-tag
          @click="show = false;$emit('closeDig')"
          size="medium"
          type="danger"
          style="cursor:pointer"
        >取 消</el-tag>
        <el-tag type="primary" @click="addContractId" size="medium" style="cursor:pointer">确 定</el-tag>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    export default {
        props: ["dialogFormVisible"],
        data() {
            return {
                contractId: [],
                Ph: "",
                fileList: [],
                checkList: [],
                show: false,
                innerVisible: false,
                msg1: "",
                msg2: "",
                form: {
                    name: "",
                    phone: "",
                    pwd: "123456",
                    sex: "man",
                    Ph: ""
                },
                formLabelWidth: "120px"
            };
        },
        components: {},
        computed: {
            // 合同id
            getContractTemIds() {
                return this.$store.state.contractTemId1;
            }
        },
        watch: {
            dialogFormVisible(newV, oldV) {
                this.show = newV;
            },
            // 合同id
            getContractTemIds: {
                handler(n, o) {
                    console.log(n);
                    this.contractId = n;
                }
            }
        },
        methods: {
            addContractId() {
                this.show = false;
                this.$emit("closeDig");
            },
            viewpictures(e,item) {
                console.log('dsaf',item);
                // 回传合同模板
                this.$store.commit("returncontracttem", item);
            },
            closeDialog(){
                this.show = false;
                this.$emit('closeDig');
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
  span {
    color: red;
    font-size: 12px;
  }
  .form {
    display: flex;
    justify-content: space-around;
  }
  .contractBox {
    width: 200px;
    height: 290px;

    background-image: url("../../../../static/image/contract1.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .contractBox:focus {
    border: 1px solid red;
  }
</style>



