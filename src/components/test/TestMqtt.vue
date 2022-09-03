<!--
 * @Author:
 * @Date: 2022-09-01 17:15:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-04 13:36:58
 * @FilePath: /vite-vue2-windicss-starter/src/components/test/TestMqtt.vue
 * @Description:
-->

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { options, topic } from './TestMqttOptions'
import { allData, newestData, useMqtt } from '@/composables/useMqtt'
// your options and topic
/*

const options: IClientOptions = {
  port: 8888, // 填写自己的端口
  protocol: 'wss', // 填写正确的协议
  host: 'xxx.xxx.com', // 填写正确的 host
  path: '/', // 一般默认是 "/"
  clean: false, // Reserved session
  connectTimeout: 4000, // Time out
  keepalive:60,
  reconnectPeriod: 4000, // Reconnection interval
  // Certification Information
  clientId: 'id',
  username: 'usr',
  password: 'pwd',
  // servers: [{ host: "xx.xxx.com", port:number , protocol: "wss" }],
  resubscribe: true,
  // 重新订阅
}

const { client, allData, newestData } = useMqtt(
  options,
  ['topic'],
  { qos: 2 },
  true, // autoflag
)
*/
const { client } = useMqtt(options, [topic], { qos: 2 }, true)
onUnmounted(() => {
  client.end()
  // 每次刷新的时候，记得结束客户端，否则，可能导致，服务器那边，对应的
  // 连接没有结束，这边又使用新的 clientId 建立新的连接
  // 导致频繁重连。
})
</script>

<script lang="ts">
export default { name: 'TestMqtt' }
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="overflow-x-auto w-11/12 text-gray-300 dark:text-green-300">
      {{ allData }}
    </div>
    <div class="w-full text-dark-400 dark:text-pink-300">
      {{ newestData }}
    </div>
  </div>
</template>
