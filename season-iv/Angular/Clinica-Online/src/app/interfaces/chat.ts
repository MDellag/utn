import { TypeUser } from './users'

export interface Message {
  message: string
  email: string
  name: string
  date: number
  type: TypeUser | ''
}
