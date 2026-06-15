# Cấu trúc thư mục

## Tổng quan

```
src/
├── app/            # Next.js App Router
├── entities/       # Domain entities thuần
├── features/       # Business logic modules
├── lib/            # Shared infrastructure
└── shared/         # Reusable UI + logic
```

---

## `src/app/` — App Router

### Mục đích
Định tuyến, layouts, providers, error/loading boundaries.

### Cấu trúc

```
app/
├── (auth)/              # Route group: unauthenticated
│   ├── login/page.tsx   #   /login
│   ├── register/page.tsx#   /register
│   └── order/page.tsx   #   /order (placeholder)
├── (landing)/           # Route group: public marketing
│   ├── layout.tsx       #   LandingLayout wrapper
│   ├── about/page.tsx   #   /about
│   └── contact/page.tsx #   /contact
├── (main)/              # Route group: authenticated app
│   ├── layout.tsx       #   Sidebar + Header + FAB
│   ├── error.tsx        #   Error boundary
│   ├── loading.tsx      #   Loading spinner
│   ├── dashboard/page.tsx
│   └── trips/
│       ├── page.tsx           # /trips
│       ├── new/page.tsx       # /trips/new
│       ├── new/planning/      # /trips/new/planning
│       ├── new/itinerary/     # /trips/new/itinerary
│       ├── [id]/page.tsx      # /trips/[id]
│       ├── [id]/planning/     # /trips/[id]/planning
│       └── [id]/itinerary/    # /trips/[id]/itinerary
├── (test)/              # Route group: dev playground
│   └── component/page.tsx#   /component
├── globals.css          # Tailwind + design tokens
├── layout.tsx           # Root layout (Server Component)
├── page.tsx             # Root page → LandingPage (Server Component)
└── provider.tsx         # Client providers wrapper
```

### Trách nhiệm
- Layout cho từng route group (`(main)/layout.tsx` có sidebar, header, tabs)
- Error boundary (`(main)/error.tsx`)
- Loading state (`(main)/loading.tsx`)
- Page components mỏng — chỉ import từ features và pass props

### Tương tác
- Import từ `@/features/*` và `@/shared/*`
- Không chứa business logic

### Khi nào nên chỉnh sửa
- Thêm route mới → tạo thư mục trong route group phù hợp
- Sửa layout chung → sửa `layout.tsx` của route group
- Thêm provider → sửa `provider.tsx`
- Sửa global styles → `globals.css`

### Không nên đặt ở đây
- Business logic component
- API call logic
- Schema validation
- Feature-specific code

---

## `src/features/` — Business Logic Modules

### Mục đích
Chứa toàn bộ logic nghiệp vụ, chia theo domain.

### Cấu trúc

```
features/
├── auth/            # Authentication feature
│   ├── api/         #   API functions (login.api.ts, register.api.ts)
│   ├── schemas/     #   Zod validation schemas
│   ├── hooks/       #   Custom hooks (useLogin, useRegister, useLoginForm)
│   ├── components/  #   UI components (AuthModal, ProfileModal, forms)
│   └── type.ts      #   Types (LoginRequest, LoginResponse...)
├── dashboard/       # Dashboard feature
│   └── components/  #   DashboardView, WelcomeHero
├── landing/         # Marketing pages
│   ├── api/         #   contact.api.ts
│   ├── schema/      #   contact.schema.ts
│   ├── hooks/       #   useGuestLanding, useContact, useContactForm
│   ├── constants/   #   Static content (features, FAQs, testimonials)
│   ├── types/       #   ContactInput/Output, TestimonialItem
│   └── components/  #   25+ components (Hero, FAQ, Footer...)
├── trip/            # Trip management
│   └── components/  #   19 files (TripDetail 4300 dòng!)
└── user/            # User feature (stub)
    ├── type.ts      #   User interface
    └── hooks/       #   useUser.ts (file rỗng)
```

### Quy tắc cho một feature
1. Mỗi feature là một module độc lập
2. Không import feature A vào feature B
3. Cấu trúc khuyến nghị: `types/` → `schemas/` → `api/` → `hooks/` → `components/`
4. Barrel export qua `index.ts`

### Anti-patterns
- `features/trip` thiếu `types/`, `api/`, `hooks/` — khác với `auth` và `landing`
- `features/user` không có implement — chỉ là stub
- Component quá lớn (TripDetail 4300 dòng) vi phạm SRP

---

## `src/shared/` — Shared Layer

### Mục đích
Chứa component, hook, type, constant dùng chung.

### Cấu trúc

```
shared/
├── components/       # UI components (14 categories)
│   ├── common/       #   Button, Input, Badge, Avatar
│   ├── form/         #   Form + 14 field components
│   ├── feedback/     #   Alert, Toast, Loading, Skeleton
│   ├── navigation/   #   Tabs, Pagination, Breadcrumb
│   ├── overlay/      #   Dialog, Sheet, Tooltip, Popover
│   ├── data-display/ #   Table, TagList, StatusBadge
│   ├── composite/    #   DatePickerWithTime, SummaryCard
│   ├── layout/       #   Header, Sidebar, LandingLayout
│   ├── providers/    #   AuthProvider, QueryProvider, ThemeProvider
│   └── effect/       #   background-effect
├── hook/             # Shared hooks
│   ├── useToast.ts
│   ├── useModalScrollLock.ts
│   └── useLandingLayoutController.ts
├── lib/              # Shared utilities
│   └── mock-data.ts  #   MOCK_TRIPS, MOCK_DETAIL, SUMMARY_STATS
├── constants/        # Shared constants
│   ├── header.constant.ts
│   └── sidebar.constant.ts
└── types/            # Shared types
    ├── index.ts
    ├── interface.types.ts  # Trip, Participant, SummaryStat...
    └── response.ts         # BaseResponse, PaginatedResponse...
```

### Tương tác
- Shared components import từ `@/lib/*`, `@/shared/hooks/*`, `@/shared/types/*`
- Không import từ `@/features/*`

---

## `src/lib/` — Infrastructure

### Mục đích
Chứa code infrastructure: kết nối API, config, utilities.

### Cấu trúc

```
lib/
├── api-client.ts    # Axios instance + interceptors
├── api-error.ts     # ApiError class
├── config.ts        # Environment config (type-safe)
├── constants.ts     # API_ENDPOINTS, STORAGE_KEYS, PAGINATION
├── csrf.ts          # CSRF token từ cookie
├── date.ts          # Date formatting (Intl API)
├── format.ts        # Currency, phone, slug, truncate
├── utils.ts         # cn() utility (clsx + tailwind-merge)
└── validators.ts    # Basic validators (phone, email, password)
```

### Tương tác
- Chỉ import từ thư viện ngoài (axios, clsx, tailwind-merge)
- Không import từ `@/features/` hay `@/shared/`

---

## `src/entities/` — Domain Entities

### Mục đích
Định nghĩa domain entities thuần (plain objects), không logic.

### Hiện trạng
- `user.ts` — file rỗng (chưa implement)

### Khi nào dùng
- Khi cần model hóa domain object không phụ thuộc framework
- Không chứa hooks, component, API call
