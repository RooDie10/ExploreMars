export type User = {
  name?: string
  email: string
  password: string,
  admin?: boolean
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
  state?: any
  users?: any
}
