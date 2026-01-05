<script setup lang="ts">
  import ControlView from './features/controls/ControlView.vue';
  import VisualizerView from './features/visualizer/VisualizerView.vue';
</script>


<template>
  <div id="app-root">
    <main id="visualizer-area">
      <VisualizerView/>
    </main>
    <ControlView/>
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