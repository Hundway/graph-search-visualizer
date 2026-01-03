<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import GridFooter from './GridFooter.vue'
  import { Maze } from './useMaze.ts'

  type CellState = 'empty' | 'start' | 'end' | 'wall'

  const ROWS = 20
  const COLS = 30
  const grid = ref<CellState[][]>(Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 'empty')))

  const mouseDown = ref(false)

  const startIsSet = computed(() =>
    grid.value.some(row => row.includes('start'))
  )

  const endIsSet = computed(() =>
    grid.value.some(row => row.includes('end'))
  )

  function clearGrid() {
    for (let i = 0; i < ROWS; i++)
      for (let j = 0; j < COLS; j++)
        grid.value[i]![j] = 'empty'
  }

  function applyMaze() {
    clearGrid()
    renderMaze(Maze.generate(ROWS, COLS))
  }

  function renderMaze(maze: number[][]) {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (maze[r]![c] === 1) {
          grid.value[r]![c] = 'wall'
        }
      }
    }
  }

  function toggleCell(i: number, j: number) {
    const current = grid.value[i]![j]
    let next: CellState = 'empty'
    if (current === 'empty') {
      next = !startIsSet.value ? 'start': !endIsSet.value ? 'end' : 'wall'
    }
    grid.value[i]![j] = next
  }

  function onEnter(i: number, j: number) {
    if (mouseDown.value) toggleCell(i, j)
  }

  function stopMouse() {
    mouseDown.value = false
  }

  onMounted(() => {
    window.addEventListener('mouseup', stopMouse)
  })

  onUnmounted(() => {
    window.removeEventListener('mouseup', stopMouse)
  })
</script>

<template>
  <main id="grid-editor" @mousedown="mouseDown = true" @mouseup="mouseDown = false" @mouseleave="mouseDown = false">
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
    width: 30px;
    height: 30px;
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