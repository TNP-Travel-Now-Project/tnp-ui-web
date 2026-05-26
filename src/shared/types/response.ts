/**
 * Kiểu phản hồi API dùng chung
 *
 * Dựa trên format response chuẩn từ backend .NET.
 * Các trường không cần thiết đã được lược bỏ (request, returnUrl).
 *
 * Cách dùng:
 *   import type { BaseResponse, PaginatedResponse, BaseSearchRequest } from '@/shared/types'
 *
 *   // API trả về một object
 *   const { data } = await api.get<BaseResponse<User>>('/users/1')
 *   // data.data → User | null
 *   // data.message → thông báo lỗi/thành công
 *   // data.code → mã lỗi (nếu có)
 *
 *   // API trả về danh sách có phân trang
 *   const { data } = await api.get<PaginatedResponse<User>>('/users', { params })
 *   // data.data → User[]
 *   // data.pageNum, data.pageSize, data.total
 */

// ====================== Base Response ======================

/**
 * Response chuẩn từ API .NET backend
 *
 * T: Kiểu dữ liệu trả về trong data (VD: User, Product, Category...)
 *
 * Example response:
 * {
 *   "succeeded": true,
 *   "message": "Thành công",
 *   "code": null,
 *   "data": { "id": 1, "name": "Nguyễn Văn A" },
 *   "errors": null
 * }
 *
 * Example error response:
 * {
 *   "succeeded": false,
 *   "message": "Validation thất bại",
 *   "code": "VALIDATION_ERROR",
 *   "data": null,
 *   "errors": { "email": ["Email không đúng định dạng"] }
 * }
 */
export interface BaseResponse<T = unknown> {
  succeeded: boolean
  message: string | null
  code: string | null
  data: T | null
  errors: Record<string, string[]> | null
}

// ====================== Paginated Response ======================

/**
 * Response danh sách có phân trang
 *
 * Dùng cho các API trả về danh sách kèm thông tin phân trang.
 *
 * Example response:
 * {
 *   "succeeded": true,
 *   "message": null,
 *   "code": null,
 *   "pageNum": 1,
 *   "pageSize": 10,
 *   "total": 56,
 *   "data": [ { "id": 1, "name": "Sản phẩm A" }, ... ],
 *   "errors": null
 * }
 */
export interface PaginatedResponse<T = unknown> {
  succeeded: boolean
  message: string | null
  code: string | null
  pageNum: number
  pageSize: number
  total: number
  data: T[]
  errors: Record<string, string[]> | null
}

// ====================== Search Request ======================

/**
 * Request tìm kiếm & phân trang chuẩn
 *
 * Dùng làm params cho các API danh sách.
 * Các field đều optional — chỉ gửi lên khi cần filter/sort.
 *
 * Example:
 *   const params: BaseSearchRequest = {
 *     pageNum: 1,
 *     pageSize: 10,
 *     search: 'nguyễn',
 *     searchBy: 'fullName',
 *     sortBy: 'createdAt',
 *     sortDirection: 'desc',
 *   }
 *   const { data } = await api.get<PaginatedResponse<User>>('/users', { params })
 */
export interface BaseSearchRequest {
  /** Trang hiện tại (bắt đầu từ 1) */
  pageNum?: number
  /** Số bản ghi mỗi trang */
  pageSize?: number
  /** Từ khoá tìm kiếm */
  search?: string
  /** Tìm kiếm theo field nào (VD: 'fullName', 'email') */
  searchBy?: string
  /** Sắp xếp theo field */
  sortBy?: string
  /** Hướng sắp xếp: 'asc' | 'desc' */
  sortDirection?: 'asc' | 'desc'
  /** Lọc theo trạng thái */
  status?: string
}
