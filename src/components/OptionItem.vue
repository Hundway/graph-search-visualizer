<script setup lang="ts">
  const props = defineProps<{'title': string, id: string, 'options': string[]}>()
</script>

<template>
  <span>{{ title }}</span>
  <select :id="props.id">
    <option v-for="option in options" :value="option" :key="option">{{ option }}</option>
  </select>
</template>

<style scoped>
  span {
    color: var(--text-muted);
  }

  select {
    width: 100%;
    padding: 6px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background-color: var(--bg-light);
    color: var(--text);
  }
</style>