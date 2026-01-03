<script setup lang="ts">
  import { ref, onBeforeUnmount } from 'vue'
  import Options from './Options.vue'
  
  import ButtonContainer from '../ButtonContainer.vue'
  import IconButton from '../IconButton.vue'

  const panelWidth = ref(400)
  let resizing = false

  const onPointerMove = (e: PointerEvent) => {
    if (!resizing) return
    panelWidth.value = Math.max(230, panelWidth.value - e.movementX)
  }

  const stopResize = () => {
    resizing = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stopResize)
  }

  const startResize = () => {
    resizing = true
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopResize)
  }

  onBeforeUnmount(stopResize)
</script>

<template>
  <div id="settings-panel" :style="{ width: panelWidth + 'px' }">
    <button id="panel-resizer" @pointerdown="startResize"/>
    <section>
      <h2>Configuration Panel</h2>
      <Options />
      <ButtonContainer>
        <IconButton id="bt-start" iconUrl="/src/assets/icons/start.svg" title="Start"/>
        <IconButton id="bt-reset" iconUrl="/src/assets/icons/reset.svg" title="Reset"/>
      </ButtonContainer>
    </section>
  </div>
</template>

<style scoped>
  #settings-panel {
    display: flex;
    flex-direction: row;
  }

  section {
    width: 100%;
    height: 100vh;
    background-color: var(--bg);
    padding: 20px;
    overflow: auto;
    font-size: 0.8rem;
  }

  h2 {
    color: var(--text);
  }

  #panel-resizer {
    width: 4px;
    border: none;
    cursor: col-resize;
    background-color: var(--bg-light);
  }

  #panel-resizer:hover {
    background-color: var(--bg-light);
    transition: all 0.3s ease-in-out;
  }
</style>
