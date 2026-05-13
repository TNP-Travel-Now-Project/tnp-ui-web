import type React from 'react'

export interface FormGroupProps {
  label?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  gutter?: number
}

/**
 * FormGroup - Wrapper section/group cho 1 nhóm trường form, layout theo dòng hoặc block
 * Có thể dùng cho từng block như info section, address section trong form lớn
 */
export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  children,
  className,
  style,
  gutter = 16,
}) => {
  return (
    <div className={className} style={{ marginBottom: gutter, ...style }}>
      {label && <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{label}</div>}
      {description && <div style={{ color: '#888', marginBottom: 8 }}>{description}</div>}
      <div>{children}</div>
    </div>
  )
}

export default FormGroup
