<script setup lang="ts">
  import SettingsView from './features/settings/SettingsView.vue';
  import VisualizerView from './features/visualization/VisualizerView.vue';
</script>


<template>
  <div id="app-root">
    <main id="visualizer-area">
      <VisualizerView/>
    </main>
    <SettingsView/>
  </div>
</template>

<style scoped>
  #app-root {
    display: flex;
    flex-direction: row;
  }

  #visualizer-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100dvh;
    background-color: var(--bg-dark);
    overflow: auto;
  }
</style>