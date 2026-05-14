import type { IconProps } from '../types'

const VietNam: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 24,
  height = 24,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title id='vietnam'>VietNam</title>
      <path d='M1.66602 5.66675H22.3327V18.3334H1.66602V5.66675Z' fill='#D22F27' />
      <path
        d='M9.63065 15.6666L12.065 8.33325L14.1633 15.5543L8.33398 11.2033L15.6673 11.0223L9.63065 15.6666Z'
        fill='#F1B31C'
        stroke='#F1B31C'
        stroke-width='0.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M1.66602 5.66675H22.3327V18.3334H1.66602V5.66675Z'
        stroke='black'
        stroke-width='0.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default VietNam
