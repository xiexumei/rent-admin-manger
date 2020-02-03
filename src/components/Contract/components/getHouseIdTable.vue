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
      <!-- 房屋名称 -->
      <el-table-column prop="Name" :label="tablelist.Name" width="180"></el-table-column>
      <!-- 户型 -->
      <el-table-column prop="Type" :label="tablelist.Type" width="80" show-overflow-tooltip></el-table-column>
      <!-- 区域 -->
      <el-table-column prop="Region" :label="tablelist.Region" width="80"></el-table-column>
      <!-- 面积 -->
      <el-table-column prop="Area" :label="tablelist.Area" width="80"></el-table-column>
      <!-- 租金 -->
      <el-table-column prop="Price" :label="tablelist.Price" width="80"></el-table-column>
      <!-- 操作 -->
      <el-table-column prop="caozuo" :label="tablelist.caozuo" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="select(scope.$index, scope.row)"
            style="cursor:pointer"
          >选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {getAllHouse} from "@/interfance/GetVersion.js";

    export default {
        props: ["tablelist", "tableData"],
        data() {
            return {
                multipleSelection: [],
                dialogFormVisible: false, //控制表单是否显示
                dialogFormVisibleview: false,
                houseid: "",
                pageIndex: 1,
                pageSize: 15,
                houseData: {}
            };
        },
        components: {},
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
                this.houseid = val[0].Id;
            },
            // 选择房屋
            select(index, row) {
                // console.log(row);
                this.$store.commit("changeHouseId", row);
            },
        }
    };
</script>
