export type LoginRequest = {
  email: string
  password: string
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

export type RegisterRequest = {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  dateOfBirth: string
}

export type RegisterResponse = {
  userId: string
  fullName: string
  email: string
  createdAt: string
}

export type RegisterPageProps = {
  onSuccess: () => void
}
