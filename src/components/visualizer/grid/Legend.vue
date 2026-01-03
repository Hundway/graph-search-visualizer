<script setup lang="ts">
  import LegendItem from './LegendItem.vue';
</script>

<template>
  <ul id="grid-legend">
    <LegendItem title="start" box-class="start"/>
    <LegendItem title="end"   box-class="end"/>
    <LegendItem title="wall"  box-class="wall"/>
  </ul>
</template>

<style>
  .start {
    background-color: var(--success);
  }

  .end {
    background-color: var(--danger);
  }

  .wall {
    background-color: var(--warning);
  }

  #grid-legend {
    display: flex;
    gap: 16px;
  }
</style>