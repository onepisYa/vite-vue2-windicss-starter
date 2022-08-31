<script setup lang="ts">
import * as d3 from 'd3'
import { nextTick, onMounted, ref } from 'vue'
const r = ref(50)

let circle: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
onMounted(() => {
  circle = d3.selectAll('#testSvg circle')
})

const circleTransition = function () {
  nextTick(() => {
    circle.data([99, 3, 5, 7])
    circle.exit().remove()
    circle
      .transition()
      .duration(3000)
      .delay((d, i) => {
        return i * 10 + 5
      })
      .attr('r', (d) => {
        r.value = Math.sqrt((d as number) * 5)
        return r.value
      })
      .on('end', () => {
        r.value = 50
        circle.attr('r', 50)
      })
    r.value = 50
    circle.attr('r', 50)
  })
}
</script>

<template>
  <div>
    <t-button @click="circleTransition">
      replay
    </t-button>
    <svg
      id="testSvg"
      class="w-full flex-auto z-10"
      style="touch-action: none; height: 450px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="100"
        cy="100"
        :r="r"
        stroke="yellow"
        stroke-width="40"
        stroke-opacity=".5"
        fill="red"
      />
    </svg>
  </div>
</template>

