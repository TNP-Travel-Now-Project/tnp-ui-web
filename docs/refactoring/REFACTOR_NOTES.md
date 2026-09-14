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

### 3. ~~Sửa typo: AdddPlaceModal → AddPlaceModal~~ ✅ DONE

Đã xóa duplicate file `shared/components/layout/AdddPlaceModal/`.

---

### 4. ~~Fix trailing space: register.api.ts~~ ✅ DONE

File `register.api.ts` đã được xóa — auth API giờ dùng Generated SDK.

---

### 5. ~~Fix import sai: register-form.tsx~~ ✅ DONE

`register-form.tsx` giờ import đúng `useRegisterForm`.

---

## MEDIUM

### 6. ~~Thay thế alert() bằng toast system~~ ✅ DONE

Tất cả form hooks giờ dùng `toast.success()` / `toast.error()` với `ApiError`.

---

### 7. ~~Giảm redundant hook calls: landing-page.tsx~~ ✅ DONE

`landing-page.tsx` giờ gọi `useGuestLanding()` 1 lần.

---

### 8. ~~Implement entities/user.ts và useUser.ts~~ ✅ REMOVED

`entities/` directory đã được xóa. User state quản lý qua Zustand store.

---

### 9. ~~Không đồng nhất feature structure~~ ✅ DONE

Features đã standardized: `types/`, `schemas/`, `hooks/`, `components/`.

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

## Prioritized Action Plan

| # | Task | Effort | Impact | Priority |
|---|---|---|---|---|
| 1 | Tách TripDetail | 3 days | High | CRITICAL |
| 2 | Tách TripExpenseModal | 2 days | High | CRITICAL |
| 3 | ~~Fix typo AdddPlaceModal~~ | ✅ | ✅ | DONE |
| 4 | ~~Fix trailing space register API~~ | ✅ | ✅ | DONE |
| 5 | ~~Fix import register-form~~ | ✅ | ✅ | DONE |
| 6 | ~~Replace alert() with toast~~ | ✅ | ✅ | DONE |
| 7 | ~~Fix redundant hook calls~~ | ✅ | ✅ | DONE |
| 8 | ~~Implement entities/user~~ | ✅ | ✅ | REMOVED |
| 9 | ~~Standardize feature structure~~ | ✅ | ✅ | DONE |
| 10 | Add not-found pages | 1 hour | Low | LOW |
| 11 | API integration | 1 week | High | LOW* |
| 12 | Convert to Server Components | 2 days | Medium | LOW |

*API integration phụ thuộc vào backend readiness.
