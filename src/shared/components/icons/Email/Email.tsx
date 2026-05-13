import type { IconProps } from '../types'

const Email: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 14,
  height = 14,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title id='email'>email</title>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2.5 2.5C1.80964 2.5 1.25 3.05964 1.25 3.75V11.25C1.25 11.9404 1.80964 12.5 2.5 12.5H12.5C13.1904 12.5 13.75 11.9404 13.75 11.25V3.75C13.75 3.05964 13.1904 2.5 12.5 2.5H2.5ZM11.375 3.75H3.62504L7.5 6.7132L11.375 3.75ZM2.5 4.46327V11.25H12.5V4.46327L8.25931 7.70615C7.81112 8.04888 7.18888 8.04889 6.74069 7.70615L2.5 4.46327Z'
        fill='#7C7B7B'
      />
    </svg>
  )
}

export default Email
