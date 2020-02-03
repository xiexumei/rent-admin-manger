<template>
  <div>
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div class="contract-img">
      <div class="img1"></div>
      <div class="img1"></div>
      <div class="img1"></div>
    </div>
     <el-upload class="uploadfile" action="" :http-request='uploadFileMethod' :show-file-list="false" multiple>
       <img style="width:120px; height:120px;" src="../../../../static/image/man.jpg" alt="">
      <el-button class="custom-btn" size="small">请选择合同模板上传</el-button>
 </el-upload>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import {getAllTemplates} from '@/api/SingedService'
  export default {
    data() {
      return {
        fileList: [],
        isLoading:true
      };
    },
    components:{
      Loading
    },
    created(){
      this._getAllTemplates()

    },
    mounted(){
      this.isLoading=false
    },
    methods: {
      handleChange(file, fileList) {
        // this.fileList = fileList.slice();
        console.log(file);
      },

      //获取所有合同模板
      async _getAllTemplates(){
        var res = await getAllTemplates()
        console.log(res)
      },

      //
       uploadFileMethod(param) {
            console.log(param)
            let fileObject = param.file; //文件对象
            let name = param.file.name.substring(0,param.file.name.indexOf('.'))
             let formData = new FormData();
             formData.append("name", name);
             formData.append("templateFile", fileObject);
            
            let config = {
        //添加请求头
             headers: { "Content-Type": "multipart/form-data" },
            }
             this.$axios.post('/contract/updateContractTemplate', formData, config).then((res)=>{
               this.$message({
                  type: "success",
                  message: "上传成功!"
                });

             })
              
    
            
        }
    }
  }
</script>

<style scoped>
.contract-img {
  display: flex;
  justify-content: space-around;
}
.img1 {
  width: 207px;
  height: 300px;
  background-image: url("../../../../static/image/contract1.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
}
.img1:hover {
}
.el-button {
  margin-top: 50px;
}
</style>