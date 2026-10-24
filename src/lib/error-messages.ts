/**
 * Bản dịch lỗi API từ English → Vietnamese
 *
 * Backend (tnp-api) trả lỗi bằng tiếng Anh.
 * File này chuyển đổi chúng sang tiếng Việt trước khi hiển thị cho user.
 *
 * Nguồn: AuthErrors.cs, ValidationMessages.cs, CustomIdentityErrorDescriber.cs,
 *        ExceptionMiddleware.cs, IdentityService.cs, v.v.
 */

// ====================== Error Code → Vietnamese ======================

/** Map mã lỗi (code) sang thông điệp tiếng Việt */
const ERROR_CODE_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'Thông tin đăng nhập không chính xác',
  USER_LOCKED_OUT: 'Tài khoản đã bị khóa',
  EMAIL_NOT_CONFIRMED: 'Email chưa được xác nhận',
  EMAIL_INVALID: 'Email không hợp lệ',
  REDIS_ERROR: 'Đã xảy ra lỗi hệ thống, vui lòng thử lại sau',
  OTP_EXPIRED: 'Mã OTP đã hết hạn hoặc không tồn tại',
  OTP_INCORRECT: 'Mã OTP không chính xác',
  USER_NOT_FOUND: 'Không tìm thấy người dùng',
  INVALID_TOKEN: 'Token không hợp lệ',
  TOKEN_REFRESH_ERROR: 'Lỗi làm mới phiên đăng nhập',
  REGISTRATION_ERROR: 'Đăng ký tài khoản thất bại',
  TOKEN_GENERATION_ERROR: 'Không thể tạo mã xác nhận email',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
  GENERAL_ERROR: 'Đã xảy ra lỗi',
  INTERNAL_ERROR: 'Đã xảy ra lỗi ở server. Vui lòng thử lại sau',
  UNAUTHORIZED: 'Vui lòng đăng nhập để tiếp tục',
  FORBIDDEN: 'Bạn không có quyền thực hiện thao tác này',
  NOT_FOUND: 'Không tìm thấy dữ liệu',
  USER_UPDATE_FAILED: 'Cập nhật người dùng thất bại',
  ROLE_ASSIGNMENT_FAILED: 'Phân quyền thất bại',
  ROLE_REMOVAL_FAILED: 'Gỡ quyền thất bại',
  ROLE_NOT_FOUND: 'Không tìm thấy vai trò',
}

// ====================== English Message → Vietnamese ======================

