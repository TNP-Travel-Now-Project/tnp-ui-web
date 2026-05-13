import axios from 'axios'
import { getCSRFToken } from '@/shared/lib/csrf'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const csrf = getCSRFToken()

  if (csrf) {
    config.headers['X-CSRF-TOKEN'] = csrf
  }

  return config
})

export default api
