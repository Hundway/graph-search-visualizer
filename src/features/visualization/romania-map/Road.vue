<script setup lang="ts">
  const props = defineProps<{
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  }>()
  const midX = (props.x1 + props.x2) / 2;
  const midY = (props.y1 + props.y2) / 2;
</script>

<template>
  <g class="road-group">
    <line 
      :x1="x1" :y1="y1" 
      :x2="x2" :y2="y2" 
      class="road-line" 
    />
  </g>
</template>

<style scoped>
  .road-line {
    stroke: var(--border);
    stroke-width: 2px;
  }

  .label-bg {
    fill: var(--bg-dark);
    stroke-width: 1px;
  }

  .road-label {
    font-size: 24px;
    fill: var(--text);
  }
</style>