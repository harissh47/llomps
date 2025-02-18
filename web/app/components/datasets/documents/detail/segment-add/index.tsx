'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { FilePlus02 } from '@/app/components/base/icons/src/vender/line/files'
import { Loading02 } from '@/app/components/base/icons/src/vender/line/general'
import { AlertCircle } from '@/app/components/base/icons/src/vender/solid/alertsAndFeedback'
import { CheckCircle } from '@/app/components/base/icons/src/vender/solid/general'
import Popover from '@/app/components/base/popover'

export type ISegmentAddProps = {
  importStatus: ProcessStatus | string | undefined
  clearProcessStatus: () => void
  showNewSegmentModal: () => void
  showBatchModal: () => void
}

export enum ProcessStatus {
  WAITING = 'waiting',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error',
}

const SegmentAdd: FC<ISegmentAddProps> = ({
  importStatus,
  clearProcessStatus,
  showNewSegmentModal,
  showBatchModal,
}) => {
  const { t } = useTranslation()

  if (importStatus) {
    return (
      <>
        {(importStatus === ProcessStatus.WAITING || importStatus === ProcessStatus.PROCESSING) && (
          <div className='relative overflow-hidden inline-flex items-center mr-2 px-3 py-[6px] text-blue-700 bg-[#F5F8FF] rounded-lg border border-black/5'>
            {importStatus === ProcessStatus.WAITING && <div className='absolute left-0 top-0 w-3/12 h-full bg-[#D1E0FF] z-0'/>}
            {importStatus === ProcessStatus.PROCESSING && <div className='absolute left-0 top-0 w-2/3 h-full bg-[#D1E0FF] z-0'/>}
            <Loading02 className='animate-spin mr-2 w-4 h-4' />
            <span className='font-medium text-[13px] leading-[18px] z-10'>{t('datasetDocuments.list.batchModal.processing')}</span>
          </div>
        )}
        {importStatus === ProcessStatus.COMPLETED && (
          <div className='inline-flex items-center mr-2 px-3 py-[6px] text-gray-700 bg-[#F6FEF9] rounded-lg border border-black/5'>
            <CheckCircle className='mr-2 w-4 h-4 text-[#039855]' />
            <span className='font-medium text-[13px] leading-[18px]'>{t('datasetDocuments.list.batchModal.completed')}</span>
            {/* <span className='pl-2 font-medium text-[13px] leading-[18px] text-[#155EEF] cursor-pointer' onClick={clearProcessStatus}>{t('datasetDocuments.list.batchModal.ok')}</span> */}
            <span className='pl-2 font-medium text-[13px] leading-[18px] text-[#8AB40A] cursor-pointer' onClick={clearProcessStatus}>{t('datasetDocuments.list.batchModal.ok')}</span>
          </div>
        )}
        {importStatus === ProcessStatus.ERROR && (
          <div className='inline-flex items-center mr-2 px-3 py-[6px] text-red-600 bg-red-100 rounded-lg border border-black/5'>
            <AlertCircle className='mr-2 w-4 h-4 text-[#D92D20]' />
            <span className='font-medium text-[13px] leading-[18px]'>{t('datasetDocuments.list.batchModal.error')}</span>
            {/* <span className='pl-2 font-medium text-[13px] leading-[18px] text-[#155EEF] cursor-pointer' onClick={clearProcessStatus}>{t('datasetDocuments.list.batchModal.ok')}</span> */}
            <span className='pl-2 font-medium text-[13px] leading-[18px] text-[#8AB40A] cursor-pointer' onClick={clearProcessStatus}>{t('datasetDocuments.list.batchModal.ok')}</span>
          </div>
        )}
      </>
    )
  }

  return (
    <Popover
      manualClose
      trigger='click'
      htmlContent={
        <div className='w-full py-1 dark:bg-[#3f3f3f]'>
          {/* <div className='py-2 px-3 mx-1 flex items-center gap-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 text-sm' onClick={showNewSegmentModal}>{t('datasetDocuments.list.action.add')}</div>
          <div className='py-2 px-3 mx-1 flex items-center gap-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 text-sm' onClick={showBatchModal}>{t('datasetDocuments.list.action.batchAdd')}</div> */}
          <div className='py-2 px-3 mx-1 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer text-gray-700 dark:text-[#FCFCFC] text-sm' onClick={showNewSegmentModal}>{t('datasetDocuments.list.action.add')}</div>
          <div className='py-2 px-3 mx-1 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer text-gray-700 dark:text-[#FCFCFC] text-sm' onClick={showBatchModal}>{t('datasetDocuments.list.action.batchAdd')}</div>
        </div>
      }
      btnElement={
        <div className='inline-flex items-center'>
          {/* <FilePlus02 className='w-4 h-4 text-gray-700' />
          <span className='pl-1'>{t('datasetDocuments.list.action.addButton')}</span> */}
          <FilePlus02 className='w-4 h-4 text-gray-700 dark:text-[#6B7280]' />
          <span className='pl-1 dark:text-white'>{t('datasetDocuments.list.action.addButton')}</span>
        </div>
      }
      btnClassName={open => cn('mr-2 !py-[6px] !text-[13px] !leading-[18px] hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-[0_1px_2px_rgba(16,24,40,0.05)]', open ? '!bg-gray-100 !shadow-none' : '!bg-transparent')}
      className='!w-[132px] h-fit !z-20  !translate-x-0 !left-0'
    />
  )
}
export default React.memo(SegmentAdd)
