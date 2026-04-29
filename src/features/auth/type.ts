export type LoginRequest = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponse = {
  expired: string
  userId: string
  email: string
  role: string
}

export type LoginPageProps = {
  onSuccess: () => void
}
