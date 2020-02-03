/**
 * 操作token 模块
 */
import Cookies from 'js-cookie'
const TokenKey = 'token'
//获取token
export function getToken(){
  return Cookies.get(TokenKey)
}

//设置setToken
export function setToken(token){
  return Cookies.set(TokenKey, token)
}

//移除toKen
export function removeToken(){
  return Cookies.remove(TokenKey)
}
