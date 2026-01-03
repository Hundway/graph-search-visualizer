<template>
  <div>
    <span>Problem Type</span>
    <select>
      <option>8-Puzzle</option>
      <option>Random Maze</option>
      <option>Romania Map</option>
      <option>Simple Grid</option>
    </select>
    <span>Search Algorithm </span>
    <select>
      <option>Depth-First Search</option>
      <option>Breadth-First Search</option>
      <option>Iterative Deepening Search</option>
      <option>Greedy Best-First Search</option>
      <option>Uniform Cost Search</option>
      <option>Dijkstra's</option>
      <option>A*</option>
    </select>
    <span>Heuristic Distance</span>
    <select>
      <option>None</option>
      <option>Manhattan</option>
      <option>Euclidean</option>
      <option>Chebyshev</option>
    </select>
    <span>Animation Speed </span>
    <select>
      <option>Slow</option>
      <option>Normal</option>
      <option>Fast</option>
      <option>Instant</option>
    </select>
  </div>
</template>

<style scoped>
  span {
    color: var(--text-muted);
  }

  select {
    width: 100%;
    padding: 6px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background-color: var(--bg-light);
    color: var(--text);
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
  }
</style>