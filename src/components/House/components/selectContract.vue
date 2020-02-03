<template>
  <div>
    <el-dialog title="合同模板信息" :visible.sync="show" @close="closeDialog()" width="50%">
      <el-carousel :interval="4000" type="card" height="400px" autoplay="false">
        <el-carousel-item v-for="(item,index) in contractId" :key="index">
          <h2>合同模板{{index+1}}</h2>
          <div   @click="viewpicture($event,item)">
             <img class="contract" src="../../../../static/image/contract1.jpg" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- <div
          
          v-for="item in contractId"
          :key="item"
          @click="viewpicture($event,item)"
        >
        <div class="contractBox"></div>
      </div>-->

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
      formLabelWidth: "120px"
    };
  },
  components: {},
  computed: {
    // 合同模板id
    getContractTemId() {
      return this.$store.state.contractTemId;
    }
  },
  watch: {
    dialogFormVisible(newV, oldV) {
      this.show = newV;
    },
    // 合同id
    getContractTemId: {
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
    // 图片放大
    viewpicture(e, item) {
      console.log("dsaf", item);
      // 回传合同模板
      this.$store.commit("contractId", item);
    },
    closeDialog() {
      this.show = false;
      this.$emit("closeDig");
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

el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.contract{
  height: 380px;
}
</style>



