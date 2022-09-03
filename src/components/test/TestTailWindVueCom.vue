<!--
 * @Author:
 * @Date: 2022-09-03 20:29:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-04 00:38:36
 * @FilePath: /vite-vue2-windicss-starter/src/components/test/TestTailWindVueCom.vue
 * @Description:
-->
<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue'
onMounted(() => {
  const _this = getCurrentInstance()
  console.log(_this)
})
</script>

<template>
  <div>
    <t-input
      class="mb-2"
      variant="success"
      value="Hello world"
      name="my-input"
      show
    />
    <t-textarea
      class="mb-2"
      variant="danger"
      value="Hello world"
      name="my-textarea"
      show
    />
    <t-alert class="mb-2" variant="danger" show>
      onepisya
    </t-alert>
    <t-alert
      class="mb-2"
      :classes="{
        wrapper:
          'rounded bg-teal-100 p-4 flex text-sm border-2 shadow border-teal-300 dark:bg-gray-600',
        body: 'flex-grow text-teal-700 dark:text-green-300',
        close: { 'text-teal-500 hover:bg-teal-200 ml-4 rounded': true },
        closeIcon: ['h-5', 'w-5', 'fill-current'],
      }"
      show
    >
      The classes of this component were defined from a prop
    </t-alert>
  </div>
</template>
