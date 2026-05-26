export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  expired: string
  userId: string
  email: string
  role: string
}

export type LoginPageProps = {
  onSuccess: () => void
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  dateOfBirth: string
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
