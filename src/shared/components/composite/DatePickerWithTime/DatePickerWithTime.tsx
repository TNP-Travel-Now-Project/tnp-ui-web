'use client'

import type * as React from 'react'

/**
 * DatePickerWithTime — bộ chọn ngày + giờ
 *
 * Được tách riêng từ staging layout/ để tránh phụ thuộc vào UI library cụ thể.
 * Hiện tại dùng native `<input type="datetime-local">`.
 * Staging components dùng prop `date` (không phải `value`).
 *
 * Cách dùng:
 *   <DatePickerWithTime
 *     date={startDate}
 *     onChange={(date) => setStartDate(date)}
 *     placeholder='Chọn ngày'
 *   />
 */
interface DatePickerWithTimeProps {
  date: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  className?: string
}

export function DatePickerWithTime({ date, onChange, className }: DatePickerWithTimeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    onChange(val ? new Date(val) : null)
  }

  const stringValue =
    date instanceof Date && !isNaN(date.getTime()) ? date.toISOString().slice(0, 16) : ''

  return (
    <input
      type='datetime-local'
      value={stringValue}
      onChange={handleChange}
      className={className}
    />
  )
}
