<template>
  <div class="house">
    <!--没有房源显示-->
    <transition name="fade">
      <Loading v-if="isLoading"></Loading>
    </transition>
    <div class="opration">
      <div class="left-opration">
        <el-button
          type="primary"
          @click="addHouse()"
          icon="el-icon-plus"
          effect="dark"
          style="cursor:pointer;"
          size="mini"
        >上传房源
        </el-button>

        <el-input
          style="width:250px"
          placeholder="按房屋小区名称，区域，户型搜索"
          suffix-icon="el-icon-search"
          size="mini"
          v-model="inputHouse"
          class="search"
          @keyup.native="searchHouse"
        ></el-input>
      </div>
    </div>

    <div class="tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">

          <div class="roleTable">
            <div class="role-border">
              <Table :tableData="tableData" :tablelist="tablelist"></Table>
            </div>
          </div>
          <AddHouseDig
            @closeDig="dialogFormVisible=false"
            @getTableData="getTableData(currentPage,pagesize)"
            :dialogFormVisible="dialogFormVisible"
          ></AddHouseDig>
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
        </el-tab-pane>
        <el-tab-pane label="房源总况" name="second">
          <div class="map">
            <div id="map"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/javascript">
    import Table from "@/components/House/components/HouseTable.vue";
    // import Pagination from "@/components/Pagination/Pagination.vue";
    import AddHouseDig from "@/components/House/components/AddHouseDig.vue";
    import {getAllHouse, searchHouse} from "@/interfance/GetVersion.js";
    import store from "@/store";
    import Loading from "@/components/Loading";

    export default {
        data() {
            return {
                map: null,
                zoom: 10,
                dataList: [
                    {location: "104.185574 ,2.785", color: 1},
                    {location: "114.772,22.785", color: 3},
                    {location: "116.410778,39.897614", color: 2},
                    {location: "123.499706,41.857793", color: 2},
                    {location: "111.722363,40.868346", color: 1},
                    {location: "103.987988,30.662124", color: 3},
                    {location: "104.07,30.67", color: 3}
                ],
                activeName: "first",
                isLoading: true, //显示加载动画
                dialogFormVisible: false, //控制表单是否显示
                // 当前页
                currentPage: 1,
                // 每页显示条数
                pagesize: 20,
                // 总记录条数
                totalCount: 0,
                IHouse: "",
                hHouse: "",
                inputHouse: "",
                tablelist: {
                    Name: "房屋名称",
                    Type: "户型",
                    Region: "区域",
                    Area: "面积/平米",
                    DuringTime: "租期",
                    Price: "租金/月",
                    Status: "房屋状态",
                    PledgeMoney: "押金",
                    caozuo: "操作"
                },
                tableData: []
            };
        },
        components: {
            Table,
            // Pagination,
            AddHouseDig,
            Loading
        },
        created() {
            // 获取房屋信息
            this.getTableData(this.currentPage, this.pagesize).then(res => {
                this.isLoading = false;
            });
        },
        computed: {
            // 获取每页个数
            getPageSize() {
                return this.$store.state.pageSize;
            },
            // 添加房屋回传的房屋id
            cbhouseId() {
                return this.$store.state.cbid;
            },
            //    更新房屋
            updatecbhouseId() {
                return this.$store.state.updatecbid;
            },
            //    下架
            cbhouseIdxiajia() {
                return this.$store.state.updatecbidxj;
            },
            //    上架
            cbhouseIdshangjia() {
                return this.$store.state.updatecbidsj;
            },
            //获取当前定位
            center() {
                return JSON.parse(localStorage.getItem("center"));
            }
        },
        watch: {
            //监视地图
            center: function () {
                console.log(this.center);
            },
            // 获取每页个数
            getPageSize: {
                handler(n, o) {
                    this.pagesize = n;
                    this.getTableData(this.currentPage, this.pagesize);
                }
            },
            // 添加房屋回传的房屋id
            cbhouseId: {
                handler(n, o) {
                    if (n) {
                        this.getTableData(this.currentPage, this.pagesize);
                    }
                }
            },
            //    更新房屋回传id
            updatecbhouseId: {
                handler(n, o) {
                    if (n) {
                        this.getTableData(this.currentPage, this.pagesize);
                    }
                }
            },
            //    下架
            cbhouseIdxiajia: {
                handler(n, o) {
                    if (n) {
                        // console.log(n);
                        this.getTableData(this.currentPage, this.pagesize);
                    }
                }
            },
            //    上架
            cbhouseIdshangjia: {
                handler(n, o) {
                    if (n) {
                        // console.log(n);
                        this.getTableData(this.currentPage, this.pagesize);
                    }
                }
            }
        },
        methods: {
            //对每一个页面进行编码
            // index1(index) {
            //   return index + 1 + this.pagesize * (this.currentPage - 1);
            // },
            // 添加房屋
            addHouse() {
                this.dialogFormVisible = true;
                console.log(11);
            },
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
                    // console.log(res)
                    // 获取总长度
                    this.totalCount = res._Items.length;
                    // console.log(this.totalCount);
                    // this.$store.commit("getTotalCount", this.totalCount);
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
            },
            handleClick() {
                this.init();
                console.log("1111地图");
            },

            //地图
            init() {
                // 初始化
                let _this = this;

                this.map = new AMap.Map("map", {
                    center: this.center,
                    mapStyle: "amap://styles7f5165253f57515d7ba226b25ad7ec", //设置地图的显示样式
                    resizeEnable: true,
                    zoom: this.zoom
                });
                console.log(this.map);
                const style = [
                    {
                        // 1
                        url: "../../../../static/image/girls.jpg",
                        anchor: new AMap.Pixel(5, 5), // 位移
                        size: new AMap.Size(10, 10) // 图片大小
                    },
                    {
                        // 2
                        url: "../../../../static/image/girls.jpg",
                        anchor: new AMap.Pixel(5, 5),
                        size: new AMap.Size(10, 10)
                    },
                    {
                        // 3
                        url: "../../../../static/image/girls.jpg",
                        anchor: new AMap.Pixel(5, 5),
                        size: new AMap.Size(10, 10)
                    }
                ];

                let locationData = []; //存放经纬度的数组
                let status = null;
                for (let i = 0; i < _this.dataList.length; i++) {
                    let locationArr = _this.dataList[i].location.split(",");
                    // 判断需要展示的颜色类型
                    if (_this.dataList[i].dataList === 1) {
                        status = 0; //根据下标来相对应样式 例如：绿色对应style数组中的第0个样式
                    } else if (_this.dataList[i].color === 2) {
                        status = 1;
                    } else if (_this.dataList[i].color === 3) {
                        status = 2;
                    }


                    locationData.push({
                        lnglat: locationArr,
                        style: status // 对应的status相对应的样式 style
                    });
                }

                // 点放置
                let mass = new AMap.MassMarks(locationData, {
                    opacity: 0.8,
                    zIndex: 111,
                    cursor: "pointer",
                    style: style
                });

                let marker = new AMap.Marker({content: " ", map: this.map});
                mass.on("mouseover", function (e) {
                    marker.setPosition(e.data.lnglat); //用户相对应的经纬度
                    marker.setLabel({content: e.data.name}); //用户相对应的名字
                });


            }
        }
    };
</script>
<style type="text/css" scoped>
  /*地图样式 */
  .map {
    width: 100%;
    height: 600px;
  }

  .map-tool {
    position: absolute;
    padding: 10px;
    z-index: 99;
  }

  .fontSize {
    font-size: 30px;
    color: red;
  }

  #map {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .house {
    position: relative;
  }

  .opration {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    margin-bottom: 1%;
    padding-left: 2%;
    background-color: #fff;
  }

  .left-opration {
    float: left;
    line-height: 60px;
    background-color: #fff;
  }

  .right-opration {
    float: right;
  }

  .roleTable {
    padding: 2%;
    background-color: #fff;
  }

  .role-border {
    padding: 2%;
    border: 1px solid rgb(209, 209, 209);
  }

  .nohouse {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .house {
    position: relative;
  }

  .position {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .search {
    width: 150px;
  }

  .tab {
    background-color: #fff;
  }

  .el-button--primary {
    color: #fff;
    background-color: rgb(24, 159, 146);
    border-color: rgb(24, 159, 146);
  }

  .roleTable {
    padding: 2%;
    background-color: #fff;
  }

  .role-border {
    padding: 2%;
    border: 1px solid rgb(209, 209, 209);
  }

</style>
