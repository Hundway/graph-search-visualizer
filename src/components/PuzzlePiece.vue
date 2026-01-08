<script setup lang="ts">
  const props = defineProps<{title: number}>()
</script>

<template>
  <div>
    <div  v-if="title !== 0" class="puzzle-piece">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<style scoped>
  .puzzle-piece {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    border: 2px solid var(--border);
    border-radius: 8px;
    background-color: var(--bg);
    cursor: pointer;
  }

  .puzzle-piece span{
    font-size: 64px;
    color: var(--text);
    text-shadow: 2px 2px 2px var(--text-muted);
  }
</style>