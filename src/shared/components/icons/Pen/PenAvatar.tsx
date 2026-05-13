import type { IconProps } from '../types'

const PenAvatar: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
      <title id='pen'>pen</title>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M12.5069 1.61633C12.0568 1.16594 11.3403 1.12597 10.8429 1.52351L3.70623 7.22754C3.56791 7.33809 3.45464 7.47677 3.37392 7.63441L2.46159 9.41597C1.9081 10.4968 3.06383 11.6532 4.14407 11.0994L5.9882 10.154C6.06262 10.1158 6.13303 10.0703 6.19836 10.0181L13.2816 4.35676C13.864 3.89129 13.9124 3.02254 13.3853 2.49519L12.5069 1.61633ZM11.6231 2.5007L12.5014 3.37956L5.4182 9.04088L3.57407 9.98629L4.48639 8.20473L11.6231 2.5007ZM1.875 12.4993C1.52982 12.4993 1.25 12.7793 1.25 13.1247C1.25 13.47 1.52982 13.75 1.875 13.75H13.125C13.4702 13.75 13.75 13.47 13.75 13.1247C13.75 12.7793 13.4702 12.4993 13.125 12.4993H1.875Z'
        fill='white'
      />
    </svg>
  )
}

export default PenAvatar
