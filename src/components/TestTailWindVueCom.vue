<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue'
onMounted(() => {
  const _this = getCurrentInstance()
  console.log(_this)
})
</script>

<template>
  <div>
    <t-input value="Hello world" name="my-input" />
    <t-textarea value="Hello world" name="my-textarea" />
  </div>
</template>
