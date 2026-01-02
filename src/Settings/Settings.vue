<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Panel from './Panel.vue'
  
  const isPanelOpen = ref(false)
  
  const forwardIcon = '/src/assets/icons/forward.svg'
  const backwardIcon = '/src/assets/icons/backward.svg'
  
  const toggleImageUrl = computed(() => isPanelOpen.value ? backwardIcon : forwardIcon)
  const togglePanel = computed(() => isPanelOpen.value ? 'display: none' : 'display: flex')
  
  const toggleConfiguration = () => {
    isPanelOpen.value = !isPanelOpen.value
  }
</script>

<template>
  <aside id="settings-area">
    <button id="settings-toggle-button" @pointerdown="toggleConfiguration">
      <img :src="toggleImageUrl"/>
    </button>
    <Panel :style="togglePanel"/>
  </aside>
</template>

<style scoped>
  #settings-area {
    display: flex;
    flex-direction: row;
    height: 100dvh;
    width: auto;
    background-color: var(--bg-light);
  }

  #settings-toggle-button {
    display: flex;
    align-items: center;
    border: none;
    width: 20px;
    background-color: var(--border);
    cursor: pointer;
  }

  #settings-toggle-button img {
    width: 20px;
    height: 20px;
  }
</style>
