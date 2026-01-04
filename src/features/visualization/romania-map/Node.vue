<script setup lang="ts">
  const props = defineProps<{
    title: string, 
    x: number, 
    y: number,
    size: number
  }>()
</script>

<template>
  <svg
    :x="props.x - (props.size / 2)" 
    :y="props.y - (props.size / 2)"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 100 100" 
  >
    <circle cx="50" cy="50" r="45" />
    
    <foreignObject x="0" y="0" width="100" height="100">
      <div class="label-container">
        <span class="label" :style="{ fontSize: (props.size * 0.15) + 'px' }">
          {{ title }}
        </span>
      </div>
    </foreignObject>
  </svg>
</template>

<style scoped>
  circle {
    fill: var(--bg-light);
    stroke: var(--border);
    stroke-width: 4px;
  }
  .label-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .label {
    padding: 4px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    word-break: break-word;
    color: var(--text);
  }
</style>