/*
 * @Author:
 * @Date: 2022-09-01 13:04:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-01 16:04:14
 * @FilePath: /vite-vue2-windicss-starter/src/stores/test_pinia_counter.ts
 * @Description:
 */

/*
# Notes

- [从 vuex <=4 迁移到 pinia ](https://pinia.vuejs.org/cookbook/migration-vuex.html)
- [vuex 模块重组为 pinia 的方式](https://pinia.vuejs.org/cookbook/migration-vuex.html#restructuring-modules-to-stores)
- [pinia 所有 api 列表](https://pinia.vuejs.org/api/modules/pinia.html)
- [pinia state api 使用说明，比如 $patch](https://pinia.vuejs.org/core-concepts/state.html)
- [pinia ts 类型以及 interface 使用](https://pinia.vuejs.org/core-concepts/state.html#typescript)
- [pinia $subscribe 订阅](https://pinia.vuejs.org/core-concepts/state.html#subscribing-to-the-state)
  - $subscribe 与常规的 watch 相比，会在 $patch 之后触发一次。
  - 对于 actions 来说有一个类似的东西叫做 store.$onAction
- [pinia pulugins](https://pinia.vuejs.org/core-concepts/plugins.html)
  - 类似 vue 的插件，可以扩展很多内容。
  - pinia.use(myplugin)
- mapState 映射的是只读，如果需要 可写的状态，那么可以使用 mapWritableState
    但是实际上在 setup 中，是自动的。不需要我们映射，就可以更改状态。
- [在 option api 中 使用可写状态](https://pinia.vuejs.org/core-concepts/state.html#resetting-the-state)
- storeToRefs 解决 store 解构 失去响应式。
- 关于测试 可以使用 vitest 和 自带的 @pinia/testing @vue/test-utils 等工具，进行测试。
> Pinia API 与 Vuex ≤4 有很大不同，即：

- 突变不再存在。他们经常被认为是非常冗长的。他们最初带来了 devtools 集成，但这不再是问题。
- 无需创建自定义复杂包装器来支持 TypeScript，所有内容都是类型化的，
  并且 API 的设计方式尽可能利用 TS 类型推断。 不再需要注入魔法字符串、导入函数、
  调用它们，享受自动完成功能！
- 无需动态添加 store ，默认情况下它们都是动态的，您甚至都不会注意到。
  请注意，您仍然可以随时手动使用 store 进行注册，但因为它是自动的，您无需担心。
- 不再有模块的嵌套结构。您仍然可以通过在另一个 store 中导入和使用 store 来隐式嵌套 store，
  但 Pinia 通过设计提供平面结构，同时仍然支持 store 之间的交叉组合方式。
  你甚至可以有 store 的循环依赖。
- 没有命名空间的模块。鉴于商店的扁平架构，“命名空间” store 是其定义方式所固有的，
  您可以说所有商店都是命名空间的。

*/

import { ref } from 'vue'
import { defineStore } from 'pinia'

// 三种方式都可以使用 map 帮助函数。
// import { mapActions, mapState, mapStores } from "pinia";
// 方式 1
export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})

// 方式 2 和 原来 vuex 是一样的方式
export const useCounterStoreThird = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    quadruple(/* state */): number {
      // 如果想要将 state 以为的参数传递进来，可以返回一个 新的函数，
      // 新的函数中可以接收 更多自己定义的参数。
      // 新的函数是 没有缓存的，但是您可以在内部定义一些数据，
      // 这些数据是缓存的
      // https://pinia.vuejs.org/core-concepts/getters.html#passing-arguments-to-getters
      return this.double * 2
    },
    double: state => state.count * 2,
    // getter 是 只读属性。
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

// 方式 3
export const useCounterStoreSecond = defineStore('counterSecond', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  return { count, increment }
})
