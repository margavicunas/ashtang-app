<template>
  <div class="flex flex-col items-center justify-center h-screen gap-5">
    <h1 class="text-2xl font-bold text-center">Ashtanga Primary Series Postures</h1>
    <UButton @click="startGameHandler">Start</UButton>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const { startGame } = gameStore

const startGameHandler = () => {
  startGame()
  navigateTo('/guessing-rounds')
}
</script>