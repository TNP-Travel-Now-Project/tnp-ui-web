export function getCSRFToken(): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; CSRF-TOKEN=`)

  if (parts.length === 2) {
    return parts.pop()?.split(';')[0] || null
  }

  return null
}
