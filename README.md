# Travel Now Platform (TNP) UI

> Frontend web app cho nền tảng quản lý tài chính du lịch nhóm — lên kế hoạch, chia chi phí, đồng bộ lịch trình.

**Travel Now Platform** là hệ thống quản lý chuyến đi nhóm, giúp bạn dễ dàng lên lịch trình, theo dõi chi phí và chia tiền minh bạch. Ứng dụng hướng đến thị trường **Việt Nam**, giao diện tiếng Việt. Backend API xây dựng bằng .NET 10, repo riêng `tnp-api`.

---

## Tổng Quan

```
┌──────────────────────────────────────────────────────┐
│                    TNP UI Web                         │
│                Next.js 16 + React 19                  │
├──────────┬──────────┬──────────┬─────────────────────┤
│   Auth   │ Landing  │Dashboard │        Trip         │
│  Login   │ Trang    │ Tổng     │   Chuyến đi +       │
│ Register │ giới     │ quan     │   Chi phí nhóm      │
│ Google   │ thiệu    │          │                     │
└────┬─────┴──────────┴────┬─────┴──────────┬──────────┘
     │                     │                │
     └─────────────┬───────┴────────────────┘
                   │
          Generated SDK (OpenAPI)
                   │
          ┌────────┴────────┐
          │  Backend API    │
          │  .NET 10        │
          └─────────────────┘
```

---

## Trải Nghiệm Người Dùng

### 1. Đăng ký & Đăng nhập
- Đăng ký bằng email + mật khẩu, xác thực qua email.
- Hoặc đăng nhập nhanh bằng **Google OAuth**.
- **Silent refresh** tự động làm mới token — không cần đăng nhập lại.

### 2. Landing Page
- Trang giới thiệu sản phẩm — hiển thị trước khi đăng nhập.
- Hero, tính năng, testimonial, FAQ, form liên hệ.

### 3. Dashboard
- Tổng quan chuyến đi — đang chờ, đã hoàn thành.
- Thống kê nhanh: số chuyến, tổng chi phí, bạn đồng hành.
- Hành động nhanh: tạo chuyến đi mới.

### 4. Quản lý Chuyến đi
- **Tạo chuyến đi** — đặt tên, chọn địa điểm, mời bạn bè.
- **Lên kế hoạch** — wizard 3 bước: tạo → kế hoạch → lịch trình.
- **Xây dựng lịch trình** — kéo thả hoạt động theo ngày.
- **Quản lý chi phí** — log chi tiêu, chia nhóm (Individual/Group), khiếu nại, mã QR chia tiền.
- **Chi tiết** — danh sách người tham gia, timeline, thống kê thành viên.

### 5. Profile
- Modal 5 tabs: Thông tin cá nhân, Bảo mật, Tài chính, Thông báo, Cài đặt.

---

## Kiến Trúc

### Tech Stack

| Kỹ thuật | Mục đích |
|---|---|
| Next.js 16 (App Router) | Routing, layouts, error boundaries |
| React 19 | UI library |
| TypeScript (strict) | Type safety |
| Tailwind CSS v4 + shadcn/ui | Styling + component system |
| Zustand | Auth state (client-side, SSR-safe) |
| TanStack Query v5 | Server state (mutations) |
| React Hook Form + Zod v4 | Form + validation |
| Axios + Generated SDK | HTTP client, type-safe API calls |
| Framer Motion | Animation |
| Biome v2 | Linting + formatting |
| Vitest | Unit testing |

### Cấu trúc thư mục

```
src/
├── app/              # Routes, layouts, providers, error boundaries
│   ├── (auth)/       #   Login, Register
│   ├── (landing)/    #   Marketing pages
│   ├── (main)/       #   Dashboard, Trips (authenticated)
│   └── (test)/       #   Component playground
├── features/         # Business logic modules
│   ├── auth/         #   Generated SDK — login, register, google
│   ├── landing/      #   Contact API — form, hooks
│   ├── dashboard/    #   Dashboard overview
│   └── trip/         #   Trip CRUD, expense, itinerary
├── shared/           # Reusable code
│   ├── components/   #   UI components (14 categories)
│   ├── hooks/        #   useAuth, useLayout hooks
│   ├── stores/       #   auth-store.ts (Zustand)
│   ├── api/          #   Generated SDK + interceptors
│   ├── types/        #   Shared TypeScript types
│   └── constants/    #   Header, sidebar config
└── lib/              # Infrastructure
    ├── api-client.ts #   Axios instance + CSRF
    ├── api-error.ts  #   ApiError class
    ├── config.ts     #   Environment config
    ├── format.ts     #   Currency, date formatting
    └── utils.ts      #   cn() utility
```