/** Map thông điệp tiếng Anh từ backend sang tiếng Việt */
const ENGLISH_TO_VIETNAMESE: Record<string, string> = {
  // AuthErrors.cs
  'Invalid credentials': 'Thông tin đăng nhập không chính xác',
  'User is locked': 'Tài khoản đã bị khóa',
  'Email is not confirmed': 'Email chưa được xác nhận',
  'Email is invalid': 'Email không hợp lệ',
  'Redis operation failed': 'Đã xảy ra lỗi hệ thống, vui lòng thử lại sau',
  'OTP expired or not found': 'Mã OTP đã hết hạn hoặc không tồn tại',
  'OTP incorrect': 'Mã OTP không chính xác',
  'User not found': 'Không tìm thấy người dùng',
  'Token is invalid': 'Token không hợp lệ',
  'Failed to generate email confirmation token':
    'Không thể tạo mã xác nhận email',

  // ExceptionMiddleware.cs
  'Invalid request data': 'Dữ liệu không hợp lệ',
  'An error occurred on the server. Please try again later':
    'Đã xảy ra lỗi ở server. Vui lòng thử lại sau',
  'User not authenticated': 'Vui lòng đăng nhập để tiếp tục',
  'Only admins can view user details': 'Chỉ quản trị viên mới có xem thông tin người dùng',

  // IdentityService.cs
  'Failed to create user from Google': 'Tạo tài khoản từ Google thất bại',
  'An error occurred while processing the refresh token':
    'Lỗi làm mới phiên đăng nhập',
  'Registration failed': 'Đăng ký tài khoản thất bại',
  'Password reset failed': 'Đặt lại mật khẩu thất bại',
  'Email verification failed': 'Xác nhận email thất bại',

  // TokenService.cs
  'RefreshToken not exist!': 'Phiên làm mới không tồn tại',
  'Invalid or expired RefreshToken!': 'Phiên làm mới không hợp lệ hoặc đã hết hạn',
  'User not found in database': 'Không tìm thấy người dùng',

  // JWT Bearer OnChallenge
  'You must provide a valid access token.':
    'Vui lòng cung cấp token truy cập hợp lệ',

  // Domain exceptions
  'User age {age} is not valid. Must be >= 18 and <= 25':
    'Tuổi không hợp lệ. Phải từ 18 đến 25 tuổi',

  // CSRF
  'Path requested not found': 'Đường dẫn không tồn tại',
  'CSRF validation failed': 'Xác thực CSRF thất bại',

  // ValidationMessages.cs (FluentValidation - phổ biến)
  '{PropertyName} cannot be empty': '{PropertyName} không được để trống',
  'Email is not in a valid format': 'Email không đúng định dạng',
  'Email cannot exceed {MaxLength} characters':
    'Email không được vượt quá {MaxLength} ký tự',
  'Password must be at least {MinLength} characters':
    'Mật khẩu phải có ít nhất {MinLength} ký tự',
  'Password cannot exceed {MaxLength} characters':
    'Mật khẩu không được vượt quá {MaxLength} ký tự',
  'Password must be between {MinLength} and {MaxLength} characters':
    'Mật khẩu phải từ {MinLength} đến {MaxLength} ký tự',
  'Password must contain at least one uppercase letter':
    'Mật khẩu phải chứa ít nhất một chữ hoa',
  'Password must contain at least one lowercase letter':
    'Mật khẩu phải chứa ít nhất một chữ thường',
  'Password must contain at least one digit':
    'Mật khẩu phải chứa ít nhất một chữ số',
  'Password must contain at least one special character (~!@#$%^&*()_+=?)':
    'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (~!@#$%^&*()_+=?)',
  'Confirmation password must match the password':
    'Mật khẩu xác nhận phải khớp với mật khẩu',
  'OTP code cannot be empty': 'Mã OTP không được để trống',
  'OTP code must be exactly {ExpectedLength} digits':
    'Mã OTP phải chính xác {ExpectedLength} chữ số',
  'OTP code can only contain digits': 'Mã OTP chỉ được chứa chữ số',
  'Full name cannot be empty': 'Họ và tên không được để trống',
  'Full name cannot exceed {MaxLength} characters':
    'Họ và tên không được vượt quá {MaxLength} ký tự',
  'Username cannot be empty': 'Tên người dùng không được để trống',
  'Username cannot exceed {MaxLength} characters':
    'Tên người dùng không được vượt quá {MaxLength} ký tự',
  'Phone number cannot be empty': 'Số điện thoại không được để trống',
  'Phone number must be exactly {ExpectedLength} digits':
    'Số điện thoại phải chính xác {ExpectedLength} chữ số',
  'Phone number can only contain digits (0-9)':
    'Số điện thoại chỉ được chứa chữ số (0-9)',
  'Date of birth cannot be empty': 'Ngày sinh không được để trống',
  'Age must be between {From} and {To} years':
    'Tuổi phải từ {From} đến {To} tuổi',
  'At least one role must be specified': 'Phải chọn ít nhất một vai trò',

  // CustomIdentityErrorDescriber.cs
  'Password must be at least {length} characters':
    'Mật khẩu phải có ít nhất {length} ký tự',
  "Email '{email}' is already registered": 'Email {email} đã được đăng ký',
  "Username '{userName}' is already taken":
    'Tên người dùng {userName} đã tồn tại',
  'Username is not in a valid format': 'Tên người dùng không đúng định dạng',
  'Incorrect password': 'Mật khẩu không chính xác',
  'This login is already associated with another account':
    'Đăng nhập này đã được liên kết với tài khoản khác',
  'Lockout is not enabled for this user':
    'Tính năng khóa tài khoản chưa được kích hoạt',
  'User already has a password set': 'Người dùng đã có mật khẩu',
  "User is not in role '{role}'": 'Người dùng không thuộc vai trò {role}',

  // User command handlers
  'User with ID {request.UserId} not found':
    'Không tìm thấy người dùng với ID đã cho',
  'User is not authenticated or user ID not found in claims':
    'Vui lòng đăng nhập để tiếp tục',
}

// ====================== Public API ======================

/**
 * Dịch lỗi từ backend sang tiếng Việt.
 *
 * Thử matching theo error code trước, nếu không có thì match theo message text.
 * Nếu không match được thì giữ nguyên message gốc (phòng trường hợp backend
 * đã trả tiếng Việt hoặc lỗi chưa được đưa vào bản dịch).
 */
export function translateApiError(
  code: string | undefined,
  message: string,
): string {
  // 1. Thử match theo error code (nhanh và chính xác)
  if (code && code in ERROR_CODE_MESSAGES) {
    return ERROR_CODE_MESSAGES[code]
  }

  // 2. Thử match theo message text (cho các case không có code chuẩn)
  if (message in ENGLISH_TO_VIETNAMESE) {
    return ENGLISH_TO_VIETNAMESE[message]
  }

  // 3. Nếu không match được, giữ nguyên message gốc
  return message
}

/**
 * Dịch danh sách lỗi field-level (validation errors).
 *
 * Backend trả dạng: { "email": ["Email is not in a valid format"], ... }
 * → Dịch từng message trong array.
 */
export function translateFieldErrors(
  errors: Record<string, string[]> | undefined,
): Record<string, string[]> | undefined {
  if (!errors) return errors

  const translated: Record<string, string[]> = {}
  for (const [field, messages] of Object.entries(errors)) {
    translated[field] = messages.map(
      (msg) => ENGLISH_TO_VIETNAMESE[msg] ?? msg,
    )
  }
  return translated
}
