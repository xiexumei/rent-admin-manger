<!--<template>-->
<!--  <el-dialog title="上传合同副本文件" :visible.sync="show">-->
<!--    <el-form :model="form">-->
<!--      <el-upload-->
<!--        class="uploadfile"-->
<!--        action-->
<!--        :http-request="uploadFileMethod"-->
<!--        :show-file-list="false"-->
<!--        multiple-->
<!--      >-->
<!--        <el-button class="custom-btn" size="small">请选择合同副本上传</el-button>-->
<!--      </el-upload>-->
<!--    </el-form>-->
<!--    <div slot="footer" class="dialog-footer">-->
<!--      <el-tag-->
<!--        @click="show = false;$emit('closeDig')"-->
<!--        size="medium"-->
<!--        type="danger"-->
<!--        style="cursor:pointer"-->
<!--      >取 消</el-tag>-->
<!--      <el-tag type="primary" @click="AddContractCopy" size="medium" style="cursor:pointer">确 定</el-tag>-->
<!--    </div>-->
<!--  </el-dialog>-->
<!--</template>-->
<!--<script>-->
<!--import { makecontract,upContractCopy } from "@/interfance/GetVersion.js";-->
<!--export default {-->
<!--  props: ["dialogFormVisible"],-->
<!--  data() {-->
<!--    return {-->
<!--      show: false,-->
<!--      form: {},-->
<!--      formLabelWidth: "120px",-->
<!--        contractCopyId:''-->
<!--    };-->
<!--  },-->
<!--    computed:{-->
<!--        //上传合同附件-->
<!--        getContractIdCopyFile(){-->
<!--            this.$store.state.getContractIdCopy;-->
<!--        }-->
<!--    },-->
<!--  watch: {-->
<!--    dialogFormVisible(newV, oldV) {-->
<!--      this.show = newV;-->
<!--    },-->
<!--      //上传合同附件-->
<!--      getContractIdCopyFile:{-->
<!--        handler(n,o){-->
<!--            console.log(n);-->
<!--            // this.contractCopyId = n;-->
<!--        }-->
<!--      },-->
<!--  },-->
<!--  methods: {-->
<!--    // 修改合同-->
<!--    AddContractCopy() {-->
<!--      this.show = false;-->
<!--      this.$emit("closeDig");-->

<!--      // makecontract(this.contractObj)-->
<!--      //   .then(res => {-->
<!--      //     console.log(res);-->
<!--      //   })-->
<!--      //   .catch(err => {});-->
<!--    },-->
<!--    uploadFileMethod(param) {-->
<!--      console.log(param);-->
<!--      let fileObject = param.file; //文件对象-->
<!--        console.log(this.contractCopyId);-->
<!--      let contractId = this.contractCopyId;-->
<!--      let formData = new FormData();-->
<!--      formData.append("templateFile", fileObject);-->

<!--      let config = {-->
<!--        //添加请求头-->
<!--        headers: { "Content-Type": "multipart/form-data" }-->
<!--      };-->
<!--      this.$axios-->
<!--        .post("/updateContractFile/updateContractFile", formData, contractId)-->
<!--        .then(res => {-->
<!--          this.$message({-->
<!--            type: "success",-->
<!--            message: "上传成功!"-->
<!--          });-->
<!--        });-->
<!--    },-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--.span1 {-->
<!--  color: red;-->
<!--  font-size: 12px;-->
<!--}-->
<!--</style>-->

