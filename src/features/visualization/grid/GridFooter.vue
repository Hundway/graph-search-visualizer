<script setup lang="ts">
  import ButtonIcon from '@/components/ui/ButtonIcon.vue';
  import ButtonIconList from '@/components/ui/ButtonIconList.vue';
  import GridLegend from './GridLegend.vue';

  const emit = defineEmits(['clear', 'generate'])
</script>

<template>
  <footer id="grid-footer">
    <GridLegend />
    <ButtonIconList>
      <ButtonIcon id="bt-generate" iconUrl="/src/assets/icons/generate.svg" title="Generate" @click="$emit('generate')"/>
      <ButtonIcon id="bt-clear" iconUrl="/src/assets/icons/clear.svg" title="Clear" @click="$emit('clear')"/>
    </ButtonIconList>
  </footer>
</template>

<style scoped>
  #grid-footer {
    display: flex;
    justify-content: space-between
  }
</style>