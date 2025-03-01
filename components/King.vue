<template>
  <div class="figure">
    <NuxtImg :src="props.piece === 'king_black' ? '/images/king-black.svg' : '/images/king-white.svg'" alt="pawn" />
  </div>
</template>

<script setup>
const props = defineProps({
  board: Array,
  piece: String
})
</script>