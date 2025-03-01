<template>
  <div class="figure">
    <NuxtImg :src="props.piece === 'rook_black' ? '/images/rook-black.svg' : '/images/rook-white.svg'" alt="rook" />
  </div>
</template>

<script setup>
const props = defineProps({
  board: Array,
  piece: String
})
</script>