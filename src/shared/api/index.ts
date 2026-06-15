import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { ApiError } from '@/lib/api-error'
import { config } from '@/lib/config'
import { getCSRFToken } from '@/lib/csrf'
import { client } from '@/shared/api/generated/client.gen'
import { useAuthStore } from '@/shared/stores/auth-store'

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

client.setConfig({
  baseURL: config.apiBaseOrigin,
  throwOnError: true,
})

/* ============================================================
 *  1. Queue — lưu các request bị 401 đang chờ refresh token
 *
 *  Khi nhiều request cùng fail 401, thay vì gọi N lần refresh,
 *  ta queue N-1 request lại và chỉ gọi 1 lần refresh duy nhất.
 *  Sau khi có token mới, flush toàn bộ queue.
 * ============================================================ */
interface FailedRequest {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}

let failedQueue: FailedRequest[] = []
let isRefreshing = false

function processQueue(error: unknown, token: string | null = null): void {
  const queue = [...failedQueue]
  failedQueue = []

  for (const { resolve, reject } of queue) {
    if (error) {
      reject(error)
    } else {
      resolve(token!)
    }
  }
}

/* ============================================================
 *  2. Shared refresh — dùng chung cho cả hook + interceptor
 *
 *  Đây là function TRUNG TÂM của toàn bộ cơ chế retry.
 *  Cả SilentRefresh hook (useAuth.ts) và Response interceptor
 *  đều gọi function này khi cần refresh token.
 *
 *  Lợi ích:
 *   - Không race condition (isRefreshing guard)
 *   - Queue thống nhất (processQueue)
 *   - Trạng thái Zustand đồng bộ (setRefreshing / setToken / logout)
 * ============================================================ */
function getRefreshEndpoint(): string {
  return `${config.apiBaseUrl}/auth/refresh-token`
}

function callRefreshApi(): Promise<string> {
  return axios
    .post<{ accessToken: string }>(
      getRefreshEndpoint(),
      {},
      { withCredentials: true },
    )
    .then((res) => res.data.accessToken)
}

async function performRefresh(): Promise<string> {
  // ── Đang refresh → queue request ──
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject })
    })
  }

  // ── Chưa refresh → bắt đầu ──
  isRefreshing = true
  useAuthStore.getState().setRefreshing(true)

  try {
    const newToken = await callRefreshApi()

    useAuthStore.getState().setToken(newToken)
    processQueue(null, newToken)

    return newToken
  } catch (error) {
    processQueue(error, null)
    useAuthStore.getState().logout()
    throw error
  } finally {
    isRefreshing = false
    useAuthStore.getState().setRefreshing(false)
  }
}

/* ============================================================
 *  3. Request interceptor — gắn Bearer token + CSRF
 *
 *  Chạy TRƯỚC mỗi request:
 *   - Đọc token từ Zustand store (RAM)
 *   - Gắn Authorization: Bearer <token>
 *   - Gắn X-CSRF-TOKEN chỉ cho POST/PUT/PATCH/DELETE
 *
 *  Ngoại lệ: không gắn Bearer cho /refresh-token
 *  (vì endpoint này dùng cookie, không cần token)
 * ============================================================ */
client.instance.interceptors.request.use((reqConfig) => {
  const authStore = useAuthStore.getState()
  const url = reqConfig.url ?? ''

  if (authStore.token && !url.includes('/refresh-token')) {
    reqConfig.headers.Authorization = `Bearer ${authStore.token}`
  }

  const method = reqConfig.method?.toLowerCase() ?? ''
  const isMutating = ['post', 'put', 'patch', 'delete'].includes(method)

  if (isMutating) {
    const csrf = getCSRFToken()
    if (csrf) {
      reqConfig.headers['X-CSRF-TOKEN'] = csrf
    }
  }

  return reqConfig
})

/* ============================================================
 *  4. Response interceptor — xử lý 401 + retry queue
 *
 *  Ví dụ case thực tế:
 *
 *  ─── CASE 1: GET /transactions (401) ───
 *    User đang xem danh sách giao dịch.
 *    Access token HẾT HẠN (15 phút).
 *    ↓
 *    interceptor nhận 401
 *    ↓
 *    isRefreshing = false → performRefresh()
 *    ↓
 *    POST /refresh-token → BE cấp token mới (cookie tự gửi)
 *    ↓
 *    processQueue → resolve queue rỗng (không có)
 *    ↓
 *    setToken(newToken) → Zustand
 *    ↓
 *    Retry GET /transactions với Bearer <newToken>
 *    ↓
 *    200 OK → user thấy dữ liệu
 *    ↓
 *    TOÀN BỘ TRONG SUỐT (user không biết)
 *
 *  ─── CASE 2: GET /trips + GET /profile cùng lúc (401) ───
 *    Dashboard mount → 2 request song song.
 *    Cả 2 đều hết hạn.
 *    ↓
 *    Request A (GET /trips) → 401
 *      → isRefreshing = false → performRefresh()
 *      → ĐÁNH DẤU isRefreshing = true
 *    ↓
 *    Request B (GET /profile) → 401
 *      → isRefreshing = true → QUEUE
 *      → Promise B treo
 *    ↓
 *    performRefresh() xong → processQueue(null, newToken)
 *      → Promise B resolve(newToken)
 *      → Retry GET /profile với Bearer <newToken>
 *    ↓
 *    Request A retry GET /trips với Bearer <newToken>
 *    ↓
 *    Cả 2 đều 200 → dashboard hiển thị đầy đủ
 *
 *  ─── CASE 3: Refresh token hết hạn (30 ngày) ───
 *    User không dùng app 31 ngày, quay lại.
 *    Token đã hết hạn từ lâu.
 *    ↓
 *    GET /trips → 401
 *    performRefresh() → POST /refresh-token
 *    ↓
 *    BE: cookie refreshToken hết hạn → 400
 *    ↓
 *    catch → processQueue(error) → queue reject hết
 *    ↓
 *    logout() → Zustand: token=null, user=null
 *    ↓
 *    window.location.href = '/login' → redirect cứng
 *    ↓
 *    User thấy trang login → phải login lại
 * ============================================================ */
client.instance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<unknown>) => {
    const originalRequest = error.config as RetryConfig | undefined

    // ── Chỉ xử lý 401 có config ──
    if (
      !originalRequest ||
      error.response?.status !== 401
    ) {
      return Promise.reject(ApiError.fromAxiosError(error))
    }

    // ── Không retry chính endpoint refresh (tránh vòng lặp vô hạn) ──
    if (originalRequest.url?.includes('/refresh-token')) {
      return Promise.reject(ApiError.fromAxiosError(error))
    }

    // ── Đã retry 1 lần rồi → không retry nữa ──
    if (originalRequest._retry) {
      return Promise.reject(ApiError.fromAxiosError(error))
    }

    originalRequest._retry = true

    try {
      const newToken = await performRefresh()

      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return client.instance(originalRequest)
    } catch {
      // performRefresh đã logout + redirect
      return Promise.reject(ApiError.fromAxiosError(error))
    }
  },
)

export { postApiAuthLogin } from '@/shared/api/generated/sdk.gen'
export type {
  LoginCommand,
  LoginResponse,
} from '@/shared/api/generated/types.gen'
export { client, performRefresh, getRefreshEndpoint, callRefreshApi }
