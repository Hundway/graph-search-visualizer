import { defineStore } from "pinia";

export const useOptionsStore = defineStore("options-store", {
  state() {
    return {
      problemType: "Maze Grid",
      searchAlgorithm: "Depth-First Search",
      heuristicDistance: "Manhattan",
      animationSpeed: "Normal",
    };
  },

  actions: {
    setProblemType(value: string) {
      this.problemType = value;
    },
    setSearchAlgorithm(value: string) {
      this.searchAlgorithm = value;
    },
    setHeuristicDistance(value: string) {
      this.heuristicDistance = value;
    },
    setAnimationSpeed(value: string) {
      this.animationSpeed = value;
    },
  },

  getters: {
    getProblemType: (state) => state.problemType,
    getSearchAlgorithm: (state) => state.searchAlgorithm,
    getHeuristicDistance: (state) => state.heuristicDistance,
    getAnimationSpeed: (state) => state.animationSpeed,
  },
});
