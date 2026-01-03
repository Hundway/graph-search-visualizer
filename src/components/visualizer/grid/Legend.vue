<template>
  <ul id="grid-legend">
    <li>
      <div class="legend-item start"/>
      <h3>start</h3>
    </li>
    <li>
      <div class="legend-item end"/>
      <h3>end</h3>
    </li>
    <li>
      <div class="legend-item wall"/>
      <h3>wall</h3>
    </li>
  </ul>
</template>

<style>
  .start {
    background-color: var(--success);
  }

  .end {
    background-color: var(--danger);
  }

  .wall {
    background-color: var(--warning);
  }

  #grid-legend {
    display: flex;
    gap: 16px;
  }

  #grid-legend > li {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  #grid-legend h3 {
    color: var(--text);
  }

  .legend-item {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
</style>