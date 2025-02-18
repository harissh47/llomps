'use client'
import type { FC } from 'react'
import React from 'react'
import {
  useCSVDownloader,
} from 'react-papaparse'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { Download02 as DownloadIcon } from '@/app/components/base/icons/src/vender/solid/general'
import Button from '@/app/components/base/button'
export type IResDownloadProps = {
  isMobile: boolean
  values: Record<string, string>[]
}

const ResDownload: FC<IResDownloadProps> = ({
  isMobile,
  values,
}) => {
  const { t } = useTranslation()
  const { CSVDownloader, Type } = useCSVDownloader()

  return (
    <CSVDownloader
      className="block cursor-pointer"
      type={Type.Link}
      filename={'result'}
      bom={true}
      config={{
        // delimiter: ';',
      }}
      data={values}
    >
      <Button className={cn('flex items-center !h-8 space-x-2 bg-white !text-[13px] font-medium', isMobile ? '!p-0 !w-8 justify-center' : '!px-3')}>
        {/* <DownloadIcon className='w-4 h-4 text-[#155EEF]' /> */}
        <DownloadIcon className='w-4 h-4 text-[#8AB40A]' />
        {/* {!isMobile && <span className='text-[#155EEF]'>{t('common.operation.download')}</span>} */}
        {!isMobile && <span className='text-[#8AB40A]'>{t('common.operation.download')}</span>}
      </Button>
    </CSVDownloader>
  )
}
export default React.memo(ResDownload)
