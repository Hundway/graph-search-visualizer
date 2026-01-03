<template>
  <div>
    <button id="bt-start"><img src="/src/assets/icons/start.svg"></img>Start</button>
    <button id="bt-reset"><img src="/src/assets/icons/reset.svg"></img>Reset</button>
  </div>
</template>

<style scoped>
  div {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: none;
    border-radius: 8px;
    width: 100px;
    color: var(--text);
    cursor: pointer;
  }

  button:hover {
    opacity: 0.6;
    transform: scale(0.95);
    transition: all 0.2s ease-in-out;
  }

  #bt-start {
    background-color: var(--highlight);
  }

  #bt-reset {
    background-color: var(--bg-light);
  }
  
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
</style>