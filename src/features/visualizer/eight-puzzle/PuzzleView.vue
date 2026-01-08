<script setup lang="ts">
  import { ref } from 'vue';
  import Header from '@/components/Header.vue';
  import PuzzlePiece from '@/components/PuzzlePiece.vue';
  import Button from "@/components/Button.vue";
  import ButtonGroup from '@/components/ButtonGroup.vue';

  const pieces = ref([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);

  function movePiece(piece: number) {
    const emptyX = pieces.value.findIndex(row => row.includes(0));
    const emptyY = pieces.value[emptyX]?.findIndex(p => p === 0);

    const pieceX = pieces.value.findIndex(row => row.includes(piece));
    const pieceY = pieces.value[pieceX]?.findIndex(p => p === piece);

    const rowDiff = Math.abs(pieceX - emptyX);
    const colDiff = Math.abs(pieceY - emptyY);

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      pieces.value[emptyX][emptyY] = piece;
      pieces.value[pieceX][pieceY] = 0;
    }
  }

  function shuffle() {
    const m = pieces.value.length;
    const n = pieces.value[0].length;
    const flat = pieces.value.flat();

    for (let i = flat.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [flat[i], flat[j]] = [flat[j], flat[i]]; 
    } 

    for (let i = 0; i < m; i++) {
      pieces.value[i] = flat.slice(i * n, (i + 1) * n);
    }
  }

  function clear() {
    pieces.value = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  }
</script>

<template>
  <main id="puzzle-view">
    <Header title="8-Puzzle" />
    <TransitionGroup name="puzzle-grid" tag="div" class="puzzle">
      <PuzzlePiece
        v-for="piece in pieces.flat()"
        :key="piece"
        :title="piece"
        @click="movePiece(piece)"
      />
    </TransitionGroup>
    <ButtonGroup id="puzzle-footer">
      <Button iconUrl="/src/assets/icons/shuffle.svg" title="Shuffle" @click="shuffle" />
      <Button iconUrl="/src/assets/icons/clear.svg" title="Clear" @click="clear" />
    </ButtonGroup>
  </main>
</template>

<style scoped>
  #puzzle-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .puzzle-grid-move {
    transition: transform 0.4s ease;
  }

  .puzzle {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
    padding: 8px;
    border: 2px solid var(--border);
    border-radius: 8px;
  }

  #puzzle-footer {
    display: flex;
    justify-content: end;
  }
</style>