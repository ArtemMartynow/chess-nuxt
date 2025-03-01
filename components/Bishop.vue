<template>
  <div class="figure">
    <NuxtImg :src="props.piece === 'bishop_black' ? '/images/bishop-black.svg' : '/images/bishop-white.svg'" alt="bishop" />
  </div>
</template>

<script setup>
const props = defineProps({
  board: Array,
  piece: String
})
</script>