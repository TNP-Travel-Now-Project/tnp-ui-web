# TNP UI Web

**Nền tảng quản lý chuyến đi nhóm** — lên kế hoạch, chia chi phí, đồng bộ lịch trình.

## Công nghệ

| Thành phần | Công nghệ |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Ngôn ngữ | TypeScript (strict) |
| Styling | TailwindCSS v4 + Shadcn |
| Server State | TanStack Query v5 |
| Form & Validation | react-hook-form + Zod v4 |
| HTTP Client | Axios + CSRF |
| Auth | Context API + next-auth |
| Animation | framer-motion |
| Package Manager | pnpm |
| Linting | Biome v2 |

## Quick Start

```bash
pnpm install
pnpm dev          # http://localhost:3000 (có inspect 9229)
pnpm build
pnpm lint         # Biome check
pnpm test         # Vitest
```

## Cấu trúc thư mục

```
src/
  app/          — Next.js App Router (4 route groups)
  entities/     — Domain entities
  features/     — 5 feature modules (auth, dashboard, landing, trip, user)
  lib/          — Infrastructure (api-client, config, utils)
  shared/       — Components, hooks, types, constants
```

## Environment

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=TNP UI
```

## Tài liệu

| File | Nội dung |
|---|---|
| `PROJECT_OVERVIEW.md` | Mục tiêu, phạm vi, domain |
| `ARCHITECTURE.md` | Kiến trúc tổng thể, diagrams |
| `FOLDER_STRUCTURE.md` | Ý nghĩa từng thư mục |
| `FEATURE_MAP.md` | Chi tiết 5 features |
| `DATA_FLOW.md` | Luồng dữ liệu UI → API |
| `STATE_MANAGEMENT.md` | Quản lý state |
| `AUTH_FLOW.md` | Authentication & CSRF |
| `API_INTEGRATION.md` | Axios client, error handling |
| `COMPONENT_GUIDELINES.md` | Shared components catalog |
| `CODEBASE_RULES.md` | Coding standards |
| `CONVENTIONS.md` | Naming, folder conventions |
| `REFACTOR_NOTES.md` | Technical debt & action items |
| `PERFORMANCE_GUIDE.md` | Tối ưu performance |
| `ONBOARDING_GUIDE.md` | Hướng dẫn dev mới |
