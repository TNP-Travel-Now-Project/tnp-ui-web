# Refactor Notes

## Technical Debt Inventory

Danh sách các vấn đề cần refactor, phân loại theo mức độ ưu tiên.

---

## CRITICAL

### 1. Tách God Component: TripDetail (~4300 dòng)

**File**: `src/features/trip/components/TripDetail/TripDetail.tsx`

**Vấn đề**: Component duy nhất quản lý quá nhiều trách nhiệm:
- Trip info header
- Participant list
- Activity timeline
- Expense summary
- Invitation system
- Settings panel
- Multiple inline modals

**Giải pháp**: Tách thành sub-components:

```
TripDetail/
├── TripDetail.tsx          # Orchestrator (mỏng)
├── TripInfoHeader/
├── ParticipantList/
├── ActivityTimeline/
├── ExpenseSummary/
├── InvitePanel/
├── TripSettings/
├── index.ts
```

**Lợi ích**: Giảm ~4000 dòng, dễ maintain, dễ test, dễ reuse.

---

### 2. Tách God Component: TripExpenseModal (~2480 dòng)

**File**: `src/features/trip/components/TripExpenseModal/TripExpenseModal.tsx`

**Vấn đề**: Quản lý Individual/Group tabs, expense summary, settlements, complaints, QR code, member stats.

**Giải pháp**: Tách theo tab:

```
TripExpenseModal/
├── TripExpenseModal.tsx
├── ExpenseSummary/
├── ExpenseCarousel/
├── SettlementList/
├── ComplaintSystem/
├── QRCodePanel/
├── MemberStats/
├── MemberLogs/
├── index.ts
```

---

## HIGH

### 3. Sửa typo: AdddPlaceModal → AddPlaceModal

**File**: `src/shared/components/layout/AdddPlaceModal/` (3 chữ d)

**Ảnh hưởng**: Import path sai, gây nhầm lẫn.

**Giải pháp**: Rename folder và update tất cả imports.

---

### 4. Fix trailing space: register.api.ts

**File**: `src/features/auth/api/register.api.ts`

```typescript
// ❌ Có trailing space
const url = '/auth/register '

// ✅ Đúng
const url = '/auth/register'
```

**Ảnh hưởng**: API call fail với 400 Bad Request.

---

### 5. Fix import sai: register-form.tsx

**File**: `src/features/auth/components/register/register-form.tsx`

```typescript
// ❌ Import sai
import { useLoginForm } from '../../hooks/login/useLoginForm'

// ✅ Import đúng
import { useRegister } from '../../hooks/register/useRegister'
```

**Ảnh hưởng**: Register form gọi login logic → sai business.

---

## MEDIUM

### 6. Thay thế alert() bằng toast system

**Files**: `useLogin.ts`, `useRegister.ts`

```typescript
// ❌ Hiện tại
onSuccess: () => alert('Đăng nhập thành công')
onError: (e) => alert(e.message)

// ✅ Nên dùng
onSuccess: () => toast.success('Đăng nhập thành công')
onError: (e) => toast.error(e.message)
```

**Lợi ích**: UI nhất quán, trải nghiệm người dùng tốt hơn.

---

### 7. Giảm redundant hook calls: landing-page.tsx

**File**: `src/features/landing/components/landing-page.tsx`

```typescript
// ❌ Gọi 2 lần
const authState = useGuestLanding()    // auth check
const carouselState = useGuestLanding() // carousel

// ✅ Gọi 1 lần, destructure cả 2
const { isAuthenticated, carouselIndex, ... } = useGuestLanding()
```

---

### 8. Implement entities/user.ts và useUser.ts

**Files**: `src/entities/user.ts` (rỗng), `src/features/user/hooks/useUser.ts` (rỗng)

**Giải pháp**:
- Đồng bộ `User` interface giữa `AuthProvider` và `entities/user.ts`
- Implement `useUser` hook với `useQuery` để fetch user info

---

### 9. Không đồng nhất feature structure

`features/trip` thiếu `types/`, `api/`, `hooks/` — khác với `auth` và `landing`.

**Giải pháp**: Thêm cấu trúc chuẩn cho trip feature.

---

## LOW

### 10. Thêm not-found.tsx

**Files cần tạo**:
- `src/app/(auth)/not-found.tsx`
- `src/app/(main)/not-found.tsx`
- `src/app/(landing)/not-found.tsx`

---

### 11. Chuyển mock data → real API integration

**Mock data files**: `src/shared/lib/mock-data.ts`

**Các page dùng mock**:
- `/dashboard` → `MOCK_TRIPS`, `SUMMARY_STATS`
- `/trips` → `MOCK_TRIPS`
- `/trips/[id]` → `MOCK_DETAIL`

**Giải pháp**: Tạo useQuery hooks → thay thế mock data.

---

### 12. Chuyển một số pages sang Server Component

**Các component có thể convert**:
- `AllTripsView` — pure presentational
- `TripCard` — pure presentational
- `WelcomeHero` — static content

---

### 13. Standardize form component structure

`Form.tsx` đặt ở `form/Form.tsx` trong khi các component khác có thư mục riêng.

**Giải pháp**: Move `Form.tsx` vào `form/Form/Form.tsx`.

---

### 14. Clean up duplicate component systems

`shared/components/ui/` tồn tại song song với `shared/components/` — chứa sub-categories trùng lặp (`ui/actions/`, `ui/feedback/`, `ui/form/`...).

**Giải pháp**: Xác định hệ thống nào đang được dùng, xóa hệ thống kia hoặc merge.

---

## Prioritized Action Plan

| # | Task | Effort | Impact | Priority |
|---|---|---|---|---|
| 1 | Tách TripDetail | 3 days | High | CRITICAL |
| 2 | Tách TripExpenseModal | 2 days | High | CRITICAL |
| 3 | Fix typo AdddPlaceModal | 30 min | Medium | HIGH |
| 4 | Fix trailing space register API | 5 min | High | HIGH |
| 5 | Fix import register-form | 5 min | High | HIGH |
| 6 | Replace alert() with toast | 1 day | Medium | MEDIUM |
| 7 | Fix redundant hook calls | 30 min | Low | MEDIUM |
| 8 | Implement entities/user | 4 hours | Medium | MEDIUM |
| 9 | Standardize feature structure | 2 days | Medium | MEDIUM |
| 10 | Add not-found pages | 1 hour | Low | LOW |
| 11 | API integration | 1 week | High | LOW* |
| 12 | Convert to Server Components | 2 days | Medium | LOW |

*API integration phụ thuộc vào backend readiness.
