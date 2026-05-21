export function WelcomeHero() {
  return (
    <section className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6'>
      <div className='max-w-2xl'>
        <h1 className='text-4xl font-bold text-on-surface mb-2 tracking-tight'>
          Chào {new Date().getHours() < 12 ? 'sáng' : 'mừng'}, Tuấn!
        </h1>
        <p className='text-lg text-on-surface-variant font-medium opacity-80'>
          Sẵn sàng cho chuyến phiêu lưu tiếp theo?
        </p>
      </div>
    </section>
  )
}
