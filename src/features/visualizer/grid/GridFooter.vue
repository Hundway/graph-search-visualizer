<script setup lang="ts">
  import Button from '@/components/Button.vue';
  import ButtonGroup from '@/components/ButtonGroup.vue';
  import GridLegend from './GridLegend.vue';

  const emit = defineEmits(['clear', 'generate'])
</script>

<template>
  <footer id="grid-footer">
    <GridLegend />
    <ButtonGroup>
      <Button id="bt-generate" iconUrl="/src/assets/icons/generate.svg" title="Generate" @click="$emit('generate')"/>
      <Button id="bt-clear" iconUrl="/src/assets/icons/clear.svg" title="Clear" @click="$emit('clear')"/>
    </ButtonGroup>
  </footer>
</template>

<style scoped>
  #grid-footer {
    display: flex;
    justify-content: space-between
  }
</style>