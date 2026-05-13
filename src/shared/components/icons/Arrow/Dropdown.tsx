import type { IconProps } from '../types'

const Arrow: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
      <title id='dropdown'>dropdown</title>
      <path
        d='M11.9465 6.25342H7.79316H4.05317C3.41317 6.25342 3.09317 7.02675 3.5465 7.48008L6.99983 10.9334C7.55317 11.4868 8.45317 11.4868 9.0065 10.9334L10.3198 9.62008L12.4598 7.48008C12.9065 7.02675 12.5865 6.25342 11.9465 6.25342Z'
        fill='#7BBFAC'
      />
    </svg>
  )
}

export default Arrow
