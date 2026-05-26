'use client'

export default function MainError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='flex items-center justify-center min-h-[60vh] px-5'>
      <div className='text-center max-w-md'>
        <h2 className='text-2xl font-bold text-on-surface mb-2'>Có lỗi xảy ra</h2>
        <p className='text-sm text-outline mb-6'>{error.message}</p>
        <button
          type='button'
          onClick={reset}
          className='px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors'
        >
          Thử lại
        </button>
      </div>
    </div>
  )
}
