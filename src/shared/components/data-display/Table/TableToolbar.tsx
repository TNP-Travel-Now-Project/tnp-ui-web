import { Col, Row, Space } from 'antd'
import type React from 'react'
import SearchInput from '../../common/SearchInput'

export interface TableToolbarProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearch?: (value: string) => void
  onChangeSearch?: (value: string) => void
  filters?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  searchPlaceholder = 'Tìm kiếm...',
  searchValue,
  onSearch,
  onChangeSearch,
  filters,
  actions,
  children,
  style,
  className,
}) => {
  return (
    <div style={style} className={className}>
      <Row gutter={16} align='middle' justify='space-between' wrap>
        <Col flex='1 1 auto'>
          <Space wrap>
            <SearchInput
              value={searchValue}
              onChange={onChangeSearch}
              onSearch={onSearch}
              placeholder={searchPlaceholder}
              allowClear
            />
            {filters}
            {children}
          </Space>
        </Col>
        <Col>
          <Space wrap>{actions}</Space>
        </Col>
      </Row>
    </div>
  )
}

export default TableToolbar
