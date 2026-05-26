export interface ContactInput {
  name: string
  email: string
  description: string
}

export interface ContactOutput {
  id: string
  name: string
  email: string
  description: string
  createdAt: string
}
