# Design System Rules & Living Architecture Contract

## 1. Overview & Philosophy

**Mục tiêu:** 
Tài liệu này đóng vai trò là "Bản cam kết kiến trúc" (Living Architecture Contract) cho dự án TNP UI Web. Nó quy định các nguyên tắc thiết kế, kiến trúc component và hướng dẫn triển khai, đặc biệt trong giai đoạn dự án đang **migrate từ Ant Design sang shadcn/ui + Next.js 15 (App Router)**.

**Triết lý cốt lõi (Core Principles):**
- **Clarity (Sự rõ ràng)**: Giao diện tối giản, hiện đại. Ưu tiên **generous whitespace** (khoảng trắng rộng rãi) để giảm tải nhận thức (cognitive load) cho người dùng.
- **Consistency (Sự nhất quán)**: Mọi UI Element phải kế thừa Design Tokens (Tailwind variables). KHÔNG hardcode mã màu hoặc pixel riêng lẻ.
- **Accessibility (Tiếp cận)**: Đảm bảo độ tương phản cao, hỗ trợ keyboard navigation (Radix UI primitives) và Native Dark Mode.
- **Maintainability (Dễ bảo trì)**: Áp dụng triết lý "Copy & Paste" của shadcn kết hợp với Component Delegation. Giữ UI layer tách biệt hoàn toàn với Business/Data layer.

---

## 2. Design Tokens & Visual Language

Hệ thống thiết kế kế thừa nét thanh lịch của "Eco/Green theme" kết hợp cùng sự hiện đại của shadcn.

### Color Palette (Semantic + Base)

Hệ thống màu sắc được ánh xạ vào CSS variables để hỗ trợ Light/Dark Mode thông qua `next-themes` và Tailwind CSS.

| Role | Tailwind Token | Light Mode Value | Dark Mode Value | Usage / Notes |
|---|---|---|---|---|
| **Primary (Eco)** | `bg-primary` | `#7AC64D` | `#8ED45E` (hoặc sáng hơn) | Call-to-action (CTA) chính, highlight, interactive states. |
| **Success** | `bg-success` | `#5FA33A` | `#5FA33A` | Validation form, positive feedback. |
| **Destructive** | `bg-destructive` | `#E53935` | `#EF4444` | Trạng thái lỗi (Error), hành động xóa. |
| **Warning** | `bg-warning` | `#FF9800` | `#F59E0B` | Cảnh báo cần chú ý. |
| **Background** | `bg-background` | `#FFFFFF` | `#121212` / `#1A1A1A` | Nền chính của toàn bộ layout. |
| **Surface** | `bg-card` / `bg-popover`| `#FFFFFF` (có shadow) | `#333333` | Nền cho Card, Modal, Navigation. |
| **Foreground** | `text-foreground` | `#000000` / `#222222` | `#F5F5F5` | Văn bản chính (headings, body). |
| **Muted** | `text-muted-foreground` | `#727272` / `#9B9B9B` | `#9B9B9B` | Văn bản phụ, caption, placeholder. |
| **Border** | `border-border` | `#DDDDDD` / `#E2E8F0` | `#444444` | Đường viền input, divider. |

### Typography Scale
Sử dụng Tailwind classes thay vì CSS tay. Ưu tiên Next.js Font Optimization (`next/font/google`).
- **Font-family chính**: `Inter`, `Roboto`, hoặc System Fonts. 
- **Font-weight**: `300` (Caption), `400` (Body), `500/600` (Buttons/Interactive), `700` (Headings).

### Spacing & Whitespace Scale
Quy chuẩn spacing dựa trên base unit `4px` của Tailwind (`p-1` = `4px`).
- **Component Gap (XS-SM)**: `gap-2` (8px) đến `gap-4` (16px) - Dành cho các element liên quan chặt chẽ.
- **Section Padding (XL-2XL)**: `p-6` (24px) đến `p-10` (40px) - Padding cho container, section.
- **Whitespace Rule**: Luôn ưu tiên dùng `gap` trong `flex` / `grid` thay vì dùng `margin` để tránh margin-collapse và dễ control layout.

