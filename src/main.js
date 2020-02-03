// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.scss'
import VueAMap from 'vue-amap'
import axios from 'axios'
import qs from 'qs'
import '@/permission'
Vue.prototype.qs = qs
Vue.prototype.$axios = axios
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'd7918df5144f6581c70b3e99bbc94da5',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
Date.prototype.Format = function (fmt) {

  var o = {

    "M+": this.getMonth() + 1, //月份 

    "d+": this.getDate(), //日 

    "h+": this.getHours(), //小时 

    "m+": this.getMinutes(), //分 

    "s+": this.getSeconds(), //秒 

    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 

    "S": this.getMilliseconds() //毫秒 

  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

  for (var k in o)

    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

  return fmt;

}

