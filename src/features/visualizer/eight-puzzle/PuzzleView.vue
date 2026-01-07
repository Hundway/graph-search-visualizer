<script setup lang="ts">
  import Header from '@/components/Header.vue';
  import PuzzlePiece from '@/components/PuzzlePiece.vue';
</script>

<template>
  <main id="puzzle-view">
    <Header title="8-Puzzle" />
    <div class="puzzle">
      <PuzzlePiece title=""/>
      <PuzzlePiece v-for="value in 8" :title="value"/>
    </div>
  </main>
</template>

<style scoped>
  #puzzle-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .puzzle {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
    padding: 10px;
    border: 2px solid var(--border);
    border-radius: 4px;
  }
</style>