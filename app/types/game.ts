export type GameState = 'idle' | 'showingQuestion' | 'feedback' | 'gameOver'

export interface RoundOption {
  id: string
  name: string
  image: string
}