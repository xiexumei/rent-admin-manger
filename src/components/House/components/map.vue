<template lang="html">
 
    <div class="container">
      <div class="search-box">
        <input
          v-model="searchKey"
          type="search"
          id="search">
        
        <button @click="searchByHand">搜索</button>
         <button class="ok" @click="closeTip">确定</button>
        <div class="tip-box" id="searchTip"></div>
      </div>
      <el-amap class="amap-box"
        :amap-manager="amapManager"
        :vid="'amap-vue'"
        :zoom="zoom"
        :plugin="plugin"
        :center="center"
        :events="events"
      >
        <!-- 标记 -->
        <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
      </el-amap>
    </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager();
export default {
  data() {
    let self = this;
    return {
      address: null,
      searchKey: "",
      amapManager,
      markers: [],
      searchOption: {
        city: "全国",
        citylimit: true
      },
      center: [121.329402, 31.228667],
      zoom: 17,
      currentlng: 0,
      currentlat: 0,
      loaded: false,
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch();
          });
        },
        // 点击获取地址的数据
        click(e) {
          // console.log(e)
          self.markers = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.center = [lng, lat];
          self.markers.push([lng, lat]);
          //将点击的坐标存到vuex中
          // this.$store.commit('SET_lat',  self.lng)
          // this.$store.commit('SET_lat', self.lat)
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                console.log(result.regeocode.formattedAddress);
                self.address = result.regeocode.formattedAddress;
                self.searchKey = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        }
      },
      // 一些工具插件
      plugin: [
        {
          // 定位
          pName: "Geolocation",
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng;
                  // 设置维度
                  self.lat = result.position.lat;
                  // 设置坐标
                  self.center = [self.lng, self.lat];
                  //将当前的定位信息存到本地
                  localStorage.setItem("center",JSON.stringify(self.center))
                  self.markers.push([self.lng, self.lat]);
                  // load
                  self.loaded = true;
                  // 页面渲染好后
                  self.$nextTick();
                }
              });
            }
          }
        },
        {
          // 工具栏
          pName: "ToolBar",
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        },
        {
          // 鹰眼
          pName: "OverView",
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        },
        {
          // 地图类型
          pName: "MapType",
          defaultType: 0,
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        },
        {
          // 搜索
          pName: "PlaceSearch",
          events: {
            init(instance) {
              // console.log(instance)
            }
          }
        }
      ]
    };
  },
  watch: {
    searchKey: function() {
      this.$store.commit("SET_ADDRESS", this.searchKey);
    }
  },
  methods: {
    initSearch() {
      console.log(222);
      let vm = this;
      let map = this.amapManager.getMap();
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          input: "search",
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          suggestContainer: "searchTip",
          searchResultsContainer: "searchTip"
        });
        vm.poiPicker = poiPicker;
        // 监听poi选中信息
        poiPicker.on("poiPicked", function(poiResult) {
          // console.log(poiResult)
          let source = poiResult.source;
          let poi = poiResult.item;
          if (source !== "search") {
            poiPicker.searchByKeyword(poi.name);
          } else {
            poiPicker.clearSearchResults();
            vm.markers = [];
            let lng = poi.location.lng;
            let lat = poi.location.lat;
            console.log(lng, lat);
            //将点击的坐标存到vuex中
           this.currentlng = lng
           this.currentlat = lat
            let address = poi.cityname + poi.adname + poi.name;
            vm.center = [lng, lat];
            vm.markers.push([lng, lat]);
            vm.lng = lng;
            vm.lat = lat;
            vm.address = address;
            vm.searchKey = address;
          }
        });
      });
    },
    searchByHand() {
      if (this.searchKey !== "") {
        this.poiPicker.searchByKeyword(this.searchKey);
        console.log(111);
      }
    },

    closeTip() {
      //将输入框的 值保存到vuex中，
      //  console.log(this.searchKey)
      this.$store.commit("SET_center",this.center)
      this.$store.commit("isShowMap", false)
      
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  width: 700px;
  height: 400px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  border: 1px solid #999;
}
.search-box {
  position: absolute;
  z-index: 5;
  width: 70%;
  left: 13%;
  top: 10px;
  height: 30px;
}
.search-box input {
  float: left;
  width: 70%;
  height: 100%;
  border: 1px solid #30ccc1;
  padding: 0 8px;
  outline: none;
}
.search-box button {
  float: left;
  margin-right: 10px;
  width: 10%;
  height: 100%;
  background: #30ccc1;
  border: 1px solid #30ccc1;
  color: #fff;
  outline: none;
}
.search-box .ok {
  float: left;
  width: 10%;
  height: 100%;
  background: #e25822;
  border: 1px solid #e25822;
  color: #fff;
  outline: none;
}
.tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  top: 30px;
  overflow-y: auto;
  background-color: #fff;
}
</style>
