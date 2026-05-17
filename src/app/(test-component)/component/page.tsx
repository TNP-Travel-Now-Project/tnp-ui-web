'use client'

import { Check, Edit, Eye, Mail, Search, Settings, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
// Common Components
import Avatar from '@/shared/components/common/Avatar/avatar'
import Badge from '@/shared/components/common/Badge/badge'
import Button from '@/shared/components/common/Button/button'
import Input from '@/shared/components/common/Input/input'
import SearchInput from '@/shared/components/common/SearchInput/searchInput'
import ActionDropdown from '@/shared/components/data-display/ActionDropdown/action-dropdown'
import StatusBadge from '@/shared/components/data-display/StatusBadge/status-badge'
// Data Display Components
import { type Column, TablePagination } from '@/shared/components/data-display/Table'
import { Table } from '@/shared/components/data-display/Table/table'
import { type TagItem, TagList } from '@/shared/components/data-display/TagList'
// Feedback Components
import { Alert } from '@/shared/components/feedback/Alert'
import { EmptyState } from '@/shared/components/feedback/EmptyState'
import { Loading } from '@/shared/components/feedback/Loading'
import { Progress } from '@/shared/components/feedback/Progress'
import { Skeleton } from '@/shared/components/feedback/Skeleton'
// Navigation Components
import { Breadcrumb, type BreadcrumbItemProps } from '@/shared/components/navigation/Breadcrumb'
import { Pagination } from '@/shared/components/navigation/Pagination'
import { type TabItem, Tabs } from '@/shared/components/navigation/Tabs'
// Overlay Components
import {
  ConfirmDialog,
  DeleteDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/overlay/Dialog'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/overlay/HoverCard'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/overlay/Popover'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/overlay/Sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/overlay/Tooltip'

export default function Home() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItemProps[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Chi tiết', isActive: true },
  ]

  // Tabs items
  const tabsItems: TabItem[] = [
    { value: 'overview', label: 'Tổng quan', content: <div>Nội dung tab Tổng quan</div> },
    {
      value: 'settings',
      label: 'Cài đặt',
      icon: <Settings className='size-4' />,
      content: <div>Nội dung tab Cài đặt</div>,
    },
    { value: 'profile', label: 'Hồ sơ', content: <div>Nội dung tab Hồ sơ</div> },
  ]

  // Table data
  const tableData = [
    { id: 1, name: 'Sản phẩm A', price: '100.000', status: 'active' },
    { id: 2, name: 'Sản phẩm B', price: '200.000', status: 'inactive' },
    { id: 3, name: 'Sản phẩm C', price: '150.000', status: 'active' },
  ]

  const tableColumns: Column<(typeof tableData)[0]>[] = [
    { key: 'name', title: 'Tên sản phẩm', sortable: true },
    { key: 'price', title: 'Giá', align: 'right' },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (value) => (
        <StatusBadge
          status={value === 'active' ? 'success' : 'default'}
          label={value === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        />
      ),
    },
    {
      key: 'actions',
      title: '',
      align: 'right',
      render: (_value, _record, _index) => (
        <ActionDropdown
          actions={[
            { key: 'view', label: 'Xem', icon: <Eye className='size-4' /> },
            { key: 'edit', label: 'Sửa', icon: <Edit className='size-4' /> },
            { key: 'delete', label: 'Xóa', icon: <Trash className='size-4' />, danger: true },
          ]}
        />
      ),
    },
  ]

  // Tag list items
  const tagItems: TagItem[] = [
    { key: '1', label: 'React', color: '#61dafb' },
    { key: '2', label: 'TypeScript', color: '#3178c6' },
    { key: '3', label: 'Next.js', color: '#000000' },
  ]

  return (
    <div className='flex flex-col gap-8 p-8 font-sans min-h-screen'>
      {/* SECTION: Common Components */}
      <section className='space-y-4'>
        <h2 className='text-xl font-bold'>Common Components</h2>
        <div className='flex flex-wrap gap-4 items-center'>
          <Button buttonType='fill' onClick={() => alert('Clicked')}>
            Button Fill
          </Button>
          <Button buttonType='outline' onClick={() => alert('Clicked')}>
            Button Outline
          </Button>
          <Button buttonType='danger' icon={<Trash className='size-4' />}>
            Button Danger
          </Button>
          <Button buttonType='ghost'>Button Ghost</Button>
          <Button loading>Loading</Button>
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <Input
            placeholder='Nhập text...'
            leftIcon={<Mail size={18} />}
            rightIcon={<Search size={18} />}
          />
          <Input placeholder='Error input' error errorMessage='Lỗi validation' />
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <SearchInput
            placeholder='Tìm kiếm...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <Badge badgeType='success' icon={<Check size={14} />}>
            Success
          </Badge>
          <Badge badgeType='warning'>Warning</Badge>
          <Badge badgeType='destructive' icon={<Trash size={14} />}>
            Error
          </Badge>
          <Badge badgeType='info'>Info</Badge>
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <Avatar src='' alt='User' size='sm' fallback='SM' />
          <Avatar src='' alt='User' size='lg' fallback='LG' status='online' />
        </div>
      </section>

      {/* SECTION: Navigation Components */}
      <section className='space-y-4'>
        <h2 className='text-xl font-bold'>Navigation Components</h2>

        <div>
          <h3 className='text-sm font-medium mb-2'>Breadcrumb</h3>
          <Breadcrumb items={breadcrumbItems} showHome homeLabel='Trang chủ' />
        </div>

        <div>
          <h3 className='text-sm font-medium mb-2'>Tabs</h3>
          <Tabs items={tabsItems} defaultValue='overview' variant='default' />
        </div>

        <div>
          <h3 className='text-sm font-medium mb-2'>Pagination</h3>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            showFirstLast
          />
        </div>
      </section>

      {/* SECTION: Overlay Components */}
      <section className='space-y-4'>
        <h2 className='text-xl font-bold'>Overlay Components</h2>

        <div className='flex flex-wrap gap-4'>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent size='md'>
              <DialogHeader>
                <DialogTitle subtitle='Subtitle here'>Dialog Title</DialogTitle>
                <DialogDescription>Dialog description goes here.</DialogDescription>
              </DialogHeader>
              <div className='py-4'>Dialog content</div>
            </DialogContent>
          </Dialog>

          <Button onClick={() => setConfirmOpen(true)}>Confirm Dialog</Button>
          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title='Xác nhận'
            description='Bạn có chắc chắn muốn thực hiện?'
            onConfirm={() => toast.error('Confirm button success')}
          />

          <Button onClick={() => setDeleteOpen(true)}>Delete Dialog</Button>
          <DeleteDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            itemName='Sản phẩm A'
            onDelete={() => alert('Deleted!')}
          />

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>Open Sheet</Button>
            </SheetTrigger>
            <SheetContent size='md'>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
              </SheetHeader>
              <div className='py-4'>Sheet content</div>
            </SheetContent>
          </Sheet>
        </div>

        <div className='flex flex-wrap gap-4'>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Popover</Button>
            </PopoverTrigger>
            <PopoverContent width='md' align='start'>
              <div>Popover content</div>
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip content</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button>Hover Card</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div>Hover card content</div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </section>

      {/* SECTION: Data Display Components */}
      <section className='space-y-4'>
        <h2 className='text-xl font-bold'>Data Display Components</h2>

        <div>
          <h3 className='text-sm font-medium mb-2'>Table</h3>
          <Table data={tableData} columns={tableColumns} hoverable striped />
          <TablePagination currentPage={1} pageSize={10} total={100} onPageChange={() => {}} />
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <h3 className='text-sm font-medium'>Status Badge:</h3>
          <StatusBadge status='success' label='Success' />
          <StatusBadge status='warning' label='Warning' />
          <StatusBadge status='error' label='Error' />
          <StatusBadge status='info' label='Info' />
          <StatusBadge status='pending' label='Pending' />
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <h3 className='text-sm font-medium'>Action Dropdown:</h3>
          <ActionDropdown
            actions={[
              { key: 'view', label: 'Xem chi tiết', icon: <Eye className='size-4' /> },
              { key: 'edit', label: 'Chỉnh sửa', icon: <Edit className='size-4' /> },
              { key: 'delete', label: 'Xóa', icon: <Trash className='size-4' />, danger: true },
            ]}
          />
        </div>

        <div>
          <h3 className='text-sm font-medium mb-2'>Tag List:</h3>
          <TagList
            items={tagItems}
            size='md'
            removable
            onRemove={(key) => console.log('Remove:', key)}
          />
        </div>
      </section>

      {/* SECTION: Feedback Components */}
      <section className='space-y-4'>
        <h2 className='text-xl font-bold'>Feedback Components</h2>

        <div className='flex flex-wrap gap-4'>
          <Alert variant='info' title='Info Alert'>
            This is an info alert.
          </Alert>
          <Alert variant='success' title='Success Alert'>
            This is a success alert.
          </Alert>
          <Alert variant='warning' title='Warning Alert'>
            This is a warning alert.
          </Alert>
          <Alert variant='default' title='Error Alert'>
            This is an error alert.
          </Alert>
          <Alert variant='destructive' title='Error Alert'>
            This is an error alert.
          </Alert>
        </div>

        <div>
          <Progress value={75} label='Tiến độ' color='success' showValue />
          <Progress value={null} label='Đang tải...' />
        </div>

        <div>
          <h3 className='text-sm font-medium mb-2'>Empty State:</h3>
          <EmptyState description='Không có dữ liệu' />
        </div>

        <div>
          <h3 className='text-sm font-medium mb-2'>Loading:</h3>
          <Loading size='lg' text='Đang tải...' />
        </div>

        <div className='flex gap-4'>
          <Skeleton className='h-4 w-25' />
          <Skeleton className='h-4 w-50' />
          <Skeleton className='h-4 w-full' />
        </div>
      </section>
    </div>
  )
}
