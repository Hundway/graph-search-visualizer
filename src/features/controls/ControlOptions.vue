<script setup lang="ts">
  import OptionItem from '@/components/OptionItem.vue';
</script>

<template>
  <div>
    <OptionItem title="Problem Type" id="problem-type" :options="['8-Puzzle', 'Random Maze', 'Romania Map', 'Simple Grid']"/>
    <OptionItem title="Search Algorithm" id="search-algorithm" :options="['Depth-First Search', 'Breadth-First Search', 'Iterative Deepening Search', 'Greedy Best-First Search', 'Uniform Cost Search', 'A*']"/>
    <OptionItem title="Heuristic Distance" id="heristic" :options="['None', 'Manhattan', 'Euclidean', 'Chebyshev']"/>
    <OptionItem title="Animation Speed" id="animation-speed" :options="['Slow', 'Normal', 'Fast', 'Instant']"/>
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