<script setup lang="ts">
  const props = defineProps<{title: string}>()
</script>

<template>
  <h1>{{ title }}</h1>
</template>

<style scoped>
  h1 {
    font-size: 42px;
    color: var(--text);
    text-shadow: 2px 2px 2px var(--text-muted);
  }
</style>