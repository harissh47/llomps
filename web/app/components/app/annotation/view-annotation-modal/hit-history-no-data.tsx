'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ClockFastForward } from '@/app/components/base/icons/src/vender/line/time'

const HitHistoryNoData: FC = () => {
  const { t } = useTranslation()
  return (
    // <div className='mx-auto mt-20 w-[480px] p-5 rounded-2xl bg-gray-50 space-y-2'>
    <div className='mx-auto mt-20 w-[480px] p-5 rounded-2xl bg-gray-50 dark:bg-[#3F3F3F] space-y-2'>
      {/* <div className='inline-block p-3 rounded-lg border border-gray-200'> */}
      <div className='inline-block p-3 rounded-lg border border-gray-200 dark:border-[#5F5F5F]'>
        <ClockFastForward className='w-5 h-5 text-gray-500' />
      </div>
      <div className='leading-5 text-sm font-normal text-gray-500'>{t('appAnnotation.viewModal.noHitHistory')}</div>
    </div>
  )
}

export default React.memo(HitHistoryNoData)
