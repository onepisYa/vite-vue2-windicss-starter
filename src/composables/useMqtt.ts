/*
 * @Author:
 * @Date: 2022-09-02 10:19:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-02 16:38:37
 * @FilePath: /vite-vue2-windicss-starter/src/composables/useMqtt.ts
 * @Description:
 */

import type { Ref } from 'vue'
import { ref } from 'vue'
import mqtt from 'mqtt/dist/mqtt'

/*
// fix: global not defined
// https://github.com/mqttjs/MQTT.js/issues/1269
// 安装 pnpm i --save mqtt-packet
// 并且 编写 .d.td 模块声明文件
mqtt.js    api 介绍: https://www.emqx.com/zh/blog/mqtt-js-tutorial#api-%E4%BB%8B%E7%BB%8D
mqtt.js in vue 介绍: https://www.emqx.com/en/blog/how-to-use-mqtt-in-vue

*/

const connected: Ref = ref(undefined)
const allData: Ref = ref([])
const newestData: Ref = ref(undefined)

export function useMqtt(opts: mqtt.IClientOptions, topic: string | string[], subscribeOpts: mqtt.IClientSubscribeOptions, autoflag = true) {
  // 从 opts 中获取到 连接地址 以及选项。
  const { protocol, host, port, path, ...options } = opts
  const connect_url = `${protocol}://${host}:${port}${path}`
  const client = mqtt.connect(connect_url, options) // create a client
  const doSubscribeFn = () => doSubscribe(client, topic, subscribeOpts)

  if (autoflag) {
    client.on('connect', doSubscribeFn)
    client.on('message', defaultMessageCb)
    client.on('error', defaultErrorCb)
  }

  return { client, allData, newestData, doSubscribeFn, defaultMessageCb, defaultErrorCb }
}

// ---------------------- 常用的默认回调函数 --------------------
// message 事件默认回调
function defaultMessageCb(topic: string, payload: Buffer, packet: mqtt.IPublishPacket) {
  // console.log("topic", topic);
  // console.log("message", payload);
  // console.log("message", payload.toString());
  const result: undefined | [] | {} | never = JSON.parse(payload.toString())
  // console.log("message", result);
  allData.value.push(result)
  newestData.value = result
  console.info(packet)
  // console.log("message", newestData)
  // console.log("message", allData)
}

// error 事件默认回调
function defaultErrorCb(error: Error) {
  connected.value = false
  console.error('Connection failed', error)
}

// subscribe 函数
function doSubscribe(client: mqtt.MqttClient, topic: string | string[], opts: mqtt.IClientSubscribeOptions, callback?: mqtt.ClientSubscribeCallback | undefined) {
  console.info('连接成功')
  connected.value = true
  if (callback !== undefined) {
    client.subscribe(topic, opts, callback)
  }
  else {
    client.subscribe(topic, opts,
      (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return error
        }
        console.info('订阅成功')
        console.log('Subscribe to topics res', res)
      })
  }
}

