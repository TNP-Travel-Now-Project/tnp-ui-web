'use client'

import { useEffect } from 'react'
import axios from 'axios'

import { config } from '@/lib/config'
import { performRefresh } from '@/shared/api'
import { useAuthStore } from '@/shared/stores/auth-store'
import type { User } from '@/shared/stores/auth-store'

/**
 * mapUserFromMeResponse
 *
 * Chuyển response từ GET /api/auth/me (MeResponse của BE)
 * thành User interface của Zustand store.
 *
 * MeResponse từ BE:
 *   { id, email, userName, firstName, lastName, roles, ... }
 *
 * User trong Zustand:
 *   { id, email, name, avatar?, role? }
 */
function mapUserFromMeResponse(data: {
  id?: string
  email?: string | null
  userName?: string | null
  firstName?: string | null
  lastName?: string | null
  roles?: Array<string> | null
  avatar?: string | null
}): User {
  const firstName = data.firstName ?? data.userName ?? ''
  const lastName = data.lastName ?? ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ')

  return {
    id: data.id ?? '',
    email: data.email ?? '',
    name: fullName || data.email || '',
    role: data.roles?.[0] ?? '',
    avatar: data.avatar ?? undefined,
  }
}

/**
 * useAuth — Silent Refresh Hook
 *
 * Chạy 1 lần duy nhất khi component mount (App layout).
 * Nếu Zustand chưa có token (F5 / tab mới):
 *   1. Gọi /refresh-token → lấy access token mới
 *   2. Gọi /auth/me → lấy user profile
 *   3. Lưu cả vào Zustand store
 *
 * Nếu ĐÃ có token (SPA navigation, không F5):
 *   → Bỏ qua, isLoading = false ngay lập tức
 *
 * Shared function performRefresh() từ api/index.ts đảm bảo:
 *   - Không race condition với interceptor
 *   - Queue thống nhất
 *   - isRefreshing flag đồng bộ
 *
 * Luồng chi tiết:
 *
 *   [Mount app]
 *       │
 *       ├── token có sẵn? (SPA navigate)
 *       │   └── YES → setLoading(false) → render ngay
 *       │
 *       └── token null? (F5 / tab mới)
 *           └── YES → performRefresh()
 *               │
 *               ├── ── refresh token hết hạn ──
 *               │   └── performRefresh() throw error
 *               │       → logout (giữ nguyên)
 *               │       → setLoading(false) → render login
 *               │
 *               └── ── refresh token OK ──
 *                   ├── GET /api/auth/me (Authorization: Bearer <newToken>)
 *                   ├── 200 → setUser(profile) → setLoading(false)
 *                   ├── 401 → interceptor handle → retry
 *                   └── 500 → setLoading(false) → render với user null
 */
export function useAuth() {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)
  const isRefreshing = useAuthStore((s) => s.isRefreshing)
  const setUser = useAuthStore((s) => s.setUser)
  const setLoading = useAuthStore((s) => s.setLoading)

  useEffect(() => {
    let cancelled = false

    async function hydrate() {
      // ── Đã có token (SPA navigate) → không cần refresh ──
      if (token) {
        setLoading(false)
        return
      }

      // ── Chưa có token (F5) → silent refresh ──
      try {
        const newToken = await performRefresh()

        if (cancelled) return

        // ── Có token → fetch user profile ──
        const { data: meData } = await axios.get(`${config.apiBaseUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${newToken}` },
          withCredentials: true,
        })

        if (cancelled) return

        const profile = mapUserFromMeResponse(meData)
        setUser(profile)
      } catch {
        // Refresh thất bại → performRefresh đã logout()
        // User profile không có → giữ null
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    hydrate()

    return () => {
      cancelled = true
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    token,
    isLoading,
    isRefreshing,
    isAuthenticated: !!user,
  }
}
