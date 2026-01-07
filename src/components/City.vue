<script setup lang="ts">
  const props = defineProps<{title: string, x: number, y: number, size: number, state: string}>()
  const emit = defineEmits(['click'])
</script>

<template>
  <svg
    :x="props.x - (props.size / 2)" 
    :y="props.y - (props.size / 2)"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 100 100"
    :class="['node-svg', props.state]"
    @click="emit('click')"
  >
    <circle cx="50" cy="50" r="45" />
    <foreignObject x="0" y="0" width="100" height="100">
      <div class="label-container">
        <span class="label" :style="{ fontSize: (props.size * 0.16) + 'px' }">
          {{ title }}
        </span>
      </div>
    </foreignObject>
  </svg>
</template>

<style scoped>
  svg {
    cursor: pointer;
    transition: transform 0.2s;
  }

  circle {
    fill: var(--bg-light);
    stroke: transparent;
    transition: fill 0.3s, stroke 0.3s;
  }

  circle {
    fill: var(--bg-light);
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
    user-select: none;
  }

  .start circle {
    fill: var(--success);
  }

  .end circle {
    fill: var(--danger);
  }

  .start .label, .end .label {
    text-shadow: 2px 2px 2px black;
  }
</style>