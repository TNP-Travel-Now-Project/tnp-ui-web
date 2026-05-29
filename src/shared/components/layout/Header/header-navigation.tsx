import NavItemCustom from '@/shared/components/navigation/NavItem/nav-item'
import { navItems } from '@/shared/constants/header.constant'

export default function HeaderNavigation() {
  return (
    <nav className='hidden lg:flex items-center justify-center flex-1 gap-12'>
      {navItems.map((item) => (
        <NavItemCustom key={item.href} href={item.href}>
          {item.label}
        </NavItemCustom>
      ))}
    </nav>
  )
}
