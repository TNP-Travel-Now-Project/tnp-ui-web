import { ApiError } from '@/lib/api-error'
import { config } from '@/lib/config'
import { getCSRFToken } from '@/lib/csrf'
import { client } from '@/shared/api/generated/client.gen'

client.setConfig({
  baseURL: config.apiBaseOrigin,
  throwOnError: true,
})

client.instance.interceptors.request.use((reqConfig) => {
  const csrf = getCSRFToken()

  if (csrf) {
    reqConfig.headers['X-CSRF-TOKEN'] = csrf
  }

  return reqConfig
})

client.instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(ApiError.fromAxiosError(error)),
)

export { postApiAuthLogin } from '@/shared/api/generated/sdk.gen'
export type {
  LoginCommand,
  LoginResponse,
} from '@/shared/api/generated/types.gen'
export { client }
