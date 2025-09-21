<template>
  <UCard>
    <template #header>
      <UButton variant="ghost" icon="i-heroicons-home" @click="navigateTo('/')">Go back to home</UButton>
      <h2 class="text-xl font-bold text-center">Guess the asana name in sanskrit</h2>
    </template>
    <div class="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-4">
      <NuxtImg
        :src="optionToGuess?.image"
        alt="asana"
        width="600"
        loading="lazy"
        height="400"
        format="webp"
      />
    </div>
    <template #footer>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <UButton
            v-for="option in options"
            :key="option.id"
            :icon="getButtonIcon(option)"
            :color="getButtonColor(option)"
            variant="outline"
            class="rounded-xl"
            :disabled="feedbackDisplayed"
            :class="{
              'bg-green-100': feedbackDisplayed && option.id === optionToGuess?.id,
              'border-2': feedbackDisplayed && option.id === selectedOption?.id,
            }"
            @click="handleOptionClick(option)">
            {{ option.name }}
          </UButton>
        </div>
        <UButton
          v-if="gameState === 'feedback'"
          variant="ghost"
          icon="i-heroicons-arrow-right-circle"
          class="w-fit mx-auto"
          @click="handleNextQuestionClick"
        >
          Next Asana
        </UButton>
        <div class="flex justify-between">
          <div> Score: {{ score }} </div>
          <div> Round: {{ round }} / {{ MAX_ROUNDS }} </div>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { RoundOption } from '~/types/game'
import { MAX_ROUNDS } from '~/constants/game'

definePageMeta({
  middleware: ['check-game']
})

const gameStore = useGameStore()
const {  score, round, optionToGuess, options, gameState } = storeToRefs(gameStore)

const selectedOption = ref<RoundOption | null>(null)
const feedbackDisplayed = computed(() => gameState.value === 'feedback')

const { checkAnswer } = gameStore
const handleOptionClick = (option: RoundOption) => {
  selectedOption.value = option
  checkAnswer(option)
}

const { nextQuestion } = gameStore
const handleNextQuestionClick = () => {
  selectedOption.value = null
  nextQuestion()
}

const getButtonColor = (option: RoundOption) => {
  if (!feedbackDisplayed.value) return 'black'
  if (option.id === optionToGuess.value?.id) return 'green'
  if (option.id === selectedOption.value?.id) return 'red'
  return 'black'
}

const getButtonIcon = (option: RoundOption) => {
  if (!feedbackDisplayed.value) return undefined
  if (option.id === optionToGuess.value?.id) return 'i-heroicons-check-circle'
  if (option.id === selectedOption.value?.id) return 'i-heroicons-x-circle'
  return undefined
}

const { isGameOver } = storeToRefs(gameStore)
watch(isGameOver, (newVal) => {
  if (newVal) {
    navigateTo('/game-over')
  }
})

</script>
