// 'use client'

// import { Layout } from 'antd'
// import type React from 'react'
// import { useEffect, useState } from 'react'
// import Header from '@/components/Layout/Header/Header'
// import Sidebar from '@/components/Layout/Sidebar/Sidebar'
// import styles from '@/features/admin/page.module.scss'

// export interface LayoutProps {
//   children: React.ReactNode
// }

// const { Content } = Layout

// export default function DashboardLayout({ children }: LayoutProps) {
//   const [collapsed, setCollapsed] = useState(true)
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768)
//     }

//     checkIsMobile()
//     window.addEventListener('resize', checkIsMobile)

//     return () => {
//       window.removeEventListener('resize', checkIsMobile)
//     }
//   }, [])

//   const siderWidth = collapsed ? 92 : 240

//   return (
//     <Layout className={styles.layout} hasSider>
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       <Layout
//         className={styles.mainLayout}
//         style={{
//           paddingTop: 100,
//           marginLeft: isMobile ? 0 : siderWidth,
//           transition: 'margin-left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
//           minHeight: '100vh',
//         }}
//       >
//         <Header
//           collapsed={collapsed}
//           setCollapsed={setCollapsed}
//           siderWidth={siderWidth}
//           isMobile={isMobile}
//         />
//         <Content className={styles.content}>{children}</Content>
//       </Layout>
//     </Layout>
//   )
// }

export default function Layout() {}
