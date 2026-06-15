# Component Guidelines

## Tổng quan

Shared components nằm trong `src/shared/components/`, chia làm **14 categories**, ~50+ components.

```
shared/components/
├── common/       # Button, Input, Badge, Avatar, SearchInput, Label
├── form/         # Form, FormInput, FormSelect, FormDatePicker...
├── feedback/     # Alert, Toast, Loading, Skeleton, Progress, EmptyState
├── navigation/   # Tabs, Pagination, Breadcrumb, DropdownMenu, NavItem
├── overlay/      # Dialog, Sheet, Popover, Tooltip, HoverCard, ConfirmDialog, DeleteDialog
├── data-display/ # Table, TagList, ActionDropdown, StatusBadge
├── composite/    # DatePickerWithTime, SummaryCard
├── layout/       # Header, Sidebar, LandingLayout, page-container, page-section
├── providers/    # AuthProvider, QueryProvider, ThemeProvider, ToastProvider
├── effect/       # background-effect
├── surface/      # (empty)
├── typography/   # (empty)
├── ui/           # Sub-categories (actions, feedback, form, layout, navigation, overlay)
└── index.ts      # Barrel export
```

---

## Component Structure Rules

### 1. Mỗi component có thư mục riêng

```
Button/
├── Button.tsx     # Component chính
├── index.ts       # Re-export
└── ...            # (không có test, story, css riêng)
```

### 2. Barrel export

```typescript
// Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

### 3. Client Component directive

Tất cả component có interactivity đều có `'use client'`:

```typescript
'use client'
import { useState } from 'react'
// ...
```

---

## Component Catalog

### Common

| Component | Props | Mô tả |
|---|---|---|
| `Button` | `variant` (fill/outline/ghost/danger), `loading`, `size` | Button với loading state |
| `Input` | `icon`, `error`, `type` | Text input với icon & error state |
| `SearchInput` | `onSearch`, `placeholder` | Search input |
| `Badge` | `variant` (success/warning/destructive/info) | Status badge |
| `Avatar` | `src`, `alt`, `size`, `status` | Avatar với online status dot |
| `Label` | `children` | Form label |

### Form

| Component | Mô tả |
|---|---|
| `Form` | Form wrapper (react-hook-form context) |
| `FormInput` | Input field với label + error message |
| `FormPassword` | Password field với toggle visibility |
| `FormSelect` | Select dropdown |
| `FormDatePicker` | Date picker |
| `FormRadio` | Radio group |
| `FormCheckbox` | Checkbox |
| `FormUpload` | File upload |
| `FormTextarea` | Textarea |
| `FormActions` | Form action buttons (Submit/Cancel) |
| `FormCard` | Card wrapper cho form section |
| `FormGroup` | Field group |
| `FormSkeleton` | Loading skeleton cho form |
| `FormMessage` | Validation message |

### Feedback

| Component | Mô tả |
|---|---|
| `Alert` | Alert với variant (info/success/warning/default/destructive) |
| `EmptyState` | Empty state với icon + message + action |
| `Loading` | Loading spinner |
| `Progress` | Progress bar (determinate/indeterminate) |
| `Skeleton` | Content skeleton |
| `Toast` | Toast notification (wrapper quanh sonner) |

### Navigation

| Component | Mô tả |
|---|---|
| `Tabs` | Tab navigation |
| `Pagination` | Page pagination |
| `Breadcrumb` | Breadcrumb trail |
| `DropdownMenu` | Dropdown menu |
| `NavigationMenu` | Navigation menu |

### Overlay

| Component | Mô tả |
|---|---|
| `Dialog` | Modal dialog |
| `Sheet` | Slide-in panel (vaul) |
| `Popover` | Popover |
| `Tooltip` | Tooltip |
| `HoverCard` | Hover card |
| `ConfirmDialog` | Xác nhận hành động |
| `DeleteDialog` | Xác nhận xóa |

### Data Display

| Component | Mô tả |
|---|---|
| `Table` | Data table + pagination |
| `TagList` | Tags list |
| `ActionDropdown` | Row actions dropdown |
| `StatusBadge` | Status indicator |

---

## Pattern: Form Component

```typescript
'use client'

import { useFormContext } from 'react-hook-form'

interface FormInputProps {
  name: string
  label: string
  placeholder?: string
  type?: string
}

export function FormInput({ name, label, placeholder, type = 'text' }: FormInputProps) {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]?.message as string | undefined

  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} {...register(name)} />
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  )
}
```

## Pattern: Loading + Error + Empty

```typescript
// Trong page/component
if (isLoading) return <Loading />
if (error) return <Alert variant="destructive" message={error.message} />
if (!data) return <EmptyState message="Không có dữ liệu" />
return <DataView data={data} />
```

---

## Khi nào thêm component vào shared

- Component được dùng ở **2+ feature**
- Component có tính **tổng quát** (Button, Input, Dialog)
- Component không chứa **business logic** (nếu có thì để trong feature)

## Khi nào KHÔNG thêm vào shared

- Component chỉ dùng trong 1 feature → để trong `features/{feature}/components/`
- Component chứa API call → để trong feature
- Component quá đặc thù cho domain → để trong feature

## Anti-patterns

### 1. Form.tsx đặt sai vị trí

```
// ❌ Không nhất quán
form/Form.tsx          # file trực tiếp
form/FormInput/        # thư mục

// ✅ Nên nhất quán
form/Form/Form.tsx
form/FormInput/FormInput.tsx
```

### 2. Composite component nên dùng shared, không feature

Modal login (`AuthModal`) là **feature component**, không phải shared.

### 3. shared/components/ui/ tồn tại song song với shared/components/

Có 2 hệ thống component song song — `shared/components/ui/` và shared/components trực tiếp. Gây nhầm lẫn.
