<!--
 * @Author:
 * @Date: 2022-09-03 20:29:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-23 09:52:47
 * @FilePath: /vite-vue2-windicss-starter/src/components/test/TestPinia.vue
 * @Description:
-->
<script lang="ts">
import { mapActions, mapState, mapStores, mapWritableState } from 'pinia'
import { defineComponent } from 'vue'
import {
  useCounterStore,
  useCounterStoreSecond,
} from '@/stores/test_pinia_counter'

export default defineComponent({
  // 为组件命名，否则都是 匿名组件。
  name: 'TestPinia',
  computed: {
    // other computed properties
    // ...
    // gives access to this.counterStore
    ...mapStores(useCounterStoreSecond),
    // gives read access to this.count 只读权限
    ...mapState(useCounterStoreSecond, ['count']),
    // 可变状态
    ...mapWritableState(useCounterStoreSecond, { immutCount: 'count' }),
    localDoubleCount: {
      get(): number {
        return this.immutCount * 2
      },
      set(newValue: number) {
        this.immutCount = newValue / 2
      },
    },
  },
  created() {
    // this.localDoubleCount = 60
    console.log(this.localDoubleCount, 'local')
  },
  methods: {
    // gives access to this.increment()
    ...mapActions(useCounterStoreSecond, ['increment']),
  },
})
</script>

<script setup lang="ts">
// mutating-the-state
// 在 setup 中改变状态的 几种方式
const counter = useCounterStore()
// 1
counter.count++
// 2 with autocompletion ✨
counter.$patch({ count: counter.count + 1 })
// 3 or using an action instead
counter.increment()
</script>

<template>
  <div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      @click="counter.increment"
    >
      increment {{ counter.count }}
    </button>

    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      @click="counterSecondStore.increment"
    >
      increment {{ counterSecondStore.count }}
    </button>
  </div>
</template>
