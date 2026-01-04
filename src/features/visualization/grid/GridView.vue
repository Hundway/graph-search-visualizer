<script setup lang="ts">
  import { ref, computed } from 'vue'
  import GridFooter from './GridFooter.vue'
  
  import { Maze } from '@/composables/useMaze'
  import { useMouse } from '@/composables/useMouse'

  type CellState = 'empty' | 'start' | 'end' | 'wall'

  const ROWS = 25
  const COLS = 40

  function createGrid(): CellState[][] {
    return Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => 'empty')
    )
  }

  const grid = ref(createGrid())
  const { mouseDown, start: startMouse, stop: stopMouse } = useMouse()

  const gridFlags = computed(() => {
    let hasStart = false
    let hasEnd = false
    for (const row of grid.value) {
      if (!hasStart && row.includes('start')) hasStart = true
      if (!hasEnd && row.includes('end')) hasEnd = true
      if (hasStart && hasEnd) break
    }
    return { hasStart, hasEnd }
  })

  async function clearGrid() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        grid.value[i]![j] = 'empty'
      }
      await new Promise(r => requestAnimationFrame(r))
    }
  }

  async function applyMaze() {
    const maze = Maze.generate(ROWS, COLS)
    const stateMap = { 0: 'empty', 1: 'wall', 2: 'start', 3: 'end' }

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        grid.value[i]![j] = stateMap[maze[i][j]]
      }
      await new Promise(r => requestAnimationFrame(r))
    }
  }

  function toggleCell(i: number, j: number) {
    if (grid.value[i]![j] === 'empty'){
      grid.value[i]![j] = !gridFlags.value.hasStart ? 'start': !gridFlags.value.hasEnd ? 'end' : 'wall'
    }
    else{
      grid.value[i]![j] = 'empty'
    }
  }

  function onEnter(i: number, j: number) {
    if (mouseDown.value) toggleCell(i, j)
  }
</script>


<template>
  <main
    id="grid-editor"
    @mousedown="startMouse"
    @mouseup="stopMouse"
    @mouseleave="stopMouse"
  > 
    <section id="grid">
      <div class="grid-row" v-for="(row, i) in grid" :key="i">
        <div
          class="grid-cell"
          v-for="(cell, j) in row"
          :key="j"
          :id="`node-${i}-${j}`"
          :class="cell"
          @mousedown.prevent="toggleCell(i, j)"
          @mouseenter="onEnter(i, j)"
        />
      </div>
    </section>

    <GridFooter  @clear="clearGrid" @generate="applyMaze"/>
  </main>
</template>

<style scoped>
  #grid-editor {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .grid-row {
    display: flex;
  }

  .grid-cell {
    width: 25px;
    height: 25px;
    border: 1px solid var(--border);
    margin-right: -1px;
    margin-bottom: -1px;
    transition: background-color 120ms ease, transform 120ms ease;
  }

  @keyframes pop {
    0%   { transform: scale(0.85); }
    100% { transform: scale(1); }
  }
</style>