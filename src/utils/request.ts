/*
 * @Author:
 * @Date: 2022-09-01 16:23:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-01 17:04:49
 * @FilePath: /vite-vue2-windicss-starter/src/utils/request.ts
 * @Description:
 */
import axios from 'axios'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: import.meta.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 30, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    // const res = response.data;
    // do something with response data
    return response
  },
  (error) => {
    console.warn('request error:', error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('401')
          // 401 不弹出
          return Promise.reject(error)
      }
    }
    console.log(`err${error}`) // for debug
    console.warn('request error:', error.message)
    return Promise.reject(error)
  },
)

export default service
