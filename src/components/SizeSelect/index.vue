<!--
 * Copyright (c) 2023 by onepisYa pis1@qq.com , All Rights Reserved.
 * @Date: 2023-05-22 15:53:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-05-23 11:27:19
 * @FilePath: /aec-admin/src/components/SizeSelect/index.vue
 * 路漫漫其修远兮，吾将上下而求索。
 * @Description:
 * @Author:
-->
<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: '默认', value: '' },
        { label: '中等', value: 'medium' },
        { label: '小号', value: 'small' },
        { label: '迷你', value: 'mini' }
      ]
    }
  },
  computed: {
    size() {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize(size) {
      // INFO: 通过 $ELEMENT.size 设置 字体大小
      // 全局配置 https://element.eleme.cn/#/zh-CN/component/quickstart#quan-ju-pei-zhi
      // size 默认值 是 空字符串
      this.$ELEMENT.size = size
      this.$store.dispatch('app/setSize', size)
      this.refreshView()
      this.$message({
        message: 'Switch Size Success',
        type: 'success'
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>
