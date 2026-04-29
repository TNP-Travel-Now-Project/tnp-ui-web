'use client'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const route = useRouter()

  return (
    <>
      <h1>Da vao trang dang ky</h1>

      <button type='button' onClick={() => route.push('/order')}>
        don hang
      </button>
    </>
  )
}
