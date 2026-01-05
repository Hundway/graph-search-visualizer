<script setup lang="ts">
  const props = defineProps<{x1: number, y1: number, x2: number, y2: number,}>()
</script>

<template>
  <line 
    :x1="x1" :y1="y1" 
    :x2="x2" :y2="y2" 
    class="road-line" 
  />
</template>

<style scoped>
  .road-line {
    stroke: var(--border);
    stroke-width: 2px;
  }
</style>