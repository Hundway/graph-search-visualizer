<script setup lang="ts">
  import OptionSelectItem from './OptionSelectItem.vue';
</script>

<template>
  <div>
    <OptionSelectItem title="Problem Type" id="problem-type" :options="['8-Puzzle', 'Random Maze', 'Romania Map', 'Simple Grid']"/>
    <OptionSelectItem title="Search Algorithm" id="search-algorithm" :options="['Depth-First Search', 'Breadth-First Search', 'Iterative Deepening Search', 'Greedy Best-First Search', 'Uniform Cost Search', 'A*']"/>
    <OptionSelectItem title="Heuristic Distance" id="heristic" :options="['None', 'Manhattan', 'Euclidean', 'Chebyshev']"/>
    <OptionSelectItem title="Animation Speed" id="animation-speed" :options="['Slow', 'Normal', 'Fast', 'Instant']"/>
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