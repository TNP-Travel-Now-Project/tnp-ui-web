export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  accessToken?: string | null
  refreshToken?: string | null
  expired: string
  userId: string
  email: string | null
  role: string | null
}

export type LoginPageProps = {
  onSuccess: () => void
}

export interface RegisterRequest {
  firstName?: string | null
  lastName?: string | null
  username: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber?: string | null
  dateOfBirth?: string | null
}

export interface RegisterResponse {
  userId: string
  fullName: string
  email: string
  createdAt: string
}

export type RegisterPageProps = {
  onSuccess: () => void
}
