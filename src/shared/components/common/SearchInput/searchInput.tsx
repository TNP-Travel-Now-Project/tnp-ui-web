'use client'
import { Loader2, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/shared/components/common/Button/button'
import { Input as ShadcnInput } from '@/shared/components/ui/form/input'

export interface SearchInputProps extends React.ComponentProps<typeof ShadcnInput> {
  /** Hiển thị loading state */
  loading?: boolean
  /** Callback khi click nút clear */
  onClear?: () => void
  /** Container wrapper class */
  containerClassName?: string
  /** Ẩn icon search */
  hideSearchIcon?: boolean
}

const SearchInput = ({
  loading = false,
  onClear,
  containerClassName,
  className,
  value,
  hideSearchIcon = false,
  ...props
}: SearchInputProps) => {
  const showClear = !!value && onClear

  return (
    <div className={cn('relative', containerClassName)}>
      {!hideSearchIcon && (
        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
          {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Search className='h-4 w-4' />}
        </div>
      )}

      <ShadcnInput
        className={cn(!hideSearchIcon && 'pl-10', showClear && 'pr-10', className)}
        value={value}
        {...props}
      />

      {showClear && (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={onClear}
          aria-label='Xóa nội dung tìm kiếm'
          className='absolute right-3 top-1/2 -translate-y-1/2'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput

/// code template
// <SearchInput
//   placeholder="Tìm kiếm..."
//   value={search}
//   onChange={(e) => setSearch(e.target.value)}
//   onClear={() => setSearch('')}
//   loading={isSearching}
// />
///
