<script setup lang="ts">
  const props = defineProps<{iconUrl: string,title: string}>()
  const emit = defineEmits(['click'])
  const onClick = (e: PointerEvent) => emit('click', e)
</script>

<template>
    <button @click="onClick">
      <img v-if="iconUrl" :src="iconUrl" />
      <span v-if="title">{{ title }}</span>
    </button>
</template>

<style scoped>
  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    padding: 10px;
    border: none;
    border-radius: 8px;

    background-color: var(--bg-light);
    color: var(--text);
    
    cursor: pointer;
  }

  button:hover {
    opacity: 0.6;
    transform: scale(0.95);
    transition: all 0.2s ease-in-out;
  }
  
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
</style>