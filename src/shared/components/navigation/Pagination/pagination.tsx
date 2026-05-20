'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type * as React from 'react'
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  Pagination as ShadcnPagination,
} from '@/shared/components/ui/navigation/pagination'
import { cn } from '@/lib/utils'

export interface PaginationProps extends React.ComponentProps<typeof ShadcnPagination> {
  /** Trang hiện tại (1-based) */
  currentPage: number
  /** Tổng số trang */
  totalPages: number
  /** Callback khi thay đổi trang */
  onPageChange?: (page: number) => void
  /** Số lượng trang hiển thị mỗi bên (mặc định: 2) */
  siblingCount?: number
  /** Hiển thị nút Previous/Next (mặc định: true) */
  showNavigation?: boolean
  /** Hiển thị nút First/Last (mặc định: false) */
  showFirstLast?: boolean
  /** Label cho nút Previous */
  prevLabel?: string
  /** Label cho nút Next */
  nextLabel?: string
  /** Label cho nút First */
  firstLabel?: string
  /** Label cho nút Last */
  lastLabel?: string
  /** Kiểm soát kích thước */
  size?: 'default' | 'sm' | 'lg'
  /** Ẩn label text, chỉ hiển thị icon */
  hideLabel?: boolean
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
  showNavigation = true,
  showFirstLast = false,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  firstLabel = 'First',
  lastLabel = 'Last',
  size = 'default',
  hideLabel = false,
  className,
  ...props
}: PaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page)
    }
  }

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const leftSibling = Math.max(currentPage - siblingCount, 1)
    const rightSibling = Math.min(currentPage + siblingCount, totalPages)

    // Always show first page
    pages.push(1)

    // Add ellipsis if there's a gap between first and left siblings
    if (leftSibling > 2) {
      pages.push('ellipsis')
    }

    // Add pages between left and right siblings
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    // Add ellipsis if there's a gap between right siblings and last page
    if (rightSibling < totalPages - 1) {
      pages.push('ellipsis')
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <ShadcnPagination className={cn(className)} {...props}>
      <PaginationContent>
        {showFirstLast && currentPage > 1 && (
          <PaginationItem>
            <button
              type='button'
              onClick={() => handlePageClick(1)}
              className={cn(
                'flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
                size === 'sm' && 'px-2 py-1 text-xs',
                size === 'lg' && 'px-3 py-2 text-base',
              )}
            >
              {!hideLabel && <span className='hidden sm:block mr-1'>{firstLabel}</span>}
              <ChevronLeftIcon className='size-4' />
              <ChevronLeftIcon className='size-4 -ml-2' />
            </button>
          </PaginationItem>
        )}

        {showNavigation && (
          <PaginationItem>
            <button
              type='button'
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                'flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
                size === 'sm' && 'px-2 py-1 text-xs',
                size === 'lg' && 'px-3 py-2 text-base',
              )}
            >
              <ChevronLeftIcon className='size-4' />
              {!hideLabel && <span className='hidden sm:block ml-1'>{prevLabel}</span>}
            </button>
          </PaginationItem>
        )}

        {pages.map((page) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${page}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${page}`}>
              <button
                type='button'
                onClick={() => handlePageClick(page)}
                className={cn(
                  'flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'hover:bg-muted hover:text-foreground',
                  size === 'sm' && 'px-2 py-1 text-xs',
                  size === 'lg' && 'px-4 py-2 text-base',
                )}
              >
                {page}
              </button>
            </PaginationItem>
          ),
        )}

        {showNavigation && (
          <PaginationItem>
            <button
              type='button'
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                'flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
                size === 'sm' && 'px-2 py-1 text-xs',
                size === 'lg' && 'px-3 py-2 text-base',
              )}
            >
              {!hideLabel && <span className='hidden sm:block mr-1'>{nextLabel}</span>}
              <ChevronRightIcon className='size-4' />
            </button>
          </PaginationItem>
        )}

        {showFirstLast && currentPage < totalPages && (
          <PaginationItem>
            <button
              type='button'
              onClick={() => handlePageClick(totalPages)}
              className={cn(
                'flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
                size === 'sm' && 'px-2 py-1 text-xs',
                size === 'lg' && 'px-3 py-2 text-base',
              )}
            >
              <ChevronRightIcon className='size-4' />
              <ChevronRightIcon className='size-4 -ml-2' />
              {!hideLabel && <span className='hidden sm:block ml-1'>{lastLabel}</span>}
            </button>
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadcnPagination>
  )
}

Pagination.displayName = 'Pagination'

export default Pagination

// code template
// const [currentPage, setCurrentPage] = useState(1)
// const totalPages = 10

// <Pagination
//   currentPage={currentPage}
//   totalPages={totalPages}
//   onPageChange={setCurrentPage}
//   showFirstLast
//   size="default"
// />
