import type { IconProps } from '../types'

const Event: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 20,
  height = 20,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='#000000'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title id='event'>event</title>
      <path
        d='M46.3003 1H48.8036C50.1867 1 51.3069 2.12021 51.3069 3.50327V62.9632C51.3069 64.3451 50.1867 65.4665 48.8036 65.4665H3.50325C2.12146 65.4665 1 64.3451 1 62.9632V60.0983'
        stroke='black'
        stroke-width='2'
        stroke-linecap='round'
      />
    </svg>
  )
}

export default Event
