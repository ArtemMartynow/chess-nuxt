<template>
  <div class="board">
    <div
      v-for="cell in board" 
      :key="cell"
      :class="{
        'cell': true,
        'white': cell.color === 'white',
        'black': cell.color === 'black',
        'purple': cell.color === 'purple'
      }"
      @click="move(cell)"
    >
      <Bishop 
        v-if="cell.piece === 'bishop_black' || cell.piece === 'bishop_white'" 
        :board="board"
        :piece="cell.piece"  
      />
      <King 
        v-if="cell.piece === 'king_black' || cell.piece === 'king_white'" 
        :board="board"
        :piece="cell.piece"  
      />
      <Knight 
        v-if="cell.piece === 'knight_black' || cell.piece === 'knight_white'" 
        :board="board"
        :piece="cell.piece"  
      />
      <Pawn 
        v-if="cell.piece === 'pawn_black' || cell.piece === 'pawn_white'" 
        :board="board"
        :piece="cell.piece"  
      />
      <Queen 
        v-if="cell.piece === 'queen_black' || cell.piece === 'queen_white'" 
        :board="board"
        :piece="cell.piece"  
      />
      <RookWhite v-if="cell.piece === 'rook_white'" />
      <RookBlack v-if="cell.piece === 'rook_black'" />
      <span :class="{ 'can-move': mainStore.activeMoves.some(selectedCell => selectedCell.y === cell.y && selectedCell.x === cell.x)}"></span>
    </div>
  </div>  
</template>

<script setup>
const mainStore = useMainStore()

let board = reactive([])
let cellColor = ref('')
let isPieceSelected = ref(false)

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const cell = {
      x: j,
      y: i,
      color: (i + j) % 2 === 0 ? 'white' : 'black',
      piece: ''
    };

    if (i === 6) cell.piece = 'pawn_white'
    if (i === 1) cell.piece = 'pawn_black'
    if (i === 0 && (j === 0 || j === 7)) cell.piece = 'rook_black'
    if (i === 7 && (j === 0 || j === 7)) cell.piece = 'rook_white'
    if (i === 0 && j === 4) cell.piece = 'king_black'
    if (i === 7 && j === 4) cell.piece = 'king_white'
    if (i === 0 && j === 3 ) cell.piece = 'queen_black'
    if (i === 7 && j === 3 ) cell.piece = 'queen_white'
    if (i === 0 && (j === 1 || j === 6)) cell.piece = 'knight_black'
    if (i === 7 && (j === 1 || j === 6)) cell.piece = 'knight_white'
    if (i === 0 && (j === 2 || j === 5)) cell.piece = 'bishop_black'
    if (i === 7 && (j === 2 || j === 5)) cell.piece = 'bishop_white'

    board.push(cell)
  }
}

let resetGameState = () => {
  mainStore.setActiveMoves([])
  isPieceSelected.value = false
  mainStore.setStartCell(null)
  cellColor.value = ''
}

let move = (cell) => {
  let resetCellColor = null
  if (cell.piece !== '' && mainStore.activeMoves !== [] && isPieceSelected.value === false) {
    mainStore.setSelectedFigure(cell.piece)
    mainStore.setStartCell(cell)
    isPieceSelected.value = true
    cellColor.value = cell.color
    cell.color = 'purple'
  } else if (mainStore.activeMoves.some(item => item.x === cell.x && item.y === cell.y)) {
    resetCellColor = board.find(i => i.x === mainStore.startCell.x && i.y === mainStore.startCell.y)
    resetCellColor.color = cellColor.value
    resetCellColor.piece = ''
    moveFigure(cell)
  } else {
    resetCellColor = board.find(i => i.x === mainStore.startCell.x && i.y === mainStore.startCell.y)
    resetCellColor.color = cellColor.value
    resetGameState()
  }
}

let moveFigure = (cell) => {
  cell.piece = mainStore.selectedFigure
  resetGameState()
}

</script>