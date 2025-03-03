<template>
  <div class="figure">
    <NuxtImg :src="props.piece === 'knight_black' ? '/images/knight-black.svg' : '/images/knight-white.svg'" alt="knight" />
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
        (mainStore.selectedFigure === 'knight_black' ||
        mainStore.selectedFigure === 'knight_white')
      ) {
        movesKnight()
    }
  }
)

let movesKnight = () => {
  let directions = [
    { dx: 1, dy: 2 },
    { dx: 1, dy: -2 },
    { dx: -1, dy: 2 },
    { dx: -1, dy: -2 },
    { dx: 2, dy: 1 },
    { dx: 2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -2, dy: -1 }
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
    }
  })
}
</script>