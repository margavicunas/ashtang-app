import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { GameState, RoundOption } from '~/types/game'
import { MAX_ROUNDS } from '~/constants/game'
import { useOptionsBuilder } from '~/composables/useOptionsBuilder'


export const useGameStore = defineStore('game', () => {
  const gameState = ref<GameState>('idle')
  const usedOptionIds = ref<string[]>([])

  const optionToGuess = ref<RoundOption | null>(null)
  const options = ref<RoundOption[]>([])

  const score = ref(0)
  const round = ref(0)

  const startGame = () => {
    score.value = 0
    round.value = 0
    nextQuestion()
  }

  const { getRandomOption, shuffleOptions, generateWrongOptions } = useOptionsBuilder()

  const nextQuestion = () => {
    if (round.value === MAX_ROUNDS) {
      gameState.value = 'gameOver'
      return
    }

    round.value++
    const randomOption = getRandomOption(usedOptionIds.value)
    optionToGuess.value = randomOption
    usedOptionIds.value.push(randomOption.id)
    const wrongOptions = generateWrongOptions(randomOption.id)

    options.value = shuffleOptions([optionToGuess.value, ...wrongOptions])
    gameState.value = 'showingQuestion'
  }

  const checkAnswer = (choice: RoundOption) => {
    if (choice.id === optionToGuess.value?.id) {
      score.value++
    }

    gameState.value = 'feedback'
  }

  const isGameOver = computed(() => gameState.value === 'gameOver')

  const $reset = () => {
    gameState.value = 'idle'
    optionToGuess.value = null
    options.value = []
    score.value = 0
    round.value = 0
  }

  return {
    gameState,
    optionToGuess,
    options,
    score,
    round,
    isGameOver,
    startGame,
    nextQuestion,
    checkAnswer,
    $reset,
  }
})
