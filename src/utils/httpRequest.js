//引入axios
import axios from 'axios'
import {getToken} from "../service/api";
import * as appConfig from '../config';
import config from '../config';

console.log("initial Axios")

let cancel, promiseArr = []
const CancelToken = axios.CancelToken;

axios.post('auth',{
    sourceType:3,
    authAppId:config.authAppId,
    authAppSecret:config.authAppSecret,
},{
    baseURL:'https://mobile2.lychee-info.cn/cps-rest',
    headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':'application/json'
    }
})
    .then(rsp=>{
      const token = rsp.data.auth.token;
        axios.defaults.baseURL = 'https://mobile2.lychee-info.cn/cps-rest'
//设置默认请求头
        axios.defaults.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Bearer' + token
        }
        axios.defaults.timeout = 10000


//请求拦截器
        axios.interceptors.request.use(config => {
            //发起请求时，取消掉当前正在进行的相同请求
            if (promiseArr[config.url]) {
                promiseArr[config.url]('操作取消')
                promiseArr[config.url] = cancel
            } else {
                promiseArr[config.url] = cancel
            }
            return config
        }, error => {
            return Promise.reject(error)
        })

//响应拦截器即异常处理
        axios.interceptors.response.use(response => {

            if(response.data.errcode === 1001){
                //
                return axios.post('auth',response.config);
            }
            return response
        }, error => {
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.message = '错误请求'
                        break;
                    case 401:
                        error.message = '未授权，请重新登录'
                        break;
                    case 403:
                        error.message = '拒绝访问'
                        break;
                    case 404:
                        error.message = '请求错误,未找到该资源'
                        break;
                    case 405:
                        error.message = '请求方法未允许'
                        break;
                    case 408:
                        error.message = '请求超时'
                        break;
                    case 500:
                        error.message = '服务器端出错'
                        break;
                    case 501:
                        error.message = '网络未实现'
                        break;
                    case 502:
                        error.message = '网络错误'
                        break;
                    case 503:
                        error.message = '服务不可用'
                        break;
                    case 504:
                        error.message = '网络超时'
                        break;
                    case 505:
                        error.message = 'http版本不支持该请求'
                        break;
                    default:
                        error.message = `连接错误${error.response.status}`
                }
            } else {
                error.message = "连接到服务器失败"
            }
            message.error(error)
            return Promise.resolve(error.response)
        })


    })
    .catch(err=>{
      console.log(err)
    })



export const post = (url, param) => {
  return axios.post(url,param)
}

export default axios;


export const request = axios.create({
    baseURL:'https://mobile2.lychee-info.cn/cps-rest',
    timeout:10000,
    header:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':'x-www-form-urlencoded'
    }
})

request.interceptors.request.use(config=>{
  console.log(config)
  if(!config.headers['Authorization']){
     return getToken()
          .then(tokenRsp=>{
              config.headers['Authorization'] = 'Bearer' + tokenRsp.data.auth.token;
              return config;
          })
  } else {
    return config
  }
},err=>{
  return Promise.reject(err);
});

request.interceptors.response.use(rsp=>{

  if(rsp.data.errcode === 1001){
    //token 过期
      getToken()
          .then(tokenRsp=>{
            rsp.config.headers['Authorization'] = 'Bearer' + tokenRsp.data.auth.token;
            return null;
          })
          .then(noop=>{
            return request.request(rsp.config)
          })
  } else if(rsp.data.errcode === 1000){
    //未登录，跳转登录页
      console.log("你还没有登录呢")
      return rsp;
  } else {
      return rsp
  }
  },err=>{
  return Promise.reject(err)
})