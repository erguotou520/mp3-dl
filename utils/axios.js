const axios = require('axios')

const baseURL = ''
const instance = axios.create({
  baseURL,
  timeout: 30000
})

instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    console.log(error.message)
    return Promise.reject(error)
  }
)

module.exports = async function request(url) {
  return instance({
    method: 'get',
    url,
    responseType: 'stream' // 服务器响应的数据类型
  })
}
