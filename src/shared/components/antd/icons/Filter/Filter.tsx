import type { IconProps } from '../types'

const Filter: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 15,
  height = 15,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title id='filter'>filter</title>
      <path
        d='M14.6673 2H1.33398L6.66732 8.30667V12.6667L9.33398 14V8.30667L14.6673 2Z'
        stroke='#64748B'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default Filter
