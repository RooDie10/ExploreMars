import { isUserAuth } from '../routing/middlewares/middlewares'
export type User = {
  name?: string
  email: string
  password: string
}

export type Status = {
  status: boolean
  message: string
  field: string | null
  data: { id: string; name: string; level: string | null } | null
}

export type Prop = {
  isUserAuth: boolean
  userData: { key: any } | null
  user?: any
  level?: any
  levels?: any
}
