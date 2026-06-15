# Conventions

## Naming Conventions

### Folders

| Pattern | Ví dụ | Ghi chú |
|---|---|---|
| `kebab-case` | `auth-provider`, `data-display`, `landing-page` | Thư mục chứa component |
| `PascalCase` | `AuthModal/`, `TripCard/` | Component folder (khi có index.ts) |
| `plural` | `hooks/`, `types/`, `components/` | Thư mục chứa nhiều file |

### Files

| Pattern | Ví dụ | Ghi chú |
|---|---|---|
| `PascalCase.tsx` | `Button.tsx`, `AuthModal.tsx` | Component file |
| `camelCase.ts` | `api-client.ts`, `useToast.ts` | Utility / hook / config |
| `kebab-case.ts` | `api-client.ts` | Utility |
| `*.api.ts` | `login.api.ts` | API function |
| `*.schema.ts` | `login.schema.ts` | Zod schema |
| `*.type.ts` | `landing.type.ts` | Types |
| `*.constant.ts` | `header.constant.ts` | Constants |

### Functions & Variables

| Pattern | Ví dụ |
|---|---|
| `camelCase` hàm | `getCSRFToken()`, `loginApi()` |
| `camelCase` biến | `formState`, `queryClient` |
| `PascalCase` type/interface | `ApiError`, `BaseResponse`, `TripDetailData` |
| `UPPER_SNAKE_CASE` constants | `API_ENDPOINTS`, `STORAGE_KEYS`, `HTTP_STATUS` |

### Hooks

| Pattern | Ví dụ |
|---|---|
| `use` prefix | `useToast`, `useLogin`, `useModalScrollLock` |
| Hook file: `use{Name}.ts` | `useLoginForm.ts`, `useGuestLanding.ts` |

---

## Folder Conventions

### Feature structure (recommended)

```
features/{feature}/
├── type.ts              # Types & interfaces
├── schemas/             # Zod validation schemas
├── api/                 # API functions
├── hooks/               # Custom hooks  
├── components/          # UI components
└── constants/           # Feature-specific constants (nếu có)
```

### Hiện tại, features không đồng nhất

| Feature | types | schemas | api | hooks | components |
|---|---|---|---|---|---|
| `auth` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `landing` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `dashboard` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `trip` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `user` | ✅ (stub) | ❌ | ❌ | ✅ (empty) | ❌ |

---

## State Convention

### Server state

```typescript
// Dùng TanStack Query
export function useTrips() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: fetchTrips,
  })
}
```

### Form state

```typescript
// Dùng react-hook-form
export function useTripForm() {
  return useForm<TripInput>({
    resolver: zodResolver(tripSchema),
    defaultValues: defaultTrip,
  })
}
```

### UI state

```typescript
// Dùng useState
const [isOpen, setIsOpen] = useState(false)
const [activeTab, setActiveTab] = useState<'overview' | 'expenses'>('overview')
```

### Auth state

```typescript
// Dùng Context API — useAuth()
const { user, isAuthenticated, login, logout } = useAuth()
```

---

## Component Convention

### Structure

```typescript
'use client'  // nếu cần interactivity

import { useState } from 'react'
// imports...

interface {ComponentName}Props {
  // props...
}

export function {ComponentName}({ prop1, prop2 }: {ComponentName}Props) {
  // state, hooks...
  
  // handlers...
  
  return (
    // JSX
  )
}
```

### Export rule

- Mỗi file export **1 default function component**
- Export type props đi kèm

---

## CSS Convention

### TailwindCSS utility classes

```tsx
<div className="flex items-center gap-2 p-4 bg-background text-foreground">
```

### CSS variables (globals.css)

```css
--green-teal-default: oklch(0.504 0.125 192.5);
--color-primary: var(--green-teal-80);
```

### cn() utility

```typescript
import { cn } from '@/lib/utils'

<div className={cn('base-class', condition && 'active-class', className)}>
```

---

## API Convention

### File naming

```typescript
// auth/api/login.api.ts
export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const response = await axiosClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, data)
  return response.data
}
```

### Error handling convention

```typescript
// Trong hook/component
try {
  const result = await apiFunction(data)
  // success
} catch (e) {
  if (e instanceof ApiError) {
    // structured handling
  }
}
```

---

## Quy tắc dependency direction

```
app/ → features/ → shared/ → lib/ → (only external libs)
```

- **app/** import features, shared
- **features/** import shared, lib
- **shared/** import lib
- **lib/** import only external (axios, clsx, etc.)
- **entities/** import nothing

---

## Anti-pattern checklist

| Anti-pattern | Ví dụ | Fix |
|---|---|---|
| Prop drilling | Dashboard → DashboardView → Card | Context hoặc composition |
| Busy component | TripDetail 4300 dòng | Split thành sub-components |
| Duplicate mock data | Mock trips trong component + page | Centralize trong mock-data.ts |
| Business logic trong UI | API call trong LoginForm | Dùng hook |
| alert() thay vì toast | useLogin, useRegister | Dùng useToast |
| Inconsistent convention | trip không có schemas/ api/ | Thêm vào |
