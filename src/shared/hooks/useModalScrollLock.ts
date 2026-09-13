import { useEffect } from 'react'

function getScrollbarWidth(): number {
  const el = document.createElement('div')
  el.style.cssText = 'width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px'
  document.body.appendChild(el)
  const width = el.offsetWidth - el.clientWidth
  document.body.removeChild(el)
  return width
}

export function useModalScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = getScrollbarWidth()
      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])
}
