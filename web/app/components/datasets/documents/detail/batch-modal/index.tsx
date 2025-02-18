'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CSVUploader from './csv-uploader'
import CSVDownloader from './csv-downloader'
import Button from '@/app/components/base/button'
import Modal from '@/app/components/base/modal'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import type { DocForm } from '@/models/datasets'

export type IBatchModalProps = {
  isShow: boolean
  docForm: DocForm
  onCancel: () => void
  onConfirm: (file: File) => void
}

const BatchModal: FC<IBatchModalProps> = ({
  isShow,
  docForm,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation()
  const [currentCSV, setCurrentCSV] = useState<File>()
  const handleFile = (file?: File) => setCurrentCSV(file)

  const handleSend = () => {
    if (!currentCSV)
      return
    onCancel()
    onConfirm(currentCSV)
  }

  useEffect(() => {
    if (!isShow)
      setCurrentCSV(undefined)
  }, [isShow])

  return (
    <Modal isShow={isShow} onClose={() => {}} className='px-8 py-6 !max-w-[520px] !rounded-xl'>
      {/* <div className='relative pb-1 text-xl font-medium leading-[30px] text-gray-900'>{t('datasetDocuments.list.batchModal.title')}</div> */}
      <div className='relative pb-1 text-xl font-medium leading-[30px] text-gray-900 dark:text-white'>{t('datasetDocuments.list.batchModal.title')}</div>

      <div className='absolute right-4 top-4 p-2 cursor-pointer' onClick={onCancel}>
        <XClose className='w-4 h-4 text-gray-500' />
      </div>
      <CSVUploader
        file={currentCSV}
        updateFile={handleFile}
      />
      <CSVDownloader
        docForm={docForm}
      />
      <div className='mt-[28px] pt-6 flex justify-end'>
        <Button className='mr-2 text-gray-700 text-sm font-medium dark:border-0 dark:bg-[#3f3f3f] dark:hover:bg-zinc-800' onClick={onCancel}>
          {t('datasetDocuments.list.batchModal.cancel')}
        </Button>
        <Button className='text-sm font-medium' type="primary" onClick={handleSend} disabled={!currentCSV}>
          {t('datasetDocuments.list.batchModal.run')}
        </Button>
      </div>
    </Modal>
  )
}
export default React.memo(BatchModal)
