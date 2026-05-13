import { Card, Flex, Skeleton } from 'antd'

interface FormCardSkeletonProps {
  inputCount: number
}

export const FormSkeleton = ({ inputCount = 2 }: FormCardSkeletonProps) => {
  return (
    <Card
      className='shadow-2xl rounded-2xl w-full max-w-md overflow-hidden'
      style={{ width: 450, maxWidth: '90%' }}
      styles={{ body: { padding: '3rem 2rem' } }}
    >
      <Flex vertical gap={24}>
        <div className='text-center flex flex-col items-center gap-2'>
          <Skeleton.Button active size='small' style={{ width: 120, height: 28 }} />
          <Skeleton.Button active size='small' style={{ width: 200, height: 16, opacity: 0.6 }} />
        </div>

        <Flex vertical gap={16} style={{ marginTop: '0.5rem' }}>
          {Array.from({ length: inputCount }).map((_, index) => (
            <Skeleton.Input
              key={index}
              active
              block
              size='large'
              style={{ height: 50, borderRadius: 12 }}
            />
          ))}
        </Flex>

        <Skeleton.Button
          active
          block
          size='large'
          style={{ height: 50, borderRadius: 12, marginTop: '0.5rem' }}
        />

        <Flex vertical align='center' gap={16} style={{ marginTop: '0.5rem' }}>
          <Skeleton.Input active size='small' style={{ width: 150, height: 20 }} />
        </Flex>
      </Flex>
    </Card>
  )
}

export default FormSkeleton