### Radius Scale (Bo góc)
Điểm nhấn hiện đại của UI là bo góc mềm mại, đặc biệt là button.

| Role | Tailwind Class | Giá trị | Ứng dụng |
|---|---|---|---|
| **Buttons & Badges** | `rounded-3xl` / `rounded-full` | `24px` / `9999px` | Mọi button CTA chính, các Badge trạng thái. |
| **Cards & Modals** | `rounded-xl` / `rounded-2xl` | `12px` / `16px` | Container lớn, Card thông tin, Dialog. |
| **Inputs & Minor UI** | `rounded-md` / `rounded-lg` | `6px` / `8px` | Form inputs, Select, Checkbox, Checkbox tick. |

### Shadow / Elevation
Giữ triết lý Flat UI, chỉ dùng shadow để tạo độ nổi (Depth) cho các tầng UI đè lên nhau.
- **Base (L0)**: Không shadow (Mặc định).
- **Hover (L1)**: `shadow-sm` - Dùng khi hover button, interactive cards.
- **Floating (L2/L3)**: `shadow-md` / `shadow-lg` - Dùng cho Popover, Dropdown, Modals.

---

## 3. Component Conventions & API

### Button Naming Convention & Variants
Chỉnh sửa lõi component `Button` (từ shadcn) để hỗ trợ bộ prop mang tính Domain/Design của dự án:

```tsx
// API chuẩn khi gọi:
<Button buttonType="fill" size="lg">Hoàn tất</Button>
```

**Các `buttonType` chuẩn:**
1. `fill`: Nền `bg-primary`, chữ tương phản cao, `rounded-3xl`.
2. `outline`: Nền trong suốt, viền `border-primary`, chữ `text-primary`.
3. `ghost`: Nền trong suốt, không viền. Hover hiện nền `bg-primary/10` hoặc đổi text color.
4. `cancel`: Muted action. Nền `bg-muted` hoặc `bg-secondary`, chữ màu xám/đen.
5. `danger`: Hành động rủi ro. Dùng `bg-destructive`.

### Prop Patterns & Composition Rules
- **Không nhồi nhét logic**: UI components (trong `src/shared/components/ui/`) chỉ nhận props hiển thị (như `className`, `variant`, `disabled`, `children`).
- **Compound Components**: Kế thừa chuẩn Radix/shadcn. Phân rã cấu trúc thay vì dùng "Mega-props".
  - *❌ Bad:* `<Card title="Title" content="Body" footer="Footer" />`
  - *✅ Good:* 
    ```tsx
    <Card>
      <CardHeader><CardTitle>Title</CardTitle></CardHeader>
      <CardContent>Body</CardContent>
    </Card>
    ```

---

## 4. Project Folder Structure & Ownership

Sự rành mạch trong `src/shared/components/` là yếu tố sống còn để scale dự án.

| Thư mục | Trách nhiệm (Ownership) | Ví dụ |
|---|---|---|
| `/ui` | Nguyên gốc hoặc override nhẹ từ **shadcn/ui**. Đây là layer thấp nhất. | `Button.tsx`, `Input.tsx`, `Dialog.tsx` |
| `/form` | Components bọc `react-hook-form` + `zod` kết hợp với `/ui`. | `FormInput.tsx`, `FormSelect.tsx` |
| `/data-display` | Các component chuyên render dữ liệu phức tạp. | `DataTable.tsx`, `EcoFeatureCard.tsx` |
| `/layout` | Thành phần cấu trúc khung của trang (Shell). | `MainNavbar.tsx`, `Sidebar.tsx` |
| `/common` | Những mảnh UI dùng chung khác không thuộc UI thuần của shadcn. | `EmptyState.tsx`, `LoadingLogo.tsx` |

---

## 5. Architecture & Import Rules

### Abstraction Strategy (Chiến lược đóng gói)
- **shadcn/ui**: Do shadcn copy code thẳng vào source, được phép **chỉnh sửa trực tiếp** file trong `/ui` (để sửa `radius`, `colors`). KHÔNG CẦN viết Wrapper bọc ngoài trừ khi gắn với business logic.
- **Ant Design (AntD)**: 
  - Đang trong giai đoạn dỡ bỏ. **NGHIÊM CẤM** import AntD vào các Page/Feature làm mới từ đầu.
  - Các Component cũ đang dùng AntD nên đóng gói cẩn thận, lên kế hoạch viết lại bằng shadcn/TanStack Table trong tương lai.

