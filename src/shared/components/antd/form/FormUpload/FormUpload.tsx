import { CloseOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import type React from 'react'
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'

const { Dragger } = Upload

export interface FormUploadProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: React.ReactNode
  title?: React.ReactNode
  hint?: React.ReactNode

  uploadProps?: UploadProps
}

export default function FormUpload<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  title,
  hint,
  uploadProps,
}: FormUploadProps<TFieldValues>) {
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        defaultValue={[] as any}
        render={({ field }) => {
          const files: UploadFile[] = field.value || []

          return (
            <>
              <Dragger
                {...uploadProps}
                multiple
                showUploadList={false}
                fileList={files}
                onChange={(info) => field.onChange(info.fileList)}
              >
                <div className='py-8 text-center text-gray-500'>
                  <UploadOutlined className='text-2xl mb-2' />
                  <p>{title}</p>
                  {hint && <p className='text-xs text-gray-400'>{hint}</p>}
                </div>
              </Dragger>

              {files.length > 0 && (
                <div className='mt-3 grid grid-cols-3 gap-3'>
                  {files.map((file) => (
                    <div
                      key={file.uid}
                      className='flex items-center justify-between !mt-3 !pl-3 border border-gray-300 rounded-md'
                    >
                      <span className='truncate text-sm flex-1'>{file.name}</span>

                      <div className='flex gap-1'>
                        {/* xử lý download file  */}
                        <Button
                          type='text'
                          icon={<DownloadOutlined />}
                          onClick={() => {
                            const downloadUrl =
                              file.url ||
                              (file.originFileObj
                                ? URL.createObjectURL(file.originFileObj as File)
                                : null)

                            if (downloadUrl) {
                              const a = document.createElement('a')
                              a.href = downloadUrl
                              a.download = file.name || 'download'
                              document.body.appendChild(a)
                              a.click()
                              document.body.removeChild(a)

                              if (!file.url && file.originFileObj) {
                                URL.revokeObjectURL(downloadUrl)
                              }
                            }
                          }}
                        />

                        <Button
                          type='text'
                          icon={<CloseOutlined />}
                          onClick={() => field.onChange(files.filter((f) => f.uid !== file.uid))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )
        }}
      />
    </Form.Item>
  )
}
