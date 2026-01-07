<script setup lang="ts">
  const props = defineProps<{title: number | string}>()
</script>

<template>
  <div class="puzzle-piece">
    <span>{{ title }}</span>
  </div>
</template>

<style scoped>
  .puzzle-piece {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border: 2px solid var(--border);
    border-radius: 4px;
    background-color: var(--bg);
  }

  .puzzle-piece span{
    font-size: 48px;
    color: var(--text);
    text-shadow: 2px 2px 2px var(--text-muted);
  }
</style>