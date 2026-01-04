<script setup lang="ts">
  const modelValue = defineModel<string>()
  const props = defineProps<{'title': string, 'options': string[]}>()
</script>

<template>
  <span>{{ title }}</span>
  <select v-model="modelValue">
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
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