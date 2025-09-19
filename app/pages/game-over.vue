<template>
  <div class="flex flex-col items-center justify-center h-screen gap-5">
    <h2 class="text-lg font-bold text-center">Game over</h2>
    <div class="flex flex-col items-center justify-center text-center">
      <p>Your final score is: <span class="font-bold">{{ score }}</span></p>
      <p>{{ scoreMessage }}</p>
    </div>
      <div class="flex justify-center">
        <UButton variant="ghost" icon="i-heroicons-home" @click="goToHomeHandler">Go to Home</UButton>
        <UButton variant="ghost" icon="i-heroicons-arrow-path" @click="restartGameHandler">Restart Game</UButton>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game'
import { MAX_ROUNDS } from '~/constants/game'

const gameStore = useGameStore()
const { $reset, nextQuestion } = gameStore
const { score } = storeToRefs(gameStore)

const scoreMessage = computed(() => {
  if (score.value === MAX_ROUNDS) return 'Congratulations! You won the game! 🎉🎉🎉'
  if (score.value / MAX_ROUNDS >= 0.9) return 'Almost perfect! You\'ll get there soon! 🎉'
  if (score.value / MAX_ROUNDS < 0.9 && score.value / MAX_ROUNDS > 0.7) return 'You are getting there! Keep practicing!'
  return 'I\'m sorry, but do you even know your asanas? 😬'
})

const goToHomeHandler = () => {
  $reset()
  navigateTo('/')
}

const restartGameHandler = () => {
  $reset()
  nextQuestion()
  navigateTo('/guessing-rounds')
}
</script>