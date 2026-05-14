import type { IconProps } from '../types'

const Plus: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 16,
  height = 16,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title id='plus'>plus</title>
      <path
        d='M8 3.3335V12.6668'
        stroke='white'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3.33398 8H12.6673'
        stroke='white'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default Plus
