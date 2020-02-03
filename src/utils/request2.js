import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 3000 // request timeout
})
service.interceptors.request.use(config => {
  var toKen = getToken();
  // console.log(config)
  if (toKen && config.url !== '/userApi/login' && config.url != '/houseApi/getAllHouseInfo') {
    // console.log('token');

    config.headers.token = toKen //让每个请求头携带自定义的token
  }
  if (config.url == '/contract/updateContractTemplate') {
    // console.log(11121);
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  return config
}, error => {
  Promise.reject(error);//错误处理
});
// request interceptor
//添加响应拦截器

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;

    return res;


    /*  if (res.code !== 200) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })

        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }*/
  },
  error => {

    return Promise.reject(error)
  }
)

export default service
