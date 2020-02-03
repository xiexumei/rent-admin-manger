<template>
  <div>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号"></el-table-column>

      <!-- 用户id -->
      <el-table-column prop="Phone" :label="tablelist.Phone" width="180"></el-table-column>
      <!-- 用户名称 -->
      <el-table-column prop="Name" :label="tablelist.Name" width="180"></el-table-column>
      <!-- 操作 -->
      <el-table-column prop="caozuo" :label="tablelist.caozuo" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="select(scope.$index, scope.row)"
            style="cursor:pointer"
          >选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  props: ["tablelist", "tableData"],
  data() {
    return {
      multipleSelection: [],
      dialogFormVisible: false, //控制表单是否显示
      dialogFormVisibleview: false,
      houseid: "",
      houseData: {}
    };
  },
  components: {
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 选择房屋
    select(index,row){
      // console.log(row);
      this.$store.commit("changeUserId", row);
    }
  }
};
</script>
