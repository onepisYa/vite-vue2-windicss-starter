<!--
 * @Author:
 * @Date: 2022-11-23 19:15:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-24 10:01:10
 * @FilePath: /vite-vue2-windicss-starter/src/components/Test/index.vue
 * @Description:
-->
<script setup>
import request from '@/utils/request'
const foo = ref('composition api test')
const isDark = useDark()
const toggle = useToggle(isDark)
const result = ref('')

// test request
request({
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  method: 'get'
}).then(res => {
  console.log(res)
  result.value = res
})

</script>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Test', components: {}, data() { return {} }, watch: {}, computed: {}, created() { }, mounted() { }, methods: {}
})
</script>

<template>
  <div class="border-1 p-5 border-dark-100">
    <div class="pb-5"><span class="text-2xl font-bold">Test</span>
      <button class="flex items-center justify-center w-9 h-9 focus:outline-none" @click="toggle()">
        <pisMdiWhiteBalanceSunny v-if="isDark" class="text-yellow-500" />
        <!-- mdi:white-balance-sunny -->
        <!-- ep:sunrise -->
        <pisMdiMoonWaningCrescent v-else class="text-gray-800" />
      </button>
    </div>
    <hr>
    <div class="test-scss">test scss</div>
    <div>{{ foo }}</div>
    <el-button type="primary">test-el-button</el-button>
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >Default</button>
    <button
      type="button"
      class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >Alternative</button>
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >Dark</button>
    <button
      type="button"
      class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >Light</button>
    <button
      type="button"
      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >Green</button>
    <button
      type="button"
      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    >Red</button>
    <button
      type="button"
      class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
    >Yellow</button>
    <button
      type="button"
      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    >Purple</button>
    <button
      type="button"
      class="testAt focus:outline-none text-white bg-blue-500 hover:bg-purple-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    >TestAt</button>

    <hr>
    <span> 测试图标自动导入 pisTablerAlien </span>
    <pisTablerAlien />
    <hr>
    <div>
      {{ result }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.test-scss {
  color: rgb(0, 255, 128);
}

:-moz-focusring {
  outline: auto;
}

.testAt:focus {
  // outline: 3px solid orange;
  @apply bg-blue-500 hover: bg-pink-300 text-white;
}
</style>
