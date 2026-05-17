// Custom components

// Re-export shadcn components
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/navigation/breadcrumb'
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/navigation/pagination'
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/navigation/tabs'
export {
  Breadcrumb as CustomBreadcrumb,
  type BreadcrumbItemProps,
  type BreadcrumbProps,
} from './Breadcrumb'
export { Pagination as CustomPagination, type PaginationProps } from './Pagination'
export { type TabItem, Tabs as CustomTabs, type TabsProps } from './Tabs'
