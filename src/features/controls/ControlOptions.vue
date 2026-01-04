<script setup lang="ts">
  import OptionItem from '@/components/OptionItem.vue';
  import { useOptionsStore } from '@/stores/OptionStore';

  const optionsStore = useOptionsStore()
</script>

<template>
  <div>
    <OptionItem
      v-model="optionsStore.problemType"
      title="Problem Type"
      :options="['Eight-Puzzle', 'Maze Grid', 'Romania Map']"
    />
    <OptionItem
      v-model="optionsStore.searchAlgorithm"
      title="Search Algorithm"
      :options="['Depth-First Search', 'Breadth-First Search', 'Iterative Deepening Search', 'Greedy Best-First Search', 'Uniform Cost Search', 'A*']"
      />
    <OptionItem
      v-model="optionsStore.heuristicDistance"
      title="Heuristic Distance"
      :options="['None', 'Manhattan', 'Euclidean', 'Chebyshev']"
    />
    <OptionItem
      v-model="optionsStore.animationSpeed"
      title="Animation Speed"
      :options="['Slow', 'Normal', 'Fast', 'Instant']"
    />
  </div>
</template>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
  }
</style>