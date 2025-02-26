import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    startCell: null,
    activeMoves: [],
    selectedFigure: ''
  }),
  actions: {
    setStartCell(cell) {
      this.startCell = cell
    },
    setActiveMoves(moves) {
      this.activeMoves = moves
    },
    setSelectedFigure(figure) {
      this.selectedFigure = figure
    }
  }
})