<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue'
onMounted(() => {
  const _this = getCurrentInstance()
  console.log(_this)
})
</script>

<template>
  <div>
    <t-input variant="success" value="Hello world" name="my-input" show />
    <t-textarea variant="danger" value="Hello world" name="my-textarea" show />
    <t-alert variant="danger" show>
      onepisya
    </t-alert>
    <t-alert
      :classes="{
        wrapper:
          'rounded bg-teal-100 p-4 flex text-sm border-2 shadow border-teal-300',
        body: 'flex-grow text-teal-700',
        close: { 'text-teal-500 hover:bg-teal-200 ml-4 rounded': true },
        closeIcon: ['h-5', 'w-5', 'fill-current'],
      }"
      show
    >
      The classes of this component were defined from a prop
    </t-alert>
  </div>
</template>
