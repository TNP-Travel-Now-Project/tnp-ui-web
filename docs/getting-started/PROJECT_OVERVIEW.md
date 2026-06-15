# Tổng quan dự án

## Mục đích

TNP UI Web là ứng dụng web quản lý chuyến đi nhóm (trip management platform). Cho phép người dùng:

- Tạo và lên kế hoạch chuyến đi
- Xây dựng lịch trình theo ngày (itinerary)
- Chia chi phí nhóm (individual/group expense splitting)
- Theo dõi ngân sách và thanh toán
- Mời bạn đồng hành

## Domain

**Travel Tech** — thị trường Việt Nam. Toàn bộ UI bằng tiếng Việt.

## Phạm vi

### MVP hiện tại

- Landing page giới thiệu sản phẩm
- Authentication (login/register với form validation)
- Dashboard tổng quan
- Trip CRUD (tạo mới, xem danh sách, detail)
- Planning wizard (3 bước: tạo → kế hoạch → lịch trình)
- Quản lý chi phí nhóm (Individual / Group tabs)
- Profile modal (5 tabs: Personal, Security, Finance, Notifications, Settings)
- Component playground (`/component`)

### Chưa triển khai

- Real API integration (hiện dùng mock data)
- `useQuery` cho data fetching (chỉ có `useMutation`)
- `not-found.tsx` pages
- `entities/user.ts` (file rỗng)
- `features/user` hoàn chỉnh

## Trạng thái dự án

**Giai đoạn phát triển MVP** — giao diện đã hoàn thiện, đang chờ kết nối backend thật.

## Ví dụ thực tế trong code

**Mock data** — `src/shared/lib/mock-data.ts`:

```typescript
export const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    title: 'Hè rực rỡ tại Phú Quốc',
    location: 'Kiên Giang, Việt Nam',
    status: 'active',
    // ...
  }
]
```

**Kiểu response API** — `src/shared/types/response.ts`:

```typescript
export interface BaseResponse<T = unknown> {
  succeeded: boolean
  message: string | null
  code: string | null
  data: T | null
  errors: Record<string, string[]> | null
}
```

## Khi nào nên chỉnh sửa

- Thêm feature mới: tạo thư mục trong `src/features/`
- Sửa giao diện chung: `src/shared/components/`
- Thay đổi API client: `src/lib/`
- Thêm tuyến đường mới: `src/app/`

## Điều không nên làm

- Không đặt business logic trong `src/app/` pages
- Không import feature này vào feature khác
- Không dùng `alert()` cho user feedback (dùng toast system)
