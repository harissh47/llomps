'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon3Dots } from '@/app/components/base/icons/src/vender/line/others'
import Button from '@/app/components/base/button'

const I18N_PREFIX = 'datasetCreation.stepOne.website'

type Props = {
  onConfig: () => void
}

const NoData: FC<Props> = ({
  onConfig,
}) => {
  const { t } = useTranslation()

  return (
    // <div className='max-w-[640px] p-6 rounded-2xl bg-gray-50'>
    <div className='max-w-[640px] p-6 rounded-2xl bg-gray-50 dark:bg-[#3F3F3F]'>
      <div className='flex w-11 h-11 items-center justify-center bg-gray-50 dark:bg-[#A1A6B2] rounded-xl border-[0.5px] border-gray-100 dark:border-[#5f5f5f] shadow-lg'>
        🔥
      </div>
      <div className='my-2'>
        {/* <span className='text-gray-700 font-semibold'>{t(`${I18N_PREFIX}.fireCrawlNotConfigured`)}<Icon3Dots className='inline relative -top-3 -left-1.5' /></span> */}
        <span className='text-gray-700 dark:text-white font-semibold'>{t(`${I18N_PREFIX}.fireCrawlNotConfigured`)}<Icon3Dots className='inline relative -top-3 -left-1.5' /></span>
        {/* <div className='mt-1 pb-3 text-gray-500 text-[13px] font-normal'> */}
        <div className='mt-1 pb-3 text-gray-500 dark:text-[#FCFCFC] text-[13px] font-normal'>
          {t(`${I18N_PREFIX}.fireCrawlNotConfiguredDescription`)}
        </div>
      </div>
      <Button type='primary' onClick={onConfig} className='!h-8 text-[13px] font-medium ' >
        {t(`${I18N_PREFIX}.configure`)}
      </Button>
    </div>
  )
}
export default React.memo(NoData)
