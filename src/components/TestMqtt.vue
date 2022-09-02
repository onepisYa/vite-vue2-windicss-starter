<!--
 * @Author:
 * @Date: 2022-09-01 17:15:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-02 16:46:31
 * @FilePath: /vite-vue2-windicss-starter/src/components/TestMqtt.vue
 * @Description:
-->

<script setup lang="ts">
// 导入类型
import type { IClientOptions } from 'mqtt/dist/mqtt'
import { useMqtt } from '@/composables/useMqtt'

const options: IClientOptions = {
  port: 8888, // 填写自己的端口
  protocol: 'wss', // 填写正确的协议
  host: 'anes.machinebinary.com', // 填写正确的 host
  path: '/', // 一般默认是 "/"
  clean: true, // Reserved session
  connectTimeout: 4000, // Time out
  reconnectPeriod: 4000, // Reconnection interval
  // Certification Information
  clientId: 'id',
  username: 'usr',
  password: 'pwd',
  // servers: [{ host: "", port:number , protocol: "wss" }],
  resubscribe: true,
  // 重新订阅
}

const { client, allData, newestData } = useMqtt(
  options,
  ['topic'],
  { qos: 2 },
  true, // autoflag
)
</script>

<script lang="ts">
export default { name: 'TestMqtt' }
</script>

<template>
  <div>
    <div class="text-light-50">
      {{ allData }}
    </div>
    <div class="text-light-blue-200">
      {{ newestData }}
    </div>
  </div>
</template>
