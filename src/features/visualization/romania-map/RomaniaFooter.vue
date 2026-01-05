<script setup lang="ts">
  import LegendItem from '@/components/LegendItem.vue';
</script>

<template>
  <div>
    <ul id="romania-legend">
      <LegendItem title="start" box-class="start"/>
      <LegendItem title="end"   box-class="end"/>
    </ul>
  </div>
</template>

<style scoped>
  #romania-legend {
    display: flex;
    gap: 16px;
  }
</style>