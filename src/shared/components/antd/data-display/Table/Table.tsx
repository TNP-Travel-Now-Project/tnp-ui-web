'use client'

import { Table as AntTable, type TableProps } from 'antd'
import styles from './Table.module.scss'
import TablePagination, { type TablePaginationProps } from './TablePagination'
import TableToolbar, { type TableToolbarProps } from './TableToolbar'

export interface BaseTableProps<T extends object> extends TableProps<T> {
  toolbarProps?: TableToolbarProps
  paginationProps?: TablePaginationProps
  wrapperClassName?: string
}

export default function Table<T extends object>({
  toolbarProps,
  paginationProps,
  wrapperClassName,
  className,
  ...tableProps
}: BaseTableProps<T>) {
  return (
    <div className={`${styles.wrapper} ${wrapperClassName ?? ''}`}>
      {toolbarProps && <TableToolbar {...toolbarProps} />}

      <AntTable<T> pagination={false} className={className} {...tableProps} />

      {paginationProps && <TablePagination {...paginationProps} />}
    </div>
  )
}
