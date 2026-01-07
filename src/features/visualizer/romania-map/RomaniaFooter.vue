<script setup lang="ts">
  import Legend from '@/components/Legend.vue';
</script>

<template>
  <div>
    <ul id="romania-legend">
      <Legend title="start" box-class="start"/>
      <Legend title="end"   box-class="end"/>
    </ul>
  </div>
</template>

<style scoped>
  #romania-legend {
    display: flex;
    gap: 16px;
  }
</style>