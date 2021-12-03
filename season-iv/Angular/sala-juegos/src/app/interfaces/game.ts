export interface Game {
  id?: string
  score?: number
  game?: TypeGame
  updatedAt?: number
}

export interface TriviaParams {
  amount: string
  type: QuestionType
  difficulty: Difficulty
}

export enum TypeGame {
  HIGHER_LOWER = 'HIGHER_LOWER',
  AHORCADO = 'AHORCADO',
  PREGUNTADOS = 'PREGUNTADOS',
  OWN_GAME = 'OWN_GAME',
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum QuestionType {
  TRUE_FALSE = 'boolean',
  MULTIPLE_CHOISE = 'multiple',
}
