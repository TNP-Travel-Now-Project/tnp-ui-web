# Codebase Rules

## Import Rules

### Order

```typescript
// 1. Thư viện ngoài
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

// 2. App routes
// (hiếm khi import từ app/)

// 3. Features
import { AuthModal } from '@/features/auth/components'

// 4. Shared
import { Button } from '@/shared/components/common'
import { useToast } from '@/shared/hooks/useToast'
import type { Trip } from '@/shared/types'

// 5. Lib
import { axiosClient } from '@/lib/api-client'
import { cn } from '@/lib/utils'
```

### Quy tắc

- Không import từ `@/features/*` trong shared
- Không import feature A từ feature B
- Trong feature, ưu tiên relative import cho internal files

---

## File Structure Rules

### Feature file naming

```
features/{feature}/
├── type.ts                  # Types & interfaces
├── schemas/                 # Zod schemas
│   └── {name}.schema.ts
├── api/                     # API functions
│   └── {name}.api.ts
├── hooks/                   # Custom hooks
│   └── use{Name}.ts
└── components/              # UI components
    └── {ComponentName}/
        ├── {ComponentName}.tsx
        └── index.ts
```

### Barrel exports

```typescript
// features/auth/components/index.ts
export { AuthModal } from './AuthModal'
export { LoginForm } from './login/login-form'
export { RegisterForm } from './register/register-form'
export { ProfileModal } from './ProfileModal'
```

---

## Component Rules

### 1. Client vs Server

```typescript
// ❌ Không cần use client
export function StaticList({ items }: { items: string[] }) {
  return items.map(item => <li key={item}>{item}</li>)
}

// ✅ Cần use client
'use client'
export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### 2. Props interface

```typescript
// ✅ Định nghĩa props trong cùng file
interface DashboardViewProps {
  trip: Trip[]
  stats: SummaryStat[]
  onViewTrip: (id: string) => void
  onStartPlanning: () => void
}

export function DashboardView({ trip, stats, onViewTrip, onStartPlanning }: DashboardViewProps) {
  // ...
}
```

### 3. Conditional rendering

```typescript
// ✅ Loading + Error + Empty + Data pattern
export function TripList() {
  const { data, isLoading, error } = useQuery(...)
  
  if (isLoading) return <Loading />
  if (error) return <Alert variant="destructive" message={error.message} />
  if (!data?.length) return <EmptyState message="Chưa có chuyến đi nào" />
  
  return data.map(trip => <TripCard key={trip.id} trip={trip} />)
}
```

---

## Hook Rules

### 1. useMutation pattern

```typescript
export function useLogin() {
  const { showToast } = useToast()
  
  return useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      showToast('success', 'Đăng nhập thành công')
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        showToast('error', error.message)
      }
    },
  })
}
```

### 2. Form hook pattern

```typescript
export function useLoginForm() {
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  
  const { mutateAsync, isPending, error } = useLogin()
  
  const onSubmit = async (values: LoginRequest) => {
    try {
      await mutateAsync(values)
      form.reset()
    } catch (e) {
      if (e instanceof ApiError && e.isValidationError) {
        // Set field errors
      }
    }
  }
  
  return {
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
    formError: error instanceof ApiError ? error.message : undefined,
    ...form,
  }
}
```

---

## TypeScript Rules

### Strict mode

`tsconfig.json` đã bật `strict: true`

### Prefer type over interface (cho union types)

```typescript
// ✅
type Status = 'active' | 'planning' | 'completed'

// ✅ Interface cho object
interface Trip {
  id: string
  title: string
  status: Status
}
```

### Generics

```typescript
// ✅ Response types có generic
interface BaseResponse<T = unknown> {
  succeeded: boolean
  data: T | null
}
```

---

## Biome Rules

```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "all",
      "semicolons": "asNeeded"
    }
  }
}
```

- Dấu nháy đơn (`'`) cho strings
- Trailing commas
- Không dùng semicolons
- `organizeImports` tự động khi save

---

## Error Handling Rules

```typescript
// ✅ Use ApiError
try {
  await apiCall()
} catch (e) {
  if (e instanceof ApiError) {
    switch (e.status) {
      case 401: // redirect login
      case 422: // set field errors
      default:  // show toast
    }
  }
}

// ❌ Không dùng
try {
  await apiCall()
} catch (e: any) {
  console.log(e.message)
}
```
