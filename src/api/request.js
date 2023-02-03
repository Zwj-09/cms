import axios from 'axios'

import interfaces from './interfaces'

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 30000
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

const http = {}

/**
 * <定义的函数名字>:{
 *      method:"",
 *      url:""
 * }
 */
for (let key in interfaces) {
  console.log('key', key) // 定义的函数名字
  let api = interfaces[key] //  { method:"" , url:"" }
  /**
   * 将函数 全部重新放入 http 对象 最后http 内部保存的就全是 async 定义的函数
   *  get ---> params
   *  post ---> data
   */
  http[key] = async function (params, isFormData = false, config = {}) {
    let response = {} // 调用函数 获取到的结果

    let newParams = {} // post 的 data 数据

    // 对 post的 data 格式为 form-data 的格式 进行数据格式转换
    if (params && isFormData) {
      newParams = new FormData() //创建formdata格式的对象
      for (let key in params) {
        newParams.append(key, params[key])
      }
    } else {
      newParams = params
    }

    if (api.method == 'get' || api.method == 'delete') {
      try {
        config.params = params
        response = await request[api.method](api.url, config)
      } catch (error) {
        response = error
      }
    } else if (api.method == 'put' || api.method == 'post' || api.method == 'patch') {
      try {
        response = await request[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    }
    return response
  }
}

export default http
