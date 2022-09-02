<!--
 * @Author:
 * @Date: 2022-09-01 16:13:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-01 17:03:17
 * @FilePath: /vite-vue2-windicss-starter/src/components/TestAxios.vue
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
  <div>
    <t-alert variant="danger" show>
      in axios {{ foo }}
    </t-alert>
  </div>
</template>
