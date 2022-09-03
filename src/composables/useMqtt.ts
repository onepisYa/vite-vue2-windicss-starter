/*
 * @Author:
 * @Date: 2022-09-02 10:19:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-03 23:59:29
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
mqtt.js    api 官网文档: https://github.com/mqttjs/MQTT.js#api
mqtt.js in vue 介绍: https://www.emqx.com/en/blog/how-to-use-mqtt-in-vue

mqtt 各种客户端使用例子：https://github.com/emqx/MQTT-Client-Examples
mqtt 协议官网 http://mqtt.org/
# client.event
- connect
- message
- packetsend
- packetreceive
- disconnect
- error
- close
- end
- reconnect
- offline
- outgoingEmpty
- client.on(event: string, cb: Function): this
- client.once(event: string, cb: Function): this

# client.methods
publish
subscribe
unsubscribe
end
reconnect
...

*/

const connected: Ref = ref(undefined)
export const allData: Ref = ref([])
export const newestData: Ref = ref(undefined)

export function useMqtt(opts: mqtt.IClientOptions, topic: string | string[], subscribeOpts: mqtt.IClientSubscribeOptions, autoflag = true) {
  // 从 opts 中获取到 连接地址 以及选项。
  const { protocol, host, port, path, ...options } = opts
  const connect_url = `${protocol}://${host}:${port}${path}`
  const client = mqtt.connect(connect_url, options) // create a client
  // connect 事件 的回调比较特殊，因为需要执行订阅，需要 client 以及 一些参数。所以在这里进行定义。
  const defaultConnectCb = (connack: mqtt.IConnackPacket) => {
    eventTriggerConsole('connect')
    console.info('连接成功')
    connected.value = true
    console.log('connanc', connack)

    if (!(connack.returnCode === 0 && connack.sessionPresent === true)) {
      /*
        returnCode =0 and sessionPresent = true, in this case, you may rely on stored session and prefer not to send subscribe commands for the client.
      */
      doSubscribe(client, topic, subscribeOpts)
    }
  }

  const onConnect = dispatchEvent(client, 'connect', defaultConnectCb)
  // 成功连接的时候触发
  const onMessage = dispatchEvent(client, 'message', defaultMessageCb)
  // 接收到一个 publish package 的时候触发。
  const onError = dispatchEvent(client, 'error', defaultErrorCb)
  // Emitted when the client cannot connect (i.e. connack rc != 0) or when a parsing error occurs.
  const onReconnect = dispatchEvent(client, 'reconnect', defaultReconnectCb)
  // 重连之后 触发。
  const onPacketsend = dispatchEvent(client, 'packetsend')
  // client 发送任何数据包时，触发。
  const onPacketreceive = dispatchEvent(client, 'packetreceive')
  // client 接收任何数据包时，触发。
  const onDisconnect = dispatchEvent(client, 'disconnect')
  // 从 broker 服务 收到 disconnect packet 触发。 这是MQTT 5.0 feature.
  const onClose = dispatchEvent(client, 'close')
  // 断开连接后触发。
  const onEnd = dispatchEvent(client, 'end')
  // Emitted when mqtt.Client#end() is called.
  const onOffline = dispatchEvent(client, 'offline')
  // Emitted when the client goes offline.

  if (autoflag) {
    // 可以不传递任何参数，直接使用默认的 回调函数。
    // 也可以 onConnect((connanc)=>dosomething)
    onConnect()
    onMessage()
    onError()
    onReconnect()
    onPacketsend()
    onPacketreceive()
    onDisconnect()
    onClose()
    onEnd()
    onOffline()
  }
  return { client, onConnect, onMessage, onError, onReconnect, onPacketsend, onPacketreceive, onDisconnect, onClose, onEnd, onOffline }
}
// ---------------------- 常用的默认回调函数 --------------------
// message 事件默认回调
function defaultMessageCb(topic: string, payload: Buffer, _packet?: mqtt.IPublishPacket) {
  eventTriggerConsole('message')
  const result: undefined | [] | {} | never = JSON.parse(payload.toString())
  allData.value.push(result)
  newestData.value = result
}

// error 事件默认回调
function defaultErrorCb(error: Error) {
  eventTriggerConsole('error')
  connected.value = false
  console.error('Connection failed', error)
}
// reconnect 重连事件
function defaultReconnectCb() {
  eventTriggerConsole('reconnect')
}

// ---------------- 工具函数 ---------------------
// 打印触发的事件名，提供一个统一的格式。
function eventTriggerConsole(eventName: string) {
  if (import.meta.env.MODE === 'development')
    console.log(`event trigger: => mqtt client.${eventName}`)
}

// 用于生成 对应的默认回调。
function dispatchEvent(client: mqtt.MqttClient, eventName: string, defaultCallback?: Function) {
  let callback: Function
  if (defaultCallback)
    callback = defaultCallback
  else
    callback = () => eventTriggerConsole(eventName)

  return (cb?: Function) => client.on(eventName, cb || callback)
}

// subscribe 函数
function doSubscribe(client: mqtt.MqttClient, topic: string | string[], opts: mqtt.IClientSubscribeOptions, callback?: mqtt.ClientSubscribeCallback | undefined) {
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
