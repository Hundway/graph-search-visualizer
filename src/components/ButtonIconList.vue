<template>
  <nav class="button-group">
    <slot></slot>
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    justify-content: start;
    gap: 10px;
  }
</style>