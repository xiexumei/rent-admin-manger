<template>
  <div>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="580"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <!-- 租客 -->
      <el-table-column prop="TenantName" :label="tablelist.TenantName" width="60"></el-table-column>
      <!-- 租客手机号码 -->
      <el-table-column prop="Phone" :label="tablelist.Phone" width="90"></el-table-column>
      <!-- 房屋 -->
      <el-table-column prop="HouseName" :label="tablelist.HouseName" width="80"></el-table-column>
      <!-- 交付时间 -->
      <el-table-column prop="StartTime" :label="tablelist.StartTime" width="100"></el-table-column>
      <!-- 到期时间 -->
      <el-table-column prop="EndTime" :label="tablelist.EndTime" width="100"></el-table-column>

      <!-- 状态 -->
      <el-table-column prop="Status" :label="tablelist.Status" width="100"></el-table-column>
      <!-- 操作 -->
      <el-table-column prop="caozuo" :label="tablelist.caozuo" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="待签合同下载" placement="top-start">
            <el-button
              size="mini"
              type="primary"
              @click="templateOut(scope.$index, scope.row)"
              style="cursor:pointer"
            >模板导出</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="已签约合同回传" placement="top-start">
            <el-button
              size="mini"
              v-if="scope.row.Uploaded == '有'"
              @click="uploadcontractcopy(scope.$index, scope.row)"
              type="primary"
              disabled
              style="cursor:pointer"
            >附件上传</el-button>
            <el-button
              size="mini"
              v-else
              @click="uploadcontractcopy(scope.$index, scope.row)"
              type="primary"
              style="cursor:pointer"
            >附件上传</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="已签约合同下载" placement="top-start">
            <el-button
              size="mini"
              v-if="scope.row.Uploaded == '有'"
              type="primary"
              @click="ContractOut(scope.$index, scope.row)"
              style="cursor:pointer"
            >附件导出</el-button>
            <el-button
              size="mini"
              v-else
              type="primary"
              @click="ContractOut(scope.$index, scope.row)"
              disabled
              style="cursor:pointer"
            >附件导出</el-button>
          </el-tooltip>
          <el-dialog title="上传合同副本文件" :visible.sync="dialogVisible">
            <el-form :model="form">
              <el-upload
                class="uploadfile"
                action
                :http-request="uploadFileMethod"
                :show-file-list="false"
                multiple
              >
                <el-button class="custom-btn" size="small" type="primary">请选择合同副本上传</el-button>
              </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-tag
                @click="dialogVisible = false"
                size="medium"
                type="danger"
                style="cursor:pointer"
              >取 消</el-tag>
              <el-tag
                type="primary"
                @click="AddContractCopy"
                size="medium"
                style="cursor:pointer"
              >确 定</el-tag>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column prop="topay" :label="tablelist.topay" show-overflow-tooltip width="80px">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="线下支付租金" placement="top-start">
            <el-button
              size="mini"
              v-if="scope.row.Status == '申请退款中'"
              @click="payRentmoney(scope.$index, scope.row)"
              disabled
              type="danger"
              style="cursor:pointer"
            >支付</el-button>
            <el-button
              size="mini"
              v-else
              @click="payRentmoney(scope.$index, scope.row)"
              type="danger"
              style="cursor:pointer"
            >支付</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column prop :label="tablelist.detail" width="92">
        <el-tag>查看详情</el-tag>
      </el-table-column>
    </el-table>
    <!--    <contractout @closeDig="dialogFormVisibleout=false" :dialogFormVisible="dialogFormVisibleout"></contractout>-->
    <!--    <AddContractCopy @closeDig="dialogFormVisible=false" :dialogFormVisible="dialogFormVisible"></AddContractCopy>-->
    <PayRentmoney @closeDig="dialogFormVisiblePay=false" :dialogFormVisible="dialogFormVisiblePay"></PayRentmoney>

    <!--    <Pagination></Pagination>-->
  </div>
</template>

<script>
// import contractout from "@/components/Contract/components/contractOut.vue";
import PayRentmoney from "@/components/Contract/components/payRentmoney.vue";
import Pagination from "@/components/Pagination/Pagination";
import { downloadContract, getPayMoneys } from "@/interfance/GetVersion.js";
import { downLoad } from "../../../api/download";

export default {
  props: ["tablelist", "tableData"],
  data() {
    return {
      dialogFormVisibleview: false, //控制表单是否显示
      dialogFormVisibleout: false,
      dialogFormVisible: false,
      dialogFormVisiblePay: false,
      dialogFormVisibleHouse: false,
      dialogVisible: false,
      multipleSelection: [],
      form: {},
      contractCopyId: ""
    };
  },
  components: {
    PayRentmoney
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 选择房屋
    selecthouse() {
      this.dialogFormVisibleHouse = !this.dialogFormVisibleHouse;
    },
    //合同附件导出
    async ContractOut(index, row) {
      this.dialogFormVisibleout = !this.dialogFormVisibleout;
      console.log(row.Contractid);
      this.exportClicks(row);
    },
    exportClicks(row) {
      var contractId = row.Contractid;
      downloadContract(contractId).then(res => {
        const content = res;
        const blob = new Blob([content]);
        const fileName = "房屋租赁合同.zip";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },

    // 导出合同模板按钮
    async templateOut(index, row) {
      this.dialogFormVisibleout = !this.dialogFormVisibleout;
      console.log(row.Contractid);
      this.exportClick(row);
    },
    exportClick(row) {
      var contractId = row.Contractid;
      downLoad(contractId).then(res => {
        const content = res;
        const blob = new Blob([content]);
        const fileName = "房屋租赁合同.docx";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },

    // 上传合同副本文件按钮
    uploadcontractcopy(index, row) {
      this.dialogVisible = true;
      this.contractCopyId = row.Contractid;
    },
    AddContractCopy() {
      this.dialogVisible = false;
    },
    uploadFileMethod(param) {
      // console.log(this.contractCopyId);
      let fileObject = param.file; //文件对象
      let contractId = this.contractCopyId;
      let formData = new FormData();
      // console.log(contractId);
      formData.append("contractId", contractId);
      formData.append("contractFile", fileObject);
      console.log(formData);
      let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.$axios
        .post("/updateContractFile/updateContractFile", formData, config)
        .then(res => {
          this.$message({
            type: "success",
            message: "上传成功!"
          });
          this.dialogVisible = false;
          console.log(res);
          //合同附件上传成功实时刷新
          this.$store.commit("UploadContractRefresh", res.data);
        });
    },

    // 线下支付租金
    async payRentmoney(index, row) {
      this.dialogFormVisiblePay = !this.dialogFormVisiblePay;
      // console.log(row.Id);
      console.log(parseInt(row.Id));
      var res = await getPayMoneys(row.Id * 1);
      console.log(res._Items);
      this.$store.commit("getResDate", res._Items);
      this.$store.commit("getResDateid", row.Id);
    }
  }
};
</script>
