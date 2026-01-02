<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import Panel from './Panel.vue'

const isConfigurationOpen = ref(false)

const toggleConfiguration = () => {
  const panel = document.getElementById('settings-panel');
  const button = document.getElementById('settings-toggle-button');
  const icon = button?.querySelector('img');

  if (!panel || !button || !icon) return

  isConfigurationOpen.value = !isConfigurationOpen.value

  if (isConfigurationOpen.value) {
    panel.style.display = 'none'
    icon.src = '/src/assets/icons/backward.svg'
  }
  else {
    panel.style.display = 'flex'
    icon.src = '/src/assets/icons/forward.svg'
  }
}
</script>

<template>
  <aside id="settings-area">
    <button id="settings-toggle-button" @pointerdown="toggleConfiguration">
      <img src="/src/assets/icons/forward.svg" />
    </button>
    <Panel/>
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
