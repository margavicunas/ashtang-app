import asanaData from '@/assets/data/asanas.json'
import type { RoundOption } from '@/types/game'
import type { AsanaData } from '@/types/asanaData'
import { SIMILAR_OPTIONS_COUNT, TOTAL_WRONG_OPTIONS_COUNT } from '@/constants/game'

export const useOptionsBuilder = () => {
  const optionsList = asanaData

  const getRandomOption = (alreadyUsedIds: string[]): RoundOption => {
    const filteredOptions = optionsList.filter(p => !alreadyUsedIds.includes(p.id))

    const randomAsana = filteredOptions[
      Math.floor(Math.random() * filteredOptions.length)
    ]
    if (!randomAsana) {
      throw new Error('No asana found')
    }
    return convertAsanaDataToRoundOption(randomAsana)
  }

  const shuffleOptions = (options: RoundOption[]) => {
    return options.sort(() => Math.random() - 0.5)
  }

  const generateWrongOptions = (correctOptionId: string): RoundOption[] => {
    const correctAsana = optionsList.find(p => p.id === correctOptionId)
    if (!correctAsana) return []

    const similarOptions = optionsList
      .filter(p => correctAsana.similar_asanas.includes(p.id))
      .slice(0, SIMILAR_OPTIONS_COUNT)
      .map(p => convertAsanaDataToRoundOption(p))

    const remainingCount = TOTAL_WRONG_OPTIONS_COUNT - similarOptions.length
    const remainingOptions = optionsList
      .filter(p =>
        p.id !== correctOptionId &&
        !correctAsana.similar_asanas.includes(p.id)
      )
      .slice(0, remainingCount)
      .map(p => convertAsanaDataToRoundOption(p))

    return [...similarOptions, ...remainingOptions]
  }

  const convertAsanaDataToRoundOption = (asanaData: AsanaData): RoundOption => {
    return {
      id: asanaData.id,
      name: asanaData.name,
      image: asanaData.downloaded_img_path,
    }
  }

  return {
    getRandomOption,
    shuffleOptions,
    generateWrongOptions,
  }
}