import { Tag, Tooltip } from 'antd'
import type React from 'react'

export interface TagItem {
  label: React.ReactNode
  value: string | number
  color?: string
  tooltip?: string
}

export interface TagListProps {
  tags: TagItem[]
  max?: number
  style?: React.CSSProperties
  className?: string
}

export const TagList: React.FC<TagListProps> = ({ tags, max = 4, style, className }) => {
  const displayTags = tags.slice(0, max)
  const hiddenCount = tags.length - displayTags.length
  return (
    <div style={style} className={className}>
      {displayTags.map((tag) =>
        tag.tooltip ? (
          <Tooltip title={tag.tooltip} key={tag.value}>
            <Tag color={tag.color}>{tag.label}</Tag>
          </Tooltip>
        ) : (
          <Tag key={tag.value} color={tag.color}>
            {tag.label}
          </Tag>
        ),
      )}
      {hiddenCount > 0 && <Tag>+{hiddenCount}</Tag>}
    </div>
  )
}

export default TagList
