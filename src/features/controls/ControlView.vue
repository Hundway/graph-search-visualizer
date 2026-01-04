<script setup lang="ts">
  import { ref, computed } from 'vue'
  import ControlPanel from './ControlPanel.vue'
  
  const isPanelOpen = ref(true)
  
  const forwardIcon = '/src/assets/icons/forward.svg'
  const backwardIcon = '/src/assets/icons/backward.svg'
  
  const toggleIconUrl = computed(() => isPanelOpen.value ? forwardIcon : backwardIcon)
  
  const toggleConfiguration = () => {
    isPanelOpen.value = !isPanelOpen.value
  }
</script>

<template>
  <aside id="settings-area">
    <button id="settings-toggle-button" @pointerdown="toggleConfiguration">
      <img :src="toggleIconUrl"/>
    </button>
    <ControlPanel v-show="isPanelOpen"/>
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
    background-color: var(--bg-light);
    cursor: pointer;
  }

  #settings-toggle-button img {
    width: 20px;
    height: 20px;
  }
</style>
