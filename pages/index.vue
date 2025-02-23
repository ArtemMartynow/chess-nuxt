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
let activeMoves = ref([])

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const cell = {
      x: j,
      y: i,
      color: (i + j) % 2 === 0 ? 'black' : 'white',
      piece: ''
    };

    if (i === 6) cell.piece = 'pawn_white'
    if (i === 1) cell.piece = 'pawn_black'
    if (i === 0 && (j === 0 || j === 7)) cell.piece = 'rook_black';
    if (i === 7 && (j === 0 || j === 7)) cell.piece = 'rook_white';
    if (i === 0 && j === 4) cell.piece = 'king_black';
    if (i === 7 && j === 4) cell.piece = 'king_white';
    if (i === 0 && j === 3 ) cell.piece = 'queen_black';
    if (i === 7 && j === 3 ) cell.piece = 'queen_white';
    if (i === 0 && (j === 1 || j === 6)) cell.piece = 'knight_black';
    if (i === 7 && (j === 1 || j === 6)) cell.piece = 'knight_white';
    if (i === 0 && (j === 2 || j === 5)) cell.piece = 'bishop_black';
    if (i === 7 && (j === 2 || j === 5)) cell.piece = 'bishop_white';

    board.push(cell);
  }
}

let move = (cell) => {
  cellColor.value = cell.color
  if (cell.piece !== '') {
    cell.color = 'purple'
  }
  movePawn(cell)
}

let movePawn = (cell) => {
  startCell.value = {...cell}
  if (cell.piece === 'pawn_black') {
    if(cell.y === 1) {
      startCell.value.y = cell.y + 2
      activeMoves.value.push({...startCell.value})
    }
    startCell.value.y = cell.y + 1
    activeMoves.value.push(startCell.value)
    console.log({...activeMoves.value});
  }
}
</script>