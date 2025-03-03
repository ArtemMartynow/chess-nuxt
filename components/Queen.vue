<template>
  <div class="figure">
    <NuxtImg :src="props.piece === 'queen_black' ? '/images/queen-black.svg' : '/images/queen-white.svg'" alt="queen" />
  </div>
</template>

<script setup>
const mainStore = useMainStore()

const props = defineProps({
  board: Array,
  piece: String
})

watch(
  () => mainStore.startCell,
  (newStartCell) => {
    if (
        newStartCell && 
        (mainStore.selectedFigure === 'queen_black' ||
        mainStore.selectedFigure === 'queen_white')
      ) {
        movesQueen()
    }
  }
)

let movesQueen = () => {
  let directions = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: -1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: 1 }
  ]

  directions.forEach(({ dx, dy }) => {
    let direction = 1
    for (let step = 1; step < 8; step++) {
      let newX = mainStore.startCell.x + dx * direction
      let newY = mainStore.startCell.y + dy * direction
      
      let targetCell = props.board.find(i => i.x === newX && i.y === newY)
      if (!targetCell) break

      if (targetCell.piece === '') {
        mainStore.activeMoves.push(targetCell)
      } else {
        if (targetCell.piece.slice(-5) !== mainStore.startCell.piece.slice(-5)) {
          mainStore.activeMoves.push(targetCell)
        }
        break
      }
      direction++
    }
  })
}
</script>