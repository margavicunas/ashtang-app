import asanaData from '@/assets/data/asanas.json'
import type { RoundOption } from '@/types/game'

export const useOptionsBuilder = () => {
  const options = asanaData

  const getRandomOption = (alreadyUsedIds: string[]): RoundOption => {
    const filteredOptions = options.filter(p => !alreadyUsedIds.includes(p.id))

    const randomAsana = filteredOptions[
      Math.floor(Math.random() * filteredOptions.length)
    ] as RoundOption
    return randomAsana
  }

  const shuffleOptions = (options: RoundOption[]) => {
    return options.sort(() => Math.random() - 0.5)
  }

  const generateWrongOptions = (correctOptionId: string): RoundOption[] => {
    return options
      .filter(p => p.id !== correctOptionId)
      .slice(0, 3)
  }

  return {
    getRandomOption,
    shuffleOptions,
    generateWrongOptions,
  }
}