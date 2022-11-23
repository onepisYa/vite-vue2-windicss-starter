<script setup>
import {ref} from "vue"
const foo = ref(22)
</script>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Test', components: {}, data() { return {} }, watch: {}, computed: {}, created() { }, mounted() { }, methods: {}
});
</script>

<template>
  <div>
    <div class="test-scss">test scss</div>
    <div>{{foo}}</div>
    <button class="">test tailwind</button>
    <el-button type="primary">test-el-button</el-button>
  </div>
</template>


<style lang='scss' scoped>
.test-scss {
  color: rgb(0, 255, 128);
}
</style>