**Dependency flow:** `App → Features → Shared → Lib → (external only)`

### Provider Chain

```tsx
// src/app/provider.tsx
<QueryProvider>
  <GoogleOAuthProvider>
    <AuthProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
</QueryProvider>
```

---

## Auth Flow

```
┌─────────────┐                 ┌───────────────┐              ┌──────────────┐
│   Browser   │                 │  Frontend App │              │  Backend API │
└──────┬──────┘                 └───────┬───────┘              └──────┬───────┘
       │                                │                             │
       │ 1. Mở trang                   │                             │
       │ ────────────────────────────>  │                             │
       │                                │ 2. GET /auth/silent-refresh │
       │                                │ ──────────────────────────> │
       │                                │ <── Set-Cookie (refresh)    │
       │                                │                             │
       │ 3. Hiển thị trang             │                             │
       │ <────────────────────────────  │                             │
       │                                │                             │
       │ 4. Nhập thông tin             │                             │
       │ ────────────────────────────>  │                             │
       │                                │ 5. POST /auth/login         │
       │                                │ ──────────────────────────> │
       │                                │ <── Set-Cookie (refresh)    │
       │                                │ <── { accessToken, user }   │
       │                                │                             │
       │ 6. Lưu accessToken (memory)   │                             │
       │ <────────────────────────────  │                             │
```

**Key points:**
- Refresh token: HttpOnly cookie — không truy cập được qua JS
- Access token: Lưu trong memory (Zustand) — mất khi đóng tab
- Silent refresh: Tự động gọi khi app mount
- CSRF protection: Axios interceptor gắn `X-CSRF-TOKEN`

---

## Cài Đặt

### Yêu cầu
- Node.js 18+
- pnpm
- Backend API tại `http://localhost:5246`

### Bắt đầu

```bash
git clone https://github.com/your-org/tnp-ui-web.git
cd tnp-ui-web
pnpm install
copy .env.example .env.local
# Chỉnh NEXT_PUBLIC_API_BASE_URL=http://localhost:5246
pnpm generate          # Generate SDK từ backend Swagger
pnpm dev               # http://localhost:3000
```

### Scripts

```bash
pnpm dev          # Dev server
pnpm build        # Production build
pnpm start        # Run production
pnpm lint         # Biome check
pnpm format       # Auto format
pnpm typecheck    # TypeScript check
pnpm test         # Vitest
pnpm generate     # Generate SDK từ OpenAPI spec
```

---

## Tài Liệu

| File | Nội dung |
|------|----------|
| [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md) | Kiến trúc tổng thể |
| [docs/architecture/FOLDER_STRUCTURE.md](docs/architecture/FOLDER_STRUCTURE.md) | Cấu trúc thư mục |
| [docs/architecture/DATA_FLOW.md](docs/architecture/DATA_FLOW.md) | Luồng dữ liệu |
| [docs/architecture/STATE_MANAGEMENT.md](docs/architecture/STATE_MANAGEMENT.md) | Quản lý state |
| [docs/api/AUTH_FLOW.md](docs/api/AUTH_FLOW.md) | Authentication & silent refresh |
| [docs/api/API_INTEGRATION.md](docs/api/API_INTEGRATION.md) | Generated SDK, error handling |
| [docs/standards/CONVENTIONS.md](docs/standards/CONVENTIONS.md) | Quy tắc code |
| [docs/getting-started/ONBOARDING_GUIDE.md](docs/getting-started/ONBOARDING_GUIDE.md) | Hướng dẫn phát triển |

---

## Quy Tắc Phát Triển

1. **Generated SDK ưu tiên** — dùng `postApiAuthLogin` thay vì viết `loginApi()` thủ công.
2. **Feature isolation** — không import feature A vào feature B.
3. **Types naming** — file types phải có suffix `*.types.ts`.
4. **Zod schemas** đặt trong `schemas/` của feature.
5. **No barrel export quá sâu** — chỉ export từ `index.ts`.
6. **Error handling** — dùng `ApiError.fromAxiosError()` + toast thay vì `alert()`.
7. **No relative imports** — luôn dùng alias `@/` path.
