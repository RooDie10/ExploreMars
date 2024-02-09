import { DocumentData } from 'firebase/firestore'

export type User = {
  name?: string
  email: string
  password: string
  admin?: boolean
}

export type Status = {
  errors: { field: string | null; message: string }[] | []
  data?: { id: string; name: string; level: string | null } | null
}

export type Prop = {
  isUserAuth: boolean
  userData: { id: string; name: string; level: string | null } | null
  user?: User | DocumentData | false
  level?: Level
  levels?: Level[]
  state?: number
  users?: User[]
}

export type LevelData = {
  type: string
  description: string
  included: [string]
  price: number
}

export type Level = {
  id: string
  data: LevelData | DocumentData
} | null
