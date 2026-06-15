# Data Flow

## Tổng quan luồng dữ liệu

Ứng dụng sử dụng **Client-Side Rendering (CSR)** với Next.js App Router.
Tất cả page đều là Client Component, data flow tuân theo pattern:

```
User Action → Page (Client) → Feature Component → Hook (useMutation) 
  → API Function → Axios Client → Backend → Response → UI Update
```

## Rendering Strategy

| Loại | Files | Chi tiết |
|---|---|---|
| Server Component | 3 files | `layout.tsx` (root), `page.tsx` (root), `loading.tsx` |
| Client Component | ~16 files | Tất cả page + layout còn lại |
| SSR | Không dùng | — |
| ISR | Không dùng | — |
| SSG | Mặc định | Next.js App Router mặc định static |

### Hậu quả của việc dùng 100% Client Components

- **Không tối ưu SEO**: Search engine không thấy nội dung thật
- **Bundle size lớn**: Toàn bộ component tree gửi xuống client
- **FCP/LCP chậm hơn**: So với Server Components
- **Không tận dụng RSC**: Next.js 16 mạnh về RSC nhưng chưa dùng

---

## UI Flow (Landing Page)

```mermaid
sequenceDiagram
    participant User
    participant LP as landing-page.tsx
    participant GL as GuestLanding
    participant Hook as useGuestLanding
    
    User->>LP: Truy cập /
    LP->>Hook: useGuestLanding() [auth check]
    Hook->>Hook: Kiểm tra isAuthenticated
    alt Đã đăng nhập
        Hook->>LP: redirect /dashboard
    else Chưa đăng nhập
        LP->>GL: Render GuestLanding
        GL->>Hook: useGuestLanding() [carousel] ⚠️ redundant
        Hook->>GL: carouselIndex, goToNext
    end
```

## UI Flow (Login)

```mermaid
sequenceDiagram
    participant User
    participant Page as Landing / /login page
    participant Modal as AuthModal
    participant Form as LoginForm
    participant FormHook as useLoginForm
    participant MutHook as useLogin
    participant API as postApiAuthLogin
    participant Axios as axiosClient
    participant Auth as AuthProvider
    participant Parent as Parent useEffect

    User->>Page: Click Đăng nhập / Truy cập /login
    Page->>Modal: Render AuthModal
    User->>Form: Nhập email + password
    Form->>FormHook: submit
    FormHook->>FormHook: validate Zod schema
    alt Validation lỗi
        FormHook->>Form: set form errors
    else OK
        FormHook->>MutHook: mutateAsync(values)
        MutHook->>API: postApiAuthLogin({ body, throwOnError: true })
        API->>Axios: POST /api/auth/login + CSRF token
        Axios->>Backend: HTTP request
        Backend-->>Axios: Response / Error
        Axios-->>API: data / ApiError
        API-->>MutHook: data / error
        MutHook-->>FormHook: data / throw error
        alt Thành công
            FormHook->>Auth: login(user, token)
            Auth->>Auth: setUser → isAuthenticated = true
            FormHook->>FormHook: toast.success()
            FormHook->>FormHook: onSuccess?.()
            Note over Auth,Parent: React re-render
            Parent->>Parent: useEffect → router.replace('/dashboard')
        else Thất bại (401)
            Note over FormHook: catch(error)
            FormHook->>FormHook: toast.error(error.message)
            Note over FormHook,Auth: KHÔNG gọi login → KHÔNG redirect
        end
    end
```

## UI Flow (Trip Detail)

```mermaid
sequenceDiagram
    participant User
    participant Page as /trips/[id] page
    participant TD as TripDetail
    participant TEM as TripExpenseModal
    
    User->>Page: Truy cập /trips/1
    Page->>Page: Lấy params.id
    Page->>Page: Import MOCK_DETAIL ⚠️ mock data
    Page->>TD: Render TripDetail(mockData)
    User->>TD: Click "Chi phí"
    TD->>TEM: Mở TripExpenseModal
    User->>TEM: Thao tác (thêm expense, xem settlement)
    TEM->>TEM: Update local state
    User->>TD: Close modal
```

## State Flow

```mermaid
graph TD
    subgraph "Client Components"
        UC["User Click/Input"]
        UC --> LH["Local State (useState)"]
        UC --> SH["Server State (TanStack Query mutation)"]
        UC --> AH["Auth State (Context API)"]
    end
    
    subgraph "Data Sources"
        LS["localStorage — token, theme"]
        MS["Mock data — MOCK_TRIPS, MOCK_DETAIL"]
        API["Backend API (chưa connected)"]
    end
    
    SH --> API
    AH --> LS
    LH --> MS
```

## Navigation Flow (Wizard)

```mermaid
graph LR
    START["/dashboard"] -->|"onStartPlanning"| NEW["/trips/new"]
    NEW -->|"onPlanning"| PLAN["/trips/new/planning"]
    PLAN -->|"onNext"| ITIN["/trips/new/itinerary"]
    
    DETAIL["/trips/[id]"] -->|"Edit planning"| DPLAN["/trips/[id]/planning"]
    DPLAN -->|"onNext"| DITIN["/trips/[id]/itinerary"]
```

Navigation dùng `useRouter().push()` — không dùng Next.js `<Link>` component.

## Khi nào dùng Client Component vs Server Component

### Nên dùng Client Component khi
- Cần hooks (`useState`, `useEffect`, `useRouter`)
- Cần event handlers (`onClick`, `onSubmit`)
- Cần browser APIs (`localStorage`, `document`)
- Cần context (`useAuth`, `useTheme`)

### Nên dùng Server Component khi
- Chỉ render JSX thuần (không hooks, không events)
- Cần SEO
- Không cần interactivity
- Fetch data từ API (RSC)

### Khuyến nghị
- Chuyển `AllTripsView`, `TripCard`, `WelcomeHero` sang Server Component
- Giữ `TripDetail`, `AuthModal`, `Forms` là Client Component
