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
        <span class="label" :style="{ fontSize: (props.size * 0.18) + 'px' }">
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
    stroke-width: 2px;
  }
  .label-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .label {
    padding: 4px;
    text-align: center;
    word-break: break-word;
    color: var(--text);
  }
</style>