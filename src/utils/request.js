import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { useAxios } from '@vueuse/integrations/useAxios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // TODO: mock 的 token
      // config.headers['X-Token'] = getToken()
      // 我们的 Token
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
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
    const res = response.data
    // TODO: 与后端约定状态码，再修改具体的拦截器策略。
    //     if(
    // res.
    //     )
    if (res instanceof Blob) {
      return res
    }
    if (res.code === 0) {
      Message({
        message: res.message,
        type: 'success',
        duration: 1 * 1000
      })
      return res
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000 && res.code !== 0) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        // return res;
      } else if (res.access_token) {
        return res
      } else if (response.status === 200) {
        return res
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      console.log(res)
      return Promise.reject(new Error(res.message || 'Error'))
      // return res
    } else {
      return res
    }
  },
  (error) => {
    console.log(`err${error}`) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// const request = (config, prefix = null) => {
//   const url = prefix ? `${prefix}${config.url}` : `${config.url}`
//   config.url = url
//   return service(config)
// }

const request = (config, customConfig = {}) => {
  const { prefix = null, isUse = false, immediate = false } = customConfig
  const url = prefix ? `${prefix}${config.url}` : `${config.url}`
  config.url = url
  if (isUse) {
    const res = useAxios(url, config, service, { immediate: immediate })
    /*
      const {
              response,
              data,
              error,
              finished: isFinished,
              loading: isLoading,
              isFinished,
              isLoading,
              cancel: abort,
              isAborted,
              canceled: isAborted,
              aborted: isAborted,
              isCanceled: isAborted,
              abort,
              execute, // execute 可以支持 一层的  then
              then
          } = res
    */
    // return  res.execute()
    console.log('useAxios', res)
    return res
    // execute 仅仅返回一个 then
    // 但是 await execute 之后 会返回所有的东西。
    // return service(config)
  } else {
    return service(config)
  }
}

export default request
