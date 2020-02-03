import { uploadFile} from '@/api/SingedService'
import { getToken, setToken, removeToken } from '@/utils/auth'


const contract = {
  state: {
    
  },

  mutations: {
    
  },

  actions: {
    // 上传附件
    UploadFile({commit}, data){
      
      return new Promise((resolve,reject) => {
        console.log(111)
        uploadFile(data.name,data.formData).then(response => {
          console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default contract
