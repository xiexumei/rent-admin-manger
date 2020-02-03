<template>
  <div>
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="480"
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
      <!-- 租期 -->
      <el-table-column prop="DuringTime" :label="tablelist.DuringTime" width="50"></el-table-column>
      <!-- 租金 -->
      <el-table-column prop="Price" :label="tablelist.Price" width="80"></el-table-column>
      <!-- 房屋状态 -->
      <el-table-column prop="Status" :label="tablelist.Status" width="70"></el-table-column>
      <!-- 押金 -->
      <el-table-column prop="PledgeMoney" :label="tablelist.PledgeMoney" width="70"></el-table-column>
      <!-- 操作 -->
      <el-table-column prop="caozuo" :label="tablelist.caozuo" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click.native="handleEdit(scope.$index, scope.row)"
            style="cursor:pointer"
          >编辑
          </el-button>
          <el-button
            v-if="scope.row.Status == '已下架' || scope.row.Status == '已出租'|| scope.row.Status == '已预订'"
            type="danger"
            size="mini"
            @click.native="handleDelete(scope.$index, scope.row)"
            style="cursor:pointer"
            disabled
          >下架
          </el-button>
          <!--          v-else="scope.row.Status == '已下架'"-->
          <el-button
            v-else
            type="danger"
            size="mini"
            @click.native="handleDelete(scope.$index, scope.row)"
            style="cursor:pointer"
          >下架
          </el-button>
          <el-button
            v-if="scope.row.Status == '已下架'"
            type="danger"
            size="mini"
            @click.native="uppershelf(scope.$index, scope.row)"
            style="cursor:pointer"
          >上架
          </el-button>

          <el-button
            v-else
            type="danger"
            size="mini"
            @click.native="uppershelf(scope.$index, scope.row)"
            style="cursor:pointer"
            disabled
          >上架
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <UpdateHouseDig @closeDig="dialogFormVisible=false" :dialogFormVisible="dialogFormVisible">></UpdateHouseDig>
  </div>
</template>

<script>
    import UpdateHouseDig from "@/components/House/components/UpdateHouseDig.vue";
    import {delectHouse, selectHouse, Uppershelf} from "@/interfance/GetVersion.js";

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
            UpdateHouseDig
        },
        methods: {
            // 编辑房屋
            async handleEdit(index, row) {
                this.dialogFormVisible = true;
                var res = await selectHouse(row.Id);
                console.log(res);
                this.$store.commit("changeHouse", res);
            },
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
            // 下架房屋
            handleDelete(index, row) {
                this.$confirm("确认要下架?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                })
                    .then(() => {
                        this.delecthouse(row.Id);
                        this.$message({
                            type: "success",
                            message: "下架成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消下架"
                        });
                    });
            },
            //下架
            async delecthouse(Id) {
                let res = await delectHouse(Id);
                console.log(res);
                this.$store.commit("cbhouseIdxiajia", res);
            },
            //上架
            async upHouse(Id) {
                let res = await Uppershelf(Id);
                console.log(res);
                this.$store.commit("cbhouseIdshangjia", res);
            },
            // 上架房屋
            uppershelf(index, row) {
                this.$confirm("确认要上架?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                })
                    .then(() => {
                        this.upHouse(row.Id);
                        this.$message({
                            type: "success",
                            message: "上架成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消上架"
                        });
                    });
            },
        }
    };
</script>
