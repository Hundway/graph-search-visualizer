<script setup lang="ts">
  import Legend from '@/components/Legend.vue';
</script>

<template>
  <ul id="grid-legend">
    <Legend title="start" box-class="start"/>
    <Legend title="end"   box-class="end"/>
    <Legend title="wall"  box-class="wall"/>
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