### Import Constraints
- **Direction**: Component ở `/shared` **không bao giờ** được import logic từ `/features` hay `/app`. Mũi tên dependency chỉ đi một chiều: `Feature/Page` -> `Shared`.
- **Imports sạch**: Sử dụng path alias triệt để (vd: `@/shared/components/ui/button`).

---

## 6. UX/UI Patterns

### Loading States
- Ưu tiên **Skeleton Screens** (`<Skeleton />` của shadcn) mô phỏng cấu trúc content đang tải thay vì dùng một Spinner to giữa màn hình.
- Nút bấm khi thực hiện async action cần vô hiệu hóa (`disabled`) và tích hợp icon xoay (Loading Spinner) bên trong nút.

### Error & Empty States
- **Empty State**: Khi danh sách rỗng, luôn hiển thị `EmptyState` component bao gồm: Icon/Hình minh họa (màu muted), Thông báo thân thiện, và Button CTA hướng dẫn hành động tiếp theo.
- **Form Error**: Thông báo lỗi validation phải hiển thị sát dưới field liên quan, chữ màu `text-destructive`, font `text-sm`, kết hợp focus ring màu đỏ trên Input.

### Form Handling Pattern
- Chuẩn hóa: Toàn bộ form phải sử dụng **React Hook Form** + **Zod**.
- Tách biệt logic: Logic xử lý submit và schema phải nằm trong Custom Hooks (e.g., `useLoginForm()`) thay vì vứt toàn bộ vào file UI Component.

### Table Standards
- Lộ trình: Thay thế `Table` của AntD bằng **TanStack Query** (quản lý state/pagination) + **TanStack Table** (quản lý cột/row) + UI từ **shadcn**.

---

## 7. Accessibility & Quality Standards

- **Bàn phím & Focus**: Mọi component có tính tương tác (`a`, `button`, `input`) phải có trạng thái focus rõ ràng (Sử dụng `focus-visible:ring-2 focus-visible:ring-primary` của Tailwind).
- **Semantics**: Sử dụng đúng thẻ HTML (ví dụ dùng `<button>` thay vì `<div onClick={...}>`).
- **Aria Attributes**: Đối với Icon-only button (không có text), bắt buộc phải có thuộc tính `aria-label="Tên hành động"`.

---

## 8. Evolution & Contribution Guidelines

Khi một Developer cần một UI Component mới:
1. **Check the CLI**: Chạy `npx shadcn@latest add [component]` trước. Đừng tự phát minh lại "bánh xe" (ví dụ: Tooltip, Popover, Select, Dialog).
2. **Apply Design Tokens**: Mở component vừa tải về, sửa đổi các class Tailwind (như bo góc `rounded-3xl` cho button) để khớp với hệ thống của TNP.
3. **Commit to Shared**: Đặt vào thư mục tương ứng trong `src/shared/components/`. Đảm bảo code gọn gàng, có export rõ ràng.
4. **Don't touch AntD**: Đừng sửa hay nâng cấp logic liên quan đến AntD. Kế hoạch là migrate bỏ nó đi.

---

## 9. Current Observed Standards (Thực trạng dự án)

- Các nút bấm hiện đã được áp dụng bo góc lớn (`rounded-3xl` linh hoạt `rounded-2xl`).
- Giao diện đang bám sát Brand identity với Eco Green (`#7AC64D`).
- Đã và đang tích hợp `next-themes` để hỗ trợ Dark Mode. Đòi hỏi Developer khi code Tailwind phải luôn nhớ viết kèm prefix `dark:` (ví dụ: `bg-white dark:bg-zinc-900`).
- TanStack Query đang được sử dụng để quản lý Server State, giúp loại bỏ các boilerplate phức tạp của Redux/Thunk đối với logic fetching dữ liệu.
