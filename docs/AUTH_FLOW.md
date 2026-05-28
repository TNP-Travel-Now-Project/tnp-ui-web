# Authentication Flow

## Tổng quan

Hệ thống auth gồm 3 phần:

1. **AuthProvider** — Context API cho auth state
2. **Login / Register mutations** — TanStack Query
3. **CSRF Protection** — Axios interceptor

---

## AuthProvider

### Vị trí

`src/shared/components/providers/AuthProvider/auth-provider.tsx`

### Interface

```typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}
```

### User type

```typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role?: string
}
```

### Provider chain

```
QueryProvider → AuthProvider → ThemeProvider
```

### Lifecycle

```
Mounted → useEffect → Kiểm tra localStorage('auth_token')
  ├── Có token → setIsLoading(false) [TODO: validate + fetch user]
  └── Không token → setIsLoading(false)
```

---

## Login Flow

```mermaid
sequenceDiagram
    participant User
    participant Page as /login page
    participant Modal as AuthModal
    participant Form as LoginForm
    participant FormHook as useLoginForm
    participant Mut as useLogin
    participant API as loginApi
    participant Axios as axiosClient
    participant CSRF as csrf.ts
    participant Backend as .NET Backend
    participant LS as localStorage
    
    User->>Page: Truy cập /login
    Page->>Modal: Render AuthModal(initialTab='login')
    User->>Form: Nhập email + password
    Form->>FormHook: handleSubmit
    FormHook->>FormHook: Zod validate
    
    alt Validation fail
        FormHook->>Form: setError
    else Validation pass
        FormHook->>Mut: mutateAsync({ email, password, rememberMe })
        Mut->>API: loginApi(data)
        API->>Axios: axiosClient.post('/auth/login', data)
        Axios->>CSRF: getCSRFToken()
        CSRF-->>Axios: Token từ cookie 'CSRF-TOKEN'
        Axios->>Backend: POST /auth/login + X-CSRF-TOKEN header
        
        alt Thành công (200)
            Backend-->>Axios: { data: { user, token } }
            Axios-->>API: response.data
            API-->>Mut: data
            Mut-->>FormHook: data
            FormHook->>FormHook: reset form
            FormHook->>Page: alert('Đăng nhập thành công')
            Page->>Modal: close
            Page->>Page: router.push('/order')
        else Thất bại (401, 422, 500)
            Backend-->>Axios: Error response
            Axios-->>Axios: ApiError.fromAxiosError()
            Axios-->>API: Promise.reject(ApiError)
            API-->>Mut: error
            Mut-->>FormHook: error
            FormHook->>Form: setFormError(error.message)
        end
    end
```

### Register Flow

Tương tự login, nhưng:
- POST `/auth/register` (⚠️ có trailing space trong code)
- Schema có thêm `fullName`, `confirmPassword`
- `register-form.tsx` import nhầm `useLoginForm`

---

## CSRF Protection

### Cơ chế

```typescript
// src/lib/csrf.ts
export function getCSRFToken(): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; CSRF-TOKEN=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';')[0] || null
  }
  return null
}
```

### Axios interceptor

```typescript
// src/lib/api-client.ts
axiosClient.interceptors.request.use((config) => {
  const csrf = getCSRFToken()
  if (csrf) {
    config.headers['X-CSRF-TOKEN'] = csrf
  }
  return config
})
```

---

## Auth Modal Component

### Vị trí

`src/features/auth/components/AuthModal/AuthModal.tsx`

### Cấu trúc

```
AuthModal
├── Gradient header
├── Tabs: Đăng nhập | Đăng ký
├── Tab content
│   ├── Đăng nhập → LoginForm
│   └── Đăng ký → RegisterForm
└── Footer
```

### Props

```typescript
interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  initialTab?: 'login' | 'register'
}
```

---

## Profile Modal

### Vị trí

`src/features/auth/components/ProfileModal/ProfileModal.tsx`

### Tabs

| Tab | Nội dung |
|---|---|
| Personal | Avatar upload, fullName, email, phone, date of birth |
| Security | Password change, 2FA toggle |
| Finance | Payment methods, banking info |
| Notifications | Notification preferences |
| Settings | Language, theme, region |

Dùng `framer-motion` cho tab transitions.

---

## Route Protection

### Cơ chế hiện tại

1. **Landing page** (`guest-landing.tsx`): `useGuestLanding()` hook kiểm tra `isAuthenticated`
   - Nếu đã login → redirect `/dashboard`
   - Nếu chưa → render landing content

2. **Protected routes**: Trong `(main)` route group — có sidebar, header, profile modal
   - Chưa có middleware guard

### TODO

- [ ] Thêm Next.js middleware cho route protection
- [ ] Validate token khi page refresh
- [ ] Fetch user info khi có token
- [ ] Add `not-found.tsx`

---

## Anti-patterns

### 1. Dùng `alert()` thay vì toast

```typescript
// ❌ Hiện tại
onSuccess: () => alert('Đăng nhập thành công')
onError: (e) => alert(e.message)

// ✅ Nên dùng
onSuccess: () => toast.success('Đăng nhập thành công')
onError: (e) => toast.error(e.message)
```

### 2. Import nhầm hook

```typescript
// ❌ register-form.tsx import sai
import { useLoginForm } from '../../hooks/login/useLoginForm'

// ✅ Phải import
import { useRegister } from '../../hooks/register/useRegister'
```

### 3. Trailing space trong endpoint

```typescript
// ❌ Sai
const url = '/auth/register '

// ✅ Đúng
const url = '/auth/register'
```
