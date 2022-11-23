<!--
 * @Author:
 * @Date: 2022-09-01 16:13:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-23 12:43:13
 * @FilePath: /vite-vue2-windicss-starter/src/components/test/TestAxios.vue
 * @Description:
-->
<script lang="ts">
import { defineComponent, ref } from 'vue'
import request from '@/utils/request'

export default defineComponent({
  name: 'TestAxios',
})
</script>

<script setup lang="ts">
const foo = ref('foo')

request({ url: 'https://jsonplaceholder.typicode.com/todos/1', method: 'GET' })
  .then((response) => {
    // handle success
    console.log(response)
    foo.value = response.data.title as string
  })
  .catch((error) => {
    // handle error
    console.log(error)
  })
  .then(() => {
    // always executed
  })

// axios
// .get("https://jsonplaceholder.typicode.com/todos/1")
// .then(function (response) {
//   // handle success
//   console.log(response);
//   foo.value = response.data.title as string;
// })
// .catch(function (error) {
//   // handle error
//   console.log(error);
// })
// .then(function () {
//   // always executed
// });
</script>

<template>
  <div class="testless">
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      in axios {{ foo }}
    </button>
    <SvgIcon icon-class="404" class-name="test-class" />
    <el-button type="primary">
      test-el-button
    </el-button>
  </div>
</template>

<style lang="less" scoped>
.testless {
  background-color: rgb(255, 250, 250);
}

.test-class {
  color: red
}
</style>
