<script setup>
  import Settings from './Settings/Settings.vue'
</script>


<template>
  <div id="app-root">
    <main id="main-content"></main>

    <Settings/>
  </div>
</template>

<style scoped>
#app-root {
  display: flex;
  flex-direction: row;
}

#main-content {
  width: 100%;
  height: 100dvh;
  background-color: var(--bg-dark);
}
</style>