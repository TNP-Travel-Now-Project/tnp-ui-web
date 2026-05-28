# Performance Guide

## Hiện trạng

Ứng dụng đang dùng **Client-Side Rendering (CSR)** cho 16/17 pages.
Điều này có nghĩa toàn bộ JavaScript bundle phải tải về và execute trên client
trước khi user thấy nội dung.

---

## Bundle Size

### Dependencies đáng chú ý

| Package | Kích thước ước tính | Ghi chú |
|---|---|---|
| `framer-motion` | ~35 KB gzipped | Animation library |
| `antd` + `@ant-design/icons` | ~200 KB gzipped | Ant Design UI (dùng 1-2 components) |
| `@tanstack/react-query` | ~12 KB gzipped | Server state |
| `lucide-react` | ~25 KB gzipped | Icons (tree-shakable) |
| `react-hook-form` | ~8 KB gzipped | Forms |
| `zod` | ~8 KB gzipped | Validation |
| `shadcn` | ~5 KB | UI primitives |

### Cảnh báo: Ant Design

`antd` và `@ant-design/icons` được import trong `package.json` nhưng hầu như không dùng trong codebase (chỉ thấy ở một vài nơi). Đây là **bloat** đáng kể nếu không dùng thực sự.

**Khuyến nghị**: Kiểm tra usage, nếu không dùng thì remove dependencies.

---

## Cơ hội tối ưu

### 1. Server Components

Chuyển các component không cần interactivity sang Server Component:

```typescript
// ❌ Client Component
'use client'
export function TripCard({ trip }: { trip: Trip }) {
  return <div>{trip.title} - {trip.location}</div>
}

// ✅ Server Component (không cần use client)
export function TripCard({ trip }: { trip: Trip }) {
  return <div>{trip.title} - {trip.location}</div>
}
```

**Lợi ích**: Giảm bundle size, cải thiện LCP, SEO tốt hơn.

**Các component có thể chuyển**:
- `AllTripsView`
- `TripCard`
- `WelcomeHero`
- `GuestLanding` (các section thuần static)

---

### 2. Dynamic Import (Code Splitting)

Dùng `next/dynamic` cho component nặng:

```typescript
// ❌ Import trực tiếp (always loaded)
import { TripDetail } from '@/features/trip/components/TripDetail'

// ✅ Dynamic import (lazy load)
import dynamic from 'next/dynamic'
const TripDetail = dynamic(
  () => import('@/features/trip/components/TripDetail/TripDetail'),
  { loading: () => <Skeleton /> },
)
```

**Nên dynamic import**:
- `TripDetail` (4300 dòng)
- `TripExpenseModal` (2480 dòng)
- `ProfileModal` (nhiều tabs)

---

### 3. Image Optimization

Next.js Image component tự động tối ưu:

```typescript
// ✅ Nên dùng next/image
import Image from 'next/image'

<Image
  src={trip.image}
  alt={trip.title}
  width={400}
  height={300}
  loading="lazy"
/>

// ❌ Không dùng img tag thuần
<img src={trip.image} alt={trip.title} />
```

**Hiện tại**: `next.config.ts` chỉ cho phép `images.unsplash.com`.
Các image từ Google (AIDA) chưa được config → sẽ bị lỗi.

---

### 4. Animation Performance

`framer-motion` dùng nhiều trong modals:

```typescript
// ✅ Dùng will-change hint
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  style={{ willChange: 'opacity' }} // browser hint
>
```

**Khuyến nghị**: Tránh animate quá nhiều element cùng lúc trên mobile.

---

### 5. TanStack Query Caching

Cấu hình hiện tại:

```typescript
{
  staleTime: 60 * 1000,    // cache 1 phút
  gcTime: 5 * 60 * 1000,   // giữ trong cache 5 phút
}
```

**Tối ưu**: Tùy chỉnh theo từng query:

```typescript
// Dữ liệu ít thay đổi (user info)
useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  staleTime: 5 * 60 * 1000,  // 5 phút
})

// Dữ liệu thay đổi nhiều (activities)
useQuery({
  queryKey: ['activities', tripId],
  queryFn: () => fetchActivities(tripId),
  staleTime: 30 * 1000,  // 30 giây
})
```

---

### 6. Font Optimization

Đã dùng `next/font/google` cho Inter:

```typescript
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
```

✅ Đúng pattern — font được tối ưu, tự động subset.

---

### 7. Re-render Optimization

**Vấn đề**: `'use client'` ở page level → toàn bộ tree re-render khi state thay đổi.

**Giải pháp**:
- Đẩy `'use client'` xuống component cần nó nhất (leaf components)
- Dùng `React.memo` cho heavy components

```typescript
// Tránh re-render không cần thiết
export const TripCard = React.memo(function TripCard({ trip }: { trip: Trip }) {
  return <div>{trip.title}</div>
})
```

---

## Performance Checklist

- [ ] Audit bundle size — remove unused deps (antd?)
- [ ] Chuyển static components sang Server Component
- [ ] Dynamic import cho TripDetail, TripExpenseModal, ProfileModal
- [ ] Config remotePatterns trong next.config cho Google images
- [ ] Add will-change cho framer-motion animations
- [ ] Tối ưu staleTime/gcTime theo từng query
- [ ] React.memo cho heavy list items
- [ ] Đẩy 'use client' xuống leaf components

## Tools

```bash
pnpm add -D @next/bundle-analyzer   # Phân tích bundle
npx next build                       # Xem stats
```
