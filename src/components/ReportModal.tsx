import CuModal from './CuModal'
import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'
import useAxiosWithAuth from '@/api/config'
import { Box, Typography } from '@mui/material'
import ReportTypeSelect from '@/components/ReportTypeSelect'

interface IReportModalProps {
  isOpen: boolean
  handleClose: () => void
  reportType: 'user' | 'showcase' | 'recruit'
  targetId: string
}

interface IReportFormInput {
  userId: string
  type: string
  content: string
}

const ReportModal = ({
  isOpen,
  handleClose,
  reportType,
  targetId,
}: IReportModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const axiosInstance = useAxiosWithAuth()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IReportFormInput>({
    defaultValues: {
      userId: targetId ? targetId : '',
      type: '',
      content: '',
    },
  })

  const onSubmit: SubmitHandler<IReportFormInput> = (data) => {
    console.log(data)
    setIsSubmitting(true)
    axiosInstance
      .post(`/report`, {
        data,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error.message)
      })
    setIsSubmitting(false)
  }

  let typeName: string

  switch (reportType) {
    case 'user':
      typeName = '유저를'
      break
    case 'showcase':
      typeName = '쇼케이스를'
      break
    case 'recruit':
      typeName = '모집글을'
      break
  }

  return (
    <CuModal
      open={isOpen}
      onClose={handleClose}
      title={'신고하기'}
      mobileFullSize
      containedButton={{
        text: isSubmitting ? '제출 중' : '완료',
        type: 'submit',
        form: 'report-form',
      }}
      textButton={{
        text: '취소',
        onClick: handleClose,
      }}
    >
      <Box sx={{ height: '100%', justifyContent: 'flex-start' }}>
        <form id="report-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="type"
            control={control}
            rules={{
              required: '신고의 유형을 선택해주세요',
            }}
            render={({ field }) => (
              <>
                <ReportTypeSelect field={field} label="신고 유형" />
                <Typography color="error" variant="Caption">
                  {errors.type?.message || '\u00A0'}
                </Typography>
              </>
            )}
          />
          <Controller
            name="content"
            control={control}
            rules={{
              required: '신고 내용을 작성해주세요',
            }}
            render={({ field }) => (
              <Box>
                <CuTextFieldLabel
                  htmlFor="content"
                  style={{ marginBottom: '10px' }}
                >
                  <Typography variant="Body2">
                    이 {typeName} 신고하시겠습니까?
                  </Typography>
                </CuTextFieldLabel>
                <CuTextField
                  {...field}
                  id="content"
                  style={{ width: '100%' }}
                  placeholder="신고하는 이유를 적어주세요."
                  multiline
                  rows={5}
                />
                <Typography color="error" variant="Caption">
                  {errors.content?.message || '\u00A0'}
                </Typography>
              </Box>
            )}
          />
        </form>
      </Box>
    </CuModal>
  )
}

export default ReportModal
