<template>
  


<el-dialog
  title="提示"
  :visible.sync="this.showDialog"
  width="30%"
  :before-close="handleClose">
 <Map></Map>
  <span slot="footer" class="dialog-footer">
    <el-button @click="this.showDialog = false">取 消</el-button>
    <el-button type="primary" @click="this.showDialog = false">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import Map from './map'
import store from '@/store'
  export default {
    props:["dialogFormVisible"],
    data() {
      return {
        closeDiag: true,
      
      };
    },
    components:{
      Map
    },
    computed:{
      showDialog(){
        return store.state.addhouse.isShowMap
      }
    },
    methods: {
      handleClose(done) {
       // done()
        this.$store.commit('isShowMap',false)
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      },
     
    }
  };
</script>
<style scoped>
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