import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import type React from 'react'

export interface ActionItem {
  label: React.ReactNode
  key: string
  icon?: React.ReactNode
  danger?: boolean
  disabled?: boolean
  onClick?: () => void
  hidden?: boolean
}

export interface ActionDropdownProps {
  actions: ActionItem[]
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
  trigger?: ('click' | 'hover' | 'contextMenu')[]
  children?: React.ReactNode
  useIconOnly?: boolean
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  actions,
  placement = 'bottomRight',
  trigger = ['click'],
  children,
  useIconOnly = true,
}) => {
  const menu = (
    <Menu>
      {actions
        .filter((a) => !a.hidden)
        .map((action) => (
          <Menu.Item
            key={action.key}
            icon={action.icon}
            danger={action.danger}
            disabled={action.disabled}
            onClick={action.onClick}
          >
            {action.label}
          </Menu.Item>
        ))}
    </Menu>
  )
  return (
    <Dropdown overlay={menu} placement={placement} trigger={trigger}>
      {children ? (
        <span style={{ cursor: 'pointer' }}>{children}</span>
      ) : (
        <Button icon={<MoreOutlined />} type='text'>
          {useIconOnly ? null : 'Actions'}
        </Button>
      )}
    </Dropdown>
  )
}

export default ActionDropdown
