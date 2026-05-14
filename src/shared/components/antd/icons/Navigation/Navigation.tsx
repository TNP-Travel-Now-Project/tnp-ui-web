import type { IconProps } from '../types'

const Navigation: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 15,
  height = 30,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 15 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title id='navigation'>navigation</title>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M1.40788 10.4079C1.6372 10.6749 2.03224 10.6989 2.29023 10.4616L7.50001 5.66872L12.7098 10.4616C12.9678 10.6989 13.3628 10.6749 13.5921 10.4079C13.8215 10.1409 13.7982 9.73201 13.5402 9.49466L8.33046 4.70178C7.85685 4.26607 7.14316 4.26607 6.66955 4.70178L1.45978 9.49466C1.20179 9.73201 1.17855 10.1409 1.40788 10.4079Z'
        fill='#707070'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M1.40788 19.5921C1.6372 19.3251 2.03224 19.3011 2.29023 19.5384L7.50001 24.3313L12.7098 19.5384C12.9678 19.3011 13.3628 19.3251 13.5921 19.5921C13.8215 19.8591 13.7982 20.268 13.5402 20.5053L8.33046 25.2982C7.85685 25.7339 7.14316 25.7339 6.66955 25.2982L1.45978 20.5053C1.20179 20.268 1.17855 19.8591 1.40788 19.5921Z'
        fill='#707070'
      />
    </svg>
  )
}

export default Navigation
