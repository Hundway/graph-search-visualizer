<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
import GridFooter from './GridFooter.vue'


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
        grid.value[i][j] = 'empty'
  }

  function setCell(i: number, j: number, state: CellState) {
    grid.value[i][j] = state
  }

  function toggleCell(i: number, j: number) {
    const current = grid.value[i][j]
    let next: CellState = 'empty'
    if (current === 'empty') {
      next = !startIsSet.value ? 'start': !endIsSet.value ? 'end' : 'wall'
    }
    grid.value[i][j] = next
  }

  function onEnter(i: number, j: number) {
    if (mouseDown.value) toggleCell(i, j)
  }

  function stopMouse() {
    mouseDown.value = false
  }

    function getGridShape() {
    const grid = document.getElementById('grid')
    if (!grid) throw new Error('Grid not found')
    const rows = grid.children.length
    const cols = (grid.children[0] as HTMLElement).children.length
    return { rows, cols }
  }

  function createGrid(rows: number, cols: number) {
    return Array.from({length: rows}, () => Array.from({length: cols}, () => 0))
  }

  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function randCell() {
    const { rows, cols } = getGridShape()
    const r = randInt(0, rows - 1)
    const c = randInt(0, cols - 1)
    return { r, c }
  }

  function getNeighbors(cell: { r: number, c: number }) {
    const { rows, cols } = getGridShape()
    const neighbors = []
    if (cell.r > 0) neighbors.push({ r: cell.r - 1, c: cell.c })
    if (cell.r < rows - 1) neighbors.push({ r: cell.r + 1, c: cell.c })
    if (cell.c > 0) neighbors.push({ r: cell.r, c: cell.c - 1 })
    if (cell.c < cols - 1) neighbors.push({ r: cell.r, c: cell.c + 1 })
    return neighbors
  }

  function isWall(cell: { r: number, c: number }, grid: number[][]) {
    return grid[cell.r][cell.c] === 0
  }

  function isPassage(cell: { r: number, c: number }, grid: number[][]) {
    return grid[cell.r][cell.c] === 1
  }

  function isFreeWay(cell: { r: number, c: number }, grid: number[][]) {
    const neighbors = getNeighbors(cell)
    let passages = 0
    for (const n of neighbors) {
      if (isPassage(n, grid)) passages++
    }
    return passages === 1
  }

  function generateMaze() {
    const { rows, cols } = getGridShape()
    const grid = createGrid(rows, cols) // 0 = wall, 1 = passage

    const start = randCell()
    grid[start.r][start.c] = 1
    const stack = [start]
    while (stack.length > 0) {
      const current = stack[stack.length - 1]

      const neighbors = getNeighbors(current)
        .filter(n => {return isWall(n, grid)})
        .filter(n => {return isFreeWay(n, grid)})

      if (neighbors.length === 0) {
        stack.pop()
        continue
      }

      const next = neighbors[randInt(0, neighbors.length - 1)]
      grid[next.r][next.c] = 1
      stack.push(next)
    }
    
    clearGrid()
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 0)  setCell(r, c, 'wall')
      }
    }
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

    <GridFooter  @clear="clearGrid" @generate="generateMaze"/>
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