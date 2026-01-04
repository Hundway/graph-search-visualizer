<script setup lang="ts">
  const props = defineProps<{title: string, boxClass: string}>()
</script>

<template>
  <li>
    <div :class="props.boxClass" ></div>
    <h3>{{ title }}</h3>
  </li>
</template>

<style scoped>
  li {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  div {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }

  h3 {
    color: var(--text);
  }
</style>