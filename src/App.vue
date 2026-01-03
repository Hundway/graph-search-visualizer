<script setup lang="ts">
  import Settings from './Components/Settings/Settings.vue'
  import Visualizer from './Components/Visualizer/Visualizer.vue'
</script>


<template>
  <div id="app-root">
    <main id="visualizer-area">
      <Visualizer/>
    </main>
    <Settings/>
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