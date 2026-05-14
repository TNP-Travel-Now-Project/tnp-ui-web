import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import type React from 'react'

export interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  placeholder?: string
  allowClear?: boolean
  style?: React.CSSProperties
  className?: string
  loading?: boolean
  autoFocus?: boolean
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Tìm kiếm...',
  allowClear = true,
  style,
  className,
  loading,
  autoFocus = false,
}) => (
  <Input
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    onPressEnter={(e) => onSearch?.((e.target as HTMLInputElement).value)}
    placeholder={placeholder}
    allowClear={allowClear}
    style={style}
    className={className}
    prefix={<SearchOutlined />}
    suffix={loading ? <SearchOutlined spin /> : undefined}
    autoFocus={autoFocus}
  />
)

export default SearchInput
