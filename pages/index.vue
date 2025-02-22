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
    board.push(cell);
  }
}
</script>