export type User = {
  name?: string
  email: string
  password: string
}

export type Status = {
  status: boolean
  message: string
  field: string | null
  data: object | null
}
