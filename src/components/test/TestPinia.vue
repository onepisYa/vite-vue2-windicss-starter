<!--
 * @Author:
 * @Date: 2022-09-03 20:29:51
 * @LastEditors:
 * @LastEditTime: 2022-09-04 00:34:14
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
    <t-button class="mb-2" @click="counter.increment">
      increment {{ counter.count }}
    </t-button>
    <t-button class="mb-2" @click="counterSecondStore.increment">
      increment {{ counterSecondStore.count }}
    </t-button>
  </div>
</template>
