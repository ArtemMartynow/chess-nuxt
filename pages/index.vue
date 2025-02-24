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
      <BishopWhite v-if="cell.piece === 'bishop_white'" />
      <BishopBlack v-if="cell.piece === 'bishop_black'" />
      <KingWhite v-if="cell.piece === 'king_white'" />
      <KingBlack v-if="cell.piece === 'king_black'" />
      <KnightWhite v-if="cell.piece === 'knight_white'" />
      <KnightBlack v-if="cell.piece === 'knight_black'" />
      <PawnWhite v-if="cell.piece === 'pawn_white'" />
      <PawnBlack v-if="cell.piece === 'pawn_black'" />
      <QueenWhite v-if="cell.piece === 'queen_white'" />
      <QueenBlack v-if="cell.piece === 'queen_black'" />
      <RookWhite v-if="cell.piece === 'rook_white'" />
      <RookBlack v-if="cell.piece === 'rook_black'" />
      <span :class="{ 'can-move': activeMoves.some(selectedCell => selectedCell.y === cell.y && selectedCell.x === cell.x)}"></span>
    </div>
  </div>  
</template>

<script setup>
let board = reactive([])
let startCell = ref(null)
let cellColor = ref('')
let isPieceSelected = ref(false)
let activeMoves = ref([])

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
  activeMoves.value = []
  isPieceSelected.value = false
  startCell.value = null
  cellColor.value = ''
}

let move = (cell) => {
  let resetCellColor = null
  if (cell.piece !== '' && activeMoves.value !== [] && isPieceSelected.value === false) {
    startCell.value = {...cell}
    isPieceSelected.value = true
    cellColor.value = cell.color
    cell.color = 'purple'
    if(cell.piece === 'pawn_black' || cell.piece === 'pawn_white') movesPawn(cell)
  } else if (activeMoves.value.some(item => item.x === cell.x && item.y === cell.y)) {
    resetCellColor = board.find(i => i.x === startCell.value.x && i.y === startCell.value.y)
    resetCellColor.color = cellColor.value
    resetCellColor.piece = ''
    moveFigure(cell)
  } else {
    resetCellColor = board.find(i => i.x === startCell.value.x && i.y === startCell.value.y)
    resetCellColor.color = cellColor.value
    resetGameState()
  }
}

let moveFigure = (cell) => {
  cell.piece = startCell.value.piece
  resetGameState()
}

let movesPawn = (cell) => {
  let moveCell = {...cell}
  let direction = cell.piece === 'pawn_black' ? 1 : -1
  let moves = [
    {x: 0, y: 1 * direction},
    {x: 1, y: 1 * direction},
    {x: -1, y: 1 * direction}
  ]

  moves.forEach(movesCell => {
    movesCell.x = movesCell.x + startCell.value.x
    movesCell.y = movesCell.y + startCell.value.y
    let targetCell = board.find(i => i.x === movesCell.x && i.y === movesCell.y)
    if (targetCell.x === startCell.value.x && targetCell.piece === '') {
      activeMoves.value.push(targetCell)        
    } else if (
      targetCell.x !== startCell.value.x && 
      targetCell.piece !== '' && 
      targetCell.piece.slice(-5) !== startCell.value.piece.slice(-5)
    ) {
      activeMoves.value.push(targetCell)        
    }
  })
  if (cell.y === 1 || cell.y === 6) {
    moveCell.y = cell.y + (2 * direction)
    activeMoves.value.push({...moveCell})
  }
}
</script>