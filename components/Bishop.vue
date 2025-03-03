<template>
  <div class="figure">
    <NuxtImg :src="props.piece === 'bishop_black' ? '/images/bishop-black.svg' : '/images/bishop-white.svg'" alt="bishop" />
  </div>
</template>

<script setup>
const mainStore = useMainStore()

const props = defineProps({
  board: Array,
  piece: String,
  cellColor: String
})

watch(
  () => mainStore.startCell,
  (newStartCell) => {
    if (
        newStartCell && 
        (mainStore.selectedFigure === 'bishop_black' ||
        mainStore.selectedFigure === 'bishop_white')
      ) {
        movesBishop()
    }
  }
)

let movesBishop = () => {
  let directions = [
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