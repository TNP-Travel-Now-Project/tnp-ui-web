# Onboarding Guide

## Môi trường yêu cầu

- **Node.js** >= 20
- **pnpm** >= 9
- **Git**
- **VS Code** (khuyến nghị)

---

## Setup

```bash
# Clone repo
git clone <repo-url>
cd tnp-ui-web

# Install dependencies
pnpm install

# Tạo environment file
# Copy từ .env.local.example hoặc liên hệ PM để có config
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Optional
NEXT_PUBLIC_APP_NAME=TNP UI
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## Chạy dev

```bash
pnpm dev
# → http://localhost:3000
# → Debugger: ws://localhost:9229 (Chrome DevTools)
```

### Các port

| Port | Service |
|---|---|
| 3000 | Next.js dev server |
| 9229 | Node inspector (debug) |

---

## Project structure overview

```
src/
├── app/          # Router + Layouts
├── features/     # Business logic
├── shared/       # Reusable code
├── lib/          # Infrastructure
└── entities/     # Domain models
```

### 5 features cần biết

| Feature | Mô tả | File chính |
|---|---|---|
| auth | Login, Register, Profile | `AuthModal`, `LoginForm`, `ProfileModal` |
| landing | Marketing pages | `GuestLanding`, `AboutUs`, `Contact` |
| dashboard | Tổng quan | `DashboardView`, `WelcomeHero` |
| trip | Quản lý chuyến đi | `TripDetail`, `TripExpenseModal` |
| user | User entity | `type.ts` (stub) |

---

## Commands

```bash
pnpm dev          # Dev server (có debug)
pnpm build        # Production build
pnpm start        # Run production
pnpm lint         # Biome check
pnpm format       # Auto format
pnpm test         # Vitest
```

---

## Quy trình thêm feature mới

### 1. Tạo cấu trúc thư mục

```bash
src/features/{new-feature}/
├── type.ts                 # Types
├── schemas/                # Zod schemas (nếu có form)
│   └── {name}.schema.ts
├── api/                    # API calls
│   └── {name}.api.ts
├── hooks/                  # Custom hooks
│   └── use{Name}.ts
├── components/             # UI
│   └── {ComponentName}/
│       ├── {ComponentName}.tsx
│       └── index.ts
└── index.ts                # Barrel export
```

### 2. Tạo route trong app

```typescript
// src/app/(main)/{new-feature}/page.tsx
'use client'
import { NewFeature } from '@/features/new-feature/components'
// ...
```

### 3. Export từ shared nếu cần

```typescript
// Nếu component dùng ở 2+ features → move lên shared/components/
```

---

## Coding workflow

1. **Pull latest**: `git pull`
2. **Create branch**: `git checkout -b feature/{name}`
3. **Code**: Follow conventions trong `docs/CONVENTIONS.md`
4. **Lint**: `pnpm lint`
5. **Build**: `pnpm build` (kiểm tra lỗi TypeScript)
6. **Commit**: `git commit -m "feat: mô tả"`
7. **Push**: `git push -u origin feature/{name}`

---

## Debug

### Node Inspector

Port 9229 đã được bật qua flag `--inspect=9229` trong script `pnpm dev`.

Cách dùng:
1. Mở Chrome → `chrome://inspect`
2. Click "Open dedicated DevTools for Node"
3. Tab Sources → code sẽ hiện để đặt breakpoint

### React DevTools

```bash
# Đã cài @tanstack/react-query-devtools
# Mở bằng: window.__REACT_DEVTOOLS_GLOBAL_HOOK__
```

---

## Các pattern cần biết

### Form pattern

```typescript
// 1. Zod schema
export const formSchema = z.object({ ... })

// 2. react-hook-form
export function useFormFeature() {
  const form = useForm({ resolver: zodResolver(formSchema), defaultValues: {...} })
  const mutation = useMutation({ mutationFn: apiCall })
  return { ...form, onSubmit: form.handleSubmit((d) => mutation.mutateAsync(d)) }
}

// 3. Component
export function FeatureForm() {
  const { onSubmit, register, errors } = useFormFeature()
  return <form onSubmit={onSubmit}>...</form>
}
```

### API pattern

```typescript
export async function fetchData(): Promise<ResponseType> {
  const response = await axiosClient.get<BaseResponse<ResponseType>>('/endpoint')
  return response.data
}
```

### Error handling pattern

```typescript
try {
  await action()
} catch (e) {
  if (e instanceof ApiError) {
    // Xử lý theo status code
  }
}
```

---

## Tài liệu tham khảo

Trong `docs/`:

- `ARCHITECTURE.md` — Kiến trúc tổng thể
- `FOLDER_STRUCTURE.md` — Ý nghĩa từng thư mục
- `CONVENTIONS.md` — Coding conventions
- `CODEBASE_RULES.md` — Quy tắc code
- `API_INTEGRATION.md` — Cách dùng API
- `REFACTOR_NOTES.md` — Technical debt

---

## FAQs

**Q: Tôi cần thêm shared component mới?**

A: Tạo trong `src/shared/components/{category}/{ComponentName}/`, export từ `index.ts`. Nếu chỉ dùng trong 1 feature, để trong feature.

**Q: Tôi muốn gọi API từ component?**

A: Không gọi API trực tiếp trong component. Tạo hook với `useMutation`/`useQuery`, rồi dùng hook trong component.

**Q: Khi nào dùng Server Component?**

A: Khi component không cần hooks, event handlers, browser APIs, context.

**Q: Tại sao có mock data?**

A: Dự án đang trong giai đoạn MVP, chờ backend API hoàn thiện. Khi có API, thay thế bằng real hooks.
