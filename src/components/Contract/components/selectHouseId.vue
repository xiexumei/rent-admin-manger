<template>
  <el-dialog title="选择房屋" :visible.sync="show">
    <el-form :model="form">
      <!-- 搜索框 -->
      <el-input style="width: 250px"
                placeholder="按房屋小区名称，区域，户型搜索"
                suffix-icon="el-icon-search"
                size="mini"
                v-model="inputHouse"
                class="search"
                @keyup.native="searchHouse"
      ></el-input>
      <Table :tableData="tableData" :tablelist="tablelist"></Table>
      <div class="rightBottom">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-tag @click="show = false;$emit('closeDig')" size="medium" type="danger" style="cursor:pointer">取 消</el-tag>
      <el-tag type="primary" @click="show = false;$emit('closeDig')" size="medium" style="cursor:pointer">确 定</el-tag>
    </div>

  </el-dialog>
</template>
<script>
    import Table from "@/components/Contract/components/getHouseIdTable.vue";
    import {getAllHouse,searchHouse} from "@/interfance/GetVersion.js";

    export default {
        props: ["dialogFormVisible"],
        data() {
            return {
                checkList: [],
                show: false,
                form: {},
                formLabelWidth: "120px",
                // 当前页
                currentPage: 1,
                // 每页显示条数
                pagesize: 30,
                // 总记录条数
                totalCount: 0,
                inputHouse: '',
                tablelist: {
                    Name: "房屋名称",
                    Type: "户型",
                    Region: '区域',
                    Area: "面积/平米",
                    Price: "租金/月",
                    caozuo: "操作"
                },
                tableData: []
            };
        },
        components: {
            Table
        },

        created() {
            // 获取房屋信息
            this.getTableData(this.currentPage, this.pagesize);
        },
        computed: {
            // 获取每页个数
            getPageSize() {
                return this.$store.state.pageSize;
            },

        },
        watch: {
            dialogFormVisible(newV, oldV) {
                this.show = newV;
            },
            // 获取每页个数
            getPageSize: {
                handler(n, o) {
                    this.pagesize = n;
                    this.getTableData(this.currentPage, this.pagesize);
                }
            },
        },
        methods: {
            // 每页条数切换
            handleSizeChange(val) {
                this.pagesize = val;
                // 获取房屋信息
                this.getTableData(this.currentPage, this.pagesize);
            },
            // 页面切换
            handleCurrentChange(val) {
                this.currentPage = val;
                // 获取房屋信息
                this.getTableData(this.currentPage, this.pagesize);
            },
            // 获取房屋信息
            async getTableData(pageIndex, pageSize) {
                pageIndex = (pageIndex - 1) * pageSize;
                return await getAllHouse(pageIndex, pageSize).then(res => {
                    // console.log(res);
                    // 获取总长度
                    this.totalCount = res._Items.length;
                    // console.log(this.totalCount);
                    this.$store.commit("getTotalCount", this.totalCount);
                    // 为表格赋值数据
                    this.tableData = res._Items.map(item => {
                        return item;
                    });
                    return res.TotalCount;
                });
            },
            async getTableData1(skip, size, TypeRegionName) {
                skip = (skip - 1) * size;
                return await searchHouse(skip, size, TypeRegionName).then(res => {
                    // console.log(res)
                    // 获取总长度
                    this.totalCount = res._Items.length;
                    // console.log(this.totalCount);
                    this.$store.commit("getTotalCount", this.totalCount);
                    // 为表格赋值数据
                    this.tableData = res._Items.map(item => {
                        return item;
                    });
                    return res.TotalCount;
                });
            },
            //  搜索框
            searchHouse() {
                this.getTableData1(this.currentPage, this.pagesize, this.inputHouse);
            }
        }
    };
</script>


