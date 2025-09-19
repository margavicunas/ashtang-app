export default defineNuxtRouteMiddleware(() => {
  const gameStore = useGameStore()
  const { optionToGuess } = gameStore
  if (optionToGuess === null) {
    return navigateTo('/')
  }
})
