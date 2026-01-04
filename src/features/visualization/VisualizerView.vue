<script setup lang="ts">
  import PuzzleView from './eight-puzzle/PuzzleView.vue';
  import GridView from './grid/GridView.vue';
  import RomaniaView from './romania-map/RomaniaView.vue';
  import { useOptionsStore } from '@/stores/OptionStore';

  const optionsStore = useOptionsStore()
</script>

<template>
  <PuzzleView v-if="optionsStore.problemType === 'Eight-Puzzle'"/>
  <GridView v-else-if="optionsStore.problemType === 'Maze Grid'"/>
  <RomaniaView v-else-if="optionsStore.problemType === 'Romania Map'"/>
</template>

<style scoped>

</style>