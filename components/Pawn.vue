<template>
  <div class="figure" >
    <NuxtImg :src="props.piece === 'pawn_black' ? '/images/pawn-black.svg' : '/images/pawn-white.svg'" alt="pawn" />
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
        (mainStore.selectedFigure === 'pawn_black' ||
        mainStore.selectedFigure === 'pawn_white')
      ) {
      movesPawn(newStartCell)
    }
  }
)

let movesPawn = (cell) => {
  let direction = cell.piece === 'pawn_black' ? 1 : -1
  let moves = [
    {x: 0, y: 1 * direction},
    {x: 1, y: 1 * direction},
    {x: -1, y: 1 * direction}
  ]

  moves.forEach(movesCell => {
    movesCell.x = movesCell.x + mainStore.startCell.x
    movesCell.y = movesCell.y + mainStore.startCell.y
    let targetCell = props.board.find(i => i.x === movesCell.x && i.y === movesCell.y)
    if (targetCell.x === mainStore.startCell.x && targetCell.piece === '') {
      mainStore.activeMoves.push(targetCell)        
    } else if (
      targetCell.x !== mainStore.startCell.x && 
      targetCell.piece !== '' && 
      targetCell.piece.slice(-5) !== mainStore.startCell.piece.slice(-5)
    ) {
      mainStore.activeMoves.push(targetCell)        
    }
  })
  if (cell.y === 1 || cell.y === 6) {
    let firstStep = props.board.find(i => i.x === cell.x && i.y === cell.y + (1 * direction))
    let secondStep = props.board.find(i => i.x === cell.x && i.y === cell.y + (2 * direction))

    if (firstStep.piece === '' && secondStep.piece === '') {
      mainStore.activeMoves.push(secondStep)
    }
  }
}
</script>