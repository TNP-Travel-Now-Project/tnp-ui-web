# Kiến trúc tổng thể

## Mô hình kiến trúc

**Feature-based Architecture + Layered Structure**:
- **Feature-based**: Business logic phân chia theo module (auth, trip, landing...)
- **Layered**: Phân tầng rõ ràng (App → Features → Shared → Lib)

## Sơ đồ kiến trúc

```mermaid
graph TD
    App["src/app/ (Next.js App Router)"] --> RG["Route Groups"]
    RG --> A["(auth) — login/register/order"]
    RG --> L["(landing) — about/contact"]
    RG --> M["(main) — dashboard/trips/*"]
    RG --> T["(test) — component playground"]
    
    subgraph F["Feature Layer (src/features/)"]
        AF["auth/"] --> AFAPI["api/ * .api.ts"]
        AF --> AFSCHEMA["schemas/ * .schema.ts"]
        AF --> AFHOOK["hooks/ use*"]
        AF --> AFCOMP["components/"]
        LF["landing/"] --> LFHOOK["hooks/ use*"]
        LF --> LFCOMP["components/ (25+ files)"]
        TF["trip/"] --> TFCOMP["components/ (19 files)"]
        DF["dashboard/"] --> DFCOMP["components/"]
        UF["user/"] --> UFTYPE["type.ts (stub)"]
    end

    subgraph S["Shared Layer (src/shared/)"]
        SC["components/ (14 categories)"]
        SH["hook/ (3 hooks)"]
        ST["types/ (response, interface)"]
        SK["constants/ (header, sidebar)"]
    end

    subgraph I["Infrastructure (src/lib/)"]
        API["api-client.ts — Axios instance"]
        ERR["api-error.ts — ApiError class"]
        CFG["config.ts — env config"]
        CSRF["csrf.ts — CSRF token"]
        UTIL["utils.ts, validators.ts, date.ts, format.ts"]
    end

    M --> AF
    M --> TF
    M --> DF
    A --> AF
    L --> LF
    F --> S
    F --> I
    S --> I
```

## Luồng phụ thuộc

```
app/ → features/ → shared/ → lib/
```

**Nguyên tắc**:
- `app/` chỉ import từ `features/` và `shared/`
- `features/` chỉ import từ `shared/` và `lib/` — không import feature khác
- `shared/` chỉ import từ `lib/` — không import từ `features/`
- `lib/` không import từ bất kỳ đâu trong project (chỉ thư viện ngoài)

## Server Components vs Client Components

| Type | Files | Lý do |
|---|---|---|
| Server Component | `layout.tsx` (root), `page.tsx` (root), `loading.tsx` | Không cần hooks, thuần render |
| Client Component | 16/17 pages + layout files | Cần `useRouter`, `useState`, context, effects |

### Hậu quả

Toàn bộ component tree render ở client. Cân nhắc chuyển một số pure presentational components sang Server Component để giảm bundle size và cải thiện SEO.

## Route Groups

```mermaid
graph LR
    ROOT["/ (LandingPage)"] --> LOGIN["/login → AuthModal(login)"]
    ROOT --> REG["/register → AuthModal(register)"]
    ROOT --> ABOUT["/about → AboutUs"]
    ROOT --> CONTACT["/contact → Contact"]
    ROOT --> DASH["/dashboard → DashboardView"]
    ROOT --> TRIPS["/trips → AllTripsView"]
    TRIPS --> NEW["/trips/new → CreateTrip"]
    NEW --> PLAN["/trips/new/planning → PlanningTrip"]
    PLAN --> ITIN["/trips/new/itinerary → TripItineraryBuild"]
    TRIPS --> DETAIL["/trips/[id] → TripDetail"]
    DETAIL --> DPLAN["/trips/[id]/planning"]
    DPLAN --> DITIN["/trips/[id]/itinerary"]
    ROOT --> COMP["/component → Dev Playground"]
```

## Provider chain

```tsx
// src/app/provider.tsx
<QueryProvider>
  <AuthProvider>
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  </AuthProvider>
</QueryProvider>
```

## Các rủi ro kiến trúc hiện tại

1. **Mock data coupling**: Dashboard và trips gắn chặt với mock data — khó chuyển sang real API
2. **God components**: `TripDetail.tsx` (4300 dòng) và `TripExpenseModal.tsx` (2480 dòng) vi phạm Single Responsibility
3. **Client-heavy**: 100% pages là Client Component — mất lợi thế SSR/RSC của Next.js
4. **Thiếu data fetching layer**: Chỉ có mutations, chưa có queries pattern
5. **Inconsistent patterns**: Auth dùng `alert()`, contact dùng `toast()` — thiếu standardization
