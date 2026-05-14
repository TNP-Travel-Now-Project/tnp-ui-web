import { Pagination, Select } from 'antd'

export interface TablePaginationProps {
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

const TablePagination = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) => {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, total)

  return (
    <div
      style={{
        marginTop: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Select
        value={pageSize}
        onChange={onPageSizeChange}
        options={[10, 20, 50, 100].map((v) => ({
          label: `${v} / trang`,
          value: v,
        }))}
        style={{ width: 120 }}
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span>
          {start} - {end} of {total}
        </span>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
          showQuickJumper
        />
      </div>
    </div>
  )
}

export default TablePagination
