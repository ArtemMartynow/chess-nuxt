<template>
  <div class="figure">
    <NuxtImg :src="props.piece === 'queen_black' ? '/images/queen-black.svg' : '/images/queen-white.svg'" alt="queen" />
  </div>
</template>

<script setup>
const props = defineProps({
  board: Array,
  piece: String
})
</script>