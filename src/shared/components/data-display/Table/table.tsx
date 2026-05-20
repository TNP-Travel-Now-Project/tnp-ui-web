'use client'

import { ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/lib/utils'

export interface Column<T> {
  /** Unique key for the column */
  key: string
  /** Header title */
  title: string
  /** Custom render function */
  render?: (value: unknown, record: T, index: number) => React.ReactNode
  /** Width of the column */
  width?: string | number
  /** Alignment */
  align?: 'left' | 'center' | 'right'
  /** Sortable */
  sortable?: boolean
  /** Hidden */
  hidden?: boolean
}

export interface TableProps<T> extends React.ComponentProps<'table'> {
  /** Data source */
  data: T[]
  /** Columns configuration */
  columns: Column<T>[]
  /** Loading state */
  loading?: boolean
  /** Empty text */
  emptyText?: string
  /** Striped rows */
  striped?: boolean
  /** Hoverable rows */
  hoverable?: boolean
  /** Bordered table */
  bordered?: boolean
  /** Compact table */
  compact?: boolean
  /** Row click handler */
  onRowClick?: (record: T, index: number) => void
  /** Selected row keys */
  selectedKeys?: React.SetStateAction<unknown>[]
  /** Row key extractor */
  rowKey?: keyof T | ((record: T) => string | number)
  /** Sort config */
  sortConfig?: {
    key: string
    direction: 'asc' | 'desc'
  }
  /** On sort change */
  onSort?: (key: string, direction: 'asc' | 'desc') => void
}

function Table<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  emptyText = 'Không có dữ liệu',
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  onRowClick,
  selectedKeys,
  rowKey,
  sortConfig,
  onSort,
  className,
  ...props
}: TableProps<T>) {
  const getRowKey = (record: T, index: number): string => {
    if (!rowKey) return String(index)
    if (typeof rowKey === 'function') return String(rowKey(record))
    return String(record[rowKey])
  }

  const isSelected = (record: T, index: number) => {
    if (!selectedKeys) return false
    const key = getRowKey(record, index)
    return selectedKeys.some((k) => k === key)
  }

  const visibleColumns = columns.filter((col) => !col.hidden)

  const handleSort = (key: string) => {
    if (!onSort) return
    const newDirection = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    onSort(key, newDirection)
  }

  const renderSortIcon = (col: Column<T>) => {
    if (!col.sortable) return null
    if (sortConfig?.key === col.key) {
      return sortConfig.direction === 'asc' ? (
        <ChevronUpIcon className='size-4' />
      ) : (
        <ChevronDownIcon className='size-4' />
      )
    }
    return <ChevronsUpDownIcon className='size-4 opacity-50' />
  }

  return (
    <div className='relative w-full overflow-auto'>
      <table
        className={cn('w-full caption-bottom text-sm', bordered && 'border', className)}
        {...props}
      >
        <thead className={cn('bg-muted/50', bordered && 'border-b')}>
          <tr>
            {visibleColumns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'h-10 px-4 text-left align-middle font-medium text-muted-foreground',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  column.sortable && 'cursor-pointer select-none hover:bg-muted',
                  typeof column.width === 'number' && `w-[${column.width}px]`,
                  typeof column.width === 'string' && `w-${column.width}`,
                )}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div
                  className={cn(
                    'flex items-center gap-1',
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end',
                  )}
                >
                  {column.title}
                  {renderSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={`loading-${index}`}
                className={cn('border-b', striped && index % 2 === 1 && 'bg-muted/30')}
              >
                {visibleColumns.map((column) => (
                  <td key={column.key} className='p-4'>
                    <div className='h-4 w-full animate-pulse rounded bg-muted' />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={visibleColumns.length}
                className='h-32 text-center align-middle text-muted-foreground'
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((record, index) => (
              <tr
                key={getRowKey(record, index)}
                className={cn(
                  'border-b transition-colors',
                  striped && index % 2 === 1 && 'bg-muted/30',
                  hoverable && 'hover:bg-muted/50',
                  onRowClick && 'cursor-pointer',
                  isSelected(record, index) && 'bg-muted',
                )}
                onClick={() => onRowClick?.(record, index)}
              >
                {visibleColumns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'p-4 align-middle',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      compact && 'py-2',
                    )}
                  >
                    {column.render
                      ? column.render(record[column.key], record, index)
                      : String(record[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

// Pagination for table
export interface TablePaginationProps {
  currentPage: number
  pageSize: number
  total: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  showTotal?: boolean
}

const TablePagination = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal = true,
}: TablePaginationProps) => {
  const totalPages = Math.ceil(total / pageSize)
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, total)

  return (
    <div className='flex flex-wrap items-center justify-between gap-4 px-4 py-3'>
      <div className='text-sm text-muted-foreground'>
        {showTotal && (
          <span>
            Hiển thị {startItem} - {endItem} của {total} bản ghi
          </span>
        )}
      </div>
      <div className='flex items-center gap-2'>
        {onPageSizeChange && (
          <select
            name='pageSize'
            aria-label='Số bản ghi mỗi trang'
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className='h-8 rounded-md border border-input bg-background px-2 text-sm'
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} / trang
              </option>
            ))}
          </select>
        )}
        <div className='flex items-center gap-1'>
          <button
            type='button'
            aria-label='Trang trước'
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className='h-8 rounded-md border border-input bg-background px-2 text-sm hover:bg-muted disabled:opacity-50'
          >
            {'<'}
          </button>
          <span className='flex h-8 items-center justify-center px-2 text-sm' aria-live='polite'>
            {currentPage} / {totalPages}
          </span>
          <button
            type='button'
            aria-label='Trang sau'
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='h-8 rounded-md border border-input bg-background px-2 text-sm hover:bg-muted disabled:opacity-50'
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Table Toolbar
export interface TableToolbarProps {
  children?: React.ReactNode
  className?: string
}

const TableToolbar = ({ children, className }: TableToolbarProps) => {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-4 p-4', className)}>
      {children}
    </div>
  )
}

export { Table, TablePagination, TableToolbar }

// code template
// const columns: Column<DataType>[] = [
//   { key: 'name', title: 'Tên', sortable: true },
//   { key: 'email', title: 'Email' },
//   { key: 'status', title: 'Trạng thái', render: (value) => <StatusBadge status={value} /> },
//   {
//     key: 'actions',
//     title: '',
//     align: 'right',
//     render: (_, record) => <ActionDropdown actions={getActions(record)} />,
//   },
// ]

// <Table
//   data={data}
//   columns={columns}
//   loading={isLoading}
//   hoverable
//   striped
//   onRowClick={(record) => navigate(`/detail/${record.id}`)}
// />
