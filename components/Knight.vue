<template>
  <div class="figure">
    <NuxtImg :src="props.piece === 'knight_black' ? '/images/knight-black.svg' : '/images/knight-white.svg'" alt="pawn" />
  </div>
</template>

<script setup>
const props = defineProps({
  board: Array,
  piece: String
})
</script>